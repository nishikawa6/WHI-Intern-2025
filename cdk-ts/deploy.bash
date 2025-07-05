#!/bin/sh
set -eu

PROJECT_ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)

echo "Building backend."
cd "$PROJECT_ROOT_DIR/backend-ts"
npm ci
mkdir -p "layers/nodejs" 
cp -r node_modules "layers/nodejs/node_modules"
npm run build
cd -

echo "Building frontend."
cd "$PROJECT_ROOT_DIR/frontend"
npm ci
npm run build
cd -

echo "Preparing stacks and deploying backend."
cd "$PROJECT_ROOT_DIR/cdk-ts"
npm ci
(aws cloudformation describe-stacks --stack-name CDKToolkit --no-cli-pager) || npm run cdk -- bootstrap
npm run cdk -- deploy --all
cd -

echo "Deploying frontend."
AWS_ACCOUNT=$(aws sts get-caller-identity | jq -r .Account)
aws s3 cp --recursive "$PROJECT_ROOT_DIR/frontend/out" "s3://workshi-2025-tma-${AWS_ACCOUNT}/"

DYNAMODB_ITEM_COUNT=$(aws dynamodb scan --table-name workshi-2025-tma-BackendDynamoDB --max-items 1 | jq .Count)
if [ "$DYNAMODB_ITEM_COUNT" -gt 0 ]; then
    echo "DynamoDB table already contains data. Skipping initial data insertion."
else
    echo "Inserting initial data into DynamoDB."
    aws dynamodb put-item --table-name workshi-2025-tma-BackendDynamoDB \
        --item '{"id":{"S":"1"},"name":{"S":"Jane Doe"},"age":{"N":"22"}}'
    aws dynamodb put-item --table-name workshi-2025-tma-BackendDynamoDB \
        --item '{"id":{"S":"2"},"name":{"S":"John Smith"},"age":{"N":"28"}}'
    aws dynamodb put-item --table-name workshi-2025-tma-BackendDynamoDB \
        --item '{"id":{"S":"3"},"name":{"S":"山田太郎"},"age":{"N":"27"}}'
fi

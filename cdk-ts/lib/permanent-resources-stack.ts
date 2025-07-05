import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { withPrefix } from "./commons";

export class PermanentResourcesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB for backend
    const table = new dynamodb.Table(this, "BackendDynamoDB", {
      tableName: backendDynamoDBTableName(),
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // for tutorial purposes only
    });
    new cdk.CfnOutput(this, "BackendDynamoDBArn", {
      value: table.tableArn,
      description: "ARN for the backend DynamoDB table",
    });
  }
}

export function backendDynamoDBTableName(): string {
  return withPrefix("BackendDynamoDB");
}

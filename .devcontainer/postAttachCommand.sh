#!/bin/sh
echo "Running post-attach command."

# Docker may create these directories as it mounts,
# thus they can be owned by the root user.
sudo chown -R vscode:vscode "backend-ts/node_modules"
sudo chown -R vscode:vscode "frontend/node_modules"
sudo chown -R vscode:vscode "cdk-ts/node_modules"

# Ensure the .aws and .ssh directories are owned by the vscode user
sudo chown -R vscode:vscode "$HOME/.aws"
sudo chown -R vscode:vscode "$HOME/.ssh"

# Ensure the .ssh directory and its contents have the correct permissions
chmod 700 "$HOME/.ssh"
find "$HOME/.ssh" -type d -exec chmod 700 {} \; -o -type f -exec chmod 600 {} \;

# Install dependencies on backend
cd backend-ts
npm install
cd -

# Install dependencies on frontend
cd frontend
npm install
cd -

# Install dependencies on CDK
cd cdk-ts
npm install
cd -

#!/bin/bash

echo "Starting deployment..."

git pull origin main
npm install
npm run deploy

echo "Deployment complete."

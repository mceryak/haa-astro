#!/bin/bash

echo "Starting preview..."
git pull
echo "Successfully cloned repo."
npm install
echo "Successfully installed dependencies."
npm run deploy
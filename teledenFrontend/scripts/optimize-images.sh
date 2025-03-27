#!/bin/bash

# Script to optimize images for the Teledental website
# This script installs necessary dependencies and runs the image conversion script

# Install required dependencies if not already installed
npm install --save-dev sharp glob fs-extra

# Run the image conversion script
node ./scripts/convert-images-to-webp.js

# Make the script executable
chmod +x ./scripts/optimize-images.sh

echo "Image optimization complete!"
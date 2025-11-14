#!/bin/bash

# Build Script for Optimized Worldbook
# This script builds and packages the worldbook for distribution

echo "Building Optimized Worldbook..."

# Create distribution directory
mkdir -p dist

# Run any build processes
echo "Running build processes..."

# Generate documentation
echo "Generating documentation..."

# Create package
echo "Creating package..."
./scripts/package.sh

echo "Build complete!"
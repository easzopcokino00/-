#!/bin/bash

# Package Script for Optimized Worldbook
# Creates the distributable package

echo "Packaging Optimized Worldbook..."

# Ensure dist directory exists
mkdir -p dist

# Create the zip package if zip is available
if command -v zip >/dev/null 2>&1; then
    echo "Creating zip package..."
    zip -r dist/optimized-worldbook.zip \
        lorebook/ \
        docs/ \
        scripts/ \
        reports/ \
        README.md \
        package.json \
        -x "*.git*" \
        -x "dist/*" \
        -x "node_modules/*" \
        -x "*.log"
    echo "Package created: dist/optimized-worldbook.zip"
elif command -v python3 >/dev/null 2>&1; then
    python3 scripts/create_zip.py
else
    echo "Neither zip nor python3 available, skipping zip creation"
fi

# Create tar.gz package
echo "Creating tar.gz package..."
tar -czf dist/optimized-worldbook.tar.gz \
    --exclude='.git' \
    --exclude='dist' \
    --exclude='node_modules' \
    --exclude='*.log' \
    lorebook/ \
    docs/ \
    scripts/ \
    reports/ \
    README.md \
    package.json

echo "Package created: dist/optimized-worldbook.tar.gz"
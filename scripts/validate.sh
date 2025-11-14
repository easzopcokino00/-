#!/bin/bash

# Validation Script for Optimized Worldbook
# Validates package structure and contents

echo "Validating Optimized Worldbook Package..."

# Validation status
VALIDATION_PASSED=true

# Function to validate directory exists
validate_directory() {
    if [ -d "$1" ]; then
        echo "✅ Directory exists: $1"
    else
        echo "❌ Missing directory: $1"
        VALIDATION_PASSED=false
    fi
}

# Function to validate file exists
validate_file() {
    if [ -f "$1" ]; then
        echo "✅ File exists: $1"
    else
        echo "❌ Missing file: $1"
        VALIDATION_PASSED=false
    fi
}

# Function to validate package exists
validate_package() {
    if [ -f "$1" ]; then
        echo "✅ Package exists: $1"
        
        # Check package contents
        echo "   Checking package contents..."
        if [[ "$1" == *.zip ]]; then
            if command -v unzip >/dev/null 2>&1; then
                CONTENTS=$(unzip -l "$1" | grep -E "(lorebook/|docs/|scripts/|reports/)")
                if [ -n "$CONTENTS" ]; then
                    echo "   ✅ Required directories found in package"
                else
                    echo "   ❌ Required directories missing from package"
                    VALIDATION_PASSED=false
                fi
            else
                echo "   ⚠️  unzip not available, cannot check zip contents"
            fi
        elif [[ "$1" == *.tar.gz ]]; then
            if command -v tar >/dev/null 2>&1; then
                CONTENTS=$(tar -tzf "$1" | grep -E "(lorebook/|docs/|scripts/|reports/)" | head -1)
                if [ -n "$CONTENTS" ]; then
                    echo "   ✅ Required directories found in package"
                else
                    echo "   ❌ Required directories missing from package"
                    VALIDATION_PASSED=false
                fi
            else
                echo "   ⚠️  tar not available, cannot check tar.gz contents"
            fi
        fi
    else
        echo "❌ Missing package: $1"
        VALIDATION_PASSED=false
    fi
}

echo ""
echo "=== Directory Structure Validation ==="
validate_directory "lorebook"
validate_directory "docs"
validate_directory "scripts"
validate_directory "reports"
validate_directory "dist"

echo ""
echo "=== Core Files Validation ==="
validate_file "README.md"
validate_file "package.json"
validate_file "docs/StatusBar.md"
validate_file "lorebook/README.md"

echo ""
echo "=== Script Validation ==="
validate_file "scripts/build.sh"
validate_file "scripts/package.sh"

echo ""
echo "=== Package Validation ==="
# Check for zip package only if zip is available
if command -v zip >/dev/null 2>&1; then
    validate_package "dist/optimized-worldbook.zip"
else
    echo "ℹ️  zip not available, skipping zip package validation"
fi

# Always check for tar.gz package
validate_package "dist/optimized-worldbook.tar.gz"

echo ""
echo "=== Summary ==="
if [ "$VALIDATION_PASSED" = true ]; then
    echo "🎉 All validations passed!"
    exit 0
else
    echo "❌ Validation failed. Please fix the issues above."
    exit 1
fi
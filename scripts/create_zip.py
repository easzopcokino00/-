#!/usr/bin/env python3

import zipfile
import os
import sys

def create_zip_package():
    """Create a zip package of the optimized worldbook"""
    
    print("Creating zip package using Python...")
    
    # Define the files and directories to include
    include_items = [
        'lorebook/',
        'docs/',
        'scripts/',
        'reports/',
        'README.md',
        'package.json'
    ]
    
    # Ensure dist directory exists
    os.makedirs('dist', exist_ok=True)
    
    # Create the zip file
    with zipfile.ZipFile('dist/optimized-worldbook.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
        for item in include_items:
            if os.path.exists(item):
                if os.path.isdir(item):
                    # Add directory contents recursively
                    for root, dirs, files in os.walk(item):
                        for file in files:
                            file_path = os.path.join(root, file)
                            # Skip unwanted files
                            if not any(skip in file_path for skip in ['.git', 'dist', 'node_modules', '.log']):
                                zipf.write(file_path, file_path)
                else:
                    # Add single file
                    zipf.write(item, item)
            else:
                print(f"Warning: {item} not found, skipping")
    
    print("Package created: dist/optimized-worldbook.zip")

if __name__ == "__main__":
    create_zip_package()
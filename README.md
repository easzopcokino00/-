# Optimized Worldbook Package

A comprehensive world-building toolkit containing lore, documentation, and utilities for creating and managing fictional worlds.

## 📦 Package Contents

This repository contains a complete worldbook package with the following structure:

```
optimized-worldbook/
├── lorebook/          # Main world-building content and lore
├── docs/              # Documentation including StatusBar files
├── scripts/           # Build and utility scripts
├── reports/           # Build and validation reports
├── dist/              # Distribution packages
├── package.json       # Project configuration
└── README.md          # This file
```

## 🚀 Quick Start

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd optimized-worldbook
   ```

2. Install dependencies (if any):
   ```bash
   npm install
   ```

### Building the Package

To create the distributable package:

```bash
npm run package
```

This will create:
- `dist/optimized-worldbook.zip` - Primary distribution package
- `dist/optimized-worldbook.tar.gz` - Alternative distribution package

### Manual Package Creation

You can also create the package manually:

```bash
# Using the package script
./scripts/package.sh

# Or directly with zip/tar
zip -r optimized-worldbook.zip lorebook/ docs/ scripts/ reports/ README.md package.json
tar -czf optimized-worldbook.tar.gz lorebook/ docs/ scripts/ reports/ README.md package.json
```

## 📚 Documentation

### Core Documentation

- **[Lorebook](./lorebook/README.md)** - Main world-building content
- **[Main Docs](./docs/README.md)** - Project documentation
- **[StatusBar Documentation](./docs/StatusBar.md)** - StatusBar component reference

### Reports

- **[Build Report](./reports/build-report.md)** - Latest build status and validation

## 🔧 Scripts

- **`scripts/build.sh`** - Build script for the project
- **`scripts/package.sh`** - Package creation script
- **`scripts/validate.sh`** - Validation script (if available)

## 📥 Download

### Latest Release

The latest packaged version is available as:
- **Primary**: `dist/optimized-worldbook.zip` (recommended)
- **Alternative**: `dist/optimized-worldbook.tar.gz`

### Git LFS / Release Assets

For large deployments, consider using:
- Git LFS for tracking large binary files
- GitHub Releases for versioned distribution assets

## 🗂️ Package Structure

The distribution package maintains the repository structure:

- `lorebook/` - All world-building content, character sheets, location data
- `docs/` - Complete documentation including StatusBar reference
- `scripts/` - Utility and build scripts
- `reports/` - Validation and build reports
- `README.md` - This documentation

## ✅ Validation

To validate the package integrity:

```bash
npm run validate
```

Or manually check:
1. Verify package exists in `dist/`
2. Check package contents match expected structure
3. Validate all documentation is present

## 🔄 Reproducible Builds

This package is designed for reproducible builds:

1. **Same inputs** → **Same outputs**
2. **Deterministic packaging** with consistent file ordering
3. **Version-controlled scripts** for build processes

To reproduce a package:
1. Checkout the specific tag/commit
2. Run `npm run package`
3. Verify checksums match release

## 📋 Requirements

- Unix-like environment (Linux/macOS/WSL)
- Standard Unix utilities: `zip`, `tar`
- Node.js (for npm scripts, optional)
- Git (for version control)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Update documentation
5. Run validation: `npm run validate`
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 📞 Support

For issues and questions:
- Check the [documentation](./docs/)
- Review [build reports](./reports/)
- Open an issue in the repository

---

**Note**: This package is designed to be a self-contained worldbook distribution. All necessary files and documentation are included in the archive.
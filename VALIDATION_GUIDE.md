# Worldbook Validation Guide

This guide provides detailed information about the worldbook validation system, including how to interpret results and fix common issues.

## Table of Contents

- [Overview](#overview)
- [Running Validation](#running-validation)
- [Understanding Reports](#understanding-reports)
- [Validation Types](#validation-types)
- [Fixing Common Issues](#fixing-common-issues)
- [Testing Circular References](#testing-circular-references)
- [CI/CD Integration](#cicd-integration)

## Overview

The validation system ensures your worldbook data maintains integrity by checking:
- Schema compliance with expected structure
- Unique identifier (UID) uniqueness
- Circular references in profession chains
- Cross-reference validity
- Trigger quality (regex patterns, duplicates)
- Naming convention consistency

## Running Validation

### Basic Usage

```bash
# Run complete validation (both JSON and Markdown reports)
npm run validate

# Generate only JSON reports
npm run validate:json

# Generate only Markdown reports
npm run validate:markdown
```

### Direct Script Execution

```bash
# Run with Node.js directly
node scripts/validate-worldbook.js

# Run with specific format
node scripts/validate-worldbook.js --format json
node scripts/validate-worldbook.js --format markdown
node scripts/validate-worldbook.js --format both
```

## Understanding Reports

### Report Structure

#### JSON Report (`validation-report-latest.json`)

```json
{
  "timestamp": "2025-11-14T06:14:05.706Z",
  "summary": {
    "totalErrors": 0,
    "totalWarnings": 1,
    "totalInfo": 1,
    "hasCircularReferences": false,
    "hasDuplicateUIDs": false
  },
  "statistics": {
    "totalEntries": 0,
    "totalProfessions": 16,
    "totalSharedResources": 7,
    "totalBridgingLore": 5,
    "circularReferences": 0,
    "duplicateUIDs": 0
  },
  "errors": [],
  "warnings": [],
  "info": [],
  "recursionFindings": [],
  "triggerSummary": [],
  "schemaValidation": []
}
```

#### Markdown Report (`validation-report-latest.md`)

Human-readable format with:
- Executive summary with pass/fail status
- Statistics overview
- Detailed error listings with context
- Warning and info messages
- Recursion and circular reference analysis
- Valid profession chain visualization
- Trigger diagnostic results

### Status Indicators

- **✅ PASS**: No critical errors found
- **❌ FAIL**: Critical errors detected
- **⚠️ PASS with warnings**: No critical errors, but warnings present

## Validation Types

### 1. Schema Validation

Validates the basic structure of your worldbook:

**Checks:**
- Root `worldbook` object exists
- Required fields present: `version`, `description`
- Career systems structure is valid
- Shared resources structure is valid

**Example Error:**
```json
{
  "type": "SCHEMA_ERROR",
  "message": "Missing required field: version",
  "field": "version"
}
```

### 2. UID Validation

Ensures all unique identifiers are truly unique:

**Checks:**
- All UIDs are collected from:
  - Shared locations
  - Shared organizations
  - Career system professions
  - Bridging lore interactions
  - Shared quests
- No duplicate UIDs exist

**Example Error:**
```json
{
  "type": "DUPLICATE_UID",
  "message": "Duplicate UID \"acad_student\" found",
  "uid": "acad_student",
  "contexts": [
    "careerSystems.academic.professions",
    "careerSystems.entertainment.professions"
  ]
}
```

### 3. Recursion & Circular Reference Detection

Analyzes profession progression chains for cycles:

**Checks:**
- Follows `nextProfession` chains from each profession
- Detects cycles (A → B → C → A)
- Validates `previousProfession` backward links
- Checks chain consistency

**Example Circular Reference:**
```json
{
  "type": "CIRCULAR_REFERENCE",
  "severity": "CRITICAL",
  "system": "academic",
  "chain": ["acad_student", "acad_undergraduate", "acad_graduate", "acad_student"],
  "message": "Circular reference detected in academic: acad_student -> acad_undergraduate -> acad_graduate -> acad_student"
}
```

**Valid Chain Example:**
```json
{
  "type": "VALID_CHAIN",
  "severity": "INFO",
  "system": "academic",
  "startProfession": "acad_student",
  "chainLength": 8,
  "chain": [
    "acad_student",
    "acad_undergraduate",
    "acad_graduate",
    "acad_researcher",
    "acad_professor",
    "acad_department_head",
    "acad_dean",
    "acad_chancellor"
  ]
}
```

### 4. Cross-Reference Validation

Validates references between professions and resources:

**Checks:**
- Location references point to existing locations
- Organization references point to existing organizations
- Cross-system references point to valid professions
- All referenced UIDs exist in the worldbook

**Example Error:**
```json
{
  "type": "INVALID_REFERENCE",
  "message": "Invalid location reference \"loc_missing\" in profession acad_student",
  "profession": "acad_student",
  "reference": "loc_missing",
  "referenceType": "location"
}
```

### 5. Trigger Validation

Validates SillyTavern lorebook trigger patterns:

**Checks:**
- Regex pattern compilation (if `use_regex` is true)
- Duplicate trigger keywords
- Case sensitivity conflicts
- Activation conflicts

**Example Regex Error:**
```json
{
  "type": "INVALID_REGEX",
  "severity": "ERROR",
  "entry": "entry_123",
  "pattern": "[invalid(regex",
  "error": "Unterminated character class",
  "message": "Invalid regex pattern \"[invalid(regex\": Unterminated character class"
}
```

**Example Duplicate Trigger:**
```json
{
  "type": "DUPLICATE_TRIGGER",
  "severity": "WARNING",
  "trigger": "student",
  "entries": ["acad_student", "ent_apprentice"],
  "message": "Duplicate trigger \"student\" found in multiple entries"
}
```

### 6. Naming Convention Validation

Ensures consistent naming across systems:

**Checks:**
- UIDs follow system prefix conventions
- Required fields present in all professions
- Naming patterns are consistent

**Example Error:**
```json
{
  "type": "NAMING_CONVENTION_VIOLATION",
  "severity": "WARNING",
  "system": "academic",
  "profession": "student_undergrad",
  "expectedPrefix": "acad_",
  "message": "Profession UID \"student_undergrad\" does not follow prefix convention \"acad_\""
}
```

## Fixing Common Issues

### Issue: Circular Reference Detected

**Symptom:**
```
✗ Found 1 circular references
Circular reference detected in academic: acad_professor -> acad_dean -> acad_chancellor -> acad_professor
```

**Solution:**
1. Identify the cycle in your profession chain
2. Remove the `nextProfession` link that creates the cycle
3. Ensure terminal professions (top-level) have no `nextProfession` or set `isTerminal: true`

**Example Fix:**
```json
{
  "acad_chancellor": {
    "uid": "acad_chancellor",
    "name": "Chancellor",
    "level": 8,
    "isTerminal": true
    // NO nextProfession field - this is the end of the chain
  }
}
```

### Issue: Broken Reference

**Symptom:**
```
✗ Invalid nextProfession reference: acad_undergraduate -> acad_phd
```

**Solution:**
1. Verify the referenced UID exists in the worldbook
2. Check for typos in the UID
3. Ensure the referenced profession is in the correct career system

**Example Fix:**
```json
{
  "acad_undergraduate": {
    "uid": "acad_undergraduate",
    "nextProfession": "acad_graduate"  // Fixed: was "acad_phd"
  }
}
```

### Issue: Duplicate UID

**Symptom:**
```
Duplicate UID "acad_student" found in multiple contexts
```

**Solution:**
1. Make all UIDs unique across the entire worldbook
2. Use system prefixes to avoid conflicts
3. Check both professions and shared resources

**Example Fix:**
```json
// Before (conflict)
{
  "academic": {
    "professions": {
      "student": { "uid": "student" }
    }
  },
  "entertainment": {
    "professions": {
      "student": { "uid": "student" }
    }
  }
}

// After (fixed)
{
  "academic": {
    "professions": {
      "acad_student": { "uid": "acad_student" }
    }
  },
  "entertainment": {
    "professions": {
      "ent_apprentice": { "uid": "ent_apprentice" }
    }
  }
}
```

### Issue: Invalid Cross-Reference

**Symptom:**
```
Invalid cross-reference: acad_undergraduate -> ent_technician
```

**Solution:**
1. Verify the target UID exists
2. Remove the reference if the target was deleted
3. Update the reference to point to a valid UID

**Example Fix:**
```json
{
  "acad_undergraduate": {
    "uid": "acad_undergraduate",
    "crossReferences": {
      "entertainment": [
        "ent_performer",  // Fixed: was "ent_technician"
        "ent_technician"  // Remove this line
      ]
    }
  }
}
```

### Issue: Invalid Regex Pattern

**Symptom:**
```
Invalid regex pattern "[invalid(regex": Unterminated character class
```

**Solution:**
1. Test regex patterns before adding them
2. Escape special characters properly
3. Use online regex testers to validate patterns

**Example Fix:**
```json
{
  "entry": {
    "keys": ["student\\[\\d+\\]"],  // Fixed: properly escaped
    "use_regex": true
  }
}
```

## Testing Circular References

### Creating a Test Case

To verify the circular reference detection is working:

1. Create a test worldbook file:

```json
{
  "worldbook": {
    "version": "1.0.0-test",
    "description": "Test circular reference",
    "careerSystems": {
      "test": {
        "prefix": "test_",
        "professions": {
          "test_a": {
            "uid": "test_a",
            "name": "A",
            "level": 1,
            "description": "First",
            "nextProfession": "test_b"
          },
          "test_b": {
            "uid": "test_b",
            "name": "B",
            "level": 2,
            "description": "Second",
            "nextProfession": "test_c"
          },
          "test_c": {
            "uid": "test_c",
            "name": "C",
            "level": 3,
            "description": "Third",
            "nextProfession": "test_a"  // Creates cycle!
          }
        }
      }
    }
  }
}
```

2. Run validation on the test file:

```bash
# Temporarily replace worldbook.json
mv worldbook.json worldbook-backup.json
mv worldbook-test.json worldbook.json
npm run validate
mv worldbook-backup.json worldbook.json
```

3. Expected output:

```
✗ Found 1 circular references
Circular reference detected in test: test_a -> test_b -> test_c -> test_a
❌ Validation FAILED - Critical errors found
```

### Resolving the Test Case

Fix the circular reference:

```json
{
  "test_c": {
    "uid": "test_c",
    "name": "C",
    "level": 3,
    "description": "Third",
    "isTerminal": true  // No nextProfession - end of chain
  }
}
```

Run validation again:

```
✓ No circular references detected
✅ Validation PASSED - No issues found
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Validate Worldbook

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  validate:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Run validation
      run: npm run validate
    
    - name: Upload validation reports
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: validation-reports
        path: reports/
```

### GitLab CI Example

```yaml
validate_worldbook:
  stage: test
  image: node:18
  script:
    - npm install
    - npm run validate
  artifacts:
    when: always
    paths:
      - reports/
    expire_in: 1 week
```

### Exit Codes

The validation script uses standard exit codes:

- **0**: Validation passed (no critical errors)
- **1**: Validation failed (critical errors found)

CI pipelines will automatically fail if the script exits with code 1.

## Advanced Usage

### Programmatic Usage

You can import and use the validation functions in your own scripts:

```javascript
const validator = require('./scripts/validate-worldbook.js');

// Load worldbook
const worldbook = validator.loadWorldbook();

// Run specific validations
const schemaErrors = validator.validateSchema(worldbook);
const uidMap = validator.collectUIDs(worldbook);
const recursionFindings = validator.detectRecursion(worldbook);
const triggerResults = validator.validateTriggers(worldbook);
```

### Custom Validation

Extend the validation script to add your own checks:

```javascript
// Add to validate-worldbook.js
function validateCustomRule(worldbook) {
  const errors = [];
  // Your custom validation logic
  return errors;
}

// Call in main()
const customErrors = validateCustomRule(worldbook);
validationResults.customValidation = customErrors;
```

## Best Practices

1. **Run validation before committing**: Always validate your changes before pushing
2. **Fix errors before warnings**: Address critical errors first
3. **Review reports**: Check the detailed reports for patterns and trends
4. **Test edge cases**: Intentionally create errors to verify detection
5. **Document exceptions**: If a warning is intentional, document why
6. **Automate in CI**: Always run validation in your CI/CD pipeline
7. **Keep reports**: Archive validation reports for audit trails

## Troubleshooting

### Validation Script Won't Run

**Issue**: `npm run validate` fails to start

**Solutions:**
- Ensure Node.js is installed: `node --version`
- Check package.json exists in project root
- Verify script permissions: `chmod +x scripts/validate-worldbook.js`
- Check for syntax errors in the script

### Reports Not Generated

**Issue**: Validation runs but no reports appear

**Solutions:**
- Ensure `reports/` directory exists: `mkdir -p reports`
- Check write permissions: `ls -la reports/`
- Verify disk space: `df -h`
- Check for path issues in the script

### False Positives

**Issue**: Validation reports errors that seem incorrect

**Solutions:**
- Review the exact error message and context
- Check for whitespace or hidden characters
- Verify JSON syntax is valid
- Compare against working examples
- Open an issue if the error is truly incorrect

## Support

For additional help:
- Review the [README.md](README.md) for general information
- Check [CAREER_SYSTEMS_INTEGRATION.md](CAREER_SYSTEMS_INTEGRATION.md) for integration details
- Examine the validation script source code for implementation details

---

**Last Updated**: 2025-11-14
**Version**: 1.0.0

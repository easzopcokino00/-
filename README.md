# Worldbook Career Systems

A comprehensive career progression system for SillyTavern worldbook/lorebook, featuring academic and entertainment career paths with shared resources and cross-system interactions.

## Features

- **Dual Career Systems**: Complete 8-level progression paths for both academic and entertainment professions
- **Shared Resources**: Locations and organizations accessible by both career systems
- **Cross-System Interactions**: Bridging lore enabling collaboration between career paths
- **StatusBar Integration**: Ready-to-use metadata for StatusBar implementations
- **Automated Validation**: Comprehensive validation scripts for schema compliance, recursion detection, and trigger quality

## Project Structure

```
.
├── worldbook.json                       # Main career systems data
├── CAREER_SYSTEMS_INTEGRATION.md        # Detailed integration documentation
├── MERGE_IMPLEMENTATION_SUMMARY.md      # Implementation summary and architecture
├── scripts/
│   └── validate-worldbook.js           # Node.js validation script
├── reports/                            # Generated validation reports
│   ├── validation-report-latest.json   # Latest validation results (JSON)
│   └── validation-report-latest.md     # Latest validation results (Markdown)
├── validate_merge.py                   # Python validation script for merge
└── package.json                        # Node.js project configuration
```

## Quick Start

### Prerequisites

- Node.js (v12 or higher)
- npm

### Installation

No dependencies required! The validation script uses only Node.js built-in modules.

```bash
npm install
```

### Running Validation

Run the complete validation suite:

```bash
npm run validate
```

Generate only JSON reports:

```bash
npm run validate:json
```

Generate only Markdown reports:

```bash
npm run validate:markdown
```

Or run the script directly:

```bash
node scripts/validate-worldbook.js
```

## Validation Features

The `validate-worldbook.js` script performs comprehensive validation of your worldbook data:

### 1. Schema Validation
- Validates required top-level fields (version, description)
- Checks for proper structure of career systems and shared resources
- Ensures all required profession fields are present

### 2. UID Management
- Collects and tracks all unique identifiers (UIDs)
- Detects duplicate UIDs across the worldbook
- Reports conflicting UIDs with their locations

### 3. Recursion & Circular Reference Detection
- Analyzes profession progression chains
- Detects circular references in `nextProfession` paths
- Validates `previousProfession` backward links
- Reports inconsistencies in profession chains
- Tracks parent-child relationships

### 4. Cross-Reference Validation
- Validates location references in professions
- Validates organization references in professions
- Checks cross-system references between academic and entertainment paths
- Ensures all references point to existing UIDs

### 5. Trigger Diagnostics
- Regex pattern compilation testing
- Keyword duplication detection
- Activation conflict identification
- Case sensitivity conflict checking
- (Note: Current worldbook uses custom format without standard SillyTavern triggers)

### 6. Naming Convention Validation
- Ensures UIDs follow system prefix conventions
- Validates consistency across career systems
- Reports naming convention violations

## Validation Reports

The validation script generates detailed reports in the `reports/` directory:

### JSON Reports
- Structured data format for programmatic access
- Complete validation results with timestamps
- Statistics on professions, resources, and errors
- Recursion findings and trigger summaries

### Markdown Reports
- Human-readable format for review
- Summary with pass/fail status
- Detailed breakdown of errors, warnings, and info
- Valid profession chain visualization
- Trigger diagnostic results

### Report Files
- `validation-report-{timestamp}.json` - Timestamped JSON report
- `validation-report-{timestamp}.md` - Timestamped Markdown report
- `validation-report-latest.json` - Latest JSON report (overwritten each run)
- `validation-report-latest.md` - Latest Markdown report (overwritten each run)

## Exit Codes

The validation script exits with appropriate status codes for CI integration:

- **Exit 0**: Validation passed (no critical errors)
- **Exit 1**: Validation failed (critical errors found)

Warnings do not cause the script to fail, but are reported in the output.

## Career Systems

### Academic Career Path
8-level progression from Student to Chancellor:
1. Student
2. Undergraduate Student
3. Graduate Student
4. Researcher
5. Professor
6. Department Head
7. Dean
8. Chancellor

### Entertainment Career Path
8-level progression from Apprentice to Studio Head:
1. Apprentice Performer
2. Performer
3. Featured Performer
4. Principal Performer
5. Director
6. Producer
7. Executive Producer
8. Studio Head

## Shared Resources

### Locations
- University Campus
- Grand Performance Hall
- Central Research Library
- Digital Media Studio

### Organizations
- Arts and Education Council
- Student Union
- Alumni Network

## Integration & Future Development

### StatusBar Integration
The worldbook includes comprehensive StatusBar metadata:
- System-specific progress fields (`acad_progress`, `ent_progress`)
- Status tracking fields (`acad_status`, `ent_status`)
- Level and experience tracking
- Cross-system status indicators
- Integration hooks for custom implementations

### Bridging Lore
Collaborative interactions between career systems:
- Academic-Entertainment collaborations
- Student-Performer exchange programs
- Cross-disciplinary alumni mentorship
- Interdisciplinary quests and productions

## Validation Examples

### Clean Validation (No Errors)
```
Starting worldbook validation...

✓ Worldbook loaded successfully

Validating schema...
✓ Schema validation passed

Collecting UIDs...
✓ Found 28 unique UIDs

Analyzing profession chains and circular references...
✓ No circular references detected

Validating cross-references...
✓ All cross-references are valid

Validating triggers...
✓ Trigger validation passed

Validating naming conventions...
✓ Naming conventions validated

============================================================
VALIDATION SUMMARY
============================================================
Critical Errors: 0
Warnings: 0
Info: 1
Circular References: 0
Duplicate UIDs: 0
============================================================

✅ Validation PASSED - No issues found
```

### Circular Reference Detection
If a circular reference is detected (e.g., Prof A → Prof B → Prof C → Prof A), the validator will:
- Report a CRITICAL error
- Show the complete chain: `acad_professor -> acad_dean -> acad_chancellor -> acad_professor`
- Exit with status code 1
- Generate detailed reports with the cycle highlighted

### Example Test Case
To test the circular reference detection, you can temporarily modify the worldbook:

```json
{
  "acad_chancellor": {
    "uid": "acad_chancellor",
    "nextProfession": "acad_student"  // This creates a cycle!
  }
}
```

The validator will detect this and report:
```
✗ Found 1 circular references
❌ Validation FAILED - Critical errors found
```

## Development & Contribution

### Adding New Professions
1. Follow the naming convention: `{system_prefix}_{profession_name}`
2. Ensure all required fields are present (uid, name, level, description)
3. Properly link with `nextProfession` and `previousProfession`
4. Add appropriate location and organization references
5. Run validation to ensure no conflicts

### Adding Triggers
When adding SillyTavern lorebook entries with triggers:
1. Add an `entries` array to the worldbook structure
2. Include `keys` arrays for trigger words
3. Set `use_regex` if using regex patterns
4. Run validation to check for regex compilation errors and duplicates

### Running Python Validation (Legacy)
The Python validation script validates the merge implementation:

```bash
python3 validate_merge.py
```

## CI/CD Integration

The validation script is designed for CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Validate Worldbook
  run: npm run validate
```

The script will exit with non-zero status on critical failures, failing the CI build.

## Troubleshooting

### Common Issues

**Issue**: Validation reports "Invalid cross-reference"
- **Solution**: Check that all referenced UIDs exist in the worldbook
- **Example**: `acad_undergraduate -> ent_technician` means `ent_technician` is missing

**Issue**: "Circular reference detected"
- **Solution**: Review profession chains to ensure no cycles
- **Check**: Verify `nextProfession` and `previousProfession` links

**Issue**: "Duplicate UID"
- **Solution**: Ensure all UIDs are unique across the entire worldbook
- **Check**: Look at the reported contexts to find the duplicates

**Issue**: "Invalid regex pattern"
- **Solution**: Test regex patterns in a regex tester before adding to worldbook
- **Fix**: Update the pattern or set `use_regex` to false

## Documentation

- [CAREER_SYSTEMS_INTEGRATION.md](CAREER_SYSTEMS_INTEGRATION.md) - Detailed integration guide
- [MERGE_IMPLEMENTATION_SUMMARY.md](MERGE_IMPLEMENTATION_SUMMARY.md) - Implementation summary
- [VALIDATION_GUIDE.md](VALIDATION_GUIDE.md) - In-depth validation reference
- [worldbook.json](worldbook.json) - Main data file

## License

MIT

## Support

For issues, questions, or contributions, please refer to the project repository.

---

**Last Updated**: 2025-11-14
**Version**: 1.0.0

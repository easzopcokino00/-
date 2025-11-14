#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const WORLDBOOK_PATH = path.join(__dirname, '..', 'worldbook.json');
const REPORTS_DIR = path.join(__dirname, '..', 'reports');

// Validation results
const validationResults = {
  timestamp: new Date().toISOString(),
  criticalErrors: [],
  warnings: [],
  info: [],
  recursionFindings: [],
  triggerSummary: [],
  schemaValidation: [],
  statistics: {
    totalEntries: 0,
    totalProfessions: 0,
    totalSharedResources: 0,
    totalBridgingLore: 0,
    circularReferences: 0,
    duplicateUIDs: 0
  }
};

/**
 * Load worldbook JSON file
 */
function loadWorldbook() {
  try {
    const data = fs.readFileSync(WORLDBOOK_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    validationResults.criticalErrors.push({
      type: 'FILE_LOAD_ERROR',
      message: `Failed to load worldbook.json: ${error.message}`,
      file: WORLDBOOK_PATH
    });
    return null;
  }
}

/**
 * Validate basic schema structure
 */
function validateSchema(worldbook) {
  const errors = [];
  
  if (!worldbook) {
    errors.push({ type: 'SCHEMA_ERROR', message: 'Worldbook is null or undefined' });
    return errors;
  }

  if (!worldbook.worldbook) {
    errors.push({ type: 'SCHEMA_ERROR', message: 'Missing root "worldbook" object' });
    return errors;
  }

  const wb = worldbook.worldbook;

  // Check required top-level fields
  const requiredFields = ['version', 'description'];
  requiredFields.forEach(field => {
    if (!wb[field]) {
      errors.push({
        type: 'SCHEMA_ERROR',
        message: `Missing required field: ${field}`,
        field
      });
    }
  });

  // Check career systems
  if (!wb.careerSystems) {
    errors.push({ type: 'SCHEMA_ERROR', message: 'Missing careerSystems object' });
  }

  // Check shared resources
  if (!wb.sharedResources) {
    validationResults.warnings.push({
      type: 'SCHEMA_WARNING',
      message: 'Missing sharedResources object'
    });
  }

  return errors;
}

/**
 * Collect all UIDs from the worldbook
 */
function collectUIDs(worldbook) {
  const uidMap = new Map();
  const wb = worldbook.worldbook;

  // Collect shared resource UIDs
  if (wb.sharedResources) {
    if (wb.sharedResources.locations) {
      Object.values(wb.sharedResources.locations).forEach(loc => {
        if (loc.uid) {
          registerUID(uidMap, loc.uid, 'sharedResources.locations', loc.name);
        }
      });
    }

    if (wb.sharedResources.organizations) {
      Object.values(wb.sharedResources.organizations).forEach(org => {
        if (org.uid) {
          registerUID(uidMap, org.uid, 'sharedResources.organizations', org.name);
        }
      });
    }
  }

  // Collect career system UIDs
  if (wb.careerSystems) {
    Object.entries(wb.careerSystems).forEach(([systemName, system]) => {
      if (system.professions) {
        Object.values(system.professions).forEach(profession => {
          if (profession.uid) {
            registerUID(uidMap, profession.uid, `careerSystems.${systemName}.professions`, profession.name);
          }
        });
      }
    });
  }

  // Collect bridging lore UIDs
  if (wb.bridgingLore) {
    if (wb.bridgingLore.interactions) {
      wb.bridgingLore.interactions.forEach(interaction => {
        if (interaction.uid) {
          registerUID(uidMap, interaction.uid, 'bridgingLore.interactions', interaction.name);
        }
      });
    }

    if (wb.bridgingLore.sharedQuests) {
      wb.bridgingLore.sharedQuests.forEach(quest => {
        if (quest.uid) {
          registerUID(uidMap, quest.uid, 'bridgingLore.sharedQuests', quest.name);
        }
      });
    }
  }

  return uidMap;
}

/**
 * Register a UID and check for duplicates
 */
function registerUID(uidMap, uid, context, name) {
  if (uidMap.has(uid)) {
    const existing = uidMap.get(uid);
    validationResults.criticalErrors.push({
      type: 'DUPLICATE_UID',
      message: `Duplicate UID "${uid}" found`,
      uid,
      contexts: [existing.context, context],
      names: [existing.name, name]
    });
    validationResults.statistics.duplicateUIDs++;
  } else {
    uidMap.set(uid, { context, name });
  }
}

/**
 * Detect recursion and circular references in profession chains
 */
function detectRecursion(worldbook) {
  const wb = worldbook.worldbook;
  const findings = [];

  if (!wb.careerSystems) return findings;

  Object.entries(wb.careerSystems).forEach(([systemName, system]) => {
    if (!system.professions) return;

    const professions = system.professions;
    
    // Track profession chains for each starting profession
    Object.entries(professions).forEach(([profKey, profession]) => {
      const chain = [profession.uid];
      const visited = new Set([profession.uid]);
      let current = profession;
      let circularFound = false;

      // Follow nextProfession chain
      while (current.nextProfession && !circularFound) {
        const nextUID = current.nextProfession;
        
        if (visited.has(nextUID)) {
          // Circular reference detected
          findings.push({
            type: 'CIRCULAR_REFERENCE',
            severity: 'CRITICAL',
            system: systemName,
            chain: [...chain, nextUID],
            message: `Circular reference detected in ${systemName}: ${chain.join(' -> ')} -> ${nextUID}`
          });
          validationResults.criticalErrors.push({
            type: 'CIRCULAR_REFERENCE',
            message: `Circular reference in ${systemName} career path`,
            chain: [...chain, nextUID]
          });
          validationResults.statistics.circularReferences++;
          circularFound = true;
          break;
        }

        visited.add(nextUID);
        chain.push(nextUID);

        // Find next profession
        const nextProf = Object.values(professions).find(p => p.uid === nextUID);
        if (!nextProf) {
          findings.push({
            type: 'BROKEN_REFERENCE',
            severity: 'ERROR',
            system: systemName,
            from: current.uid,
            to: nextUID,
            message: `nextProfession reference "${nextUID}" not found in ${systemName}`
          });
          validationResults.criticalErrors.push({
            type: 'BROKEN_REFERENCE',
            message: `Invalid nextProfession reference: ${current.uid} -> ${nextUID}`,
            system: systemName
          });
          break;
        }

        current = nextProf;
      }

      // Validate previousProfession backward link
      if (profession.requirements && profession.requirements.previousProfession) {
        const prevUID = profession.requirements.previousProfession;
        const prevProf = Object.values(professions).find(p => p.uid === prevUID);
        
        if (!prevProf) {
          findings.push({
            type: 'BROKEN_REFERENCE',
            severity: 'ERROR',
            system: systemName,
            from: profession.uid,
            to: prevUID,
            message: `previousProfession reference "${prevUID}" not found in ${systemName}`
          });
          validationResults.criticalErrors.push({
            type: 'BROKEN_REFERENCE',
            message: `Invalid previousProfession reference: ${profession.uid} -> ${prevUID}`,
            system: systemName
          });
        } else if (prevProf.nextProfession !== profession.uid) {
          findings.push({
            type: 'INCONSISTENT_CHAIN',
            severity: 'WARNING',
            system: systemName,
            profession: profession.uid,
            message: `previousProfession chain inconsistency: ${prevUID}.nextProfession should be ${profession.uid}`
          });
          validationResults.warnings.push({
            type: 'INCONSISTENT_CHAIN',
            message: `Chain inconsistency between ${prevUID} and ${profession.uid}`,
            system: systemName
          });
        }
      }

      // Record successful chain
      if (!circularFound && chain.length > 1) {
        findings.push({
          type: 'VALID_CHAIN',
          severity: 'INFO',
          system: systemName,
          startProfession: profession.uid,
          chainLength: chain.length,
          chain: chain
        });
      }
    });
  });

  return findings;
}

/**
 * Validate cross-references between systems
 */
function validateCrossReferences(worldbook, uidMap) {
  const wb = worldbook.worldbook;
  const errors = [];

  if (!wb.careerSystems) return errors;

  Object.entries(wb.careerSystems).forEach(([systemName, system]) => {
    if (!system.professions) return;

    Object.values(system.professions).forEach(profession => {
      // Check location references
      if (profession.locations) {
        profession.locations.forEach(locUID => {
          if (!uidMap.has(locUID)) {
            errors.push({
              type: 'INVALID_REFERENCE',
              message: `Invalid location reference "${locUID}" in profession ${profession.uid}`,
              profession: profession.uid,
              reference: locUID,
              referenceType: 'location'
            });
            validationResults.criticalErrors.push({
              type: 'INVALID_REFERENCE',
              message: `Invalid location reference: ${profession.uid} -> ${locUID}`
            });
          }
        });
      }

      // Check organization references
      if (profession.organizations) {
        profession.organizations.forEach(orgUID => {
          if (!uidMap.has(orgUID)) {
            errors.push({
              type: 'INVALID_REFERENCE',
              message: `Invalid organization reference "${orgUID}" in profession ${profession.uid}`,
              profession: profession.uid,
              reference: orgUID,
              referenceType: 'organization'
            });
            validationResults.criticalErrors.push({
              type: 'INVALID_REFERENCE',
              message: `Invalid organization reference: ${profession.uid} -> ${orgUID}`
            });
          }
        });
      }

      // Check cross-system references
      if (profession.crossReferences) {
        Object.entries(profession.crossReferences).forEach(([targetSystem, refs]) => {
          refs.forEach(refUID => {
            if (!uidMap.has(refUID)) {
              errors.push({
                type: 'INVALID_CROSS_REFERENCE',
                message: `Invalid cross-system reference "${refUID}" in profession ${profession.uid}`,
                profession: profession.uid,
                reference: refUID,
                targetSystem
              });
              validationResults.warnings.push({
                type: 'INVALID_CROSS_REFERENCE',
                message: `Invalid cross-reference: ${profession.uid} -> ${refUID}`
              });
            }
          });
        });
      }
    });
  });

  return errors;
}

/**
 * Validate triggers (regex compilation, keyword duplication, activation conflicts)
 */
function validateTriggers(worldbook) {
  const triggerResults = [];
  const wb = worldbook.worldbook;

  // Check if entries/triggers exist (SillyTavern format)
  if (wb.entries && Array.isArray(wb.entries)) {
    const seenTriggers = new Map();

    wb.entries.forEach((entry, index) => {
      const entryId = entry.uid || entry.id || `entry_${index}`;

      // Validate keys/triggers
      if (entry.keys && Array.isArray(entry.keys)) {
        entry.keys.forEach(key => {
          // Check for duplicate triggers
          if (seenTriggers.has(key.toLowerCase())) {
            triggerResults.push({
              type: 'DUPLICATE_TRIGGER',
              severity: 'WARNING',
              trigger: key,
              entries: [seenTriggers.get(key.toLowerCase()), entryId],
              message: `Duplicate trigger "${key}" found in multiple entries`
            });
            validationResults.warnings.push({
              type: 'DUPLICATE_TRIGGER',
              message: `Duplicate trigger: "${key}"`,
              entries: [seenTriggers.get(key.toLowerCase()), entryId]
            });
          } else {
            seenTriggers.set(key.toLowerCase(), entryId);
          }
        });
      }

      // Validate secondary keys
      if (entry.secondary_keys && Array.isArray(entry.secondary_keys)) {
        entry.secondary_keys.forEach(key => {
          if (seenTriggers.has(key.toLowerCase())) {
            triggerResults.push({
              type: 'DUPLICATE_SECONDARY_TRIGGER',
              severity: 'INFO',
              trigger: key,
              entries: [seenTriggers.get(key.toLowerCase()), entryId],
              message: `Duplicate secondary trigger "${key}" found`
            });
          }
        });
      }

      // Validate regex if present
      if (entry.use_regex && entry.keys) {
        entry.keys.forEach(pattern => {
          try {
            new RegExp(pattern);
            triggerResults.push({
              type: 'VALID_REGEX',
              severity: 'INFO',
              entry: entryId,
              pattern,
              message: `Valid regex pattern: ${pattern}`
            });
          } catch (error) {
            triggerResults.push({
              type: 'INVALID_REGEX',
              severity: 'ERROR',
              entry: entryId,
              pattern,
              error: error.message,
              message: `Invalid regex pattern "${pattern}": ${error.message}`
            });
            validationResults.criticalErrors.push({
              type: 'INVALID_REGEX',
              message: `Invalid regex in entry ${entryId}: ${pattern}`,
              error: error.message
            });
          }
        });
      }

      // Check for activation conflicts (case sensitivity)
      if (entry.case_sensitive === false && entry.keys) {
        entry.keys.forEach(key => {
          const normalized = key.toLowerCase();
          // Check if there's already a case-sensitive version
          const existing = Array.from(seenTriggers.entries()).find(
            ([k, _]) => k === normalized
          );
          if (existing) {
            triggerResults.push({
              type: 'CASE_SENSITIVITY_CONFLICT',
              severity: 'WARNING',
              trigger: key,
              message: `Potential case sensitivity conflict with trigger "${key}"`
            });
          }
        });
      }
    });

    validationResults.info.push({
      type: 'TRIGGER_SCAN_COMPLETE',
      message: `Scanned ${wb.entries.length} entries for trigger issues`,
      uniqueTriggers: seenTriggers.size
    });
  } else {
    // No standard lorebook entries found
    validationResults.info.push({
      type: 'NO_TRIGGERS_FOUND',
      message: 'No standard SillyTavern lorebook entries found in worldbook. This may be a custom format.'
    });
  }

  return triggerResults;
}

/**
 * Validate naming conventions and consistency
 */
function validateNamingConventions(worldbook) {
  const wb = worldbook.worldbook;
  const issues = [];

  if (!wb.careerSystems) return issues;

  Object.entries(wb.careerSystems).forEach(([systemName, system]) => {
    const expectedPrefix = system.prefix;

    if (!system.professions) return;

    Object.values(system.professions).forEach(profession => {
      // Check if UID follows prefix convention
      if (expectedPrefix && !profession.uid.startsWith(expectedPrefix)) {
        issues.push({
          type: 'NAMING_CONVENTION_VIOLATION',
          severity: 'WARNING',
          system: systemName,
          profession: profession.uid,
          expectedPrefix,
          message: `Profession UID "${profession.uid}" does not follow prefix convention "${expectedPrefix}"`
        });
        validationResults.warnings.push({
          type: 'NAMING_CONVENTION',
          message: `UID ${profession.uid} doesn't follow convention ${expectedPrefix}`,
          system: systemName
        });
      }

      // Check for required fields
      const requiredFields = ['uid', 'name', 'level', 'description'];
      requiredFields.forEach(field => {
        if (!profession[field]) {
          issues.push({
            type: 'MISSING_FIELD',
            severity: 'ERROR',
            system: systemName,
            profession: profession.uid,
            field,
            message: `Missing required field "${field}" in profession ${profession.uid}`
          });
          validationResults.criticalErrors.push({
            type: 'MISSING_FIELD',
            message: `Missing ${field} in profession ${profession.uid}`,
            system: systemName
          });
        }
      });
    });
  });

  return issues;
}

/**
 * Calculate statistics
 */
function calculateStatistics(worldbook) {
  const wb = worldbook.worldbook;

  if (wb.careerSystems) {
    Object.values(wb.careerSystems).forEach(system => {
      if (system.professions) {
        validationResults.statistics.totalProfessions += Object.keys(system.professions).length;
      }
    });
  }

  if (wb.sharedResources) {
    if (wb.sharedResources.locations) {
      validationResults.statistics.totalSharedResources += Object.keys(wb.sharedResources.locations).length;
    }
    if (wb.sharedResources.organizations) {
      validationResults.statistics.totalSharedResources += Object.keys(wb.sharedResources.organizations).length;
    }
  }

  if (wb.bridgingLore) {
    if (wb.bridgingLore.interactions) {
      validationResults.statistics.totalBridgingLore += wb.bridgingLore.interactions.length;
    }
    if (wb.bridgingLore.sharedQuests) {
      validationResults.statistics.totalBridgingLore += wb.bridgingLore.sharedQuests.length;
    }
  }

  if (wb.entries) {
    validationResults.statistics.totalEntries = wb.entries.length;
  }
}

/**
 * Generate JSON report
 */
function generateJSONReport() {
  const report = {
    timestamp: validationResults.timestamp,
    summary: {
      totalErrors: validationResults.criticalErrors.length,
      totalWarnings: validationResults.warnings.length,
      totalInfo: validationResults.info.length,
      hasCircularReferences: validationResults.statistics.circularReferences > 0,
      hasDuplicateUIDs: validationResults.statistics.duplicateUIDs > 0
    },
    statistics: validationResults.statistics,
    errors: validationResults.criticalErrors,
    warnings: validationResults.warnings,
    info: validationResults.info,
    recursionFindings: validationResults.recursionFindings,
    triggerSummary: validationResults.triggerSummary,
    schemaValidation: validationResults.schemaValidation
  };

  const outputPath = path.join(REPORTS_DIR, `validation-report-${Date.now()}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`JSON report written to: ${outputPath}`);
  
  // Also write latest report
  const latestPath = path.join(REPORTS_DIR, 'validation-report-latest.json');
  fs.writeFileSync(latestPath, JSON.stringify(report, null, 2));
  console.log(`Latest report written to: ${latestPath}`);
}

/**
 * Generate Markdown report
 */
function generateMarkdownReport() {
  const lines = [];
  
  lines.push('# Worldbook Validation Report\n');
  lines.push(`**Generated:** ${validationResults.timestamp}\n`);
  lines.push('---\n');

  // Summary
  lines.push('## Summary\n');
  lines.push(`- **Total Errors:** ${validationResults.criticalErrors.length}`);
  lines.push(`- **Total Warnings:** ${validationResults.warnings.length}`);
  lines.push(`- **Total Info:** ${validationResults.info.length}`);
  lines.push(`- **Status:** ${validationResults.criticalErrors.length === 0 ? '✅ PASS' : '❌ FAIL'}\n`);

  // Statistics
  lines.push('## Statistics\n');
  lines.push(`- **Total Professions:** ${validationResults.statistics.totalProfessions}`);
  lines.push(`- **Total Shared Resources:** ${validationResults.statistics.totalSharedResources}`);
  lines.push(`- **Total Bridging Lore:** ${validationResults.statistics.totalBridgingLore}`);
  lines.push(`- **Total Entries:** ${validationResults.statistics.totalEntries}`);
  lines.push(`- **Circular References:** ${validationResults.statistics.circularReferences}`);
  lines.push(`- **Duplicate UIDs:** ${validationResults.statistics.duplicateUIDs}\n`);

  // Critical Errors
  if (validationResults.criticalErrors.length > 0) {
    lines.push('## Critical Errors\n');
    validationResults.criticalErrors.forEach((error, index) => {
      lines.push(`### Error ${index + 1}: ${error.type}\n`);
      lines.push(`**Message:** ${error.message}\n`);
      if (error.chain) {
        lines.push(`**Chain:** ${error.chain.join(' -> ')}\n`);
      }
      if (error.system) {
        lines.push(`**System:** ${error.system}\n`);
      }
    });
  } else {
    lines.push('## Critical Errors\n');
    lines.push('✅ No critical errors found.\n');
  }

  // Warnings
  if (validationResults.warnings.length > 0) {
    lines.push('## Warnings\n');
    validationResults.warnings.forEach((warning, index) => {
      lines.push(`${index + 1}. **${warning.type}:** ${warning.message}`);
    });
    lines.push('');
  }

  // Recursion Findings
  if (validationResults.recursionFindings.length > 0) {
    lines.push('## Recursion & Circular Reference Analysis\n');
    
    const criticalFindings = validationResults.recursionFindings.filter(f => f.severity === 'CRITICAL');
    const errorFindings = validationResults.recursionFindings.filter(f => f.severity === 'ERROR');
    const validChains = validationResults.recursionFindings.filter(f => f.type === 'VALID_CHAIN');

    if (criticalFindings.length > 0) {
      lines.push('### Circular References (CRITICAL)\n');
      criticalFindings.forEach(finding => {
        lines.push(`- **${finding.system}:** ${finding.message}`);
        if (finding.chain) {
          lines.push(`  - Chain: ${finding.chain.join(' → ')}`);
        }
      });
      lines.push('');
    }

    if (errorFindings.length > 0) {
      lines.push('### Broken References\n');
      errorFindings.forEach(finding => {
        lines.push(`- ${finding.message}`);
      });
      lines.push('');
    }

    if (validChains.length > 0) {
      lines.push('### Valid Profession Chains\n');
      validChains.forEach(finding => {
        lines.push(`- **${finding.system}** (${finding.chainLength} professions): ${finding.chain[0]} → ... → ${finding.chain[finding.chain.length - 1]}`);
      });
      lines.push('');
    }
  }

  // Trigger Summary
  if (validationResults.triggerSummary.length > 0) {
    lines.push('## Trigger Diagnostics\n');
    
    const duplicates = validationResults.triggerSummary.filter(t => t.type.includes('DUPLICATE'));
    const regexErrors = validationResults.triggerSummary.filter(t => t.type === 'INVALID_REGEX');
    const conflicts = validationResults.triggerSummary.filter(t => t.type.includes('CONFLICT'));

    if (duplicates.length > 0) {
      lines.push('### Duplicate Triggers\n');
      duplicates.forEach(dup => {
        lines.push(`- "${dup.trigger}" found in entries: ${dup.entries.join(', ')}`);
      });
      lines.push('');
    }

    if (regexErrors.length > 0) {
      lines.push('### Invalid Regex Patterns\n');
      regexErrors.forEach(err => {
        lines.push(`- Entry ${err.entry}: "${err.pattern}" - ${err.error}`);
      });
      lines.push('');
    }

    if (conflicts.length > 0) {
      lines.push('### Activation Conflicts\n');
      conflicts.forEach(conf => {
        lines.push(`- ${conf.message}`);
      });
      lines.push('');
    }
  }

  // Info messages
  if (validationResults.info.length > 0) {
    lines.push('## Additional Information\n');
    validationResults.info.forEach(info => {
      lines.push(`- ${info.message}`);
    });
    lines.push('');
  }

  lines.push('---\n');
  lines.push('*Report generated by validate-worldbook.js*\n');

  const outputPath = path.join(REPORTS_DIR, `validation-report-${Date.now()}.md`);
  fs.writeFileSync(outputPath, lines.join('\n'));
  console.log(`Markdown report written to: ${outputPath}`);

  // Also write latest report
  const latestPath = path.join(REPORTS_DIR, 'validation-report-latest.md');
  fs.writeFileSync(latestPath, lines.join('\n'));
  console.log(`Latest report written to: ${latestPath}`);
}

/**
 * Main validation function
 */
function main() {
  console.log('Starting worldbook validation...\n');

  // Ensure reports directory exists
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  // Parse command line arguments
  const args = process.argv.slice(2);
  let format = 'both';
  const validFormats = new Set(['json', 'markdown', 'both']);
  const formatIndex = args.indexOf('--format');
  if (formatIndex !== -1) {
    const potential = (args[formatIndex + 1] || '').toLowerCase();
    if (validFormats.has(potential)) {
      format = potential;
    } else {
      validationResults.warnings.push({
        type: 'INVALID_ARGUMENT',
        message: `Unrecognized or missing format value "${potential}". Using default "both".`
      });
      console.warn('⚠️  Unrecognized --format value. Defaulting to "both".');
    }
  }

  // Load worldbook
  const worldbook = loadWorldbook();
  if (!worldbook) {
    console.error('Failed to load worldbook. Exiting...');
    generateJSONReport();
    generateMarkdownReport();
    process.exit(1);
  }

  console.log('✓ Worldbook loaded successfully\n');

  // Validate schema
  console.log('Validating schema...');
  const schemaErrors = validateSchema(worldbook);
  validationResults.schemaValidation = schemaErrors;
  if (schemaErrors.length > 0) {
    validationResults.criticalErrors.push(...schemaErrors);
    console.log(`✗ Found ${schemaErrors.length} schema errors`);
  } else {
    console.log('✓ Schema validation passed');
  }

  // Collect UIDs
  console.log('\nCollecting UIDs...');
  const uidMap = collectUIDs(worldbook);
  console.log(`✓ Found ${uidMap.size} unique UIDs`);

  // Detect recursion and circular references
  console.log('\nAnalyzing profession chains and circular references...');
  const recursionFindings = detectRecursion(worldbook);
  validationResults.recursionFindings = recursionFindings;
  const circularRefs = recursionFindings.filter(f => f.type === 'CIRCULAR_REFERENCE');
  if (circularRefs.length > 0) {
    console.log(`✗ Found ${circularRefs.length} circular references`);
  } else {
    console.log('✓ No circular references detected');
  }

  // Validate cross-references
  console.log('\nValidating cross-references...');
  const crossRefErrors = validateCrossReferences(worldbook, uidMap);
  const criticalReferenceErrors = crossRefErrors.filter(e => e.type === 'INVALID_REFERENCE');
  const crossReferenceWarnings = crossRefErrors.filter(e => e.type === 'INVALID_CROSS_REFERENCE');
  if (criticalReferenceErrors.length > 0) {
    console.log(`✗ Found ${criticalReferenceErrors.length} invalid reference errors`);
  }
  if (crossReferenceWarnings.length > 0) {
    console.log(`⚠️  Found ${crossReferenceWarnings.length} cross-reference warnings`);
  }
  if (crossRefErrors.length === 0) {
    console.log('✓ All cross-references are valid');
  }

  // Validate triggers
  console.log('\nValidating triggers...');
  const triggerResults = validateTriggers(worldbook);
  validationResults.triggerSummary = triggerResults;
  const triggerErrors = triggerResults.filter(t => t.severity === 'ERROR');
  if (triggerErrors.length > 0) {
    console.log(`✗ Found ${triggerErrors.length} trigger errors`);
  } else {
    console.log('✓ Trigger validation passed');
  }

  // Validate naming conventions
  console.log('\nValidating naming conventions...');
  const namingIssues = validateNamingConventions(worldbook);
  const namingErrors = namingIssues.filter(i => i.severity === 'ERROR');
  if (namingErrors.length > 0) {
    console.log(`✗ Found ${namingErrors.length} naming convention errors`);
  } else {
    console.log('✓ Naming conventions validated');
  }

  // Calculate statistics
  calculateStatistics(worldbook);

  // Generate reports
  console.log('\nGenerating reports...');
  if (format === 'json' || format === 'both') {
    generateJSONReport();
  }
  if (format === 'markdown' || format === 'both') {
    generateMarkdownReport();
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Critical Errors: ${validationResults.criticalErrors.length}`);
  console.log(`Warnings: ${validationResults.warnings.length}`);
  console.log(`Info: ${validationResults.info.length}`);
  console.log(`Circular References: ${validationResults.statistics.circularReferences}`);
  console.log(`Duplicate UIDs: ${validationResults.statistics.duplicateUIDs}`);
  console.log('='.repeat(60));

  // Exit with appropriate code
  if (validationResults.criticalErrors.length > 0) {
    console.log('\n❌ Validation FAILED - Critical errors found');
    process.exit(1);
  } else if (validationResults.warnings.length > 0) {
    console.log('\n⚠️  Validation PASSED with warnings');
    process.exit(0);
  } else {
    console.log('\n✅ Validation PASSED - No issues found');
    process.exit(0);
  }
}

// Run the validation
if (require.main === module) {
  main();
}

module.exports = {
  loadWorldbook,
  validateSchema,
  collectUIDs,
  detectRecursion,
  validateCrossReferences,
  validateTriggers,
  validateNamingConventions
};

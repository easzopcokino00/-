# Worldbook Documentation

## Overview

The Worldbook is a comprehensive data structure that defines career systems, professions, and their interactions within an integrated world. It supports two main career systems: Academic and Entertainment, each with complete progression paths and shared resources.

## Table of Contents

1. [Structure](#structure)
2. [Data Conventions](#data-conventions)
3. [Trigger Strategy](#trigger-strategy)
4. [Validation Workflow](#validation-workflow)
5. [Career Systems](#career-systems)
6. [Shared Resources](#shared-resources)
7. [Bridging Lore](#bridging-lore)
8. [StatusBar Integration](#statusbar-integration)
9. [Scripts and Tools](#scripts-and-tools)

## Structure

The worldbook is organized into several main sections:

### Root Level Structure
```
worldbook
├── version                  # Semantic version (e.g., "1.0.0")
├── lastUpdated             # ISO date of last update
├── description             # Overview of worldbook content
├── sharedResources         # Common locations and organizations
├── careerSystems           # Academic and Entertainment systems
├── bridgingLore            # Cross-system interactions
├── statusBarIntegration    # StatusBar configuration
└── validation              # Conflict detection results
```

### Shared Resources

Shared resources are accessible by both career systems, promoting collaboration while reducing data duplication.

#### Locations
| Name | UID | Type | Systems |
|------|-----|------|---------|
| University Campus | `loc_university_campus` | Educational | Academic, Entertainment |
| Grand Performance Hall | `loc_performance_hall` | Entertainment | Academic, Entertainment |
| Central Research Library | `loc_research_library` | Educational | Academic, Entertainment |
| Digital Media Studio | `loc_media_studio` | Production | Academic, Entertainment |

#### Organizations
| Name | UID | Type | Systems |
|------|-----|------|---------|
| Arts and Education Council | `org_arts_council` | Governing | Academic, Entertainment |
| Student Union | `org_student_union` | Student | Academic, Entertainment |
| Alumni Network | `org_alumni_network` | Professional | Academic, Entertainment |

## Data Conventions

### Naming Strategy

To prevent conflicts between the two career systems, a clear prefix-based naming convention is implemented:

- **Academic System**: `acad_` prefix (e.g., `acad_professor`)
- **Entertainment System**: `ent_` prefix (e.g., `ent_director`)
- **Shared Resources**: Distinct prefixes
  - Locations: `loc_` (e.g., `loc_university_campus`)
  - Organizations: `org_` (e.g., `org_arts_council`)
  - Bridging: `bridge_` (e.g., `bridge_acad_ent_collaboration`)

### UID Management

Every entity has a unique identifier (UID):
- UIDs are immutable references used throughout the system
- Prefixes make the system origin immediately identifiable
- Allows for efficient lookups and conflict detection
- Example: `acad_student`, `ent_performer`, `loc_media_studio`

### Profession Structure

Each profession defines:
- **uid**: Unique identifier
- **name**: Human-readable name
- **level**: Integer representing progression level (1-8)
- **description**: Brief overview of the profession
- **requirements**: Conditions needed to enter the profession
- **skills**: Array of skills associated with the profession
- **nextProfession**: UID of the next level (if not terminal)
- **locations**: Array of location UIDs accessible to this profession
- **organizations**: Array of organization UIDs this profession interacts with
- **crossReferences**: Optional references to other system professions
- **isTerminal**: Boolean indicating if this is the end of a path

## Trigger Strategy

### Profession Transitions

Progression through professions is controlled by requirements:

1. **Linear Progression**: Most professions require completion of the previous level
   - Example: Student → Undergraduate → Graduate → Researcher → Professor

2. **Skill-Based Advancement**: Some professions require specific achievements
   - Publications count, performance count, leadership experience, etc.

3. **Status Flags**: Professions maintain status to track current state
   - Academic: `active`, `sabbatical`, `emeritus`, `suspended`, `graduated`
   - Entertainment: `active`, `on_tour`, `retired`, `between_projects`, `contracted`

### Cross-System Interactions

Bridging lore defines collaborative scenarios:
- **Academic-Entertainment Collaboration**: Joint research and performance projects
- **Student-Performer Exchange**: Cross-disciplinary participation
- **Alumni Mentorship**: Senior-level guidance across systems

### StatusBar Triggers

StatusBar progression is tied to:
- Profession level advancements (system-specific fields)
- Shared resource interactions (cross-system tracking)
- Bridging quest completions (collaborative achievements)

## Validation Workflow

### Validation Script

Run the validation script to verify the worldbook integrity:

```bash
python3 validate_merge.py
```

### What Gets Validated

1. **UID Conflicts**: No duplicate identifiers across the entire worldbook
2. **Naming Conflicts**: No name collisions between professions
3. **Contradictory Lore**: No logically inconsistent statements
4. **Shared Resource Integrity**: All locations/organizations properly referenced
5. **Cross-Reference Consistency**: Bidirectional relationships are valid
6. **StatusBar Alignment**: All StatusBar fields are properly configured

### Validation Results

The validation section in `worldbook.json` contains:
```json
"validation": {
  "uidConflicts": [],              // Empty if no conflicts
  "namingConflicts": [],           // Empty if no conflicts
  "contradictoryLore": [],         // Empty if no contradictions
  "sharedResourceIntegrity": "verified",
  "crossReferenceConsistency": "verified",
  "statusBarAlignment": "ready"
}
```

## Career Systems

### Academic System

**Progression Path**: Student → Undergraduate → Graduate → Researcher → Professor → Department Head → Dean → Chancellor

**Key Features**:
- Focus on education, research, and institutional advancement
- 8-level progression structure
- Status flags track academic status (active, sabbatical, emeritus, etc.)
- StatusBar fields: `acad_progress`, `acad_status`, `acad_level`, `acad_experience`

**Professions**:
1. **Student** (Level 1): Beginning academic journey, req: high school education
2. **Undergraduate** (Level 2): Bachelor's degree pursuit, req: 30 credits
3. **Graduate** (Level 3): Advanced study, req: bachelor's degree
4. **Researcher** (Level 4): Independent research, req: 2 publications
5. **Professor** (Level 5): Teaching and mentoring, req: PhD degree
6. **Department Head** (Level 6): Leadership role, req: 5 years experience
7. **Dean** (Level 7): Faculty leadership, req: 3 years administration
8. **Chancellor** (Level 8): Highest authority (terminal)

### Entertainment System

**Progression Path**: Apprentice → Performer → Featured Performer → Principal Performer → Director → Producer → Executive Producer → Studio Head

**Key Features**:
- Focus on performance, production, and entertainment leadership
- 8-level progression structure
- Status flags track performance engagement (active, on_tour, retired, etc.)
- StatusBar fields: `ent_progress`, `ent_status`, `ent_level`, `ent_experience`

**Professions**:
1. **Apprentice Performer** (Level 1): Beginning entertainment, req: audition
2. **Performer** (Level 2): Regular performances, req: 10 performances
3. **Featured Performer** (Level 3): Principal roles, req: 3 lead roles
4. **Principal Performer** (Level 4): Lead in major productions, req: 5 productions
5. **Director** (Level 5): Creative direction, req: 2 years leadership
6. **Producer** (Level 6): Production management, req: 3 productions managed
7. **Executive Producer** (Level 7): Multiple productions, req: 10 successful productions
8. **Studio Head** (Level 8): Organization leadership (terminal)

## Shared Resources

### Locations

All shared locations are accessible by both career systems:

- **University Campus**: Main hub with both academic facilities and entertainment venues
- **Performance Hall**: Primary venue for performances, lectures, and ceremonies
- **Research Library**: Extensive resources for educational and artistic research
- **Media Studio**: Recording and production facilities for content creation

### Organizations

Joint organizations facilitate collaboration:

- **Arts and Education Council**: Governing body for both systems
- **Student Union**: Student representation across disciplines
- **Alumni Network**: Professional connections for graduates

## Bridging Lore

Bridging lore defines how the two career systems interact:

### Collaborative Interactions

1. **Academic-Entertainment Collaboration**
   - Joint projects between researchers and entertainment professionals
   - Participants: `acad_researcher`, `acad_professor`, `ent_director`, `ent_producer`
   - Outcomes: Educational content, research dissemination, artistic innovation

2. **Student-Performer Exchange**
   - Cross-disciplinary participation program
   - Participants: `acad_undergraduate`, `acad_graduate`, `ent_apprentice`, `ent_performer`
   - Enables unique learning opportunities

3. **Cross-Disciplinary Alumni Mentorship**
   - Senior professionals mentoring next generation
   - Participants: `acad_chancellor`, `ent_studio_head`, alumni network
   - Strengthens intergenerational knowledge transfer

### Shared Quests

Collaborative objectives requiring both systems:

1. **Interdisciplinary Production**
   - Combine academic research with entertainment production
   - Required professions: `acad_professor`, `ent_director`
   - Rewards: Cross-system recognition, enhanced shared resource access

2. **Educational Entertainment Series**
   - Develop entertainment with educational value
   - Required professions: `acad_researcher`, `ent_producer`
   - Rewards: Funding opportunities, audience expansion

## StatusBar Integration

### System-Specific Fields

**Academic System**:
- `acad_progress`: Overall progression through academic system (0-100)
- `acad_status`: Current status (active, sabbatical, emeritus, suspended, graduated)
- `acad_level`: Current profession level (1-8)
- `acad_experience`: Accumulated academic experience points

**Entertainment System**:
- `ent_progress`: Overall progression through entertainment system (0-100)
- `ent_status`: Current status (active, on_tour, retired, between_projects, contracted)
- `ent_level`: Current profession level (1-8)
- `ent_experience`: Accumulated entertainment experience points

### Shared Fields

Cross-system tracking:
- `overall_progress`: Combined progress across both systems
- `cross_system_status`: Status of interactions between systems
- `bridging_level`: Level of cross-system collaboration

### Compatibility Settings

StatusBar integration supports:
- **Dual Progression**: Users can progress in both systems simultaneously
- **Simultaneous Status**: Multiple status flags can be active
- **Mutually Exclusive Trigger Prevention**: Prevents logically impossible states

### Integration Hooks

Prepared hooks for future implementation:
- `on_cross_system_promotion`: Triggered when promotion affects both systems
- `on_shared_resource_access`: Triggered when accessing shared resources
- `on_bridging_quest_completion`: Triggered when bridging quests completed

## Scripts and Tools

### Validation Script

**File**: `validate_merge.py`

**Purpose**: Comprehensive validation of worldbook integrity

**Usage**:
```bash
python3 validate_merge.py
```

**Checks**:
- UID uniqueness across all systems
- No naming conflicts between professions
- No contradictory lore statements
- Shared resource reference integrity
- Cross-reference bidirectional consistency
- StatusBar field configuration

**Output**: Summary of validation results with pass/fail indicators

### Reports and Deliverables

All validation reports are generated in the project root directory. See `docs/statusbar-comparison.md` for UI/UX considerations specific to StatusBar implementations.

## File Structure

```
/home/engine/project/
├── worldbook.json                      # Main data file (source of truth)
├── CAREER_SYSTEMS_INTEGRATION.md       # Integration architecture documentation
├── MERGE_IMPLEMENTATION_SUMMARY.md     # Implementation summary and validation
├── validate_merge.py                   # Validation script (executable)
└── docs/
    ├── README.md                       # This file
    ├── statusbar-comparison.md         # StatusBar A vs B analysis
    ├── career-systems/
    │   ├── academic.md                # Academic system documentation
    │   └── entertainment.md           # Entertainment system documentation
    ├── shared-resources/
    │   ├── locations.md               # Location references
    │   └── organizations.md           # Organization references
    └── bridging/
        └── interactions.md            # Bridging lore documentation
```

## Maintenance and Expansion

### Adding New Professions

1. Choose appropriate system and prefix
2. Assign unique UID following naming convention
3. Define progression level (1-8)
4. Specify requirements for entry
5. List accessible locations and organizations
6. Add cross-references if applicable
7. Run validation script

### Modifying Shared Resources

1. Update accessibility lists if changing system access
2. Verify cross-references remain valid
3. Test StatusBar field compatibility
4. Run full validation
5. Document changes

### Cross-System Changes

1. Review impact on both career paths
2. Update bridging lore as needed
3. Validate StatusBar integration points
4. Ensure no new conflicts introduced
5. Run comprehensive validation

## Related Documentation

- **StatusBar Comparison**: `docs/statusbar-comparison.md` - Detailed comparison of StatusBar implementations
- **Career Systems Integration**: `CAREER_SYSTEMS_INTEGRATION.md` - Integration architecture
- **Implementation Summary**: `MERGE_IMPLEMENTATION_SUMMARY.md` - Validation results and technical notes
- **Academic System**: `docs/career-systems/academic.md` - Academic career path details
- **Entertainment System**: `docs/career-systems/entertainment.md` - Entertainment career path details

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-11-14 | Initial worldbook with merged academic and entertainment systems |

---

**Last Updated**: 2024-11-14  
**Maintained By**: Development Team  
**Status**: Active

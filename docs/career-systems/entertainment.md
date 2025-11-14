# Entertainment Career System

## Overview

The Entertainment Career System represents a comprehensive progression path through performance and production roles. It progresses from foundational apprenticeship through advanced performance, creative direction, production management, and ultimately studio leadership. This path emphasizes artistic skill, audience engagement, and business acumen.

## Career Progression Overview

```
Level 1: Apprentice Performer
    ↓
Level 2: Performer
    ↓
Level 3: Featured Performer
    ↓
Level 4: Principal Performer
    ↓
Level 5: Director
    ↓
Level 6: Producer
    ↓
Level 7: Executive Producer
    ↓
Level 8: Studio Head (Terminal)
```

## Profession Details

### 1. Apprentice Performer (Level 1)

**UID**: `ent_apprentice`

**Description**: The starting point of the entertainment career path. An aspiring performer beginning formal training in performance arts, passing an audition to demonstrate commitment and basic ability.

**Requirements**:
- Minimum Age: 16
- Audition: Passed

**Skills**:
- Basic Performance
- Stage Presence
- Rehearsal Discipline

**Accessible Locations**:
- Grand Performance Hall (`loc_performance_hall`)
- Digital Media Studio (`loc_media_studio`)

**Affiliated Organizations**:
- Student Union (`org_student_union`)

**Next Profession**: Performer (`ent_performer`)

**Status Flags**:
- Active: Currently training and performing
- Between Projects: Between performances
- Contracted: Under performance contract

**Experience Range**: 0-1,000 XP

**Typical Activities**:
- Attend rehearsals
- Study performance techniques
- Perform in small productions
- Build portfolio
- Network with peers

---

### 2. Performer (Level 2)

**UID**: `ent_performer`

**Description**: Regular performance engagements with developed stage presence and performance techniques. Professional performer working in established venues and productions.

**Requirements**:
- Previous Profession: Apprentice Performer
- Performances: 10+

**Skills**:
- Character Development
- Vocal Technique
- Movement

**Accessible Locations**:
- Grand Performance Hall (`loc_performance_hall`)
- Digital Media Studio (`loc_media_studio`)

**Affiliated Organizations**:
- Student Union (`org_student_union`)

**Cross-System References**:
- Academic: Undergraduate Student, Graduate Student
- *Note*: Performers often pursue education; students may participate in performances*

**Next Profession**: Featured Performer (`ent_featured_performer`)

**Experience Range**: 1,000-2,500 XP

**Professional Responsibilities**:
- Perform in regular productions
- Develop character interpretations
- Collaborate with other performers
- Attend rehearsals consistently
- Build fan base and reputation

---

### 3. Featured Performer (Level 3)

**UID**: `ent_featured_performer`

**Description**: Taking principal roles and solos in productions. Elevated performance level with significant individual visibility and creative control over character choices.

**Requirements**:
- Previous Profession: Performer
- Lead Roles: 3+

**Skills**:
- Advanced Performance
- Improvisation
- Audience Engagement

**Accessible Locations**:
- Grand Performance Hall (`loc_performance_hall`)
- Digital Media Studio (`loc_media_studio`)

**Affiliated Organizations**:
- Arts and Education Council (`org_arts_council`)

**Next Profession**: Principal Performer (`ent_principal_performer`)

**Experience Range**: 2,500-4,000 XP

**Career Highlight Activities**:
- Lead major productions
- Develop signature performance style
- Mentor emerging performers
- Participate in creative decisions
- Build public recognition

---

### 4. Principal Performer (Level 4)

**UID**: `ent_principal_performer`

**Description**: Lead performer in major productions with established reputation. Significant creative influence over productions and emerging leadership role mentoring other performers.

**Requirements**:
- Previous Profession: Featured Performer
- Major Productions: 5+

**Skills**:
- Artistic Direction
- Mentorship
- Brand Development

**Accessible Locations**:
- Grand Performance Hall (`loc_performance_hall`)
- Digital Media Studio (`loc_media_studio`)

**Affiliated Organizations**:
- Arts and Education Council (`org_arts_council`)

**Cross-System References**:
- Academic: Researcher, Professor
- *Note*: Principal performers often collaborate with academics on educational content*

**Next Profession**: Director (`ent_director`)

**Experience Range**: 4,000-5,500 XP

**Leadership Responsibilities**:
- Lead flagship productions
- Mentor featured performers
- Contribute to artistic vision
- Build personal brand
- Participate in industry relationships

---

### 5. Director (Level 5)

**UID**: `ent_director`

**Description**: Creative direction of productions with full artistic control. Responsible for interpreting scripts/concepts, guiding performers, and establishing production aesthetics.

**Requirements**:
- Previous Profession: Principal Performer
- Leadership Experience: 2+

**Skills**:
- Production Planning
- Casting
- Artistic Vision

**Accessible Locations**:
- Grand Performance Hall (`loc_performance_hall`)
- Digital Media Studio (`loc_media_studio`)

**Affiliated Organizations**:
- Arts and Education Council (`org_arts_council`)

**Next Profession**: Producer (`ent_producer`)

**Experience Range**: 5,500-7,000 XP

**Creative Responsibilities**:
- Interpret production concepts
- Cast performers appropriately
- Guide performance development
- Make artistic decisions
- Shape production identity

**Typical Cycle**:
- Script/concept selection
- Performer audition and casting
- Rehearsal direction and refinement
- Opening performance
- Run management

---

### 6. Producer (Level 6)

**UID**: `ent_producer`

**Description**: Managing production logistics, finance, and business aspects. Responsible for budgets, scheduling, marketing, and resource allocation while maintaining artistic integrity.

**Requirements**:
- Previous Profession: Director
- Productions Managed: 3+

**Skills**:
- Budget Management
- Marketing
- Resource Allocation

**Accessible Locations**:
- Grand Performance Hall (`loc_performance_hall`)
- Digital Media Studio (`loc_media_studio`)

**Affiliated Organizations**:
- Arts and Education Council (`org_arts_council`)

**Next Profession**: Executive Producer (`ent_executive_producer`)

**Experience Range**: 7,000-8,500 XP

**Production Management**:
- Create production budgets
- Schedule rehearsals and performances
- Manage vendor relationships
- Handle marketing and promotion
- Oversee technical requirements
- Manage venue logistics

---

### 7. Executive Producer (Level 7)

**UID**: `ent_executive_producer`

**Description**: Overseeing multiple productions simultaneously. Strategic leadership role with responsibility for portfolio of productions, investment decisions, and industry relationships.

**Requirements**:
- Previous Profession: Producer
- Successful Productions: 10+

**Skills**:
- Strategic Planning
- Investment
- Industry Relations

**Accessible Locations**:
- Grand Performance Hall (`loc_performance_hall`)
- Digital Media Studio (`loc_media_studio`)

**Affiliated Organizations**:
- Arts and Education Council (`org_arts_council`)
- Alumni Network (`org_alumni_network`)

**Next Profession**: Studio Head (`ent_studio_head`)

**Experience Range**: 8,500-10,000 XP

**Executive Responsibilities**:
- Portfolio management across productions
- Strategic investment decisions
- Industry relationship development
- Talent acquisition and development
- Financial planning and forecasting
- Risk management

---

### 8. Studio Head (Level 8) - Terminal

**UID**: `ent_studio_head`

**Description**: Leading entertainment organization with full authority over studio operations, strategic direction, and talent development. Executive leadership of the entire entertainment enterprise.

**Requirements**:
- Previous Profession: Executive Producer
- Executive Experience: 5+

**Skills**:
- Executive Leadership
- Industry Vision
- Talent Development

**Accessible Locations**:
- Grand Performance Hall (`loc_performance_hall`)
- Digital Media Studio (`loc_media_studio`)
- University Campus (`loc_university_campus`)
  - *Note*: Studio heads engage with academic institutions for partnerships*

**Affiliated Organizations**:
- Arts and Education Council (`org_arts_council`)
- Alumni Network (`org_alumni_network`)

**Terminal**: Yes (final profession in entertainment track)

**Experience Range**: 10,000+ XP

**Strategic Leadership**:
- Set studio vision and mission
- Make major strategic decisions
- Lead talent development initiatives
- Represent studio at industry level
- Build relationships with academic institutions
- Manage overall financial performance

---

## Status Flags

Entertainment professionals can hold these status flags:

| Status | Description | Implications |
|--------|-------------|--------------|
| **Active** | Currently performing/employed | Normal progression, can advance |
| **On Tour** | Traveling for performances | Progression continues, location varies |
| **Retired** | Retired from performing | Recognition of career, limited new progression |
| **Between Projects** | Between engagements | Temporary state, can resume |
| **Contracted** | Under performance contract | Specific obligations, can still progress |

Multiple status flags can coexist (e.g., Active + On Tour during touring performance).

---

## StatusBar Configuration

### System-Specific Fields

```json
{
  "progressField": "ent_progress",        // 0-100% through current level
  "statusField": "ent_status",            // Current status flag
  "levelField": "ent_level",              // Current level (1-8)
  "experienceField": "ent_experience"     // Total XP accumulated
}
```

### Experience Requirements

| Level | Min XP | Max XP | Next Level |
|-------|--------|--------|-----------|
| 1 | 0 | 1,000 | Performer |
| 2 | 1,000 | 2,500 | Featured Performer |
| 3 | 2,500 | 4,000 | Principal Performer |
| 4 | 4,000 | 5,500 | Director |
| 5 | 5,500 | 7,000 | Producer |
| 6 | 7,000 | 8,500 | Executive Producer |
| 7 | 8,500 | 10,000 | Studio Head |
| 8 | 10,000+ | ∞ | Terminal |

---

## Cross-System Interactions

### Entertainment-Academic Collaboration

The entertainment system connects with academics through:

1. **Performance & Education**
   - Entertainment professionals can teach performance techniques
   - Academics can study performance and artistic expression

2. **Content Production**
   - Entertainment producers create educational content
   - Academics research performance and artistic impact

3. **Institutional Partnerships**
   - Studio heads establish relationships with educational institutions
   - Deans and chancellors allocate shared resources

### Shared Resources

Entertainment professionals interact with:
- **Locations**:
  - Performance Hall (primary)
  - Media Studio (production)
  - University Campus (partnerships)
  - Research Library (content research)

- **Organizations**:
  - Arts and Education Council (governance)
  - Student Union (performer networks)
  - Alumni Network (professional community)

---

## Skill Trees

### Core Entertainment Skills

**Performance Track**:
- Basic Performance (Level 1)
  ↓
- Character Development (Level 2)
  ↓
- Vocal Technique (Level 2)
  ↓
- Advanced Performance (Level 3)
  ↓
- Improvisation (Level 3)

**Artistic Direction Track**:
- Stage Presence (Level 1)
  ↓
- Movement (Level 2)
  ↓
- Audience Engagement (Level 3)
  ↓
- Artistic Direction (Level 4)
  ↓
- Production Planning (Level 5)

**Leadership Track**:
- Rehearsal Discipline (Level 1)
  ↓
- Mentorship (Level 4)
  ↓
- Brand Development (Level 4)
  ↓
- Budget Management (Level 6)
  ↓
- Strategic Planning (Level 7)
  ↓
- Executive Leadership (Level 8)

---

## Typical Career Timeline

```
Age 16-18: Apprentice Performer
  └─ Initial training, audition preparation

Age 18-22: Performer
  └─ Regular performances, skill development

Age 22-25: Featured Performer
  └─ Principal roles, public recognition

Age 25-30: Principal Performer
  └─ Lead productions, mentoring

Age 30-35: Director
  └─ Creative leadership, vision realization

Age 35-40: Producer
  └─ Business management, portfolio building

Age 40-50: Executive Producer
  └─ Strategic leadership, industry influence

Age 50+: Studio Head
  └─ Executive leadership or retirement
```

---

## Typical Advancement Rates

- **Apprentice → Performer**: 1-2 years (performance-dependent)
- **Performer → Featured Performer**: 2-4 years (audience dependent)
- **Featured Performer → Principal Performer**: 2-5 years (opportunity-dependent)
- **Principal Performer → Director**: 1-3 years (preparation-dependent)
- **Director → Producer**: 2-4 years (production exposure)
- **Producer → Executive Producer**: 3-6 years (success-dependent)
- **Executive Producer → Studio Head**: 5-10 years (organizational structure)

---

## Integration with Worldbook

### File References

- **Main Data**: `worldbook.json` → `worldbook.careerSystems.entertainment`
- **Integration Guide**: `CAREER_SYSTEMS_INTEGRATION.md`
- **Implementation Summary**: `MERGE_IMPLEMENTATION_SUMMARY.md`
- **StatusBar Comparison**: `docs/statusbar-comparison.md`
- **Validation Script**: `validate_merge.py`

### Validation Checks

The entertainment system passes all validation checks:
- ✅ No UID conflicts
- ✅ No naming conflicts
- ✅ Shared resource integrity
- ✅ Cross-reference consistency
- ✅ StatusBar alignment ready

---

## Best Practices

### For Game/System Designers

1. **Profession Requirements**: Ensure performance counts are realistic for engagement level
2. **Skill Relevance**: Skills should connect to actual performance activities
3. **Location Appropriateness**: Performance venues should match production scale
4. **Cross-References**: Use to indicate natural collaboration opportunities

### For Developers

1. **UID Consistency**: Always use `ent_` prefix for entertainment entities
2. **Status Management**: Handle tour/contract states appropriately
3. **Experience Tracking**: Consider performance and production experience separately
4. **Validation**: Run validation script before deploying changes

### For Content Creators

1. **Profession Descriptions**: Make descriptions evoke entertainment industry atmosphere
2. **Requirement Balance**: Progression should feel earned but achievable
3. **Production Narrative**: Each profession should build on previous experience
4. **Cross-System Opportunities**: Identify collaborative moments with academic system

---

## Performance & Production Types

### Performance Venues
- Theater productions
- Concerts and musical performances
- Stand-up comedy
- Dance performances
- Spoken word events

### Production Types
- Live performances
- Recorded productions
- Educational content
- Documentary projects
- Mixed media productions

### Career Specializations (Optional)
- Theater
- Music/Concert
- Comedy
- Dance
- Film/Video
- Production Technology

---

## Industry Relationships

### Key Organizations (via Shared Resources)
- **Arts and Education Council**: Governance and policy
- **Student Union**: Emerging talent pipeline
- **Alumni Network**: Industry professional network

### Academic Partnerships
- Collaborative educational content
- Performance technique research
- Artist development programs
- Joint events and exhibitions

---

## Future Expansion

Potential areas for entertainment system expansion:

1. **Career Specializations**
   - Music Performance
   - Theater
   - Film/Television
   - Dance
   - Comedy

2. **Advanced Features**
   - Genre specialization
   - Award recognition
   - Talent agency management
   - Production company ownership

3. **Enhanced Cross-System**
   - Educational entertainment series
   - Research-backed artistic projects
   - Public educational events
   - Cultural exchange initiatives

---

**Document Version**: 1.0.0  
**Last Updated**: 2024-11-14  
**Related Files**: `docs/README.md`, `docs/career-systems/academic.md`, `docs/shared-resources/locations.md`, `docs/shared-resources/organizations.md`

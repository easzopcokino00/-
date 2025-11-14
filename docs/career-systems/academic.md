# Academic Career System

## Overview

The Academic Career System represents a comprehensive progression path through educational and institutional leadership roles. It progresses from foundational student status through increasingly complex research, teaching, and administrative responsibilities, culminating in the highest institutional authority.

## Career Progression Overview

```
Level 1: Student
    ↓
Level 2: Undergraduate Student
    ↓
Level 3: Graduate Student
    ↓
Level 4: Researcher
    ↓
Level 5: Professor
    ↓
Level 6: Department Head
    ↓
Level 7: Dean
    ↓
Level 8: Chancellor (Terminal)
```

## Profession Details

### 1. Student (Level 1)

**UID**: `acad_student`

**Description**: The starting point of the academic career path. A student at the high school or early college level beginning their educational journey.

**Requirements**:
- Minimum Age: 16
- Education: High school completion

**Skills**:
- Basic Research
- Note Taking
- Critical Thinking

**Accessible Locations**:
- University Campus (`loc_university_campus`)
- Central Research Library (`loc_research_library`)

**Affiliated Organizations**:
- Student Union (`org_student_union`)

**Next Profession**: Undergraduate Student (`acad_undergraduate`)

**Status Flags**:
- Active: Currently enrolled
- Suspended: Temporary suspension
- Graduated: Completed program

**Experience Range**: 0-1,000 XP

---

### 2. Undergraduate Student (Level 2)

**UID**: `acad_undergraduate`

**Description**: Pursuing a bachelor's degree with deeper engagement in academic coursework, research methods, and scholarly communication.

**Requirements**:
- Previous Profession: Student
- Credits Completed: 30+

**Skills**:
- Academic Writing
- Research Methods
- Presentation Skills

**Accessible Locations**:
- University Campus (`loc_university_campus`)
- Central Research Library (`loc_research_library`)

**Affiliated Organizations**:
- Student Union (`org_student_union`)

**Cross-System References**:
- Entertainment: Performer, Technician
- *Note*: Academic students often participate in entertainment events; performers may audit academic classes

**Next Profession**: Graduate Student (`acad_graduate`)

**Experience Range**: 1,000-2,500 XP

---

### 3. Graduate Student (Level 3)

**UID**: `acad_graduate`

**Description**: Advanced study phase with focus on specialized research, complex analysis, and academic publishing. Master's or doctoral coursework.

**Requirements**:
- Previous Profession: Undergraduate Student
- Bachelor's Degree: Completed

**Skills**:
- Advanced Research
- Statistical Analysis
- Academic Publishing

**Accessible Locations**:
- University Campus (`loc_university_campus`)
- Central Research Library (`loc_research_library`)

**Affiliated Organizations**:
- Student Union (`org_student_union`)

**Next Profession**: Researcher (`acad_researcher`)

**Experience Range**: 2,500-4,000 XP

**Notes**: Graduate students often collaborate with researchers and begin publishing their own work.

---

### 4. Researcher (Level 4)

**UID**: `acad_researcher`

**Description**: Independent researcher conducting original research, writing grant proposals, and contributing to peer review processes. Transitional role between student and faculty.

**Requirements**:
- Previous Profession: Graduate Student
- Publications: 2+

**Skills**:
- Grant Writing
- Peer Review
- Data Analysis

**Accessible Locations**:
- University Campus (`loc_university_campus`)
- Central Research Library (`loc_research_library`)

**Affiliated Organizations**:
- Arts and Education Council (`org_arts_council`)

**Cross-System References**:
- Entertainment: Director, Producer
- *Note*: Researchers often collaborate with entertainment professionals on educational content projects

**Next Profession**: Professor (`acad_professor`)

**Experience Range**: 4,000-5,500 XP

**Typical Activities**:
- Publishing research papers
- Conducting experiments and studies
- Mentoring graduate students
- Attending academic conferences
- Writing grant proposals

---

### 5. Professor (Level 5)

**UID**: `acad_professor`

**Description**: Faculty member teaching courses, conducting research, and mentoring students. This is the traditional entry point to the professorial ranks with significant institutional responsibilities.

**Requirements**:
- Previous Profession: Researcher
- PhD Degree: Completed

**Skills**:
- Curriculum Design
- Mentorship
- Academic Leadership

**Accessible Locations**:
- University Campus (`loc_university_campus`)
- Grand Performance Hall (`loc_performance_hall`)
  - *Note*: Professors often present research and host academic ceremonies*

**Affiliated Organizations**:
- Arts and Education Council (`org_arts_council`)
- Alumni Network (`org_alumni_network`)

**Next Profession**: Department Head (`acad_department_head`)

**Experience Range**: 5,500-7,000 XP

**Key Responsibilities**:
- Teach undergraduate and graduate courses
- Conduct research program
- Advise students
- Publish research
- Participate in academic governance

---

### 6. Department Head (Level 6)

**UID**: `acad_department_head`

**Description**: Administrative leadership of an academic department. Manages faculty, budgets, curriculum, and departmental strategic direction.

**Requirements**:
- Previous Profession: Professor
- Years of Experience: 5+
- Administrative Track Record: Demonstrated leadership

**Skills**:
- Administration
- Budget Management
- Strategic Planning

**Accessible Locations**:
- University Campus (`loc_university_campus`)

**Affiliated Organizations**:
- Arts and Education Council (`org_arts_council`)

**Next Profession**: Dean (`acad_dean`)

**Experience Range**: 7,000-8,500 XP

**Administrative Duties**:
- Manage departmental budget and resources
- Hire and evaluate faculty
- Oversee curriculum development
- Represent department at university level
- Plan strategic initiatives

---

### 7. Dean (Level 7)

**UID**: `acad_dean`

**Description**: Faculty leader responsible for an entire school or college within the university. Senior administrative role with significant institutional influence.

**Requirements**:
- Previous Profession: Department Head
- Administrative Experience: 3+ years

**Skills**:
- Institutional Leadership
- Policy Development
- Fundraising

**Accessible Locations**:
- University Campus (`loc_university_campus`)
- Grand Performance Hall (`loc_performance_hall`)
  - *Note*: Deans oversee university-wide events and ceremonies*

**Affiliated Organizations**:
- Arts and Education Council (`org_arts_council`)
- Alumni Network (`org_alumni_network`)

**Next Profession**: Chancellor (`acad_chancellor`)

**Experience Range**: 8,500-10,000 XP

**Strategic Responsibilities**:
- Oversee all departments within college/school
- Develop college-level policies
- Fundraise for institutional advancement
- Represent institution externally
- Plan long-term academic direction

---

### 8. Chancellor (Level 8) - Terminal

**UID**: `acad_chancellor`

**Description**: The highest academic authority within the institution. Chief academic officer responsible for overall institutional vision, strategy, and performance.

**Requirements**:
- Previous Profession: Dean
- Executive Experience: 5+

**Skills**:
- Executive Leadership
- Institutional Vision
- Public Relations

**Accessible Locations**:
- University Campus (`loc_university_campus`)
- Grand Performance Hall (`loc_performance_hall`)
- Digital Media Studio (`loc_media_studio`)

**Affiliated Organizations**:
- Arts and Education Council (`org_arts_council`)
- Alumni Network (`org_alumni_network`)

**Terminal**: Yes (final profession in academic track)

**Experience Range**: 10,000+ XP

**Executive Leadership**:
- Set institutional vision and strategy
- Lead university-wide initiatives
- Represent institution at national/international level
- Make policy decisions affecting entire institution
- Mentor next generation of leadership

---

## Status Flags

Academic professionals can hold these status flags:

| Status | Description | Implications |
|--------|-------------|--------------|
| **Active** | Currently enrolled/employed | Normal progression, can advance |
| **Sabbatical** | On academic leave | Progression paused, can resume |
| **Emeritus** | Retired with honors | Recognition of service, limited new progression |
| **Suspended** | Temporary suspension | Cannot progress, temporary condition |
| **Graduated** | Completed program | Permanent state for student level |

Multiple status flags can coexist (e.g., Active + Sabbatical during leave).

---

## StatusBar Configuration

### System-Specific Fields

```json
{
  "progressField": "acad_progress",      // 0-100% through current level
  "statusField": "acad_status",          // Current status flag
  "levelField": "acad_level",            // Current level (1-8)
  "experienceField": "acad_experience"   // Total XP accumulated
}
```

### Experience Requirements

| Level | Min XP | Max XP | Next Level |
|-------|--------|--------|-----------|
| 1 | 0 | 1,000 | Undergraduate |
| 2 | 1,000 | 2,500 | Graduate |
| 3 | 2,500 | 4,000 | Researcher |
| 4 | 4,000 | 5,500 | Professor |
| 5 | 5,500 | 7,000 | Department Head |
| 6 | 7,000 | 8,500 | Dean |
| 7 | 8,500 | 10,000 | Chancellor |
| 8 | 10,000+ | ∞ | Terminal |

---

## Cross-System Interactions

### Academic-Entertainment Collaboration

The academic system connects with entertainment through:

1. **Student-Performer Exchange**
   - Academic students can participate in entertainment venues
   - Performers can audit academic courses

2. **Research & Production**
   - Researchers collaborate with entertainment directors on content
   - Professors consult on educational entertainment projects

3. **Institutional Leadership**
   - Deans and Chancellors govern institutions hosting both systems
   - Cross-system resource allocation and policy

### Shared Resources

Academics interact with:
- **Locations**:
  - University Campus (primary)
  - Performance Hall (events and ceremonies)
  - Research Library (resources)
  - Media Studio (educational content)

- **Organizations**:
  - Arts and Education Council (governance)
  - Student Union (student representation)
  - Alumni Network (professional community)

---

## Skill Trees

### Core Academic Skills

**Research Track**:
- Basic Research (Level 1)
  ↓
- Research Methods (Level 2)
  ↓
- Advanced Research (Level 3)
  ↓
- Grant Writing (Level 4)
  ↓
- Peer Review (Level 4)

**Teaching Track**:
- Note Taking (Level 1)
  ↓
- Academic Writing (Level 2)
  ↓
- Presentation Skills (Level 2)
  ↓
- Curriculum Design (Level 5)
  ↓
- Mentorship (Level 5)

**Leadership Track**:
- Critical Thinking (Level 1)
  ↓
- Statistical Analysis (Level 3)
  ↓
- Administration (Level 6)
  ↓
- Budget Management (Level 6)
  ↓
- Strategic Planning (Level 6)
  ↓
- Institutional Leadership (Level 7)

---

## Typical Career Timeline

```
Age 16-18: Student
  └─ High school completion, basic research skills

Age 18-22: Undergraduate Student
  └─ Bachelor's degree pursuit, research methods

Age 22-26: Graduate Student
  └─ Master's or PhD pursuit, specialization

Age 26-30: Researcher
  └─ Postdoctoral work, first publications

Age 30-35: Professor
  └─ Faculty appointment, research group leadership

Age 35-45: Department Head
  └─ Administrative experience, strategic planning

Age 45-55: Dean
  └─ Senior leadership, institutional influence

Age 55+: Chancellor
  └─ Executive leadership or emeritus retirement
```

---

## Typical Advancement Rates

- **Student → Undergraduate**: 2-4 years (education based)
- **Undergraduate → Graduate**: Immediate (upon degree completion)
- **Graduate → Researcher**: 2-4 years (publication dependent)
- **Researcher → Professor**: 1-3 years (faculty hiring dependent)
- **Professor → Department Head**: 5-10 years (seniority based)
- **Department Head → Dean**: 3-7 years (opportunity based)
- **Dean → Chancellor**: 5-10 years (organizational structure)

---

## Integration with Worldbook

### File References

- **Main Data**: `worldbook.json` → `worldbook.careerSystems.academic`
- **Integration Guide**: `CAREER_SYSTEMS_INTEGRATION.md`
- **Implementation Summary**: `MERGE_IMPLEMENTATION_SUMMARY.md`
- **StatusBar Comparison**: `docs/statusbar-comparison.md`
- **Validation Script**: `validate_merge.py`

### Validation Checks

The academic system passes all validation checks:
- ✅ No UID conflicts
- ✅ No naming conflicts
- ✅ Shared resource integrity
- ✅ Cross-reference consistency
- ✅ StatusBar alignment ready

---

## Best Practices

### For Game/System Designers

1. **Profession Requirements**: Ensure requirements are achievable within expected timelines
2. **Skill Relevance**: Skills should logically connect to profession activities
3. **Location Appropriateness**: Professions should only access logical locations
4. **Cross-References**: Use to indicate possible collaborations, not conflicts

### For Developers

1. **UID Consistency**: Always use `acad_` prefix for academic entities
2. **Status Management**: Properly handle status flag transitions
3. **Experience Tracking**: Use consistent XP calculation methods
4. **Validation**: Run validation script before deploying changes

### For Content Creators

1. **Profession Descriptions**: Keep descriptions concise but evocative
2. **Requirement Balance**: Make requirements challenging but achievable
3. **Narrative Flow**: Progression should tell a coherent story
4. **Cross-System Opportunities**: Identify collaboration opportunities with entertainment

---

## Future Expansion

Potential areas for academic system expansion:

1. **Additional Career Tracks**
   - STEM specialization
   - Humanities focus
   - Professional programs (law, medicine)

2. **Advanced Features**
   - Specializations within levels
   - Dual degree paths
   - Research group management

3. **Enhanced Cross-System**
   - Joint academic-entertainment projects
   - Educational entertainment series
   - Public engagement initiatives

---

**Document Version**: 1.0.0  
**Last Updated**: 2024-11-14  
**Related Files**: `docs/README.md`, `docs/career-systems/entertainment.md`, `docs/shared-resources/locations.md`, `docs/shared-resources/organizations.md`

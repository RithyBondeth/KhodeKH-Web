import type { IK12Subject, IUniversityFaculty } from "@/utils/interfaces/catalog"

/* ── Grades ──────────────────────────────────────────────────────────── */

export const GRADES = Array.from({ length: 12 }, (_, i) => i + 1)

/* ── K-12 subjects, per grade band ───────────────────────────────────── */

export const K12_SUBJECTS: IK12Subject[] = [
  { key: "khmer",         icon: "BookOpen",    color: "violet",  grades: [1, 12], lessons: 40 },
  { key: "math",          icon: "Calculator",  color: "cyan",    grades: [1, 12], lessons: 48, detail: { slug: "math",    grades: [12]  } },
  { key: "english",       icon: "Languages",   color: "emerald", grades: [1, 12], lessons: 40, detail: { slug: "english", grades: "all" } },
  { key: "science",       icon: "Microscope",  color: "amber",   grades: [1, 6],  lessons: 32 },
  { key: "socialStudies", icon: "Users",       color: "indigo",  grades: [1, 6],  lessons: 28 },
  { key: "physics",       icon: "Atom",        color: "cyan",    grades: [7, 12], lessons: 36, detail: { slug: "physics", grades: [11]  } },
  { key: "chemistry",     icon: "FlaskConical",color: "amber",   grades: [7, 12], lessons: 34 },
  { key: "biology",       icon: "Dna",         color: "emerald", grades: [7, 12], lessons: 34 },
  { key: "history",       icon: "Landmark",    color: "violet",  grades: [7, 12], lessons: 30 },
  { key: "geography",     icon: "Globe",       color: "indigo",  grades: [7, 12], lessons: 28 },
]

/* ── University faculties (coming-soon teaser) ───────────────────────── */

export const UNIVERSITY_FACULTIES: IUniversityFaculty[] = [
  { key: "engineering", icon: "Cog"         },
  { key: "medicine",    icon: "Stethoscope" },
  { key: "business",    icon: "Briefcase"   },
  { key: "it",          icon: "Cpu"         },
  { key: "law",         icon: "Scale"       },
  { key: "education",   icon: "School"      },
]

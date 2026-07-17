import type {
  IK12Subject,
  IProgrammingCategory,
  IUniversityFaculty,
} from "@/utils/interfaces/catalog"

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

/* ── Programming categories ──────────────────────────────────────────── */

/** `slug` mirrors `programming_categories.slug` in the API — keep in sync. */
export const PROGRAMMING_CATEGORIES: IProgrammingCategory[] = [
  { key: "fundamentals", slug: "programming-fundamentals", icon: "Terminal",    color: "violet"  },
  { key: "webDev",       slug: "web-development",          icon: "Globe",       color: "cyan"    },
  { key: "mobileDev",    slug: "mobile-app-development",   icon: "Smartphone",  color: "emerald" },
  { key: "dataAi",       slug: "data-science-ai",          icon: "Brain",       color: "amber"   },
  { key: "computerSci",  slug: "computer-science",         icon: "Binary",      color: "indigo"  },
  { key: "gameDev",      slug: "game-development",         icon: "Gamepad2",    color: "violet"  },
  { key: "devops",       slug: "devops-cloud",             icon: "Cloud",       color: "cyan"    },
  { key: "security",     slug: "cybersecurity",            icon: "ShieldCheck", color: "emerald" },
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

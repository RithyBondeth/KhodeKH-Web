import type { TColorKey } from "@/utils/constants/landing.constant"
import type { ICourseDetail, ISyllabusModule } from "@/utils/interfaces/course-detail"
import { PYTHON_MODULES } from "@/utils/constants/learn.constant"

/* ── Python syllabus — derived from the real learn modules ───────────── */

const PYTHON_SYLLABUS: ISyllabusModule[] = PYTHON_MODULES.map((m) => ({
  section: m.section,
  sectionKh: m.sectionKh,
  lessons: m.lessons.map(
    ({ id, title, titleKh, type, duration, xpReward, done, current, locked }) => ({
      id, title, titleKh, type, duration, xpReward, done, current, locked,
    })
  ),
}))

/* ── React syllabus (first modules — rest unlock with progress) ──────── */

const REACT_SYLLABUS: ISyllabusModule[] = [
  {
    section: "Module 1: React Foundations",
    sectionKh: "ម៉ូឌុល ១: មូលដ្ឋាន React",
    lessons: [
      { id: 1, title: "What is React?",             titleKh: "React គឺជាអ្វី?",            type: "theory",    duration: "10 min", xpReward: 50,  done: true },
      { id: 2, title: "JSX & Rendering",            titleKh: "JSX & ការបង្ហាញ",            type: "theory",    duration: "12 min", xpReward: 50,  done: true },
      { id: 3, title: "Your First Component",       titleKh: "Component ដំបូងរបស់អ្នក",     type: "practice",  duration: "15 min", xpReward: 100, done: true },
      { id: 4, title: "Props & Composition",        titleKh: "Props & ការផ្សំ",             type: "theory",    duration: "14 min", xpReward: 50,  done: true },
    ],
  },
  {
    section: "Module 2: State & Events",
    sectionKh: "ម៉ូឌុល ២: State & ព្រឹត្តិការណ៍",
    lessons: [
      { id: 5, title: "Handling Events",            titleKh: "ការគ្រប់គ្រងព្រឹត្តិការណ៍",     type: "theory",    duration: "12 min", xpReward: 50,  done: true },
      { id: 6, title: "useState Hook",              titleKh: "useState Hook",              type: "theory",    duration: "16 min", xpReward: 50,  done: false, current: true },
      { id: 7, title: "Counter App Practice",       titleKh: "អនុវត្ត — កម្មវិធីរាប់",       type: "practice",  duration: "18 min", xpReward: 100, done: false },
      { id: 8, title: "Todo List Challenge",        titleKh: "ការប្រឡង — បញ្ជីការងារ",      type: "challenge", duration: "25 min", xpReward: 200, done: false },
    ],
  },
  {
    section: "Module 3: Effects & Data",
    sectionKh: "ម៉ូឌុល ៣: Effects & ទិន្នន័យ",
    lessons: [
      { id: 9,  title: "useEffect Hook",            titleKh: "useEffect Hook",             type: "theory",    duration: "16 min", xpReward: 50,  locked: true },
      { id: 10, title: "Fetching Data",             titleKh: "ការទាញយកទិន្នន័យ",           type: "theory",    duration: "14 min", xpReward: 50,  locked: true },
      { id: 11, title: "Weather App Practice",      titleKh: "អនុវត្ត — កម្មវិធីអាកាសធាតុ",  type: "practice",  duration: "20 min", xpReward: 100, locked: true },
      { id: 12, title: "Movie Search Challenge",    titleKh: "ការប្រឡង — ស្វែងរកភាពយន្ត",   type: "challenge", duration: "30 min", xpReward: 200, locked: true },
    ],
  },
]

/* ── Algorithms syllabus (first modules — rest unlock with progress) ─── */

const ALGORITHMS_SYLLABUS: ISyllabusModule[] = [
  {
    section: "Module 1: Complexity & Arrays",
    sectionKh: "ម៉ូឌុល ១: ភាពស្មុគស្មាញ & Arrays",
    lessons: [
      { id: 1, title: "Big-O Notation",             titleKh: "សញ្ញាណ Big-O",               type: "theory",    duration: "15 min", xpReward: 50 },
      { id: 2, title: "Arrays & Memory",            titleKh: "Arrays & អង្គចងចាំ",          type: "theory",    duration: "12 min", xpReward: 50 },
      { id: 3, title: "Two-Pointer Technique",      titleKh: "បច្ចេកទេស Two-Pointer",       type: "theory",    duration: "14 min", xpReward: 50 },
      { id: 4, title: "Array Drills",               titleKh: "អនុវត្ត — Arrays",            type: "practice",  duration: "20 min", xpReward: 100 },
    ],
  },
  {
    section: "Module 2: Searching & Sorting",
    sectionKh: "ម៉ូឌុល ២: ការស្វែងរក & តម្រៀប",
    lessons: [
      { id: 5, title: "Binary Search",              titleKh: "ការស្វែងរកគោលពីរ",           type: "theory",    duration: "16 min", xpReward: 50,  locked: true },
      { id: 6, title: "Bubble & Selection Sort",    titleKh: "តម្រៀប Bubble & Selection",   type: "theory",    duration: "14 min", xpReward: 50,  locked: true },
      { id: 7, title: "Merge Sort",                 titleKh: "តម្រៀប Merge",                type: "theory",    duration: "18 min", xpReward: 50,  locked: true },
      { id: 8, title: "Sorting Race Challenge",     titleKh: "ការប្រឡង — ការប្រណាំងតម្រៀប",  type: "challenge", duration: "30 min", xpReward: 200, locked: true },
    ],
  },
  {
    section: "Module 3: Stacks, Queues & Trees",
    sectionKh: "ម៉ូឌុល ៣: Stacks, Queues & Trees",
    lessons: [
      { id: 9,  title: "Stacks & Queues",           titleKh: "Stacks & Queues",            type: "theory",    duration: "15 min", xpReward: 50,  locked: true },
      { id: 10, title: "Binary Trees",              titleKh: "មែកធាងគោលពីរ",               type: "theory",    duration: "18 min", xpReward: 50,  locked: true },
      { id: 11, title: "Tree Traversal Practice",   titleKh: "អនុវត្ត — ការដើរមែកធាង",      type: "practice",  duration: "22 min", xpReward: 100, locked: true },
      { id: 12, title: "Balanced Brackets Challenge", titleKh: "ការប្រឡង — វង់ក្រចកតុល្យភាព", type: "challenge", duration: "28 min", xpReward: 200, locked: true },
    ],
  },
]

/* ── Course details, keyed by catalog slug ───────────────────────────── */

export const COURSE_DETAILS: Record<string, ICourseDetail> = {
  python: {
    key: "python",
    level: "Beginner",
    color: "violet" as TColorKey,
    icon: "Terminal",
    totalLessons: 24,
    totalXp: 2400,
    hours: 18,
    students: 4230,
    outcomes: 4,
    syllabus: PYTHON_SYLLABUS,
  },
  react: {
    key: "react",
    level: "Intermediate",
    color: "cyan" as TColorKey,
    icon: "Code2",
    totalLessons: 32,
    totalXp: 3200,
    hours: 26,
    students: 2810,
    outcomes: 4,
    syllabus: REACT_SYLLABUS,
  },
  algorithms: {
    key: "algorithms",
    level: "Advanced",
    color: "amber" as TColorKey,
    icon: "Brain",
    totalLessons: 40,
    totalXp: 4000,
    hours: 34,
    students: 1920,
    outcomes: 4,
    syllabus: ALGORITHMS_SYLLABUS,
  },
}

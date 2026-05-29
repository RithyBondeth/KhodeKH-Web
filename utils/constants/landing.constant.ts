import {
  Brain, Terminal, Globe, Trophy, Users, Shield,
  BookOpen, Code2,
} from "lucide-react"

/* ── Color map ───────────────────────────────────────────────────────── */

export const COLOR = {
  violet: {
    bg:     "bg-violet-50 dark:bg-violet-500/15",
    icon:   "text-violet-600 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-500/20",
    badge:  "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
  },
  cyan: {
    bg:     "bg-cyan-50 dark:bg-cyan-500/15",
    icon:   "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-200 dark:border-cyan-500/20",
    badge:  "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300",
  },
  emerald: {
    bg:     "bg-emerald-50 dark:bg-emerald-500/15",
    icon:   "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-500/20",
    badge:  "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  },
  amber: {
    bg:     "bg-amber-50 dark:bg-amber-500/15",
    icon:   "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/20",
    badge:  "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  },
  pink: {
    bg:     "bg-pink-50 dark:bg-pink-500/15",
    icon:   "text-pink-600 dark:text-pink-400",
    border: "border-pink-200 dark:border-pink-500/20",
    badge:  "bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300",
  },
  indigo: {
    bg:     "bg-indigo-50 dark:bg-indigo-500/15",
    icon:   "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-200 dark:border-indigo-500/20",
    badge:  "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
  },
} as const

export type ColorKey = keyof typeof COLOR

/* ── Features ────────────────────────────────────────────────────────── */

export const FEATURES = [
  { icon: Brain,    title: "AI Mentor Apsara",      titleKh: "គ្រូ AI អប្សរា",    desc: "Real-time code explanations, debugging help, and personalised learning paths powered by advanced AI.",                        color: "violet"  as ColorKey },
  { icon: Terminal, title: "Live Code Playground",  titleKh: "ក្ដារចុចកូដ",         desc: "Write, run, and test code directly in your browser. Supports Python, JavaScript, HTML/CSS and more.",                      color: "cyan"    as ColorKey },
  { icon: Globe,    title: "Khmer-First Learning",  titleKh: "ខ្មែរជាមូលដ្ឋាន",   desc: "Every lesson, explanation, and mentor response available in Khmer. Learn coding in your native language.",               color: "emerald" as ColorKey },
  { icon: Trophy,   title: "Gamified Progress",     titleKh: "ការរីកចម្រើន",       desc: "Earn XP, unlock achievements, and compete on leaderboards. Learning code has never been this engaging.",                    color: "amber"   as ColorKey },
  { icon: Users,    title: "Peer Community",        titleKh: "សហគមន៍",             desc: "Connect with thousands of Cambodian developers. Share code, collaborate, and grow together.",                              color: "pink"    as ColorKey },
  { icon: Shield,   title: "Industry Certificates", titleKh: "វិញ្ញាបនបត្រ",      desc: "Earn recognised certificates upon course completion. Showcase your skills to employers across Cambodia.",                  color: "indigo"  as ColorKey },
]

/* ── Courses ─────────────────────────────────────────────────────────── */

export const COURSES = [
  { title: "Python Fundamentals", titleKh: "មូលដ្ឋានគ្រឹះ Python", level: "Beginner",     lessons: 24, xp: 2400, tag: "Most Popular", color: "violet" as ColorKey, icon: "🐍" },
  { title: "Web Dev with React",  titleKh: "បង្កើតគេហទំព័រ React", level: "Intermediate", lessons: 32, xp: 3200, tag: "New",           color: "cyan"   as ColorKey, icon: "⚛️" },
  { title: "Algorithms & DSA",    titleKh: "ក្បួនដោះស្រាយ",        level: "Advanced",     lessons: 40, xp: 4000, tag: "Career Boost",  color: "amber"  as ColorKey, icon: "🧠" },
]

/* ── Stats ───────────────────────────────────────────────────────────── */

export const STATS = [
  { count: 12000, prefix: "",  suffix: "+", locale: true,  label: "Students",    labelKh: "សិស្ស"       },
  { count: 60,    prefix: "",  suffix: "+", locale: false, label: "Courses",     labelKh: "វគ្គសិក្សា" },
  { count: 94,    prefix: "",  suffix: "%", locale: false, label: "Completion",  labelKh: "ការបញ្ចប់"  },
  { count: 1,     prefix: "#", suffix: "",  locale: false, label: "In Cambodia", labelKh: "នៅកម្ពុជា"  },
]

/* ── Testimonials ────────────────────────────────────────────────────── */

export const TESTIMONIALS = [
  { name: "Sokha Phan",  nameKh: "សុខា ផន",   role: "Junior Dev @ PiCom",  text: "Apsara AI helped me land my first tech job. The Khmer explanations made complex algorithms click instantly.", avatar: "SP", stars: 5 },
  { name: "Dara Chheng", nameKh: "ដារ៉ា ឈិន", role: "CS Student, RUPP",     text: "Finally a platform that teaches coding in Khmer! The AI mentor answers my questions better than any textbook.", avatar: "DC", stars: 5 },
  { name: "Bopha Meas",  nameKh: "បុប្ផា មាស", role: "Freelance Developer",  text: "The gamification kept me motivated. I earned 3 certificates in 2 months and doubled my freelance income.",    avatar: "BM", stars: 5 },
]

/* ── How it works steps ──────────────────────────────────────────────── */

export const HOW_IT_WORKS = [
  { step: "01", title: "Choose Your Path", titleKh: "ជ្រើសរើសផ្លូវ",    desc: "Pick a course from our Khmer-first curriculum. From beginner Python to advanced algorithms.", icon: BookOpen, color: "violet" as ColorKey },
  { step: "02", title: "Code & Learn",     titleKh: "សរសេរ និងរៀន",    desc: "Write code in our live playground. Apsara AI explains every concept in Khmer as you go.",    icon: Code2,    color: "cyan"   as ColorKey },
  { step: "03", title: "Earn & Grow",      titleKh: "ប្រមូល និងលូតលាស់", desc: "Collect XP, unlock badges, earn certificates. Climb the leaderboard and get hired.",        icon: Trophy,   color: "amber"  as ColorKey },
]

/* ── Nav links ───────────────────────────────────────────────────────── */

export const NAV_LINKS = ["Courses", "Features", "Leaderboard", "Pricing"] as const

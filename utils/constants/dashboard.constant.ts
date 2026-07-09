import { Home, BookOpen, Code2, Brain, Terminal } from "lucide-react"
import type { IStudent, IActiveCourse, INavItem } from "@/utils/interfaces/dashboard"

/* ── Student ─────────────────────────────────────────────────────────── */

export const studentData: IStudent = {
  name: "Sok Dara",
  nameKh: "សុខ ដារ៉ា",
  level: 8,
  xp: 2450,
  xpToNext: 3000,
  avatar: "SD",
}

/* ── Active courses ──────────────────────────────────────────────────── */

export const activeCourses: IActiveCourse[] = [
  {
    id: "python",
    title: "Python Fundamentals",
    titleKh: "មូលដ្ឋានគ្រឹះ Python",
    icon: "Terminal",
    progress: 65,
    currentLesson: "Lesson 8: Functions & Scope",
    completedLessons: 15,
    totalLessons: 24,
    color: "violet",
  },
  {
    id: "react",
    title: "Web Dev with React",
    titleKh: "បង្កើតគេហទំព័រ React",
    icon: "Code2",
    progress: 30,
    currentLesson: "Lesson 7: useState Hook",
    completedLessons: 9,
    totalLessons: 32,
    color: "cyan",
  },
]

/* ── Nav items ───────────────────────────────────────────────────────── */

export const navItems: INavItem[] = [
  { icon: Home,     label: "Dashboard", href: "/dashboard", active: true  },
  { icon: BookOpen, label: "Courses",   href: "/courses",   active: false },
  { icon: Code2,    label: "Playground",href: "/learn",     active: false },
  { icon: Brain,    label: "AI Mentor", href: "/learn",     active: false },
]

import type { LucideIcon } from "lucide-react"

export interface IStudent {
  name: string
  nameKh: string
  level: number
  xp: number
  xpToNext: number
  avatar: string
}

export interface IActiveCourse {
  id: string
  title: string
  titleKh: string
  icon: string
  progress: number
  currentLesson: string
  completedLessons: number
  totalLessons: number
  color: string
}

export interface INavItem {
  icon: LucideIcon
  label: string
  href: string
  active: boolean
}

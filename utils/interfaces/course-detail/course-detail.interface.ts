import type { TColorKey } from "@/utils/constants/landing.constant"

/* ── Syllabus ────────────────────────────────────────────────────────── */

export interface ISyllabusLesson {
  id: number
  title: string
  titleKh: string
  type: "theory" | "practice" | "challenge"
  duration: string
  xpReward: number
  done?: boolean
  current?: boolean
  locked?: boolean
}

export interface ISyllabusModule {
  section: string
  sectionKh: string
  lessons: ISyllabusLesson[]
}

/* ── Course detail ───────────────────────────────────────────────────── */

export interface ICourseDetail {
  key: string
  level: "Beginner" | "Intermediate" | "Advanced"
  color: TColorKey
  icon: string
  totalLessons: number
  totalXp: number
  hours: number
  students: number
  outcomes: number
  syllabus: ISyllabusModule[]
}

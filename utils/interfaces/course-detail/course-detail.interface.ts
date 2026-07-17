import type { TColorKey } from "@/utils/constants/landing.constant"
import type { TCatalogTrack } from "@/utils/interfaces/catalog"

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

/** Difficulty ladder — meaningful on the programming and university tracks only. */
export type TCourseLevel = "beginner" | "intermediate" | "advanced"

/** Where a K-12 course sits — a single grade, or every grade for subjects taught 1–12. */
export type TCourseGrade = number | "all"

interface ICourseDetailBase {
  key: string
  color: TColorKey
  icon: string
  totalLessons: number
  totalXp: number
  hours: number
  students: number
  outcomes: number
  syllabus: ISyllabusModule[]
}

/** A grade-year subject course. Placed by grade — a difficulty level is meaningless here. */
export interface IK12CourseDetail extends ICourseDetailBase {
  track: Extract<TCatalogTrack, "k12">
  grade: TCourseGrade
}

/** A skills course. Placed by difficulty — a grade is meaningless here. */
export interface ILevelledCourseDetail extends ICourseDetailBase {
  track: Exclude<TCatalogTrack, "k12">
  level: TCourseLevel
}

export type ICourseDetail = IK12CourseDetail | ILevelledCourseDetail

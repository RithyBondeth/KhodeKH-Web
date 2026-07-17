export interface IStudent {
  name: string
  nameKh: string
  level: number
  xp: number
  xpToNext: number
  /** Consecutive days with at least one lesson — mirrors users.streak */
  streak: number
  /** Lessons the student aims to finish each week */
  weeklyGoal: number
  avatar: string
}

export interface IActiveCourse {
  id: string
  title: string
  titleKh: string
  icon: string
  color: string
  progress: number
  completedLessons: number
  totalLessons: number
  /** Lesson the student resumes on */
  currentLessonId: number
  currentLesson: string
  currentLessonKh: string
}

/** One day in the weekly activity strip */
export interface IWeekDay {
  /** Translation key under dashboard.days */
  key: string
  lessons: number
  isToday?: boolean
}

/** Mirrors the badges table — awarded via user_badges */
export interface IBadge {
  key: string
  icon: string
  earned: boolean
  /** Percent toward unlocking, when not yet earned */
  progress?: number
}

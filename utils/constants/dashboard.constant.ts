import type { IStudent, IActiveCourse, IWeekDay, IBadge } from "@/utils/interfaces/dashboard"
import { courseLessons, defaultLessonId } from "./course-content.constant"

/* ── Student ─────────────────────────────────────────────────────────── */

export const studentData: IStudent = {
  name: "Sok Dara",
  nameKh: "សុខ ដារ៉ា",
  level: 8,
  xp: 2450,
  xpToNext: 3000,
  streak: 6,
  weeklyGoal: 8,
  avatar: "SD",
}

/* ── Active courses ──────────────────────────────────────────────────── */

/** Identity only — progress is derived from the real lesson data below. */
const ENROLLED = [
  { id: "python", title: "Python Fundamentals", titleKh: "មូលដ្ឋានគ្រឹះ Python", icon: "Terminal", color: "violet" },
  { id: "react",  title: "Web Dev with React",  titleKh: "បង្កើតគេហទំព័រ React",  icon: "Code2",    color: "cyan"   },
]

/**
 * Progress comes straight from the course modules, so the dashboard, the
 * catalog, the course page and the player can never disagree.
 */
export const activeCourses: IActiveCourse[] = ENROLLED.map((course) => {
  const lessons = courseLessons(course.id)
  const done    = lessons.filter((l) => l.done).length
  const current = lessons.find((l) => l.id === defaultLessonId(course.id)) ?? lessons[0]

  return {
    ...course,
    completedLessons: done,
    totalLessons:     lessons.length,
    progress:         lessons.length ? Math.round((done / lessons.length) * 100) : 0,
    currentLessonId:  current?.id ?? 1,
    currentLesson:    current?.title ?? "",
    currentLessonKh:  current?.titleKh ?? "",
  }
})

/* ── Weekly activity ─────────────────────────────────────────────────── */

/** Lessons finished per day this week — drives the streak strip. */
export const weeklyActivity: IWeekDay[] = [
  { key: "mon", lessons: 1 },
  { key: "tue", lessons: 1 },
  { key: "wed", lessons: 2 },
  { key: "thu", lessons: 1 },
  { key: "fri", lessons: 1 },
  { key: "sat", lessons: 1 },
  { key: "sun", lessons: 0, isToday: true },
]

export const weeklyDone = weeklyActivity.reduce((sum, d) => sum + d.lessons, 0)

/* ── Badges ──────────────────────────────────────────────────────────── */

export const badges: IBadge[] = [
  { key: "firstSteps",   icon: "Footprints", earned: true },
  { key: "moduleMaster", icon: "Medal",      earned: true },
  { key: "bilingual",    icon: "Languages",  earned: true },
  { key: "weekStreak",   icon: "Flame",      earned: false, progress: 86 },
  { key: "challenger",   icon: "Trophy",     earned: false, progress: 40 },
  { key: "centurion",    icon: "Zap",        earned: false, progress: 24 },
]

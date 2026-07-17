import type { IModule } from "@/utils/interfaces/learn"
import { PYTHON_MODULES } from "./learn.constant"
import { COURSE_DETAILS } from "./course-detail.constant"

/**
 * Course slug → lesson modules for the player.
 *
 * Python Fundamentals is the only course with fully authored lessons today.
 * Every other course contributes its syllabus, so the player can show the real
 * outline while individual lessons render a "not ready yet" state until their
 * content is written.
 */
export const COURSE_MODULES: Record<string, IModule[]> = {
  ...Object.fromEntries(
    Object.entries(COURSE_DETAILS).map(([slug, detail]) => [slug, detail.syllabus])
  ),
  python: PYTHON_MODULES,
}

/** Flat lesson list for a course, in outline order. */
export function courseLessons(slug: string) {
  return (COURSE_MODULES[slug] ?? []).flatMap((m) => m.lessons)
}

/** The lesson a course should open on: explicit current → first unfinished → first. */
export function defaultLessonId(slug: string) {
  const lessons = courseLessons(slug)
  const lesson =
    lessons.find((l) => l.current) ??
    lessons.find((l) => !l.done && !l.locked) ??
    lessons[0]
  return lesson?.id
}

import { apiGet } from "./client"
import type {
  IApiCourse,
  IApiSubject,
  IApiGradeLevel,
  IApiProgrammingCategory,
  IApiFaculty,
  IApiModule,
  IApiLesson,
} from "@/utils/interfaces/catalog/api.interface"

export const getSubjects = () => apiGet<IApiSubject[]>("/subject")
export const getGradeLevels = () => apiGet<IApiGradeLevel[]>("/grade-level")
export const getProgrammingCategories = () =>
  apiGet<IApiProgrammingCategory[]>("/programming-category")
export const getFaculties = () => apiGet<IApiFaculty[]>("/faculty")
export const getCourses = () => apiGet<IApiCourse[]>("/course/published")

export const getCourseModules = (courseId: string) =>
  apiGet<IApiModule[]>(`/module?courseId=${courseId}`)
export const getModuleLessons = (moduleId: string) =>
  apiGet<IApiLesson[]>(`/lesson?moduleId=${moduleId}`)

/** Total lesson count for a course — walks course → modules → lessons. */
export async function getCourseLessonCount(courseId: string): Promise<number> {
  const modules = await getCourseModules(courseId)
  const counts = await Promise.all(
    modules.map((m) => getModuleLessons(m.id).then((lessons) => lessons.length))
  )
  return counts.reduce((sum, n) => sum + n, 0)
}

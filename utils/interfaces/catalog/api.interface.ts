/** Mirrors CourseResponseDTO in apsara-elearning-api (libs/contracts). */
export interface IApiCourse {
  id: string
  programType: "k12" | "university" | "programming"
  title: string
  titleKm?: string
  slug: string
  subjectId?: string
  gradeLevelId?: string
  majorId?: string
  categoryId?: string
  description?: string
  descriptionKm?: string
  thumbnail?: string
  difficulty?: "beginner" | "intermediate" | "advanced"
  estimatedHours?: number
  published?: boolean
  createdAt: string
  updatedAt: string
}

/** Mirrors SubjectResponseDTO. */
export interface IApiSubject {
  id: string
  name: string
  nameKm?: string
  slug: string
  description?: string
  descriptionKm?: string
  icon?: string
  createdAt: string
  updatedAt: string
}

/** Mirrors GradeLevelResponseDTO. */
export interface IApiGradeLevel {
  id: string
  stage: "primary" | "lower_secondary" | "upper_secondary"
  grade: number
  name: string
  nameKm?: string
  order?: number
  createdAt: string
  updatedAt: string
}

/** Mirrors ProgrammingCategoryResponseDTO. */
export interface IApiProgrammingCategory {
  id: string
  name: string
  nameKm?: string
  slug: string
  description?: string
  descriptionKm?: string
  icon?: string
  createdAt: string
  updatedAt: string
}

/** Mirrors FacultyResponseDTO. */
export interface IApiFaculty {
  id: string
  name: string
  nameKm?: string
  slug: string
  description?: string
  icon?: string
  createdAt: string
  updatedAt: string
}

/** Mirrors ModuleResponseDTO — just the fields the catalog needs. */
export interface IApiModule {
  id: string
  courseId: string
  title: string
  order: number
}

/** Mirrors LessonResponseDTO — just the fields the catalog needs. */
export interface IApiLesson {
  id: string
  moduleId: string
  title: string
  order: number
}

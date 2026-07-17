import type { TColorKey } from "@/utils/constants/landing.constant"

/* ── Catalog tracks ──────────────────────────────────────────────────── */

export type TCatalogTrack = "k12" | "programming" | "university"

/* ── K-12 subjects ───────────────────────────────────────────────────── */

export interface IK12Subject {
  key: string
  icon: string
  color: TColorKey
  /** Inclusive grade range this subject is taught in */
  grades: [number, number]
  /** Approximate lessons per grade-year course */
  lessons: number
  /** Link to a course detail page, when content exists */
  detail?: {
    slug: string
    /** Grades the detail course covers — "all" or specific grades */
    grades: number[] | "all"
  }
}

/* ── Programming categories ──────────────────────────────────────────── */

export interface IProgrammingCategory {
  key: string
  /** Matches `programming_categories.slug` in the API */
  slug: string
  icon: string
  color: TColorKey
}

/* ── University faculties (coming-soon teaser) ───────────────────────── */

export interface IUniversityFaculty {
  key: string
  icon: string
}

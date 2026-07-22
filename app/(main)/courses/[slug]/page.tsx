"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter, notFound } from "next/navigation"
import {
  ArrowLeft, ArrowRight, BookOpen, CheckCircle2,
  ChevronDown, Circle, Clock, GraduationCap, School, Sparkles,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { AppShell } from "@/components/utils/app-shell"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { Skeleton } from "@/components/ui/skeleton"
import { TypographyH2 } from "@/components/utils/typography/typography-h2"
import { TypographyH3 } from "@/components/utils/typography/typography-h3"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"
import { COLOR } from "@/utils/constants/landing.constant"
import { useLanguageStore } from "@/stores/languages/language-store"
import { getCourseBySlug, getCourseStructure, getGradeLevels } from "@/lib/api/catalog"
import { checkEnrollment, enrollInCourse, unenrollFromCourse } from "@/lib/api/enrollment"
import { getMyLessonProgress } from "@/lib/api/lesson-progress"
import { ApiError } from "@/lib/api/client"
import { ConfirmDialog } from "@/components/utils/confirm-dialog"
import type {
  IApiCourse, IApiGradeLevel, IApiModuleWithLessons,
} from "@/utils/interfaces/catalog/api.interface"
import type { IApiEnrollment } from "@/utils/interfaces/enrollment/api.interface"

/* ── Colour mappings ─────────────────────────────────────────────────── */

const LEVEL_BADGE: Record<"beginner" | "intermediate" | "advanced", string> = {
  beginner:     "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  intermediate: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300",
  advanced:     "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
}

const GRADE_BADGE     = "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
const ALL_GRADE_BADGE = "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"

/* ── Page: fully API-backed; an unknown slug is a 404 ────────────────── */

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  const [status, setStatus] = useState<"loading" | "found" | "not-found">("loading")
  const [apiCourse, setApiCourse] = useState<IApiCourse | null>(null)
  const [structure, setStructure] = useState<IApiModuleWithLessons[]>([])
  const [gradeLevels, setGradeLevels] = useState<IApiGradeLevel[]>([])

  useEffect(() => {
    let cancelled = false
    setStatus("loading")

    getCourseBySlug(slug)
      .then(async (course) => {
        const [courseStructure, courseGradeLevels] = await Promise.all([
          getCourseStructure(course.id),
          course.programType === "k12" ? getGradeLevels() : Promise.resolve([]),
        ])
        if (cancelled) return
        setApiCourse(course)
        setStructure(courseStructure)
        setGradeLevels(courseGradeLevels)
        setStatus("found")
      })
      .catch(() => {
        if (!cancelled) setStatus("not-found")
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  if (status === "loading") {
    return (
      <AppShell>
        <div className="max-w-5xl mx-auto space-y-8">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </AppShell>
    )
  }

  if (status === "found" && apiCourse) {
    return <ApiCourseDetail course={apiCourse} structure={structure} gradeLevels={gradeLevels} />
  }

  notFound()
}

/* ── Real (API-backed) course detail — simplified, no fabricated stats ─ */

function ApiCourseDetail({
  course, structure, gradeLevels,
}: {
  course: IApiCourse
  structure: IApiModuleWithLessons[]
  gradeLevels: IApiGradeLevel[]
}) {
  const t = useTranslations("courseDetail")
  const router = useRouter()
  const { language } = useLanguageStore()
  const nameOf = (en: string, km?: string) => (language === "km" && km ? km : en)

  const [enrollment, setEnrollment] = useState<IApiEnrollment | null>(null)
  const [enrollPending, setEnrollPending] = useState(false)
  const [enrollError, setEnrollError] = useState<string | null>(null)
  const [justEnrolled, setJustEnrolled] = useState(false)
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())

  /* A guest (or expired session) simply sees the enroll CTA — the click
     redirects to login, so the check failing is not an error state. */
  useEffect(() => {
    let cancelled = false
    Promise.all([
      checkEnrollment(course.id).catch(() => ({ enrollment: null })),
      getMyLessonProgress().catch(() => []),
    ]).then(([res, progress]) => {
      if (cancelled) return
      setEnrollment(res.enrollment)
      setCompletedIds(
        new Set(progress.filter((p) => p.completed).map((p) => p.lessonId))
      )
    })
    return () => {
      cancelled = true
    }
  }, [course.id])

  const enroll = async () => {
    setEnrollPending(true)
    setEnrollError(null)
    try {
      const created = await enrollInCourse(course.id)
      setEnrollment(created)
      setJustEnrolled(true)
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        router.push(`/login?next=/courses/${course.slug}`)
        return
      }
      setEnrollError(t("enrollError"))
    } finally {
      setEnrollPending(false)
    }
  }

  const unenroll = async () => {
    setEnrollError(null)
    try {
      await unenrollFromCourse(course.id)
      setEnrollment(null)
      setJustEnrolled(false)
    } catch {
      setEnrollError(t("enrollError"))
    }
  }

  const [openModule, setOpenModule] = useState(0)

  const totalLessons = structure.reduce((sum, m) => sum + m.lessons.length, 0)
  const gradeLevel = gradeLevels.find((g) => g.id === course.gradeLevelId)
  const colors = COLOR.violet

  const placement = course.programType === "k12"
    ? {
        icon:      School,
        statLabel: t("statGrade"),
        value:     gradeLevel ? t("gradeLabel", { grade: gradeLevel.grade }) : t("allGrades"),
        badge:     GRADE_BADGE,
      }
    : {
        icon:      GraduationCap,
        statLabel: t("statLevel"),
        value:     course.difficulty ? t(`levels.${course.difficulty}`) : "",
        badge:     course.difficulty ? LEVEL_BADGE[course.difficulty] : ALL_GRADE_BADGE,
      }

  const stats = [
    { icon: placement.icon, label: placement.statLabel, value: placement.value },
    { icon: BookOpen,       label: t("statLessons"),  value: t("lessonsCount", { count: totalLessons }) },
    ...(course.estimatedHours
      ? [{ icon: Clock, label: t("statDuration"), value: t("hoursCount", { count: course.estimatedHours }) }]
      : []),
  ]

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-8">

        <AnimateIn animation="fade-up" delay={0.05}>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            {t("back")}
          </Link>
        </AnimateIn>

        {/* Hero */}
        <AnimateIn animation="fade-up" delay={0.1}>
          <div className={`card-surface rounded-2xl p-6 sm:p-8 border ${colors.border}`}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className={`size-16 rounded-2xl ${colors.bg} flex items-center justify-center shrink-0`}>
                <BookOpen className={`size-8 ${colors.icon}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${placement.badge}`}>
                    {placement.value}
                  </span>
                </div>
                <TypographyH2 className="text-2xl sm:text-3xl font-bold text-foreground border-0 pb-0 mb-1">
                  {nameOf(course.title, course.titleKm)}
                </TypographyH2>
                {course.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    {nameOf(course.description, course.descriptionKm)}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-border">
              {stats.map(({ icon: StatIcon, label, value }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className={`size-9 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                    <StatIcon className={`size-4 ${colors.icon}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
                    <div className="text-sm font-semibold text-foreground truncate">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          <div className="lg:col-span-2 space-y-8">
            <AnimateIn animation="fade-up" delay={0.2}>
              <div>
                <div className="flex items-baseline justify-between mb-3 gap-2 flex-wrap">
                  <TypographyH3 className="text-lg font-bold text-foreground">
                    {t("syllabusTitle")}
                  </TypographyH3>
                  <TypographyMuted className="text-xs">
                    {t("modulesCount", { count: structure.length })} · {t("lessonsCount", { count: totalLessons })}
                  </TypographyMuted>
                </div>

                <div className="space-y-3">
                  {structure.map((mod, mi) => {
                    const open = openModule === mi
                    return (
                      <div key={mod.id} className="card-surface rounded-2xl border border-border overflow-hidden">
                        <button
                          onClick={() => setOpenModule(open ? -1 : mi)}
                          className="w-full flex items-center gap-3 px-4 sm:px-5 py-4 text-left hover:bg-muted/40 transition-colors"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-sm text-foreground">{mod.title}</div>
                            {mod.description && (
                              <div className="text-[11px] text-muted-foreground">{mod.description}</div>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {enrollment
                              ? `${mod.lessons.filter((l) => completedIds.has(l.id)).length}/${mod.lessons.length}`
                              : mod.lessons.length}
                          </span>
                          <ChevronDown
                            className={`size-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                          />
                        </button>

                        {open && (
                          <div className="border-t border-border">
                            {mod.lessons.map((lesson) => (
                              <Link key={lesson.id} href={`/learn/${course.slug}/${lesson.slug}`}>
                                <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-border last:border-b-0 hover:bg-muted/40 transition-colors cursor-pointer">
                                  <BookOpen className={`size-4 shrink-0 ${colors.icon}`} />
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm text-foreground leading-tight">{lesson.title}</div>
                                  </div>
                                  {lesson.estimatedMinutes && (
                                    <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                                      <Clock className="size-3" />
                                      {lesson.estimatedMinutes} min
                                    </span>
                                  )}
                                  {completedIds.has(lesson.id) ? (
                                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                                  ) : (
                                    <Circle className="size-4 text-muted-foreground/50 shrink-0" />
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </AnimateIn>
          </div>

          <AnimateIn animation="fade-left" delay={0.2} className="lg:sticky lg:top-6">
            <div className={`card-surface rounded-2xl p-5 border ${colors.border} space-y-5`}>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold gradient-text">{t("free")}</span>
                <span className="text-xs text-muted-foreground">{t("freeNote")}</span>
              </div>

              {/* Progress (enrolled only) */}
              {enrollment && !justEnrolled && (
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{t("yourProgress")}</span>
                    <span className="font-semibold text-foreground">{enrollment.progressPercent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full gradient-bg-primary transition-all"
                      style={{ width: `${enrollment.progressPercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    {t("completedOf", {
                      done: structure.flatMap((m) => m.lessons).filter((l) => completedIds.has(l.id)).length,
                      total: totalLessons,
                    })}
                  </p>
                </div>
              )}

              {enrollment ? (
                <>
                  <Link href={`/learn/${course.slug}`} className="block">
                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold gradient-bg-primary text-white hover:opacity-90 transition-all btn-shine">
                      {justEnrolled ? t("startLearning") : t("continueLearning")}
                      <ArrowRight className="size-4" />
                    </button>
                  </Link>
                  <ConfirmDialog
                    title={t("unenrollTitle")}
                    description={t("unenrollDesc")}
                    variant="danger"
                    onConfirm={unenroll}
                  >
                    <button className="w-full text-center text-xs text-muted-foreground hover:text-destructive transition-colors">
                      {t("unenroll")}
                    </button>
                  </ConfirmDialog>
                </>
              ) : (
                <button
                  onClick={enroll}
                  disabled={enrollPending}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold gradient-bg-primary text-white hover:opacity-90 transition-all btn-shine disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Sparkles className="size-4" />
                  {enrollPending ? t("enrolling") : t("enrollNow")}
                </button>
              )}

              {enrollError && (
                <p className="text-xs text-destructive text-center">{enrollError}</p>
              )}
            </div>
          </AnimateIn>
        </div>

      </div>
    </AppShell>
  )
}

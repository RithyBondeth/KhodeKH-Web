"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  ArrowLeft, ArrowRight, Atom, BookOpen, Brain, Calculator, CheckCircle2,
  ChevronDown, Circle, Clock, Code2, GraduationCap, Languages, Lock,
  PencilLine, Play, School, Sparkles, Terminal, Trophy, Users, Zap,
} from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { AppShell } from "@/components/utils/app-shell"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { Skeleton } from "@/components/ui/skeleton"
import { TypographyH2 } from "@/components/utils/typography/typography-h2"
import { TypographyH3 } from "@/components/utils/typography/typography-h3"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"
import { toKhmerNumerals } from "@/utils/functions/format"
import { COLOR } from "@/utils/constants/landing.constant"
import { COURSE_DETAILS } from "@/utils/constants/course-detail.constant"
import { activeCourses } from "@/utils/constants/dashboard.constant"
import { useLanguageStore } from "@/stores/languages/language-store"
import { getCourseBySlug, getCourseStructure, getGradeLevels } from "@/lib/api/catalog"
import type { ISyllabusLesson, TCourseLevel } from "@/utils/interfaces/course-detail"
import type {
  IApiCourse, IApiGradeLevel, IApiModuleWithLessons,
} from "@/utils/interfaces/catalog/api.interface"

/* ── Icon + colour mappings ──────────────────────────────────────────── */

const ICON_MAP: Record<string, React.ElementType> = {
  Terminal,
  Code2,
  Brain,
  Calculator,
  Atom,
  Languages,
}

const LESSON_TYPE_ICON: Record<ISyllabusLesson["type"], React.ElementType> = {
  theory:    BookOpen,
  practice:  PencilLine,
  challenge: Trophy,
}

const LEVEL_BADGE: Record<TCourseLevel, string> = {
  beginner:     "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  intermediate: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300",
  advanced:     "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
}

const GRADE_BADGE     = "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
const ALL_GRADE_BADGE = "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"

/* ── Page: tries the real API by slug first, falls back to mock data ─── */

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

  if (!COURSE_DETAILS[slug]) notFound()
  return <MockCourseDetail slug={slug} />
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
  const { language } = useLanguageStore()
  const nameOf = (en: string, km?: string) => (language === "km" && km ? km : en)

  const enrolledCourse = activeCourses.find((c) => c.id === course.slug)
  const [justEnrolled, setJustEnrolled] = useState(false)
  const enrolled = Boolean(enrolledCourse) || justEnrolled

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
                            {mod.lessons.length}
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
                                  <Circle className="size-4 text-muted-foreground/50 shrink-0" />
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

              {enrolled ? (
                <Link href={`/learn/${course.slug}`} className="block">
                  <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold gradient-bg-primary text-white hover:opacity-90 transition-all btn-shine">
                    {justEnrolled ? t("startLearning") : t("continueLearning")}
                    <ArrowRight className="size-4" />
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => setJustEnrolled(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold gradient-bg-primary text-white hover:opacity-90 transition-all btn-shine"
                >
                  <Sparkles className="size-4" />
                  {t("enrollNow")}
                </button>
              )}
            </div>
          </AnimateIn>
        </div>

      </div>
    </AppShell>
  )
}

/* ── Legacy mock course detail — unchanged behaviour for un-seeded courses ── */

function MockCourseDetail({ slug }: { slug: string }) {
  const t      = useTranslations("courseDetail")
  const tc     = useTranslations("courses")
  const locale = useLocale()

  const course = COURSE_DETAILS[slug]

  const enrolledCourse = activeCourses.find((c) => c.id === slug)
  const [justEnrolled, setJustEnrolled] = useState(false)
  const enrolled = Boolean(enrolledCourse) || justEnrolled

  const [openModule, setOpenModule] = useState(0)

  if (!course) notFound()

  const colors      = COLOR[course.color]
  const Icon        = ICON_MAP[course.icon] ?? BookOpen
  const shownCount  = course.syllabus.reduce((s, m) => s + m.lessons.length, 0)
  const hiddenCount = course.totalLessons - shownCount

  /* How a course is placed differs by track: K-12 by grade, the rest by difficulty. */
  const placement = course.track === "k12"
    ? {
        icon:      School,
        statLabel: t("statGrade"),
        value:     course.grade === "all"
          ? t("allGrades")
          : t("gradeLabel", {
              grade: locale === "km" ? toKhmerNumerals(course.grade) : course.grade,
            }),
        badge:     course.grade === "all" ? ALL_GRADE_BADGE : GRADE_BADGE,
      }
    : {
        icon:      GraduationCap,
        statLabel: t("statLevel"),
        value:     t(`levels.${course.level}`),
        badge:     LEVEL_BADGE[course.level],
      }

  const stats = [
    { icon: placement.icon, label: placement.statLabel, value: placement.value },
    { icon: BookOpen,      label: t("statLessons"),  value: t("lessonsCount", { count: course.totalLessons }) },
    { icon: Clock,         label: t("statDuration"), value: t("hoursCount", { count: course.hours }) },
    { icon: Zap,           label: t("statXp"),       value: t("totalXp", { xp: course.totalXp }) },
    { icon: Users,         label: t("statStudents"), value: t("studentsCount", { count: course.students }) },
  ]

  const includes = [
    { icon: Brain,     label: t("includeAi") },
    { icon: PencilLine,label: t("includeExercises") },
    { icon: Trophy,    label: t("includeCertificate") },
    { icon: Zap,       label: t("includeXp") },
  ]

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Back link */}
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
                <Icon className={`size-8 ${colors.icon}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
                    {tc(`${course.key}.tag`)}
                  </span>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${placement.badge}`}>
                    {placement.value}
                  </span>
                </div>
                <TypographyH2 className="text-2xl sm:text-3xl font-bold text-foreground border-0 pb-0 mb-1">
                  {tc(`${course.key}.title`)}
                </TypographyH2>
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Languages className="size-3.5" />
                  {tc(`${course.key}.titleKh`)}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tc(`${course.key}.desc`)}
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-border">
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

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* ── Left column ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* About */}
            <AnimateIn animation="fade-up" delay={0.15}>
              <div>
                <TypographyH3 className="text-lg font-bold text-foreground mb-3">
                  {t("aboutTitle")}
                </TypographyH3>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`${course.key}.about`)}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`${course.key}.about2`)}
                  </p>
                </div>
              </div>
            </AnimateIn>

            {/* What you'll learn */}
            <AnimateIn animation="fade-up" delay={0.2}>
              <div>
                <TypographyH3 className="text-lg font-bold text-foreground mb-3">
                  {t("outcomesTitle")}
                </TypographyH3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: course.outcomes }, (_, i) => (
                    <div
                      key={i}
                      className="card-surface rounded-xl p-3.5 border border-border flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground leading-relaxed">
                        {t(`${course.key}.outcome${i + 1}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            {/* Syllabus */}
            <AnimateIn animation="fade-up" delay={0.25}>
              <div>
                <div className="flex items-baseline justify-between mb-3 gap-2 flex-wrap">
                  <TypographyH3 className="text-lg font-bold text-foreground">
                    {t("syllabusTitle")}
                  </TypographyH3>
                  <TypographyMuted className="text-xs">
                    {t("modulesCount", { count: course.syllabus.length })} · {t("lessonsCount", { count: course.totalLessons })}
                  </TypographyMuted>
                </div>

                <div className="space-y-3">
                  {course.syllabus.map((mod, mi) => {
                    const open      = openModule === mi
                    const doneCount = mod.lessons.filter((l) => l.done).length

                    return (
                      <div key={mod.section} className="card-surface rounded-2xl border border-border overflow-hidden">
                        {/* Module header */}
                        <button
                          onClick={() => setOpenModule(open ? -1 : mi)}
                          className="w-full flex items-center gap-3 px-4 sm:px-5 py-4 text-left hover:bg-muted/40 transition-colors"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-sm text-foreground">{mod.section}</div>
                            <div className="text-[11px] text-muted-foreground">{mod.sectionKh}</div>
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {doneCount}/{mod.lessons.length}
                          </span>
                          <ChevronDown
                            className={`size-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Lessons */}
                        {open && (
                          <div className="border-t border-border">
                            {mod.lessons.map((lesson) => {
                              const TypeIcon = LESSON_TYPE_ICON[lesson.type]
                              const locked   = lesson.locked || (!enrolled && !lesson.done)
                              const row = (
                                <div
                                  className={`flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-border last:border-b-0 ${
                                    locked
                                      ? "opacity-55 select-none"
                                      : "hover:bg-muted/40 transition-colors cursor-pointer"
                                  } ${lesson.current ? "bg-violet-50/60 dark:bg-violet-500/10" : ""}`}
                                >
                                  <TypeIcon className={`size-4 shrink-0 ${colors.icon}`} />
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm text-foreground leading-tight">{lesson.title}</div>
                                    <div className="text-[11px] text-muted-foreground">{lesson.titleKh}</div>
                                  </div>
                                  <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                                    <Clock className="size-3" />
                                    {lesson.duration}
                                  </span>
                                  <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                                    <Zap className="size-3" />
                                    {lesson.xpReward}
                                  </span>
                                  {lesson.done ? (
                                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                                  ) : lesson.current ? (
                                    <Play className="size-4 text-violet-500 shrink-0" />
                                  ) : locked ? (
                                    <Lock className="size-4 text-muted-foreground shrink-0" />
                                  ) : (
                                    <Circle className="size-4 text-muted-foreground/50 shrink-0" />
                                  )}
                                </div>
                              )

                              return locked ? (
                                <div key={lesson.id}>{row}</div>
                              ) : (
                                <Link key={lesson.id} href={`/learn/${slug}/${lesson.id}`}>{row}</Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {/* Teaser for lessons beyond the shown modules */}
                  {hiddenCount > 0 && (
                    <div className="rounded-2xl border border-dashed border-border px-5 py-4 flex items-center gap-3 text-muted-foreground select-none">
                      <Lock className="size-4 shrink-0" />
                      <span className="text-sm">{t("moreLessons", { count: hiddenCount })}</span>
                    </div>
                  )}
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* ── Right column: sticky enroll card ── */}
          <AnimateIn animation="fade-left" delay={0.2} className="lg:sticky lg:top-6">
            <div className={`card-surface rounded-2xl p-5 border ${colors.border} space-y-5`}>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold gradient-text">{t("free")}</span>
                <span className="text-xs text-muted-foreground">{t("freeNote")}</span>
              </div>

              {/* Progress (enrolled only) */}
              {enrolledCourse && (
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{t("yourProgress")}</span>
                    <span className="font-semibold text-foreground">{enrolledCourse.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full gradient-bg-primary transition-all"
                      style={{ width: `${enrolledCourse.progress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    {t("completedOf", {
                      done:  enrolledCourse.completedLessons,
                      total: enrolledCourse.totalLessons,
                    })}
                  </p>
                </div>
              )}

              {/* CTA */}
              {enrolled ? (
                <Link href={`/learn/${slug}`} className="block">
                  <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold gradient-bg-primary text-white hover:opacity-90 transition-all btn-shine">
                    {justEnrolled ? t("startLearning") : t("continueLearning")}
                    <ArrowRight className="size-4" />
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => setJustEnrolled(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold gradient-bg-primary text-white hover:opacity-90 transition-all btn-shine"
                >
                  <Sparkles className="size-4" />
                  {t("enrollNow")}
                </button>
              )}

              {/* Includes */}
              <div className="pt-4 border-t border-border">
                <div className="text-xs font-semibold text-foreground mb-3">{t("includesTitle")}</div>
                <ul className="space-y-2.5">
                  {includes.map(({ icon: IncIcon, label }) => (
                    <li key={label} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <IncIcon className={`size-4 shrink-0 mt-0.5 ${colors.icon}`} />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateIn>
        </div>

      </div>
    </AppShell>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight, Atom, BookOpen, Briefcase, Calculator, Clock, Code2, Cog,
  Cpu, Dna, FlaskConical, Globe, GraduationCap, Landmark, Languages, Lock,
  Microscope, Scale, School, Sparkles, Stethoscope, Users, Zap,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { AppShell } from "@/components/utils/app-shell"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { TypographyH2 } from "@/components/utils/typography/typography-h2"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"
import { activeCourses } from "@/utils/constants/dashboard.constant"
import { COLOR, COURSES } from "@/utils/constants/landing.constant"
import { GRADES, K12_SUBJECTS, UNIVERSITY_FACULTIES } from "@/utils/constants/catalog.constant"
import type { TCatalogTrack } from "@/utils/interfaces/catalog"

/* ── Icon mapping ────────────────────────────────────────────────────── */

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen, Calculator, Languages, Microscope, Users, Atom, FlaskConical,
  Dna, Landmark, Globe, Cog, Stethoscope, Briefcase, Cpu, Scale, School,
}

/* ── Level → colour mappings (programming track) ─────────────────────── */

const LEVEL_COLORS: Record<string, {
  badge: string
  bar: string
  ring: string
  icon: string
}> = {
  Beginner: {
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    bar:   "from-emerald-500 to-emerald-400",
    ring:  "border-emerald-200 dark:border-emerald-500/25",
    icon:  "bg-emerald-100 dark:bg-emerald-500/15",
  },
  Intermediate: {
    badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300",
    bar:   "from-cyan-500 to-cyan-400",
    ring:  "border-cyan-200 dark:border-cyan-500/25",
    icon:  "bg-cyan-100 dark:bg-cyan-500/15",
  },
  Advanced: {
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    bar:   "from-amber-500 to-amber-400",
    ring:  "border-amber-200 dark:border-amber-500/25",
    icon:  "bg-amber-100 dark:bg-amber-500/15",
  },
}

const TRACKS: { key: TCatalogTrack; icon: React.ElementType }[] = [
  { key: "k12",         icon: School        },
  { key: "programming", icon: Code2         },
  { key: "university",  icon: GraduationCap },
]

type TFilter = "All" | "Beginner" | "Intermediate" | "Advanced"

export default function CoursesPage() {
  const t = useTranslations("courses")

  const [track,  setTrack]  = useState<TCatalogTrack>("k12")
  const [grade,  setGrade]  = useState(12)
  const [filter, setFilter] = useState<TFilter>("All")

  /* Build a lookup: course key → enrolled progress data */
  const enrolledMap = Object.fromEntries(
    activeCourses.map((c) => [c.id, c])
  )

  const trackLabels: Record<TCatalogTrack, string> = {
    k12:         t("trackK12"),
    programming: t("trackProgramming"),
    university:  t("trackUniversity"),
  }

  const filters: TFilter[] = ["All", "Beginner", "Intermediate", "Advanced"]
  const filterKeys: Record<TFilter, string> = {
    All:          t("filterAll"),
    Beginner:     t("filterBeginner"),
    Intermediate: t("filterIntermediate"),
    Advanced:     t("filterAdvanced"),
  }

  const visible = filter === "All"
    ? COURSES
    : COURSES.filter((c) => c.level === filter)

  const gradeSubjects = K12_SUBJECTS.filter(
    (s) => grade >= s.grades[0] && grade <= s.grades[1]
  )

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Page header */}
        <AnimateIn animation="fade-up" delay={0.05}>
          <div>
            <TypographyH2 className="text-2xl font-bold text-foreground border-0 pb-0 mb-1">
              {t("pageTitle")}
            </TypographyH2>
            <TypographyMuted>{t("pageSubtitle")}</TypographyMuted>
          </div>
        </AnimateIn>

        {/* Track switcher */}
        <AnimateIn animation="fade-up" delay={0.1}>
          <div className="flex items-center gap-2 flex-wrap">
            {TRACKS.map(({ key, icon: TrackIcon }) => (
              <button
                key={key}
                onClick={() => setTrack(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  track === key
                    ? "gradient-bg-primary text-white shadow-md"
                    : "card-surface text-muted-foreground hover:text-foreground border border-border hover:border-violet-300 dark:hover:border-violet-500/40"
                }`}
              >
                <TrackIcon className="size-4" />
                {trackLabels[key]}
              </button>
            ))}
          </div>
        </AnimateIn>

        {/* ── K-12 track ── */}
        {track === "k12" && (
          <div className="space-y-6">

            {/* Grade picker */}
            <AnimateIn animation="fade-up" delay={0.15}>
              <div>
                <TypographyMuted className="text-xs mb-2.5">{t("k12Subtitle")}</TypographyMuted>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {GRADES.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGrade(g)}
                      className={`size-10 rounded-xl text-sm font-semibold transition-all ${
                        grade === g
                          ? "gradient-bg-primary text-white shadow-md"
                          : "card-surface text-muted-foreground hover:text-foreground border border-border hover:border-violet-300 dark:hover:border-violet-500/40"
                      }`}
                      aria-label={t("gradeLabel", { n: g })}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </AnimateIn>

            {/* BacII banner on Grade 12 */}
            {grade === 12 && (
              <div className="card-surface rounded-2xl px-5 py-3.5 border border-violet-200 dark:border-violet-500/25 flex items-center gap-3">
                <div className="size-9 rounded-xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center shrink-0">
                  <Sparkles className="size-4 text-violet-600 dark:text-violet-400" />
                </div>
                <p className="text-sm text-muted-foreground">{t("bacIIBanner")}</p>
              </div>
            )}

            {/* Subject grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {gradeSubjects.map((subject) => {
                const colors    = COLOR[subject.color]
                const Icon      = ICON_MAP[subject.icon] ?? BookOpen
                const available = subject.detail &&
                  (subject.detail.grades === "all" || subject.detail.grades.includes(grade))

                const card = (
                  <div className={`card-surface rounded-2xl p-5 flex flex-col gap-4 border h-full transition-all ${
                    available
                      ? `${colors.border} hover:shadow-lg group cursor-pointer`
                      : "border-dashed border-border"
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className={`size-12 rounded-2xl ${colors.bg} flex items-center justify-center`}>
                        <Icon className={`size-6 ${colors.icon}`} />
                      </div>
                      {available ? (
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
                          {t("gradeLabel", { n: grade })}
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                          {t("comingSoon")}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className={`font-semibold text-base leading-tight ${available ? "text-foreground" : "text-muted-foreground"}`}>
                        {t(`subjects.${subject.key}`)}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {t(`subjectsKh.${subject.key}`)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="size-3.5" />
                        {t("lessons", { count: subject.lessons })}
                      </span>
                      {available && (
                        <span className="flex items-center gap-1 font-semibold text-violet-600 dark:text-violet-400">
                          {t("enroll")}
                          <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      )}
                    </div>
                  </div>
                )

                return available ? (
                  <Link key={subject.key} href={`/courses/${subject.detail!.slug}`}>{card}</Link>
                ) : (
                  <div key={subject.key}>{card}</div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Programming & Skills track ── */}
        {track === "programming" && (
          <div className="space-y-6">

            {/* Filter tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filter === f
                      ? "gradient-bg-primary text-white shadow-md"
                      : "card-surface text-muted-foreground hover:text-foreground border border-border hover:border-violet-300 dark:hover:border-violet-500/40"
                  }`}
                >
                  {filterKeys[f]}
                  <span className={`ml-1.5 text-xs ${filter === f ? "text-white/80" : "text-muted-foreground"}`}>
                    ({f === "All" ? COURSES.length : COURSES.filter((c) => c.level === f).length})
                  </span>
                </button>
              ))}
            </div>

            {/* Course grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {visible.map((course) => {
                const enrolled = enrolledMap[course.key]
                const colors   = LEVEL_COLORS[course.level]

                return (
                  <div key={course.key} className={`card-surface rounded-2xl p-5 flex flex-col gap-4 border hover:shadow-lg transition-all group ${colors.ring}`}>

                    {/* Top row: icon + level badge */}
                    <div className="flex items-start justify-between">
                      <div className={`size-14 rounded-2xl ${colors.icon} flex items-center justify-center text-3xl leading-none`}>
                        {course.icon}
                      </div>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
                        {course.level}
                      </span>
                    </div>

                    {/* Title + tag */}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <h3 className="font-semibold text-foreground text-base leading-tight">
                          {t(`${course.key}.title`)}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
                          {t(`${course.key}.tag`)}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {t(`${course.key}.titleKh`)}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {t(`${course.key}.desc`)}
                    </p>

                    {/* Meta: lessons + XP */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="size-3.5" />
                        {t("lessons", { count: course.lessons })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Zap className="size-3.5" />
                        {t("xpReward", { xp: course.xp })}
                      </span>
                    </div>

                    {/* Progress (if enrolled) */}
                    {enrolled && (
                      <div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {enrolled.currentLesson}
                          </span>
                          <span className="font-medium text-foreground">{enrolled.progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${colors.bar} transition-all`}
                            style={{ width: `${enrolled.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <Link href={`/courses/${course.key}`} className="mt-auto">
                      <button className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        enrolled
                          ? "gradient-bg-primary text-white hover:opacity-90"
                          : "border border-border text-muted-foreground hover:text-foreground hover:border-violet-300 dark:hover:border-violet-500/40 hover:bg-muted/60"
                      }`}>
                        {enrolled ? t("continueCourse") : t("enroll")}
                        <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </Link>
                  </div>
                )
              })}

              {/* Locked placeholder card — teaser for upcoming courses */}
              <div className="card-surface rounded-2xl p-5 flex flex-col gap-4 border border-dashed border-border opacity-60 select-none">
                <div className="flex items-start justify-between">
                  <div className="size-14 rounded-2xl bg-muted flex items-center justify-center">
                    <Lock className="size-6 text-muted-foreground" />
                  </div>
                  <Lock className="size-4 text-muted-foreground mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground text-base">{t("moreSoonTitle")}</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t("moreSoonSubtitle")}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {t("moreSoonDesc")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── University track (coming soon) ── */}
        {track === "university" && (
          <div className="space-y-6">
            <div className="card-surface rounded-2xl p-6 sm:p-8 border border-border text-center">
              <div className="size-14 rounded-2xl gradient-bg-primary flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="size-7 text-white" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-1.5">{t("uniTitle")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                {t("uniDesc")}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {UNIVERSITY_FACULTIES.map((faculty) => {
                const Icon = ICON_MAP[faculty.icon] ?? GraduationCap
                return (
                  <div
                    key={faculty.key}
                    className="card-surface rounded-2xl p-4 border border-dashed border-border flex flex-col items-center gap-2.5 text-center select-none"
                  >
                    <div className="size-11 rounded-xl bg-muted flex items-center justify-center">
                      <Icon className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground">
                        {t(`faculties.${faculty.key}`)}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {t(`facultiesKh.${faculty.key}`)}
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {t("comingSoon")}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </AppShell>
  )
}

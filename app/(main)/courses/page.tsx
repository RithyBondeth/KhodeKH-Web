"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Clock, Zap, ArrowRight, Lock } from "lucide-react"
import { useTranslations } from "next-intl"
import { AppShell } from "@/components/utils/app-shell"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { TypographyH2 } from "@/components/utils/typography/typography-h2"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"
import { activeCourses } from "@/utils/constants/dashboard.constant"
import { COURSES } from "@/utils/constants/landing.constant"

/* ── Level → colour mappings ─────────────────────────────────────────── */

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

type TFilter = "All" | "Beginner" | "Intermediate" | "Advanced"

export default function CoursesPage() {
  const t  = useTranslations("courses")
  const [filter, setFilter] = useState<TFilter>("All")

  /* Build a lookup: course key → enrolled progress data */
  const enrolledMap = Object.fromEntries(
    activeCourses.map((c) => [c.id, c])
  )

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

        {/* Filter tabs */}
        <AnimateIn animation="fade-up" delay={0.1}>
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
        </AnimateIn>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {visible.map((course, i) => {
            const enrolled = enrolledMap[course.key]
            const colors   = LEVEL_COLORS[course.level]

            return (
              <AnimateIn
                key={course.key}
                animation={i % 2 === 0 ? "fade-right" : "fade-left"}
                delay={0.15 + i * 0.07}
              >
                <div className={`card-surface rounded-2xl p-5 flex flex-col gap-4 border hover:shadow-lg transition-all group ${colors.ring}`}>

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
                  <Link href="/learn" className="mt-auto">
                    <button className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      enrolled
                        ? "gradient-bg-primary text-white hover:opacity-90"
                        : "border border-border text-muted-foreground hover:text-foreground hover:border-violet-300 dark:hover:border-violet-500/40 hover:bg-muted/60"
                    }`}>
                      {enrolled ? (
                        <>
                          {t("continueCourse")}
                          <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      ) : (
                        <>
                          {t("enroll")}
                          <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </Link>
                </div>
              </AnimateIn>
            )
          })}

          {/* Locked placeholder card — teaser for upcoming courses */}
          <AnimateIn animation="fade-left" delay={0.15 + visible.length * 0.07}>
            <div className="card-surface rounded-2xl p-5 flex flex-col gap-4 border border-dashed border-border opacity-60 select-none">
              <div className="flex items-start justify-between">
                <div className="size-14 rounded-2xl bg-muted flex items-center justify-center">
                  <Lock className="size-6 text-muted-foreground" />
                </div>
                <Lock className="size-4 text-muted-foreground mt-1" />
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground text-base">More coming soon</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">TypeScript, Node.js, SQL & more</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                New courses are being crafted for the Khmer curriculum. Stay tuned.
              </p>
            </div>
          </AnimateIn>
        </div>

      </div>
    </AppShell>
  )
}

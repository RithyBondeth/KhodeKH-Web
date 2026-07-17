"use client"

import Link from "next/link"
import {
  ChevronRight, BookOpen, Play, Clock, ArrowRight, CheckCircle2,
  Terminal, Code2, Brain, Flame, School, Sparkles, Zap,
  Footprints, Medal, Languages, Trophy, Lock,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { AppShell } from "@/components/utils/app-shell"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { CountUp } from "@/components/utils/animations/count-up"
import { TypographyH1 } from "@/components/utils/typography/typography-h1"
import { TypographyH3 } from "@/components/utils/typography/typography-h3"
import { TypographyH4 } from "@/components/utils/typography/typography-h4"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"
import {
  studentData, activeCourses, weeklyActivity, weeklyDone, badges,
} from "@/utils/constants/dashboard.constant"

const COURSE_ICONS: Record<string, React.ElementType> = {
  Terminal,
  Code2,
  Brain,
}

const BADGE_ICONS: Record<string, React.ElementType> = {
  Footprints, Medal, Languages, Flame, Trophy, Zap,
}

export default function DashboardPage() {
  const t = useTranslations("dashboard")

  const totalLessonsDone = activeCourses.reduce((s, c) => s + c.completedLessons, 0)
  const resume           = activeCourses[0]
  const goalPct          = Math.min(100, Math.round((weeklyDone / studentData.weeklyGoal) * 100))
  const maxDay           = Math.max(...weeklyActivity.map((d) => d.lessons), 1)
  const earnedBadges     = badges.filter((b) => b.earned).length
  const todayDone        = weeklyActivity.find((d) => d.isToday)?.lessons ?? 0

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Resume banner */}
        <AnimateIn animation="flip-up" delay={0.05}>
          <div className="relative rounded-2xl overflow-hidden p-6 card-surface border border-violet-200 dark:border-violet-500/20">
            <div className="absolute -right-16 -top-16 size-56 rounded-full bg-violet-300/20 dark:bg-violet-600/15 blur-3xl" />
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <TypographyMuted className="text-xs mb-1">{t("greeting")}</TypographyMuted>
                <TypographyH1 className="text-2xl font-bold text-foreground mb-3">
                  {t("welcomeBack")} <span className="gradient-text">{studentData.name}</span>
                </TypographyH1>

                {/* What's next — the actual lesson, not a generic nudge */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <span className="uppercase tracking-wide text-[10px] font-semibold">{t("nextUp")}</span>
                  <span className="size-1 rounded-full bg-muted-foreground/40" />
                  <span className="truncate">{resume.title}</span>
                </div>
                <div className="text-sm font-semibold text-foreground truncate">
                  {t("lessonNum", { n: resume.currentLessonId })} · {resume.currentLesson}
                </div>
                <TypographyMuted className="text-xs">{resume.currentLessonKh}</TypographyMuted>
              </div>

              <Link href={`/learn/${resume.id}/${resume.currentLessonId}`}>
                <button className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl gradient-bg-primary hover:opacity-90 transition-all text-sm font-semibold text-white shadow-lg">
                  <Play className="size-4 fill-white" />
                  {t("continueLearning")}
                </button>
              </Link>
            </div>
          </div>
        </AnimateIn>

        {/* Progress stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimateIn animation="fade-right" delay={0.1}>
            <div className="card-surface rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{t("lessonsCompleted")}</span>
                <div className="size-8 rounded-xl flex items-center justify-center bg-violet-100 dark:bg-violet-500/15">
                  <CheckCircle2 className="size-4 text-violet-600 dark:text-violet-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground">
                <CountUp to={totalLessonsDone} delay={0.4} duration={1.4} ease="power3.out" />
              </div>
              <TypographyMuted className="text-xs mt-1">
                {t("ofTotal", { total: activeCourses.reduce((s, c) => s + c.totalLessons, 0) })}
              </TypographyMuted>
            </div>
          </AnimateIn>

          <AnimateIn animation="fade-right" delay={0.15}>
            <div className="card-surface rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{t("coursesActive")}</span>
                <div className="size-8 rounded-xl flex items-center justify-center bg-cyan-100 dark:bg-cyan-500/15">
                  <BookOpen className="size-4 text-cyan-600 dark:text-cyan-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground">
                <CountUp to={activeCourses.length} delay={0.5} duration={1.0} ease="power3.out" />
              </div>
              <TypographyMuted className="text-xs mt-1">{t("inProgress")}</TypographyMuted>
            </div>
          </AnimateIn>

          <AnimateIn animation="fade-left" delay={0.15}>
            <div className="card-surface rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{t("dayStreak")}</span>
                <div className="size-8 rounded-xl flex items-center justify-center bg-amber-100 dark:bg-amber-500/15">
                  <Flame className="size-4 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground">
                <CountUp to={studentData.streak} delay={0.6} duration={1.0} ease="power3.out" />
              </div>
              <TypographyMuted className="text-xs mt-1">{t("streakHint")}</TypographyMuted>
            </div>
          </AnimateIn>

          <AnimateIn animation="fade-left" delay={0.1}>
            <div className="card-surface rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{t("totalXp")}</span>
                <div className="size-8 rounded-xl flex items-center justify-center bg-emerald-100 dark:bg-emerald-500/15">
                  <Zap className="size-4 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground">
                <CountUp to={studentData.xp} delay={0.7} duration={1.4} ease="power3.out" locale />
              </div>
              <TypographyMuted className="text-xs mt-1">
                {t("levelLabel", { level: studentData.level })}
              </TypographyMuted>
            </div>
          </AnimateIn>
        </div>

        {/* This week + Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* This week */}
          <AnimateIn animation="fade-right" delay={0.2}>
            <div className="card-surface rounded-2xl p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <TypographyH3 className="font-semibold text-foreground text-base">{t("thisWeek")}</TypographyH3>
                <span className="text-xs text-muted-foreground">
                  {t("weeklyProgress", { done: weeklyDone, goal: studentData.weeklyGoal })}
                </span>
              </div>

              {/* Day strip */}
              <div className="flex items-end justify-between gap-2 mb-4 flex-1 min-h-24">
                {weeklyActivity.map((day) => {
                  const pct    = (day.lessons / maxDay) * 100
                  const active = day.lessons > 0
                  return (
                    <div key={day.key} className="flex flex-col items-center gap-1.5 flex-1">
                      <div className="w-full flex-1 flex items-end justify-center min-h-16">
                        <div
                          className={`w-full rounded-lg transition-all ${
                            active
                              ? "gradient-bg-primary"
                              : day.isToday
                                ? "border border-dashed border-violet-300 dark:border-violet-500/40"
                                : "bg-muted"
                          }`}
                          style={{ height: active ? `${Math.max(pct, 22)}%` : "22%" }}
                          title={t("lessonsCount", { count: day.lessons })}
                        />
                      </div>
                      <span className={`text-[10px] ${
                        day.isToday
                          ? "font-bold text-violet-600 dark:text-violet-400"
                          : "text-muted-foreground"
                      }`}>
                        {t(`days.${day.key}`)}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Weekly goal bar */}
              <div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full gradient-bg-primary transition-all"
                    style={{ width: `${goalPct}%` }}
                  />
                </div>
                <TypographyMuted className="text-xs">
                  {todayDone > 0
                    ? t("streakSafe")
                    : t("keepStreak", { days: studentData.streak })}
                </TypographyMuted>
              </div>
            </div>
          </AnimateIn>

          {/* Achievements */}
          <AnimateIn animation="fade-left" delay={0.2}>
            <div className="card-surface rounded-2xl p-5 h-full">
              <div className="flex items-center justify-between mb-4">
                <TypographyH3 className="font-semibold text-foreground text-base">{t("achievements")}</TypographyH3>
                <span className="text-xs text-muted-foreground">
                  {t("earnedCount", { earned: earnedBadges, total: badges.length })}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {badges.map((badge) => {
                  const Icon = BADGE_ICONS[badge.icon] ?? Medal
                  return (
                    <div
                      key={badge.key}
                      className={`rounded-xl p-3 flex flex-col items-center text-center gap-1.5 border transition-all ${
                        badge.earned
                          ? "border-violet-200 bg-violet-50/60 dark:border-violet-500/25 dark:bg-violet-500/10"
                          : "border-border bg-muted/40"
                      }`}
                      title={t(`badges.${badge.key}.desc`)}
                    >
                      <div className={`size-9 rounded-xl flex items-center justify-center relative ${
                        badge.earned
                          ? "gradient-bg-primary"
                          : "bg-muted"
                      }`}>
                        <Icon className={`size-4 ${badge.earned ? "text-white" : "text-muted-foreground/50"}`} />
                        {!badge.earned && (
                          <div className="absolute -right-1 -bottom-1 size-4 rounded-full bg-background border border-border flex items-center justify-center">
                            <Lock className="size-2 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <span className={`text-[10px] font-medium leading-tight ${
                        badge.earned ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {t(`badges.${badge.key}.title`)}
                      </span>
                      {!badge.earned && badge.progress != null && (
                        <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-violet-400 dark:bg-violet-500"
                            style={{ width: `${badge.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* My Courses */}
        <div className="space-y-4">
          <AnimateIn animation="fade-up" delay={0.25}>
            <div className="flex items-center justify-between">
              <TypographyH3 className="font-semibold text-foreground text-base">{t("myCourses")}</TypographyH3>
              <Link href="/courses">
                <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                  {t("viewAll")} <ChevronRight className="size-3" />
                </button>
              </Link>
            </div>
          </AnimateIn>

          {activeCourses.map((course, i) => {
            const barColor = course.color === "violet"
              ? "from-violet-500 to-violet-400"
              : "from-cyan-500 to-cyan-400"
            return (
              <AnimateIn key={course.id} animation={i % 2 === 0 ? "fade-right" : "fade-left"} delay={0.3 + i * 0.1}>
                <div className="card-surface rounded-2xl p-5 group hover:border-violet-200 dark:hover:border-violet-500/25 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="size-11 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      {(() => {
                        const Icon = COURSE_ICONS[course.icon]
                        return Icon ? <Icon className="size-5" /> : null
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <Link href={`/courses/${course.id}`} className="hover:opacity-80 transition-opacity">
                          <TypographyH4 className="text-foreground text-sm">{course.title}</TypographyH4>
                          <TypographyMuted className="text-xs">{course.titleKh}</TypographyMuted>
                        </Link>
                        <span className="text-xs text-muted-foreground shrink-0 font-medium">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3 mt-2">
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
                            <Clock className="size-3 shrink-0" />
                            <span className="truncate">{course.currentLesson}</span>
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {t("lessonProgress", { done: course.completedLessons, total: course.totalLessons })}
                          </span>
                        </div>
                        <Link href={`/learn/${course.id}/${course.currentLessonId}`}>
                          <button className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 flex items-center gap-1 group-hover:gap-1.5 transition-all shrink-0">
                            {t("continue")} <ArrowRight className="size-3" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            )
          })}
        </div>

        {/* Explore */}
        <div className="space-y-4">
          <AnimateIn animation="fade-up" delay={0.4}>
            <TypographyH3 className="font-semibold text-foreground text-base">{t("explore")}</TypographyH3>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { key: "exploreK12",   icon: School,   href: "/courses",      color: "bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400" },
              { key: "exploreBacII", icon: Sparkles, href: "/courses/math", color: "bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400"     },
              { key: "exploreProg",  icon: Code2,    href: "/courses",      color: "bg-cyan-100 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"         },
            ].map(({ key, icon: Icon, href, color }, i) => (
              <AnimateIn key={key} animation="fade-up" delay={0.45 + i * 0.07}>
                <Link href={href} className="block group">
                  <div className="card-surface rounded-2xl p-4 border border-border hover:border-violet-200 dark:hover:border-violet-500/25 hover:shadow-md transition-all flex items-center gap-3.5 h-full">
                    <div className={`size-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-foreground">{t(`${key}Title`)}</div>
                      <div className="text-xs text-muted-foreground truncate">{t(`${key}Desc`)}</div>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  )
}

"use client"

import Link from "next/link"
import {
  ChevronRight, BookOpen, Play, Clock,
  ArrowRight, CheckCircle2, Terminal, Code2, Brain,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { AppShell } from "@/components/utils/app-shell"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { CountUp } from "@/components/utils/animations/count-up"
import { TypographyH1 } from "@/components/utils/typography/typography-h1"
import { TypographyH3 } from "@/components/utils/typography/typography-h3"
import { TypographyH4 } from "@/components/utils/typography/typography-h4"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"
import { studentData, activeCourses } from "@/utils/constants/dashboard.constant"

const COURSE_ICONS: Record<string, React.ElementType> = {
  Terminal,
  Code2,
  Brain,
}

export default function DashboardPage() {
  const t = useTranslations("dashboard")
  const totalLessonsDone = activeCourses.reduce((s, c) => s + c.completedLessons, 0)

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Welcome banner */}
        <AnimateIn animation="flip-up" delay={0.05}>
          <div className="relative rounded-2xl overflow-hidden p-6 card-surface border border-violet-200 dark:border-violet-500/20">
            <div className="absolute -right-16 -top-16 size-56 rounded-full bg-violet-300/20 dark:bg-violet-600/15 blur-3xl" />
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <TypographyMuted className="text-xs mb-1">{t("greeting")}</TypographyMuted>
                <TypographyH1 className="text-2xl font-bold text-foreground mb-1">
                  {t("welcomeBack")} <span className="gradient-text">{studentData.name}</span>
                </TypographyH1>
                <TypographyMuted className="text-sm">{t("keepLearning")}</TypographyMuted>
              </div>
              <Link href="/learn">
                <button className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl gradient-bg-primary hover:opacity-90 transition-all text-sm font-semibold text-white shadow-lg">
                  <Play className="size-4 fill-white" />
                  {t("continueLearning")}
                </button>
              </Link>
            </div>
          </div>
        </AnimateIn>

        {/* Progress stats */}
        <div className="grid grid-cols-2 gap-4">
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
                {activeCourses.reduce((s, c) => s + c.totalLessons, 0)} total
              </TypographyMuted>
            </div>
          </AnimateIn>

          <AnimateIn animation="fade-left" delay={0.1}>
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
              <TypographyMuted className="text-xs mt-1">in progress</TypographyMuted>
            </div>
          </AnimateIn>
        </div>

        {/* My Courses */}
        <div className="space-y-4">
          <AnimateIn animation="fade-up" delay={0.15}>
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
              <AnimateIn key={course.id} animation={i % 2 === 0 ? "fade-right" : "fade-left"} delay={0.2 + i * 0.1}>
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
                        <div>
                          <TypographyH4 className="text-foreground text-sm">{course.title}</TypographyH4>
                          <TypographyMuted className="text-xs">{course.titleKh}</TypographyMuted>
                        </div>
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
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="size-3" />
                            {course.currentLesson}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {t("lessonProgress", { done: course.completedLessons, total: course.totalLessons })}
                          </span>
                        </div>
                        <Link href="/learn">
                          <button className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 flex items-center gap-1 group-hover:gap-1.5 transition-all">
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

      </div>
    </AppShell>
  )
}

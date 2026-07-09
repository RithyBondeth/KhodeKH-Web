"use client"

import Link from "next/link"
import { BookOpen, ChevronRight, Terminal, Code2, Brain } from "lucide-react"

const ICON_MAP: Record<string, React.ElementType> = {
  Terminal,
  Code2,
  Brain,
}
import { useTranslations } from "next-intl"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { COURSES, COLOR } from "@/utils/constants/landing.constant"
import { TypographyH2 } from "@/components/utils/typography/typography-h2"
import { TypographyH3 } from "@/components/utils/typography/typography-h3"

export function LandingCourses() {
  const t = useTranslations("courses")

  return (
    <section id="courses" className="py-28 px-6 bg-muted/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <AnimateIn animation="fade-up" className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-500/15 border border-cyan-200 dark:border-cyan-500/25 text-xs text-cyan-700 dark:text-cyan-300 mb-4 font-medium">
                <BookOpen className="size-3" />
                {t("badge")}
              </div>
              <TypographyH2 className="text-4xl font-bold tracking-tight text-foreground border-0 pb-0">
                {t("headingPart1")}{" "}
                <span className="gradient-text">{t("headingHighlight")}</span>
                {t("headingPart2") ? ` ${t("headingPart2")}` : ""}
              </TypographyH2>
            </div>
            <Link href="/dashboard">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("viewAll")} <ChevronRight className="size-4" />
              </button>
            </Link>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-6">
          {COURSES.map((course, i) => {
            const c = COLOR[course.color]
            const key = course.key as Parameters<typeof t>[0]
            return (
              <AnimateIn
                key={course.key}
                animation={i === 0 ? "fade-right" : i === 1 ? "zoom" : "fade-left"}
                delay={i * 0.12}
              >
                <div className={`group card-surface rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border ${c.border} h-full flex flex-col`}>
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="size-14 rounded-2xl bg-muted flex items-center justify-center">
                        {(() => {
                          const Icon = ICON_MAP[course.icon]
                          return Icon ? <Icon className="size-7" /> : null
                        })()}
                      </div>
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${c.badge}`}>
                        {t(`${key}.tag` as Parameters<typeof t>[0])}
                      </span>
                    </div>
                    <TypographyH3 className="text-foreground text-lg mb-3">
                      {t(`${key}.title` as Parameters<typeof t>[0])}
                    </TypographyH3>
                    <div className="flex items-center gap-3 mb-5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        course.level === "Beginner"     ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
                        course.level === "Intermediate" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
                                                          "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                      }`}>{course.level}</span>
                      <span className="text-xs text-muted-foreground">
                        {t("lessons", { count: course.lessons })}
                      </span>
                      <span className={`text-xs font-semibold ${c.icon}`}>+{course.xp} XP</span>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <button className="w-full py-2.5 text-sm font-medium rounded-xl bg-muted hover:bg-muted/80 border border-border text-foreground/70 hover:text-foreground transition-all">
                      {t("startCourse")}
                    </button>
                  </div>
                  <div className="h-0.5 w-full gradient-bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

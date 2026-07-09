"use client"

import { Zap } from "lucide-react"
import { useTranslations } from "next-intl"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { FEATURES, COLOR } from "@/utils/constants/landing.constant"
import { TypographyH2 } from "@/components/utils/typography/typography-h2"
import { TypographyH4 } from "@/components/utils/typography/typography-h4"
import { TypographyLead } from "@/components/utils/typography/typography-lead"
import { TypographyP } from "@/components/utils/typography/typography-p"

export function LandingFeatures() {
  const t = useTranslations("features")

  return (
    <section id="features" className="px-6 py-28 scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        <AnimateIn animation="fade-up" className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-100 px-3 py-1.5 text-xs font-medium text-violet-700 dark:border-violet-500/25 dark:bg-violet-500/15 dark:text-violet-300">
            <Zap className="size-3" />
            {t("badge")}
          </div>
          <TypographyH2 className="mb-4 border-0 pb-0 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t("headingPart1")}{" "}
            <span className="gradient-text">{t("headingHighlight")}</span>{" "}
            {t("headingPart2")}
          </TypographyH2>
          <TypographyLead className="mx-auto max-w-lg">
            {t("subheading")}
          </TypographyLead>
        </AnimateIn>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const c = COLOR[feature.color]
            const key = feature.key as Parameters<typeof t>[0]
            return (
              <AnimateIn
                key={feature.key}
                animation={
                  i % 3 === 0
                    ? "fade-right"
                    : i % 3 === 1
                      ? "fade-up"
                      : "fade-left"
                }
                delay={i * 0.08}
              >
                <div
                  className={`group card-surface h-full cursor-default rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02] ${c.border}`}
                >
                  <div
                    className={`inline-flex size-11 rounded-xl ${c.bg} mb-4 items-center justify-center`}
                  >
                    <feature.icon className={`size-5 ${c.icon}`} />
                  </div>
                  <TypographyH4 className="mb-1 text-foreground">
                    {t(`${key}.title` as Parameters<typeof t>[0])}
                  </TypographyH4>
                  <TypographyP className="text-sm leading-relaxed text-muted-foreground">
                    {t(`${key}.desc` as Parameters<typeof t>[0])}
                  </TypographyP>
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

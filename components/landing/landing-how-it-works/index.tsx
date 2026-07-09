"use client"

import { useTranslations } from "next-intl"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { HOW_IT_WORKS, COLOR } from "@/utils/constants/landing.constant"
import { TypographyH2 } from "@/components/utils/typography/typography-h2"
import { TypographyH4 } from "@/components/utils/typography/typography-h4"
import { TypographyLead } from "@/components/utils/typography/typography-lead"
import { TypographyP } from "@/components/utils/typography/typography-p"

export function LandingHowItWorks() {
  const t = useTranslations("howItWorks")

  return (
    <section id="how-it-works" className="py-28 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <AnimateIn animation="fade-up" className="text-center mb-16">
          <TypographyH2 className="text-4xl font-bold tracking-tight mb-4 text-foreground border-0 pb-0">
            {t("headingPart1")}{" "}
            <span className="gradient-text">{t("headingHighlight")}</span>{" "}
            {t("headingPart2")}
          </TypographyH2>
          <TypographyLead>{t("subheading")}</TypographyLead>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item, i) => {
            const c = COLOR[item.color]
            const key = item.key as Parameters<typeof t>[0]
            return (
              <AnimateIn key={item.step} animation="flip-up" delay={i * 0.18}>
                <div className="relative">
                  {i < 2 && (
                    <div className="hidden md:block absolute top-8 left-[calc(100%+1rem)] w-8 border-t border-dashed border-border" />
                  )}
                  <div className="card-surface rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-5xl font-black text-muted/40 dark:text-white/8 select-none">{item.step}</span>
                      <div className={`size-10 rounded-xl flex items-center justify-center ${c.bg} border ${c.border}`}>
                        <item.icon className={`size-5 ${c.icon}`} />
                      </div>
                    </div>
                    <TypographyH4 className="text-foreground mb-2">
                      {t(`${key}.title` as Parameters<typeof t>[0])}
                    </TypographyH4>
                    <TypographyP className="text-sm text-muted-foreground leading-relaxed">
                      {t(`${key}.desc` as Parameters<typeof t>[0])}
                    </TypographyP>
                  </div>
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

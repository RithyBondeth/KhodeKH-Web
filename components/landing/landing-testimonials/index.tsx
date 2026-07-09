"use client"

import { Star } from "lucide-react"
import { useTranslations } from "next-intl"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { TESTIMONIALS } from "@/utils/constants/landing.constant"
import { TypographyH2 } from "@/components/utils/typography/typography-h2"
import { TypographyBlockquote } from "@/components/utils/typography/typography-blockquote"
import { TypographySmall } from "@/components/utils/typography/typography-small"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"

export function LandingTestimonials() {
  const t = useTranslations("testimonials")

  return (
    <section id="testimonials" className="py-28 px-6 bg-muted/20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <AnimateIn animation="fade-up" className="text-center mb-16">
          <TypographyH2 className="text-4xl font-bold tracking-tight mb-4 text-foreground border-0 pb-0">
            {t("headingPart1")}{" "}
            <span className="gradient-text">{t("headingHighlight")}</span>
            {t("headingPart2") ? ` ${t("headingPart2")}` : ""}
          </TypographyH2>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, i) => {
            const key = item.key as Parameters<typeof t>[0]
            return (
              <AnimateIn
                key={item.key}
                animation={i === 0 ? "fade-right" : i === 1 ? "blur-up" : "fade-left"}
                delay={i * 0.12}
              >
                <div className="card-surface rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(item.stars)].map((_, j) => (
                      <Star key={j} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <TypographyBlockquote className="mt-0 border-l-violet-300 dark:border-l-violet-500/40 text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {t(`${key}.text` as Parameters<typeof t>[0])}
                  </TypographyBlockquote>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl gradient-bg-primary flex items-center justify-center text-sm font-bold text-white shrink-0">
                      {item.avatar}
                    </div>
                    <div>
                      <TypographySmall className="font-semibold text-foreground block">
                        {t(`${key}.name` as Parameters<typeof t>[0])}
                      </TypographySmall>
                      <TypographyMuted className="text-xs opacity-70">
                        {t(`${key}.role` as Parameters<typeof t>[0])}
                      </TypographyMuted>
                    </div>
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

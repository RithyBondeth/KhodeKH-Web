"use client"

import { AnimateIn } from "@/components/utils/animations/animate-in"
import { CountUp } from "@/components/utils/animations/count-up"
import { STATS } from "@/utils/constants/landing.constant"
import { TypographySmall } from "@/components/utils/typography/typography-small"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"

export function LandingStats() {
  return (
    <section className="border-y border-border bg-muted/30 py-10">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <AnimateIn
            key={stat.label}
            animation="bounce-in"
            delay={i * 0.1}
            className="text-center"
          >
            <div className="gradient-text mb-1 text-3xl font-bold">
              <CountUp
                to={stat.count}
                prefix={stat.prefix}
                suffix={stat.suffix}
                locale={stat.locale}
                delay={i * 0.1 + 0.5}
                duration={1.8}
                ease="power3.out"
              />
            </div>
            <TypographySmall className="font-medium text-foreground block">
              {stat.label}
            </TypographySmall>
            <TypographyMuted className="mt-0.5 text-xs">
              {stat.labelKh}
            </TypographyMuted>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}

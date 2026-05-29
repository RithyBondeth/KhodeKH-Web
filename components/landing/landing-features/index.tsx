"use client"

import { Zap } from "lucide-react"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { FEATURES, COLOR } from "@/utils/constants/landing.constant"
import { TypographyH2 } from "@/components/utils/typography/typography-h2"
import { TypographyH4 } from "@/components/utils/typography/typography-h4"
import { TypographyLead } from "@/components/utils/typography/typography-lead"
import { TypographyP } from "@/components/utils/typography/typography-p"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"

export function LandingFeatures() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimateIn animation="fade-up" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/15 border border-violet-200 dark:border-violet-500/25 text-xs text-violet-700 dark:text-violet-300 mb-5 font-medium">
            <Zap className="size-3" />
            Everything you need
          </div>
          <TypographyH2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground border-0 pb-0">
            Built for <span className="gradient-text">Cambodian Developers</span>
          </TypographyH2>
          <TypographyLead className="max-w-lg mx-auto">
            Powerful tools, Khmer-first content, and AI assistance — all in one platform.
          </TypographyLead>
        </AnimateIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => {
            const c = COLOR[feature.color]
            return (
              <AnimateIn
                key={feature.title}
                animation={i % 3 === 0 ? "fade-right" : i % 3 === 1 ? "fade-up" : "fade-left"}
                delay={i * 0.08}
              >
                <div className={`group card-surface p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300 cursor-default h-full border ${c.border}`}>
                  <div className={`inline-flex size-11 rounded-xl ${c.bg} items-center justify-center mb-4`}>
                    <feature.icon className={`size-5 ${c.icon}`} />
                  </div>
                  <TypographyH4 className="text-foreground mb-1">{feature.title}</TypographyH4>
                  <TypographyMuted className="text-xs mb-3">{feature.titleKh}</TypographyMuted>
                  <TypographyP className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</TypographyP>
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

"use client"

import { AnimateIn } from "@/components/utils/animations/animate-in"
import { HOW_IT_WORKS, COLOR } from "@/utils/constants/landing.constant"
import { TypographyH2 } from "@/components/utils/typography/typography-h2"
import { TypographyH4 } from "@/components/utils/typography/typography-h4"
import { TypographyLead } from "@/components/utils/typography/typography-lead"
import { TypographyP } from "@/components/utils/typography/typography-p"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"

export function LandingHowItWorks() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimateIn animation="fade-up" className="text-center mb-16">
          <TypographyH2 className="text-4xl font-bold tracking-tight mb-4 text-foreground border-0 pb-0">
            How <span className="gradient-text">Apsara AI</span> Works
          </TypographyH2>
          <TypographyLead>Three simple steps to start your coding journey</TypographyLead>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item, i) => {
            const c = COLOR[item.color]
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
                    <TypographyH4 className="text-foreground mb-1">{item.title}</TypographyH4>
                    <TypographyMuted className="text-xs mb-2">{item.titleKh}</TypographyMuted>
                    <TypographyP className="text-sm text-muted-foreground leading-relaxed">{item.desc}</TypographyP>
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

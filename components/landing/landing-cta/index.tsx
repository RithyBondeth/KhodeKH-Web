"use client"

import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { TypographyH2 } from "@/components/utils/typography/typography-h2"
import { TypographyLead } from "@/components/utils/typography/typography-lead"
import { TypographySmall } from "@/components/utils/typography/typography-small"

export function LandingCta() {
  const t = useTranslations("cta")

  return (
    <section className="px-6 py-28">
      <AnimateIn animation="bounce-in" className="mx-auto max-w-3xl text-center">
        <div className="card-surface relative overflow-hidden rounded-3xl border border-violet-200 p-12 dark:border-violet-500/25">
          <div className="absolute -top-24 -left-24 size-72 rounded-full bg-violet-200/60 blur-3xl dark:bg-violet-600/15" />
          <div className="absolute -right-24 -bottom-24 size-72 rounded-full bg-cyan-200/50 blur-3xl dark:bg-cyan-500/15" />
          <div className="relative">
            <div className="mb-6 text-5xl">🇰🇭</div>
            <TypographyH2 className="text-4xl font-bold tracking-tight mb-4 text-foreground border-0 pb-0">
              {t("headingPart1")}{" "}
              <span className="gradient-text">{t("headingHighlight")}</span>
              {t("headingPart2")}
            </TypographyH2>
            <TypographyLead className="mb-8">
              {t("subheading")}
              <br />
              {t("free")}
            </TypographyLead>
            <Link href="/register">
              <button className="gradient-bg-primary glow-purple inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base font-semibold text-white shadow-xl transition-all hover:opacity-90">
                <Sparkles className="size-5" />
                {t("createAccount")}
                <ArrowRight className="size-4" />
              </button>
            </Link>
            <TypographySmall className="mt-4 block text-muted-foreground">
              {t("finePrint")}
            </TypographySmall>
          </div>
        </div>
      </AnimateIn>
    </section>
  )
}

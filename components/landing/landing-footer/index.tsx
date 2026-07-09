"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { TypographyP } from "@/components/utils/typography/typography-p"
import { TypographySmall } from "@/components/utils/typography/typography-small"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"

export function LandingFooter() {
  const t = useTranslations("footer")

  const FOOTER_COLS = [
    {
      headingKey: "platformCol" as const,
      links: [
        { key: "courses" as const,    href: "/dashboard" },
        { key: "playground" as const, href: "/learn" },
        { key: "aiMentor" as const,   href: "/learn" },
        { key: "leaderboard" as const,href: "#" },
      ],
    },
    {
      headingKey: "companyCol" as const,
      links: [
        { key: "about" as const,    href: "#" },
        { key: "blog" as const,     href: "#" },
        { key: "careers" as const,  href: "#" },
        { key: "press" as const,    href: "#" },
      ],
    },
    {
      headingKey: "supportCol" as const,
      links: [
        { key: "helpCenter" as const, href: "#" },
        { key: "community" as const,  href: "#" },
        { key: "contact" as const,    href: "#" },
        { key: "status" as const,     href: "#" },
      ],
    },
  ]

  return (
    <footer className="border-t border-border py-12 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          <AnimateIn animation="fade-right" className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="size-8 rounded-xl gradient-bg-primary flex items-center justify-center shrink-0">
                <Sparkles className="size-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="gradient-text">Kode</span>
                <span className="text-muted-foreground">KH</span>
              </span>
            </Link>
            <TypographyP className="text-sm text-muted-foreground leading-relaxed">
              {t("brand")}
            </TypographyP>
          </AnimateIn>

          <AnimateIn animation="fade-left">
            <div className="grid grid-cols-3 gap-8">
              {FOOTER_COLS.map((col) => (
                <div key={col.headingKey}>
                  <TypographySmall className="font-semibold text-muted-foreground uppercase tracking-wider block mb-4">
                    {t(col.headingKey)}
                  </TypographySmall>
                  {col.links.map((link) => (
                    <Link key={link.key} href={link.href} className="block py-1 transition-colors hover:text-foreground">
                      <TypographyMuted className="text-sm transition-colors hover:text-foreground">
                        {t(link.key)}
                      </TypographyMuted>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <TypographyMuted className="text-xs">
            {t("copyright")}
          </TypographyMuted>
          <div className="flex gap-4">
            {(["privacy", "terms", "cookies"] as const).map((key) => (
              <Link key={key} href="#" className="transition-colors hover:text-foreground">
                <TypographySmall className="text-muted-foreground transition-colors hover:text-foreground">
                  {t(key)}
                </TypographySmall>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

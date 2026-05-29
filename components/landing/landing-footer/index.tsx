"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { TypographyP } from "@/components/utils/typography/typography-p"
import { TypographySmall } from "@/components/utils/typography/typography-small"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"

const FOOTER_COLS = [
  { heading: "Platform", links: ["Courses", "Playground", "AI Mentor", "Leaderboard"] },
  { heading: "Company",  links: ["About", "Blog", "Careers", "Press"] },
  { heading: "Support",  links: ["Help Center", "Community", "Contact", "Status"] },
]

export function LandingFooter() {
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
                <span className="gradient-text">Apsara</span>
                <span className="text-muted-foreground">.ai</span>
              </span>
            </Link>
            <TypographyP className="text-sm text-muted-foreground leading-relaxed">
              Cambodia's first AI-powered coding education platform. Empowering the next generation of Khmer developers.
            </TypographyP>
          </AnimateIn>

          <AnimateIn animation="fade-left">
            <div className="grid grid-cols-3 gap-8">
              {FOOTER_COLS.map((col) => (
                <div key={col.heading}>
                  <TypographySmall className="font-semibold text-muted-foreground uppercase tracking-wider block mb-4">
                    {col.heading}
                  </TypographySmall>
                  {col.links.map((link) => (
                    <Link key={link} href="#" className="block py-1 transition-colors hover:text-foreground">
                      <TypographyMuted className="text-sm transition-colors hover:text-foreground">
                        {link}
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
            © 2025 Apsara AI. Built with ❤️ in Phnom Penh, Cambodia 🇰🇭
          </TypographyMuted>
          <div className="flex gap-4">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <Link key={l} href="#" className="transition-colors hover:text-foreground">
                <TypographySmall className="text-muted-foreground transition-colors hover:text-foreground">
                  {l}
                </TypographySmall>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

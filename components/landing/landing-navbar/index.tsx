"use client"

import Link from "next/link"
import { Sparkles, Menu, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { ThemeToggle } from "@/components/utils/themes/theme-toggle"
import { LanguageSwitcher } from "@/components/utils/language-switcher"
import { NAV_LINK_KEYS } from "@/utils/constants/landing.constant"

interface LandingNavbarProps {
  menuOpen: boolean
  onMenuToggle: () => void
}

export function LandingNavbar({ menuOpen, onMenuToggle }: LandingNavbarProps) {
  const t = useTranslations("nav")

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="size-8 rounded-xl gradient-bg-primary flex items-center justify-center glow-purple shrink-0">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            <span className="gradient-text">Apsara</span>
            <span className="text-muted-foreground font-light">.ai</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_LINK_KEYS.map((key) => (
            <Link key={key} href="#"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all">
              {t(key)}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 shrink-0">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground px-4 py-2 transition-colors">
            {t("signIn")}
          </Link>
          <Link href="/register">
            <button className="px-5 py-2.5 text-sm font-semibold rounded-xl gradient-bg-primary hover:opacity-90 transition-all glow-purple text-white">
              {t("startFree")} →
            </button>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle size="sm" />
          <button className="p-2 text-muted-foreground hover:text-foreground" onClick={onMenuToggle}>
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-scale-in">
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINK_KEYS.map((key) => (
              <Link key={key} href="#" className="py-2.5 text-sm text-muted-foreground hover:text-foreground">
                {t(key)}
              </Link>
            ))}
            <div className="pt-3 border-t border-border flex flex-col gap-2 mt-1">
              <Link href="/login" className="py-2 text-sm text-muted-foreground">{t("signIn")}</Link>
              <Link href="/register">
                <button className="w-full py-2.5 text-sm font-semibold rounded-xl gradient-bg-primary text-white">
                  {t("startFree")} →
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

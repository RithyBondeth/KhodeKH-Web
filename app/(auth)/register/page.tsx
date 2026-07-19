"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import {
  EyeIcon, EyeClosedIcon, LockIcon, MailIcon, UserIcon, Rocket,
  Check, Globe, Bot, Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthShowcase } from "@/components/auth/auth-showcase"
import { BrandLogo } from "@/components/utils/brand-logo"
import { TypographyH3 } from "@/components/utils/typography/typography-h3"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"

const BENEFITS = [
  { icon: Check, text: "Free forever for students" },
  { icon: Globe, text: "Every subject, from Grade 1 to university" },
  { icon: Bot, text: "Personal AI tutor that speaks Khmer" },
  { icon: Trophy, text: "Certificates and national exam prep" },
]

export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const t = useTranslations("auth")
  const formRef = useRef<HTMLDivElement>(null)

  /* Entrance timeline — logo pops, then the form cascades up */
  useEffect(() => {
    const root = formRef.current
    if (!root) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from("[data-auth-logo]", { opacity: 0, scale: 0.7, y: -24, duration: 0.7, ease: "back.out(1.8)" })
        .from("[data-auth-field]", { opacity: 0, y: 28, duration: 0.6, stagger: 0.09 }, "-=0.25")
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* ── Decorative panel (left on register, right on login) ── */}
      <AuthShowcase
        side="left"
        icon={<Rocket className="relative size-9 text-white" />}
        title="Start learning today"
        description="Join 12,000+ Cambodian students — from primary school to university — learning with AI-powered lessons in Khmer."
      >
        <div className="flex w-full flex-col gap-3">
          {BENEFITS.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-2.5 text-left text-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:translate-x-1"
            >
              <item.icon className="size-4 shrink-0 text-white" />
              <span className="text-white/90">{item.text}</span>
            </div>
          ))}
        </div>
      </AuthShowcase>

      {/* ── Form panel ── */}
      <div
        ref={formRef}
        className="relative flex flex-1 flex-col items-center justify-center overflow-y-auto bg-background px-8 py-12"
      >
        {/* Soft ambient background behind the form */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Grid comes from the auth layout's <PaperGrid />, not from here. */}
          <div className="aurora-orb aurora-violet size-80 -top-24 -right-24" />
          <div className="aurora-orb aurora-cyan size-72 -bottom-24 -left-16" style={{ animationDelay: "-14s" }} />
        </div>

        <div data-auth-logo className="relative mb-8">
          <BrandLogo size="lg" />
        </div>

        <div className="relative w-full max-w-sm space-y-6">
          <div data-auth-field className="text-center">
            <TypographyH3 className="text-2xl font-bold">{t("registerTitle")}</TypographyH3>
            <TypographyMuted className="mt-1 text-sm">{t("registerSubtitle")}</TypographyMuted>
          </div>

          <div className="space-y-3">
            <div data-auth-field>
              <Input
                prefix={<UserIcon />}
                placeholder={t("namePlaceholder")}
                type="text"
                className="bg-background/70 backdrop-blur-sm transition-shadow duration-300 focus-within:shadow-[0_0_24px_-8px_rgba(35,131,226,0.5)]"
              />
            </div>
            <div data-auth-field>
              <Input
                prefix={<MailIcon />}
                placeholder={t("emailPlaceholder")}
                type="email"
                className="bg-background/70 backdrop-blur-sm transition-shadow duration-300 focus-within:shadow-[0_0_24px_-8px_rgba(35,131,226,0.5)]"
              />
            </div>
            <div data-auth-field>
              <Input
                prefix={<LockIcon />}
                placeholder={t("passwordPlaceholder")}
                type={passwordVisible ? "text" : "password"}
                className="bg-background/70 backdrop-blur-sm transition-shadow duration-300 focus-within:shadow-[0_0_24px_-8px_rgba(35,131,226,0.5)]"
                suffix={
                  passwordVisible ? (
                    <EyeClosedIcon
                      onClick={() => setPasswordVisible(false)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setPasswordVisible(true)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    />
                  )
                }
              />
            </div>
            <div data-auth-field>
              <Input
                prefix={<LockIcon />}
                placeholder={t("confirmPasswordPlaceholder")}
                type={confirmVisible ? "text" : "password"}
                className="bg-background/70 backdrop-blur-sm transition-shadow duration-300 focus-within:shadow-[0_0_24px_-8px_rgba(35,131,226,0.5)]"
                suffix={
                  confirmVisible ? (
                    <EyeClosedIcon
                      onClick={() => setConfirmVisible(false)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setConfirmVisible(true)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    />
                  )
                }
              />
            </div>
            <div data-auth-field>
              <Button className="btn-shine w-full transition-all hover:shadow-[0_0_28px_-6px_rgba(35,131,226,0.6)] hover:-translate-y-0.5">
                {t("registerButton")}
              </Button>
            </div>
          </div>

          <div data-auth-field>
            <TypographyMuted className="text-center text-sm">
              {t("alreadyHaveAccount")}{" "}
              <Link
                href="/login"
                className="font-semibold text-violet-600 hover:underline dark:text-violet-400"
              >
                {t("signIn")}
              </Link>
            </TypographyMuted>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Sparkles, EyeIcon, EyeClosedIcon, LockIcon, MailIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TypographyH3 } from "@/components/utils/typography/typography-h3"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"

export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible]        = useState(false)
  const [confirmVisible, setConfirmVisible]          = useState(false)
  const t = useTranslations("auth")

  return (
    <div className="flex h-screen w-screen overflow-hidden">

      {/* ── Decorative panel (left on register, right on login) ── */}
      <div className="hidden md:flex flex-1 relative overflow-hidden gradient-bg-primary">
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col items-center justify-center w-full px-12 text-white text-center gap-6">
          <div className="text-6xl">🚀</div>
          <div>
            <h2 className="text-3xl font-bold mb-3">Start learning today</h2>
            <p className="text-white/75 text-base leading-relaxed max-w-xs">
              Join 12,000+ Cambodian students building real skills with AI-powered lessons in Khmer.
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-2 w-full max-w-xs">
            {[
              { icon: "✅", text: "Free forever for students" },
              { icon: "🇰🇭", text: "Lessons available in Khmer" },
              { icon: "🤖", text: "Personal AI mentor — Apsara" },
              { icon: "🏆", text: "Industry-recognised certificates" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-sm text-left bg-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                <span>{item.icon}</span>
                <span className="text-white/90">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form panel ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 bg-background overflow-y-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-8">
          <div className="size-9 rounded-xl gradient-bg-primary flex items-center justify-center glow-purple">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            <span className="gradient-text">Apsara</span>
            <span className="text-muted-foreground font-light">.ai</span>
          </span>
        </Link>

        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <TypographyH3 className="text-2xl font-bold">{t("registerTitle")}</TypographyH3>
            <TypographyMuted className="text-sm mt-1">{t("registerSubtitle")}</TypographyMuted>
          </div>

          <div className="space-y-3">
            <Input
              prefix={<UserIcon />}
              placeholder={t("namePlaceholder")}
              type="text"
            />
            <Input
              prefix={<MailIcon />}
              placeholder={t("emailPlaceholder")}
              type="email"
            />
            <Input
              prefix={<LockIcon />}
              placeholder={t("passwordPlaceholder")}
              type={passwordVisible ? "text" : "password"}
              suffix={
                passwordVisible ? (
                  <EyeClosedIcon
                    onClick={() => setPasswordVisible(false)}
                    className="cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setPasswordVisible(true)}
                    className="cursor-pointer"
                  />
                )
              }
            />
            <Input
              prefix={<LockIcon />}
              placeholder={t("confirmPasswordPlaceholder")}
              type={confirmVisible ? "text" : "password"}
              suffix={
                confirmVisible ? (
                  <EyeClosedIcon
                    onClick={() => setConfirmVisible(false)}
                    className="cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setConfirmVisible(true)}
                    className="cursor-pointer"
                  />
                )
              }
            />
            <Button className="w-full">{t("registerButton")}</Button>
          </div>

          <TypographyMuted className="text-center text-sm">
            {t("alreadyHaveAccount")}{" "}
            <Link href="/login" className="text-violet-600 dark:text-violet-400 font-semibold hover:underline">
              {t("signIn")}
            </Link>
          </TypographyMuted>
        </div>
      </div>

    </div>
  )
}

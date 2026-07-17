"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Check, Flame, Globe, KeyRound, LogOut, Minus, Moon, Plus, Smile, Sun, Target,
  Trophy, User, Zap,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { AppShell } from "@/components/utils/app-shell"
import { Avatar } from "@/components/utils/avatar"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { CountUp } from "@/components/utils/animations/count-up"
import { GrowBar } from "@/components/utils/animations/grow-bar"
import { TypographyH2 } from "@/components/utils/typography/typography-h2"
import { TypographyH3 } from "@/components/utils/typography/typography-h3"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"
import { useProfile } from "@/hooks/utils/use-profile"
import { useHydrated } from "@/hooks/utils/use-hydrated"
import { useProfileStore } from "@/stores/profiles/profile-store"
import type { IProfileFields } from "@/stores/profiles/profile-store"
import { useLanguageStore } from "@/stores/languages/language-store"
import { studentData } from "@/utils/constants/dashboard.constant"
import { AVATAR_PRESETS, toAvatarPreset } from "@/utils/constants/avatar.constant"

const GOAL_MIN = 1
const GOAL_MAX = 14

export default function ProfilePage() {
  const t = useTranslations("profile")

  const profile = useProfile()
  const updateProfile = useProfileStore((s) => s.updateProfile)

  const { language, setLanguage } = useLanguageStore()
  const { resolvedTheme, setTheme } = useTheme()
  const hydrated = useHydrated()

  /* Null until the student types: the form mirrors the live profile (which
     fills in when the store rehydrates), then the draft takes over. */
  const [edits, setEdits] = useState<IProfileFields | null>(null)
  const [saved, setSaved] = useState(false)
  const draft = edits ?? profile

  const dirty = edits !== null && (
    draft.name !== profile.name ||
    draft.nameKh !== profile.nameKh ||
    draft.email !== profile.email
  )

  const save = () => {
    updateProfile({
      name: draft.name.trim() || profile.name,
      nameKh: draft.nameKh.trim() || profile.nameKh,
      email: draft.email.trim() || profile.email,
    })
    setEdits(null)
    setSaved(true)
  }

  useEffect(() => {
    if (!saved) return
    const id = setTimeout(() => setSaved(false), 2000)
    return () => clearTimeout(id)
  }, [saved])

  const setGoal = (n: number) =>
    updateProfile({ weeklyGoal: Math.min(GOAL_MAX, Math.max(GOAL_MIN, n)) })

  const xpPct = Math.round((studentData.xp / studentData.xpToNext) * 100)
  const isDark = resolvedTheme === "dark"

  /* Resolve through the same fallback the tile renders with, so an account
     saved before presets existed highlights the avatar it actually shows. */
  const currentAvatar = toAvatarPreset(profile.avatar)

  const stats = [
    { icon: Trophy, label: t("statLevel"),  value: studentData.level,  color: "bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400" },
    { icon: Zap,    label: t("statXp"),     value: studentData.xp,     color: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400", locale: true },
    { icon: Flame,  label: t("statStreak"), value: studentData.streak, color: "bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  ]

  const field = (
    key: "name" | "nameKh" | "email",
    type = "text",
    maxLength?: number
  ) => (
    <div>
      <label htmlFor={key} className="text-xs font-medium text-muted-foreground mb-1.5 block">
        {t(`field${key.charAt(0).toUpperCase()}${key.slice(1)}`)}
      </label>
      <input
        id={key}
        type={type}
        value={draft[key]}
        maxLength={maxLength}
        onChange={(e) => setEdits({ ...draft, [key]: e.target.value })}
        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground
                   placeholder:text-muted-foreground/60 outline-none transition-all
                   focus:border-violet-400 dark:focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15"
      />
    </div>
  )

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Page header */}
        <AnimateIn animation="fade-up" delay={0.05}>
          <div>
            <TypographyH2 className="text-2xl font-bold text-foreground border-0 pb-0 mb-1">
              {t("pageTitle")}
            </TypographyH2>
            <TypographyMuted>{t("pageSubtitle")}</TypographyMuted>
          </div>
        </AnimateIn>

        {/* Identity hero */}
        <AnimateIn animation="fade-up" delay={0.1}>
          <div className="card-surface rounded-2xl p-6 border border-violet-200 dark:border-violet-500/20 flex items-center gap-5">
            <Avatar preset={profile.avatar} size="lg" />
            <div className="min-w-0">
              <div className="text-lg font-bold text-foreground truncate">{profile.name}</div>
              <TypographyMuted className="text-xs truncate">{profile.nameKh}</TypographyMuted>
              <TypographyMuted className="text-xs truncate mt-0.5">{profile.email}</TypographyMuted>
            </div>
          </div>
        </AnimateIn>

        {/* Avatar picker — applies on click, like a Netflix profile */}
        <AnimateIn animation="fade-up" delay={0.13}>
          <div className="card-surface rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-1">
              <Smile className="size-4 text-muted-foreground" />
              <TypographyH3 className="font-semibold text-foreground text-base">
                {t("avatarTitle")}
              </TypographyH3>
            </div>
            <TypographyMuted className="text-xs mb-4">{t("avatarDesc")}</TypographyMuted>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {AVATAR_PRESETS.map((preset) => {
                const active = currentAvatar === preset
                return (
                  <button
                    key={preset}
                    onClick={() => updateProfile({ avatar: preset })}
                    aria-pressed={active}
                    aria-label={t(`avatars.${preset}`)}
                    title={t(`avatars.${preset}`)}
                    className={`group relative rounded-2xl p-1 transition-all outline-none
                                focus-visible:ring-2 focus-visible:ring-primary/40 ${
                      active
                        ? "ring-2 ring-primary"
                        : "ring-1 ring-transparent hover:ring-border"
                    }`}
                  >
                    <Avatar
                      preset={preset}
                      size="lg"
                      className="size-full aspect-square rounded-xl transition-transform duration-300 motion-safe:group-hover:scale-105"
                    />
                    {active && (
                      <span className="absolute -right-1 -top-1 size-5 rounded-full bg-primary
                                       flex items-center justify-center ring-2 ring-background">
                        <Check className="size-3 text-white" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </AnimateIn>

        {/* Learning stats */}
        <AnimateIn animation="fade-up" delay={0.15}>
          <div className="card-surface rounded-2xl p-5">
            <TypographyH3 className="font-semibold text-foreground text-base mb-4">
              {t("statsTitle")}
            </TypographyH3>

            <div className="grid grid-cols-3 gap-4 mb-5">
              {stats.map(({ icon: Icon, label, value, color, locale }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`size-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
                    <div className="text-lg font-bold text-foreground">
                      <CountUp to={value} duration={1.2} ease="power3.out" locale={locale} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* XP toward the next level */}
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">
                {t("xpProgress", { level: studentData.level + 1 })}
              </span>
              <span className="font-semibold text-foreground">
                {studentData.xp.toLocaleString()} / {studentData.xpToNext.toLocaleString()}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <GrowBar to={xpPct} delay={0.3} className="h-full rounded-full gradient-bg-primary" />
            </div>
          </div>
        </AnimateIn>

        {/* Profile information */}
        <AnimateIn animation="fade-up" delay={0.2}>
          <div className="card-surface rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-1">
              <User className="size-4 text-muted-foreground" />
              <TypographyH3 className="font-semibold text-foreground text-base">
                {t("infoTitle")}
              </TypographyH3>
            </div>
            <TypographyMuted className="text-xs mb-4">{t("infoDesc")}</TypographyMuted>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field("name")}
              {field("nameKh")}
              {field("email", "email")}
            </div>

            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={save}
                disabled={!dirty}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                           gradient-bg-primary hover:opacity-90 transition-all btn-shine
                           disabled:opacity-40 disabled:pointer-events-none"
              >
                {t("save")}
              </button>
              {dirty && (
                <button
                  onClick={() => setEdits(null)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("cancel")}
                </button>
              )}
              {saved && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  <Check className="size-4" />
                  {t("saved")}
                </span>
              )}
            </div>
          </div>
        </AnimateIn>

        {/* Weekly goal */}
        <AnimateIn animation="fade-up" delay={0.25}>
          <div className="card-surface rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-1">
              <Target className="size-4 text-muted-foreground" />
              <TypographyH3 className="font-semibold text-foreground text-base">
                {t("goalTitle")}
              </TypographyH3>
            </div>
            <TypographyMuted className="text-xs mb-4">{t("goalDesc")}</TypographyMuted>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setGoal(profile.weeklyGoal - 1)}
                disabled={profile.weeklyGoal <= GOAL_MIN}
                aria-label={t("goalDecrease")}
                className="size-9 rounded-xl border border-border flex items-center justify-center shrink-0
                           text-muted-foreground hover:text-foreground hover:bg-muted transition-all
                           disabled:opacity-40 disabled:pointer-events-none"
              >
                <Minus className="size-4" />
              </button>

              <div className="text-center min-w-24">
                <div className="text-3xl font-bold gradient-text leading-none">{profile.weeklyGoal}</div>
                <TypographyMuted className="text-[11px] mt-1">{t("goalUnit")}</TypographyMuted>
              </div>

              <button
                onClick={() => setGoal(profile.weeklyGoal + 1)}
                disabled={profile.weeklyGoal >= GOAL_MAX}
                aria-label={t("goalIncrease")}
                className="size-9 rounded-xl border border-border flex items-center justify-center shrink-0
                           text-muted-foreground hover:text-foreground hover:bg-muted transition-all
                           disabled:opacity-40 disabled:pointer-events-none"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
        </AnimateIn>

        {/* Preferences */}
        <AnimateIn animation="fade-up" delay={0.3}>
          <div className="card-surface rounded-2xl p-5 space-y-5">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <Globe className="size-4 text-muted-foreground" />
                <TypographyH3 className="font-semibold text-foreground text-base">
                  {t("prefsTitle")}
                </TypographyH3>
              </div>
              <TypographyMuted className="text-xs">{t("prefsDesc")}</TypographyMuted>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-foreground">{t("language")}</span>
              <div className="flex gap-1.5 p-1 rounded-xl bg-muted shrink-0">
                {(["en", "km"] as const).map((code) => (
                  <button
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      language === code
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t(`language_${code}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-foreground">{t("theme")}</span>
              <div className="flex gap-1.5 p-1 rounded-xl bg-muted shrink-0">
                {([
                  { key: "light", icon: Sun,  active: hydrated &&!isDark },
                  { key: "dark",  icon: Moon, active: hydrated &&isDark  },
                ] as const).map(({ key, icon: Icon, active }) => (
                  <button
                    key={key}
                    onClick={() => setTheme(key)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      active
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-3.5" />
                    {t(`theme_${key}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Account */}
        <AnimateIn animation="fade-up" delay={0.35}>
          <div className="card-surface rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-1">
              <KeyRound className="size-4 text-muted-foreground" />
              <TypographyH3 className="font-semibold text-foreground text-base">
                {t("accountTitle")}
              </TypographyH3>
            </div>
            <TypographyMuted className="text-xs mb-4">{t("accountDesc")}</TypographyMuted>

            <div className="flex flex-wrap items-center gap-3">
              <button
                disabled
                title={t("changePasswordNote")}
                className="px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground
                           disabled:opacity-50 disabled:pointer-events-none"
              >
                {t("changePassword")}
              </button>
              <Link href="/login">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                                   text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10
                                   border border-red-200 dark:border-red-500/25 transition-all">
                  <LogOut className="size-4" />
                  {t("signOut")}
                </button>
              </Link>
            </div>
            <TypographyMuted className="text-[11px] mt-3">{t("changePasswordNote")}</TypographyMuted>
          </div>
        </AnimateIn>

      </div>
    </AppShell>
  )
}

"use client"

import { Globe } from "lucide-react"
import { useLanguageStore } from "@/stores/languages/language-store"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore()

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "km" : "en")}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
      title={language === "en" ? "Switch to Khmer" : "Switch to English"}
    >
      <Globe className="size-4 shrink-0" />
      <span className="text-xs font-semibold">
        {language === "en" ? "EN" : "KH"}
      </span>
    </button>
  )
}

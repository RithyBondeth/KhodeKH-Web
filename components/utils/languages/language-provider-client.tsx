"use client"

import { NextIntlClientProvider } from "next-intl"
import { useLanguageStore } from "@/stores/languages/language-store"
import { useEffect, useState } from "react"
import type { IWithChildren } from "@/utils/interfaces"
import type { TLanguage } from "@/utils/types/app"
import enMessages from "@/language/en.json"
import kmMessages from "@/language/km.json"

const messages: Record<TLanguage, typeof enMessages> = {
  en: enMessages,
  km: kmMessages,
}

export function LanguageProviderClient({ children }: IWithChildren) {
  const storedLanguage = useLanguageStore((s) => s.language)
  // "en" on first render matches SSR output — no hydration mismatch.
  // After mount, sync to whatever is in the Zustand store (could be "km").
  const [language, setLanguage] = useState<TLanguage>("en")

  useEffect(() => {
    setLanguage(storedLanguage)
  }, [storedLanguage])

  return (
    <NextIntlClientProvider locale={language} messages={messages[language]} timeZone="Asia/Phnom_Penh">
      {children}
    </NextIntlClientProvider>
  )
}

"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { TLanguage } from "@/utils/types/app"

interface ILanguageState {
  language: TLanguage
  setLanguage: (language: TLanguage) => void
}

export const useLanguageStore = create<ILanguageState>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => {
        document.cookie = `apsara-elearning-lang=${language};path=/;max-age=31536000;SameSite=Lax`
        set({ language })
      },
    }),
    { name: "apsara-elearning-language" }
  )
)

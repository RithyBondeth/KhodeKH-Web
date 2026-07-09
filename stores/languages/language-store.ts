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
      setLanguage: (language) => set({ language }),
    }),
    { name: "kodekh-language" }
  )
)

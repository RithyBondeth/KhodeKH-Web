import { cookies } from "next/headers"
import type { IWithChildren } from "@/utils/interfaces"
import type { TLanguage } from "@/utils/types/app"
import { LanguageProviderClient } from "./language-provider-client"

export async function LanguageProvider({ children }: IWithChildren) {
  const cookieStore = await cookies()
  const initialLang = (cookieStore.get("apsara-elearning-lang")?.value as TLanguage) || "en"

  return (
    <LanguageProviderClient initialLang={initialLang}>
      {children}
    </LanguageProviderClient>
  )
}

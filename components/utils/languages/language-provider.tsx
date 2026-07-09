import type { IWithChildren } from "@/utils/interfaces"
import { LanguageProviderClient } from "./language-provider-client"

export function LanguageProvider({ children }: IWithChildren) {
  return <LanguageProviderClient>{children}</LanguageProviderClient>
}

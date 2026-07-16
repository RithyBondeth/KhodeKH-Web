import { JetBrains_Mono, Roboto_Slab, Koh_Santepheap } from "next/font/google"
import type { Metadata } from "next"
import { cookies } from "next/headers"

import "./globals.css"
import { ThemeProvider } from "@/components/utils/themes/theme-provider"
import { LanguageProviderClient } from "@/components/utils/languages/language-provider-client"
import { cn } from "@/lib/utils"
import { DotPattern } from "@/components/utils/mesh-gradient"

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const kohSantepheap = Koh_Santepheap({
  subsets: ["khmer", "latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-khmer",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const geistMonoHeading = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Apsara Elearning — Learn to Code in Khmer",
  description:
    "The first AI-powered coding platform built for Cambodian students. Learn Python, JavaScript, and more with your personal AI mentor.",
  keywords: ["coding", "Cambodia", "Khmer", "AI", "programming", "learn"],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const initialLang = (cookieStore.get("kodekh-lang")?.value as "en" | "km") || "en"

  return (
    <html
      lang={initialLang}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        robotoSlab.variable,
        kohSantepheap.variable,
        jetbrainsMono.variable,
        geistMonoHeading.variable,
        "font-sans"
      )}
    >
      <body>
        <ThemeProvider defaultTheme="dark">
          <DotPattern />
          <LanguageProviderClient initialLang={initialLang}>
            {children}
          </LanguageProviderClient>
        </ThemeProvider>
      </body>
    </html>
  )
}

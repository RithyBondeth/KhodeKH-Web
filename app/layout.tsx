import { Geist_Mono, Inter, Noto_Sans_Khmer } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/utils/themes/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-khmer",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const geistMonoHeading = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Apsara AI — Learn to Code in Khmer",
  description:
    "The first AI-powered coding platform built for Cambodian students. Learn Python, JavaScript, and more with your personal AI mentor Apsara.",
  keywords: ["coding", "Cambodia", "Khmer", "AI", "programming", "learn"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="km"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        inter.variable,
        notoSansKhmer.variable,
        geistMono.variable,
        geistMonoHeading.variable,
        "font-sans"
      )}
    >
      <body>
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  )
}

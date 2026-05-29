"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TypographyH3 } from "@/components/utils/typography/typography-h3"
import { EyeClosedIcon, EyeIcon, LockIcon, MailIcon } from "lucide-react"
import { useState } from "react"

export default function LoginPage() {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex max-w-sm flex-col items-center justify-center gap-3">
          <TypographyH3>LOGIN TO YOUR ACCOUNT</TypographyH3>
          <div className="flex w-full flex-col gap-3">
            <Input
              prefix={<MailIcon />}
              placeholder="Enter your email..."
              type="email"
            />
            <Input
              prefix={<LockIcon />}
              placeholder="Enter your password..."
              type={passwordVisibility ? "text" : "password"}
              suffix={
                passwordVisibility ? (
                  <EyeClosedIcon
                    onClick={() => setPasswordVisibility(false)}
                    className="cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setPasswordVisibility(true)}
                    className="cursor-pointer"
                  />
                )
              }
            />
            <Button>Login</Button>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-primary"></div>
    </div>
  )
}

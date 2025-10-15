"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'diagonal-grid-bg' : 'diagonal-grid-dark'}`}>
      {children}
    </div>
  )
}

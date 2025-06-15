'use client'

import { ThemeProvider } from 'next-themes'
import { LevelProvider } from '@/components/LevelProvider'

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <LevelProvider>{children}</LevelProvider>
    </ThemeProvider>
  )
}

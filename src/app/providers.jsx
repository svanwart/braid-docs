'use client'

import { ThemeProvider } from 'next-themes'
import { AppProvider } from '@/components/AppContext'

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  )
}

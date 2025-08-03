import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'

import { Providers } from '@/app/providers'
import { PasswordProtection } from '@/components/PasswordProtection'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Use local version of Lexend so that we can use OpenType features
const lexend = localFont({
  src: '../fonts/lexend.woff2',
  display: 'swap',
  variable: '--font-lexend',
})

export const metadata = {
  title: {
    template: '%s - Docs',
    default: 'Cerebellum-Inspired Circuits',
  },
  description: 'Some sub-description',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={
        clsx('h-full antialiased', inter.variable, lexend.variable) +
        ' scroll-smooth'
      }
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/braid-docs/favicon.svg" />
      </head>
      <body className="flex min-h-full flex-col bg-white dark:bg-slate-900">
        <PasswordProtection>
          <Providers>{children}</Providers>
        </PasswordProtection>
      </body>
    </html>
  )
}

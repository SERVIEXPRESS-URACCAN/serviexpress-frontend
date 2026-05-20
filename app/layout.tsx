import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import { TooltipProvider } from '@/components/ui/tooltip'

import { ThemeProvider } from '@/components/shared/theme-provider'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'ServiExpress',
  description: 'Dashboard administrativo'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} h-full`}
    >
      <body className="min-h-full font-sans antialiased">
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

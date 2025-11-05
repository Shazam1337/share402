import type { Metadata } from 'next'
import './globals.css'
import WalletContextProvider from '@/components/WalletProvider'

export const metadata: Metadata = {
  title: 'Share402 - Earn. Share. Grow.',
  description: 'Solana activity dashboard - Track your rewards and community growth',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  )
}


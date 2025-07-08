import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './auth/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flappy Bird - Next.js',
  description: 'A modern Flappy Bird game built with Next.js and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

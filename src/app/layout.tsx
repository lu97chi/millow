import type { Metadata } from 'next'
import { Montserrat, Raleway } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const raleway = Raleway({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: 'TuHogar | Find Your Dream Home',
  description: 'TuHogar helps you find the perfect home with a modern, sophisticated approach to real estate.',
  keywords: ['real estate', 'homes', 'property', 'houses', 'apartments', 'TuHogar'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${raleway.variable}`}>
      <body className="min-h-screen bg-midnight text-silver-200 antialiased">
        {children}
      </body>
    </html>
  )
}

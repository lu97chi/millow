import type { Metadata } from 'next'
import { Montserrat, Cormorant } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Providers } from './providers'

// Montserrat for body text - clean, modern, and highly readable
const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
})

// Cormorant for display text - elegant, sophisticated serif that conveys trust and luxury
const cormorant = Cormorant({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'TuHogar | Encuentra Tu Hogar Soñado',
  description: 'TuHogar utiliza inteligencia artificial para ayudarte a encontrar la casa perfecta con seguridad y confianza, transformando tus sueños en realidad.',
  keywords: ['bienes raíces', 'casas', 'propiedades', 'inmuebles', 'apartamentos', 'TuHogar', 'inteligencia artificial', 'seguridad'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

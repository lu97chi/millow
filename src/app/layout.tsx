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
  title: 'TuHogar | Encuentra Tu Hogar Soñado',
  description: 'TuHogar te ayuda a encontrar la casa perfecta con un enfoque moderno y sofisticado en bienes raíces.',
  keywords: ['bienes raíces', 'casas', 'propiedades', 'inmuebles', 'apartamentos', 'TuHogar'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${raleway.variable}`}>
      <body className="min-h-screen bg-midnight text-silver-200 antialiased">
        {children}
      </body>
    </html>
  )
}

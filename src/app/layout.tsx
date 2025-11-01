import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { AuthModal } from '@/components/auth/AuthModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PaddleBuilder - Crea Landing Pages para tu Escuela de Pádel',
  description: 'Herramienta gratuita para crear landing pages profesionales para academias y escuelas de pádel. Editor visual, sin código, completamente responsive.',
  keywords: 'pádel, landing page, academia, escuela, deporte, builder, editor',
  authors: [{ name: 'PaddleBuilder' }],
  openGraph: {
    title: 'PaddleBuilder - Crea Landing Pages para tu Escuela de Pádel',
    description: 'Herramienta gratuita para crear landing pages profesionales para academias y escuelas de pádel.',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PaddleBuilder - Landing Builder para Escuelas de Pádel'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PaddleBuilder - Crea Landing Pages para tu Escuela de Pádel',
    description: 'Herramienta gratuita para crear landing pages profesionales para academias y escuelas de pádel.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  )
}
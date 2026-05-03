import type { Metadata } from 'next'
import { Bebas_Neue, JetBrains_Mono, Outfit } from 'next/font/google'
import './globals.css'
import CookieBanner from './components/CookieBanner'

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' })
const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-outfit', display: 'swap' })

export const metadata: Metadata = {
  title: 'LXSOLUTIONS — Automatización, Contenido & Redes · Barcelona',
  description: 'LXSOLUTIONS es el grupo detrás de LXSYNC, LXMEDIA y LXVIRAL. Automatización con IA, contenido YouTube y redes sociales para empresas. Barcelona.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://lxsolutions.com/' },
  openGraph: {
    type: 'website',
    siteName: 'LXSOLUTIONS',
    title: 'LXSOLUTIONS — El grupo detrás de la automatización',
    description: 'LXSYNC, LXMEDIA y LXVIRAL. Tres divisiones. Un sistema. Construido desde Barcelona.',
    url: 'https://lxsolutions.com/',
    locale: 'es_ES',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LXSOLUTIONS',
  description: 'Grupo empresarial con divisiones en automatización IA, contenido YouTube y redes sociales.',
  url: 'https://lxsolutions.com',
  email: 'info@lxsync.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Barcelona', addressCountry: 'ES' },
  subOrganization: [
    { '@type': 'Organization', name: 'LXSYNC', url: 'https://lxsync.com' },
    { '@type': 'Organization', name: 'LXMEDIA' },
    { '@type': 'Organization', name: 'LXVIRAL' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${bebasNeue.variable} ${jetbrainsMono.variable} ${outfit.variable}`}>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}

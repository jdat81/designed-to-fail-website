import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ToastProvider } from '@/components/ui/Toast'

export const metadata: Metadata = {
  metadataBase: new URL('https://designedtofail.com'),
  title: {
    default: 'Designed to Fail | Why Americans Love Their Country and Hate Their Government',
    template: '%s | Designed to Fail'
  },
  description: 'A groundbreaking analysis by Sven Steinmo and John D\'Attoma examining how constitutional design creates American political dysfunction. The system isn\'t broken—it was designed this way.',
  keywords: ['American politics', 'constitutional design', 'political dysfunction', 'trust in government', 'Sven Steinmo', 'John D\'Attoma', 'Yale University Press', 'historical institutionalism'],
  authors: [
    { name: 'Sven Steinmo' },
    { name: 'John D\'Attoma' }
  ],
  creator: 'Sven Steinmo & John D\'Attoma',
  publisher: 'Yale University Press',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://designedtofail.com',
    siteName: 'Designed to Fail',
    title: 'Designed to Fail | Why Americans Love Their Country and Hate Their Government',
    description: 'A groundbreaking analysis examining how constitutional design creates American political dysfunction.',
    images: [
      {
        url: '/images/cover.jpg',
        width: 600,
        height: 900,
        alt: 'Designed to Fail Book Cover - American flag fragmenting over Capitol building',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Designed to Fail',
    description: 'The system isn\'t broken—it was designed this way.',
    images: ['/images/cover.jpg'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ToastProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-grow" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}

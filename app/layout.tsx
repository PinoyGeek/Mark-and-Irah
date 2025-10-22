import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Amelyn 'Jam' Mote & Jan Erick 'Jan' Añonuevo - Wedding Invitation",
  description:
    "You're invited to the wedding of Amelyn 'Jam' Mote and Jan Erick 'Jan' Añonuevo! Join us on December 3, 2025. A celebration of love, nature, and forever. RSVP, read our love story, view our gallery, and leave a message for the couple.",
  keywords:
    "Amelyn Jam Mote Jan Erick Añonuevo wedding, garden wedding, Filipino wedding, RSVP, wedding gallery, wedding message wall, wedding invitation, 2025 weddings, love story, guestbook, wedding registry, wedding details, wedding venues Philippines, #JamAndJanWedding",
  authors: [
    { name: "Amelyn 'Jam' Mote" },
    { name: "Jan Erick 'Jan' Añonuevo" },
  ],
  creator: "Amelyn 'Jam' Mote & Jan Erick 'Jan' Añonuevo",
  publisher: "Amelyn 'Jam' Mote & Jan Erick 'Jan' Añonuevo",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://jam-jan-invitation.vercel.app/"),
  alternates: {
    canonical: "https://jam-jan-invitation.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Amelyn 'Jam' Mote & Jan Erick 'Jan' Añonuevo Wedding | December 3, 2025",
    description:
      "Celebrate the union of Amelyn 'Jam' Mote and Jan Erick 'Jan' Añonuevo on December 3, 2025. A celebration of love, nature, and forever. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://jam-jan-invitation.vercel.app/",
    siteName: "Amelyn 'Jam' Mote & Jan Erick 'Jan' Añonuevo Wedding",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://jam-jan-invitation.vercel.app/Couple_img/couple_2.png",
        width: 1200,
        height: 630,
        alt: "Amelyn 'Jam' Mote & Jan Erick 'Jan' Añonuevo Wedding Invitation - December 3, 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amelyn 'Jam' Mote & Jan Erick 'Jan' Añonuevo Wedding Invitation",
    description:
      "You're invited to the wedding of Amelyn 'Jam' Mote and Jan Erick 'Jan' Añonuevo! December 3, 2025. A celebration of love, nature, and forever. RSVP, view our gallery, and leave a message! #JamAndJanWedding",
    images: ["https://jam-jan-invitation.vercel.app/Couple_img/couple_2.png"],
    creator: "@jamandjan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Amelyn 'Jam' Mote & Jan Erick 'Jan' Añonuevo Wedding",
      startDate: "2025-12-03T16:00:00+08:00",
      endDate: "2025-12-03T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "Garden Venue",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Philippines",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://jam-jan-invitation.vercel.app/Couple_img/couple_2.png"],
      description:
        "You're invited to the wedding of Amelyn 'Jam' Mote and Jan Erick 'Jan' Añonuevo! Join us on December 3, 2025. A celebration of love, nature, and forever. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Amelyn 'Jam' Mote & Jan Erick 'Jan' Añonuevo",
      },
      offers: {
        "@type": "Offer",
        url: "https://jam-jan-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#JamAndJanWedding",
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#5f674f" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} font-inter antialiased bg-background text-foreground`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

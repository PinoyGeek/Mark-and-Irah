import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Erda & Russell - Wedding Invitation",
  description:
    "You're invited to the wedding of Erda & Russell! Join us on January 10, 2026 in La Trinidad, Benguet. RSVP, read our love story, view our gallery, and leave a message for the couple.",
  keywords:
    "Christian Kate wedding, Filipino wedding, RSVP, wedding gallery, wedding message wall, wedding invitation, 2026 weddings, love story, guestbook, wedding registry, wedding details, wedding venues Cebu, #ChristianAndKateWedding",
  authors: [
    { name: "Erda" },
    { name: "Russell" },
  ],
  creator: "Erda & Russell",
  publisher: "Erda & Russell",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://Erda-and-Russell-invitation.vercel.app/"),
  alternates: {
    canonical: "https://Erda-and-Russell-invitation.vercel.app/",
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
    title: "Erda & Russell Wedding | January 10, 2026",
    description:
      "Celebrate the union of Erda & Russell on January 10, 2026 in La Trinidad, Benguet. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://Erda-and-Russell-invitation.vercel.app/",
    siteName: "Erda & Russell Wedding",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://Erda-and-Russell-invitation.vercel.app/Couple_img/couple (1).jpg",
        width: 1200,
        height: 630,
        alt: "Erda & Russell Wedding Invitation - January 10, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erda & Russell Wedding Invitation",
    description:
      "You're invited to the wedding of Erda & Russell! January 10, 2026. RSVP, view our gallery, and leave a message! #ErdaAndRussellWedding",
    images: ["https://Erda-and-Russell-invitation.vercel.app/Couple_img/couple (1).jpg"],
    creator: "@erdaandrussell",
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
      name: "Erda & Russell Wedding",
      startDate: "2026-01-10T14:00:00+08:00",
      endDate: "2026-01-10T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "San Jose the Husband of Mary Parish",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Buyagan, La Trinidad, Benguet",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://Erda-and-Russell-invitation.vercel.app/Couple_img/couple (1).jpg"],
      description:
        "You're invited to the wedding of Erda & Russell! Join us on January 10, 2026 in La Trinidad, Benguet. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Erda & Russell",
      },
      offers: {
        "@type": "Offer",
        url: "https://Erda-and-Russell-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#ErdaAndRussellWedding",
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
        <meta name="theme-color" content="#525E2C" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} font-inter antialiased text-foreground`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

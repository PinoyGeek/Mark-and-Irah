import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter, Imperial_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })
const imperialScript = Imperial_Script({ subsets: ["latin"], weight: "400", variable: "--font-imperial-script" })

export const metadata: Metadata = {
  title: "Edlin Mae & Joshua Jose - Wedding Invitation",
  description:
    "Celebrate the wedding of Edlin Mae B. Cellona and Joshua Jose T. Descalzo on December 22, 2025 at St. Gregory the Great Cathedral, Old Albay District, Legazpi City. RSVP, explore their love story, view the gallery, and send your wishes.",
  keywords:
    "Edlin Mae Joshua Jose wedding, Legazpi City wedding, St. Gregory the Great Cathedral, Pepperland Hotel reception, rosegold champagne wedding, RSVP, wedding gallery, message wall, love story, #EdlinAndJoshuaWedding",
  authors: [
    { name: "Edlin Mae" },
    { name: "Joshua Jose" },
  ],
  creator: "Edlin Mae & Joshua Jose",
  publisher: "Edlin Mae & Joshua Jose",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://edlin-and-joshua-invitation.vercel.app/"),
  alternates: {
    canonical: "https://edlin-and-joshua-invitation.vercel.app/",
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
    title: "Edlin Mae & Joshua Jose Wedding | December 22, 2025",
    description:
      "Celebrate the union of Edlin Mae & Joshua Jose on December 22, 2025 at St. Gregory the Great Cathedral, Old Albay District, Legazpi City. Discover their love story, RSVP, view the gallery, and share your wishes!",
    url: "https://edlin-and-joshua-invitation.vercel.app/",
    siteName: "Edlin Mae and Joshua Jose Wedding",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://edlin-and-joshua-invitation.vercel.app/desktop-background/couple (41).jpg",
        width: 1200,
        height: 630,
        alt: "Edlin Mae & Joshua Jose Wedding Invitation - December 22, 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edlin Mae & Joshua Jose Wedding Invitation",
    description:
      "You're invited to the wedding of Edlin Mae & Joshua Jose on December 22, 2025. RSVP, explore the gallery, and leave a message! #EdlinAndJoshuaWedding",
    images: ["https://edlin-and-joshua-invitation.vercel.app/desktop-background/couple (41).jpg"],
    creator: "@edlinmae",
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
      name: "Edlin Mae & Joshua Jose Wedding",
      startDate: "2025-12-22T15:00:00+08:00",
      endDate: "2025-12-22T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "St. Gregory the Great Cathedral, Old Albay District, Legazpi City",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Legazpi City, Albay",
            addressCountry: "PH",
          },
        },
        {
          "@type": "Place",
          name: "Pepperland Hotel",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Airport Road, Washington Drive Ext., Brgy 40 Cruzada",
            addressLocality: "Legazpi City, Albay",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://edlin-and-joshua-invitation.vercel.app/desktop-background/couple (41).jpg"],
      description:
        "You're invited to the wedding of Edlin Mae & Joshua Jose on December 22, 2025 at St. Gregory the Great Cathedral with a reception at Pepperland Hotel. RSVP, read their love story, view the gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Edlin Mae & Joshua Jose",
      },
      offers: {
        "@type": "Offer",
        url: "https://edlin-and-joshua-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#EdlinAndJoshuaWedding",
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
        <meta name="theme-color" content="#B76E79" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} ${imperialScript.variable} font-inter antialiased text-foreground`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

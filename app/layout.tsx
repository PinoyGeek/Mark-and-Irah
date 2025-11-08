import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Airez & Brendan - Wedding Invitation",
  description:
    "You're invited to the wedding of Airez & Brendan! Join us on December 28, 2025 in Alta Guia, Taguig, Metro Manila. RSVP, read our love story, view our gallery, and leave a message for the couple.",
  keywords:
    "Airez Brendan wedding, Filipino wedding, RSVP, wedding gallery, wedding message wall, wedding invitation, 2025 weddings, love story, guestbook, wedding registry, wedding details, wedding venues Alta Guia, Taguig, Metro Manila, #AirezAndBrendanWedding",
  authors: [
    { name: "Airez" },
    { name: "Brendan" },
  ],
  creator: "Airez & Brendan",
  publisher: "Airez & Brendan",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://Airez-and-Brendan-invitation.vercel.app/"),
  alternates: {
    canonical: "https://Airez-and-Brendan-invitation.vercel.app/",
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
    title: "Airez & Brendan Wedding | December 28, 2025",
    description:
      "Celebrate the union of Airez & Brendan on December 28, 2025 in Alta Guia, Taguig, Metro Manila. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://Airez-and-Brendan-invitation.vercel.app/",
    siteName: "Airez and Brendan Wedding ",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://Airez-and-Brendan-invitation.vercel.app/desktop-background/couple (1).jpg",
        width: 1200,
        height: 630,
        alt: "Airez & Brendan Wedding Invitation - December 28, 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Airez & Brendan Wedding Invitation",
    description:
      "You're invited to the wedding of Airez & Brendan! December 28, 2025. RSVP, view our gallery, and leave a message! #AirezAndBrendanWedding",
    images: ["https://Airez-and-Brendan-invitation.vercel.app/desktop-background/couple (1).jpg"],
    creator: "@airezandbrendan",
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
      name: "Talitha & Karol Wedding",
      startDate: "2026-02-14T14:00:00+08:00",
      endDate: "2026-02-14T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "Alta Guia, Taguig, Metro Manila",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Taguig, Metro Manila",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://Airez-and-Brendan-invitation.vercel.app/desktop-background/couple (1).jpg"],
      description:
        "You're invited to the wedding of Airez & Brendan! Join us on December 28, 2025 in Alta Guia, Taguig, Metro Manila. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Airez & Brendan",
      },
      offers: {
        "@type": "Offer",
        url: "https://Airez-and-Brendan-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#AirezAndBrendanWedding",
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
        <meta name="theme-color" content="#0A3428" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} font-inter antialiased text-foreground`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

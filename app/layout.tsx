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
  title: "Julaine & Cristopher - Wedding Invitation",
  description:
    "Celebrate the wedding of Julaine and Cristopher on December 28, 2025 at Mount Costa, Lamtang Road, Pugis, La Trinidad, Benguet. RSVP, explore their love story, view the gallery, and send your wishes.",
  keywords:
    "Julaine Cristopher wedding, La Trinidad Benguet wedding, Mount Costa, garden wedding, spring theme wedding, RSVP, wedding gallery, message wall, love story, #JulaineAndCristopherWedding",
  authors: [
    { name: "Julaine" },
    { name: "Cristopher" },
  ],
  creator: "Julaine & Cristopher",
  publisher: "Julaine & Cristopher",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://Julaine-and-Cristopher-invitation.vercel.app/"),
  alternates: {
    canonical: "https://Julaine-and-Cristopher-invitation.vercel.app/",
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
    title: "Julaine & Cristopher Wedding | December 28, 2025",
    description:
      "Celebrate the union of Julaine & Cristopher on December 28, 2025 at Mount Costa, Lamtang Road, Pugis, La Trinidad, Benguet. Discover their love story, RSVP, view the gallery, and share your wishes!",
    url: "https://Julaine-and-Cristopher-invitation.vercel.app/",
    siteName: "Julaine and Cristopher Wedding",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://Julaine-and-Cristopher-invitation.vercel.app/Couple_img/image.png",
        width: 1200,
        height: 630,
        alt: "Julaine & Cristopher Wedding Invitation - December 28, 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Julaine & Cristopher Wedding Invitation",
    description:
      "You're invited to the wedding of Julaine & Cristopher on December 28, 2025. RSVP, explore the gallery, and leave a message! #JulaineAndCristopherWedding",
    images: ["https://Julaine-and-Cristopher-invitation.vercel.app/Couple_img/image.png"],
    creator: "@julaineandcristopher",
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
      name: "Julaine & Cristopher Wedding",
      startDate: "2025-12-28T15:00:00+08:00",
      endDate: "2025-12-28T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "Mount Costa",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Lamtang Road, Pugis",
            addressLocality: "La Trinidad, Benguet",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://Julaine-and-Cristopher-invitation.vercel.app/Couple_img/image.png"],
      description:
        "You're invited to the wedding of Julaine & Cristopher on December 28, 2025 at Mount Costa, La Trinidad, Benguet. RSVP, read their love story, view the gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Julaine & Cristopher",
      },
      offers: {
        "@type": "Offer",
        url: "https://Julaine-and-Cristopher-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#JulaineAndCristopherWedding",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lavishly+Yours&display=swap" rel="stylesheet" />
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

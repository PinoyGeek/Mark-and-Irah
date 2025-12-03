import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter, Imperial_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jonarelh-and-hazel-invitation.netlify.app/"
const canonicalUrl = siteUrl.replace(/\/$/, "")
const eventImagePath = "/invitation/thumbnail.jpg"
const eventImageUrl = `${canonicalUrl}${eventImagePath}`
const eventTitle = "Jonarelh & Hazel - Wedding Invitation"
const eventDescription =
  "Celebrate the wedding of Jonarelh and Hazel on December 21, 2025 in Kibawe, Bukidnon. RSVP, explore their love story, view the gallery, and find everything you need to join the celebration."

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Jonarelh & Hazel Wedding",
  startDate: "2025-12-21T12:30:00+08:00",
  endDate: "2025-12-21T21:00:00+08:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: [
    {
      "@type": "Place",
      name: "Gutapol SDA Church",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Gutapol, Kibawe",
        addressLocality: "Bukidnon",
        addressCountry: "PH",
      },
    },
    {
      "@type": "Place",
      name: "Kibawe Function Hall",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kibawe",
        addressLocality: "Bukidnon",
        addressCountry: "PH",
      },
    },
  ],
  image: [eventImageUrl],
  description:
    "You're invited to the wedding of Jonarelh & Hazel on December 21, 2025 in Kibawe, Bukidnon. Find ceremony and reception details, RSVP information, and their full love story.",
  organizer: {
    "@type": "Person",
    name: "Jonarelh & Hazel",
  },
  eventHashtag: "#WalaPaMeyHashtagManHAHAHAHAHAHHAA",
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })
const imperialScript = Imperial_Script({ subsets: ["latin"], weight: "400", variable: "--font-imperial-script" })

export const metadata: Metadata = {
  title: eventTitle,
  description: eventDescription,
  keywords:
    "Jonarelh Hazel wedding, Kibawe Bukidnon wedding, Gutapol SDA Church, Kibawe Function Hall, wedding invitation, RSVP, wedding gallery, message wall, love story, #WalaPaMeyHashtagManHAHAHAHAHAHHAA",
  authors: [
    { name: "Jonarelh" },
    { name: "Hazel" },
  ],
  creator: "Jonarelh & Hazel",
  publisher: "Jonarelh & Hazel",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL(canonicalUrl),
  alternates: {
    canonical: canonicalUrl,
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
    title: "Jonarelh & Hazel Wedding | December 21, 2025",
    description:
      "Celebrate the union of Jonarelh & Hazel on December 21, 2025 in Kibawe, Bukidnon. Discover their love story, RSVP, and find important details for the ceremony and reception.",
    url: canonicalUrl,
    siteName: "Jonarelh and Hazel Wedding",
    locale: "en_PH",
    type: "website",
    images: [
      // TODO: Replace with a real hosted image URL when available
      {
        url: eventImageUrl,
        width: 1200,
        height: 630,
        alt: "Jonarelh & Hazel Wedding Invitation - December 21, 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonarelh & Hazel Wedding Invitation",
    description:
      "You're invited to the wedding of Jonarelh & Hazel on December 21, 2025. RSVP, explore their story, and get all the details for the big day! #WalaPaMeyHashtagManHAHAHAHAHAHHAA",
    images: [eventImageUrl],
    creator: "@jonarelhandhazel",
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
    "application/ld+json": JSON.stringify(jsonLd),
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
        <meta name="theme-color" content="#660033" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lavishly+Yours&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Style+Script&display=swap" rel="stylesheet" />
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

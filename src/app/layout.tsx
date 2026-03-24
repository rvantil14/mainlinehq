import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./components/MobileNav";
import Analytics from "./components/Analytics";
import SiteChatWrapper from "./components/SiteChatWrapper";
import CookieConsent from "./components/CookieConsent";
import ManageCookiesButton from "./components/ManageCookiesButton";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mainlinehq.com"),
  title: "Mainline | AI Automation for Trade Businesses",
  description:
    "We build and run your AI front office. Phone answering, scheduling, invoicing, and reviews, automated for plumbers, HVAC, electricians, and contractors.",
  openGraph: {
    title: "Mainline | AI Automation for Trade Businesses",
    description:
      "We build and run your AI front office. Phone answering, scheduling, invoicing, and reviews, automated for plumbers, HVAC, electricians, and contractors.",
    type: "website",
    url: "https://mainlinehq.com",
    siteName: "Mainline",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mainline | AI Automation for Trade Businesses",
    description:
      "We build and run your AI front office. Phone answering, scheduling, invoicing, and reviews, automated for plumbers, HVAC, electricians, and contractors.",
  },
};

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/demo", label: "Demo" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Mainline",
              url: "https://mainlinehq.com",
              description:
                "AI automation platform for trade businesses. We build and run your AI front office: phone answering, scheduling, invoicing, and reviews.",
              telephone: "(805) 801-1380",
              email: "ryan@mainlinehq.com",
              areaServed: "United States",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-805-801-1380",
                contactType: "sales",
                availableLanguage: "English",
              },
            }),
          }}
        />
        {/* Header */}
        <header className="sticky top-0 z-50 bg-dark border-b border-white/10">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo-dark-bg.jpg"
                  alt="Mainline HQ"
                  width={180}
                  height={52}
                  className="h-10 w-auto"
                  priority
                />
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-transparent hover:border-accent transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="ml-4 inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-md transition-colors"
                >
                  Free Consultation
                </Link>
              </nav>

              {/* Mobile Hamburger */}
              <MobileNav />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="bg-dark text-gray-400">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Brand */}
              <div>
                <div className="mb-3">
                  <Image
                    src="/images/logo-dark-bg.jpg"
                    alt="Mainline HQ"
                    width={150}
                    height={44}
                    className="h-9 w-auto"
                  />
                </div>
                <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
                  The main line between your customers and your calendar.
                </p>
              </div>

              {/* Product */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                  Product
                </h3>
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-sm hover:text-white transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-sm hover:text-white transition-colors">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <ManageCookiesButton />
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                  Contact
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="tel:+18058011380"
                      className="text-sm hover:text-white transition-colors"
                    >
                      (805) 801-1380
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:ryan@mainlinehq.com"
                      className="text-sm hover:text-white transition-colors"
                    >
                      ryan@mainlinehq.com
                    </a>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm hover:text-white transition-colors">
                      Schedule a Call
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Mainline. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-xs text-text-light">
                <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
                <Link href="/admin" className="text-text-light/50 hover:text-gray-300 transition-colors">
                  Team Login
                </Link>
              </div>
            </div>
          </div>
        </footer>

        <SiteChatWrapper />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import MobileNav from "./components/MobileNav";
import Analytics from "./components/Analytics";
import SiteChatWrapper from "./components/SiteChatWrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
              "@type": "SoftwareApplication",
              name: "Mainline",
              applicationCategory: "BusinessApplication",
              description:
                "AI automation platform for trade businesses",
              url: "https://mainlinehq.com",
              provider: {
                "@type": "Organization",
                name: "Mainline",
                telephone: "(805) 801-1380",
                email: "hello@mainlinehq.com",
                areaServed: "United States",
              },
            }),
          }}
        />
        {/* Header */}
        <header className="sticky top-0 z-50 bg-dark border-b border-white/10">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center group">
                <span className="text-xl font-black text-white uppercase tracking-wider group-hover:text-accent transition-colors">
                  Mainline
                </span>
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
                  <span className="text-lg font-black text-white uppercase tracking-wider">Mainline</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
                  The main line between your customers and your calendar.
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <a
                    href="https://linkedin.com/company/mainlinehq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/mainlinehq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
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
                      href="mailto:hello@mainlinehq.com"
                      className="text-sm hover:text-white transition-colors"
                    >
                      hello@mainlinehq.com
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
              <p className="text-xs text-text-light">
                Powered by Stripe &middot; Encrypted &middot; CCPA Compliant
              </p>
            </div>
          </div>
        </footer>

        <SiteChatWrapper />
        <Analytics />
      </body>
    </html>
  );
}

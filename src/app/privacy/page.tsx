import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Mainline",
  description:
    "Mainline privacy policy. Learn how we collect, use, and protect your data.",
  openGraph: {
    title: "Privacy Policy | Mainline",
    description:
      "Mainline privacy policy. Learn how we collect, use, and protect your data.",
    type: "website",
    url: "https://mainlinehq.com/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Mainline",
    description:
      "Mainline privacy policy. Learn how we collect, use, and protect your data.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-light-bg">
      {/* Hero */}
      <section className="bg-dark text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-400">Last updated: March 2026</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white border border-gray-100 shadow-sm p-6 sm:p-10">
            <div className="prose prose-gray max-w-none space-y-8 text-sm leading-relaxed text-gray-600">
              {/* Intro */}
              <div>
                <p>
                  Mainline (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
                  operates the mainlinehq.com website and provides AI automation
                  services for trade businesses. This Privacy Policy explains how
                  we collect, use, disclose, and safeguard your information when
                  you use our services.
                </p>
              </div>

              {/* Information We Collect */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  1. Information We Collect
                </h2>
                <p className="mb-3">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong className="text-gray-900">Account information:</strong>{" "}
                    name, email address, phone number, business name, and
                    business address when you sign up or contact us.
                  </li>
                  <li>
                    <strong className="text-gray-900">Business data:</strong>{" "}
                    service offerings, pricing, scheduling preferences, customer
                    lists, and other operational data you provide for automation
                    setup.
                  </li>
                  <li>
                    <strong className="text-gray-900">Customer interaction data:</strong>{" "}
                    chatbot conversations, appointment bookings, invoice records,
                    and SMS communications processed through our platform.
                  </li>
                  <li>
                    <strong className="text-gray-900">Payment information:</strong>{" "}
                    billing details processed securely through Stripe. We do not
                    store credit card numbers on our servers.
                  </li>
                  <li>
                    <strong className="text-gray-900">Usage data:</strong>{" "}
                    analytics on how you interact with our platform, including
                    page views, feature usage, and performance metrics.
                  </li>
                </ul>
              </div>

              {/* How We Use Information */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  2. How We Use Your Information
                </h2>
                <p className="mb-3">We use the information we collect to:</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Provide, maintain, and improve our automation services</li>
                  <li>
                    Configure and train AI systems specific to your business
                  </li>
                  <li>
                    Process transactions and send related information including
                    invoices and payment confirmations
                  </li>
                  <li>
                    Send appointment reminders, follow-up messages, and other
                    communications on your behalf
                  </li>
                  <li>
                    Respond to your requests, questions, and provide customer
                    support
                  </li>
                  <li>
                    Monitor and analyze usage patterns to improve our platform
                  </li>
                  <li>
                    Comply with legal obligations and protect against fraudulent
                    or illegal activity
                  </li>
                </ul>
              </div>

              {/* Third-Party Services */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  3. Third-Party Services
                </h2>
                <p className="mb-3">
                  We use the following third-party services to operate our
                  platform. Each has its own privacy policy governing the data
                  they process:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong className="text-gray-900">Stripe</strong>: payment
                    processing and invoicing
                  </li>
                  <li>
                    <strong className="text-gray-900">Twilio</strong>: SMS
                    messaging and phone communications
                  </li>
                  <li>
                    <strong className="text-gray-900">Cal.com</strong>:
                    scheduling and appointment booking
                  </li>
                  <li>
                    <strong className="text-gray-900">Anthropic</strong>: AI
                    chatbot and natural language processing
                  </li>
                  <li>
                    <strong className="text-gray-900">Vercel</strong>: website
                    hosting and infrastructure
                  </li>
                  <li>
                    <strong className="text-gray-900">Resend</strong>: transactional
                    email delivery
                  </li>
                  <li>
                    <strong className="text-gray-900">Supabase</strong>: database
                    and data storage
                  </li>
                  <li>
                    <strong className="text-gray-900">Google Analytics</strong>: website
                    usage analytics (with your consent)
                  </li>
                </ul>
                <p className="mt-3">
                  We do not sell your personal information to third parties.
                </p>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  4. Data Security
                </h2>
                <p>
                  We implement industry-standard security measures to protect
                  your information, including encryption in transit (TLS/SSL),
                  encrypted storage, access controls, and regular security
                  audits. While no method of transmission over the internet is
                  100% secure, we take reasonable steps to protect your data.
                </p>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  5. Data Retention
                </h2>
                <p>
                  We retain your information for as long as your account is
                  active or as needed to provide services. If you cancel your
                  subscription, we will retain your data for 90 days to allow for
                  reactivation, after which it will be deleted upon request. We
                  may retain certain data as required by law or for legitimate
                  business purposes.
                </p>
              </div>

              {/* CCPA */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  6. California Privacy Rights (CCPA)
                </h2>
                <p className="mb-3">
                  If you are a California resident, you have the right to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    Know what personal information we collect, use, and disclose
                  </li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt out of the sale of personal information (we do not sell your data)</li>
                  <li>
                    Not be discriminated against for exercising your privacy
                    rights
                  </li>
                </ul>
                <p className="mt-3">
                  To exercise any of these rights, contact us at{" "}
                  <a
                    href="mailto:ryan@mainlinehq.com"
                    className="text-accent hover:text-accent-hover font-medium transition-colors"
                  >
                    ryan@mainlinehq.com
                  </a>
                  . We will respond within 45 days.
                </p>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  7. Cookies and Tracking
                </h2>
                <p>
                  We use essential cookies to maintain session state and
                  preferences. We may use analytics tools to understand how
                  visitors interact with our website. You can control cookie
                  preferences through your browser settings.
                </p>
              </div>

              {/* Children */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  8. Children&apos;s Privacy
                </h2>
                <p>
                  Our services are intended for businesses and are not directed
                  at individuals under 18. We do not knowingly collect personal
                  information from children.
                </p>
              </div>

              {/* Changes */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  9. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of material changes by posting the updated policy on
                  our website and updating the &quot;Last updated&quot; date.
                  Your continued use of our services after changes constitutes
                  acceptance of the updated policy.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  10. Contact Us
                </h2>
                <p>
                  If you have questions about this Privacy Policy or our data
                  practices, contact us at:
                </p>
                <div className="mt-3 rounded-lg bg-light-bg p-4">
                  <p className="font-semibold text-dark">Mainline</p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:ryan@mainlinehq.com"
                      className="text-accent hover:text-accent-hover font-medium transition-colors"
                    >
                      ryan@mainlinehq.com
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a
                      href="tel:+18058011380"
                      className="text-accent hover:text-accent-hover font-medium transition-colors"
                    >
                      (805) 801-1380
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

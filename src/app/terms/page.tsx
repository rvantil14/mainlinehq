import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Mainline",
  description:
    "Mainline terms of service. Review the terms governing the use of our AI automation platform for trade businesses.",
  openGraph: {
    title: "Terms of Service | Mainline",
    description:
      "Mainline terms of service. Review the terms governing the use of our AI automation platform for trade businesses.",
    type: "website",
    url: "https://mainlinehq.com/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Mainline",
    description:
      "Mainline terms of service. Review the terms governing the use of our AI automation platform for trade businesses.",
  },
};

export default function TermsPage() {
  return (
    <div className="bg-light-bg">
      {/* Hero */}
      <section className="bg-dark text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-gray-400">Last updated: March 2026</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 sm:p-10">
            <div className="prose prose-gray max-w-none space-y-8 text-sm leading-relaxed text-gray-600">
              {/* Intro */}
              <div>
                <p>
                  These Terms of Service (&quot;Terms&quot;) govern your use of
                  the Mainline platform and services (&quot;Services&quot;)
                  provided by Mainline (&quot;we,&quot; &quot;us,&quot; or
                  &quot;our&quot;). By using our Services, you agree to these
                  Terms. If you do not agree, do not use our Services.
                </p>
              </div>

              {/* Service Description */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  1. Service Description
                </h2>
                <p>
                  Mainline provides done-for-you AI automation services for trade
                  businesses, including but not limited to: AI chatbot setup and
                  management, automated scheduling, invoicing, SMS
                  communications, review management, CRM setup, and lead
                  tracking. We configure, deploy, and manage these systems on
                  your behalf based on the plan you select.
                </p>
              </div>

              {/* Eligibility */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  2. Eligibility
                </h2>
                <p>
                  Our Services are designed for businesses and business owners.
                  By using our Services, you represent that you are at least 18
                  years of age and have the authority to bind the business entity
                  you represent to these Terms.
                </p>
              </div>

              {/* Account */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  3. Your Account
                </h2>
                <p>
                  You are responsible for maintaining the confidentiality of your
                  account credentials and for all activities that occur under
                  your account. You agree to provide accurate and complete
                  information when creating your account and to update it as
                  necessary. You must notify us immediately of any unauthorized
                  use of your account.
                </p>
              </div>

              {/* Payment Terms */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  4. Payment Terms
                </h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong className="text-gray-900">Setup fee:</strong> A
                    one-time setup fee is due before onboarding begins. The
                    amount depends on your selected plan.
                  </li>
                  <li>
                    <strong className="text-gray-900">Monthly subscription:</strong>{" "}
                    Monthly fees are billed on the same date each month, starting
                    from the date your system goes live.
                  </li>
                  <li>
                    <strong className="text-gray-900">Payment method:</strong>{" "}
                    All payments are processed through Stripe. You authorize us
                    to charge the payment method on file for all fees.
                  </li>
                  <li>
                    <strong className="text-gray-900">Late payments:</strong>{" "}
                    Invoices not paid within 7 days of the due date may result in
                    service suspension. Services will be restored once the
                    outstanding balance is paid.
                  </li>
                  <li>
                    <strong className="text-gray-900">Refunds:</strong> Setup
                    fees are non-refundable once onboarding has begun. Monthly
                    subscription fees are non-refundable for the current billing
                    period.
                  </li>
                </ul>
              </div>

              {/* Cancellation */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  5. Cancellation Policy
                </h2>
                <p className="mb-3">
                  All plans are month-to-month with no long-term contracts.
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    You may cancel your subscription at any time with 30 days
                    written notice by emailing{" "}
                    <a
                      href="mailto:hello@mainlinehq.com"
                      className="text-accent hover:text-accent-hover font-medium transition-colors"
                    >
                      hello@mainlinehq.com
                    </a>
                    .
                  </li>
                  <li>
                    Upon cancellation, your service will remain active through
                    the end of the current billing period.
                  </li>
                  <li>
                    We will provide an export of your data (customer lists,
                    conversation logs, invoice records) within 14 days of
                    cancellation upon request.
                  </li>
                  <li>
                    Data will be retained for 90 days after cancellation to allow
                    for reactivation, after which it will be permanently deleted.
                  </li>
                </ul>
              </div>

              {/* Data Ownership */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  6. Data Ownership
                </h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong className="text-gray-900">Your data:</strong> You
                    retain full ownership of all business data, customer data,
                    and content you provide to us or that is generated through
                    your use of the Services (customer lists, conversation logs,
                    invoices, reviews, etc.).
                  </li>
                  <li>
                    <strong className="text-gray-900">Our platform:</strong> We
                    retain ownership of the Mainline platform, AI models,
                    workflows, and all proprietary technology. Your subscription
                    grants you a non-exclusive, non-transferable license to use
                    our platform during the term of your subscription.
                  </li>
                  <li>
                    <strong className="text-gray-900">Aggregate data:</strong> We
                    may use anonymized, aggregated data (with no personally
                    identifiable information) to improve our services and
                    platform.
                  </li>
                </ul>
              </div>

              {/* Acceptable Use */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  7. Acceptable Use
                </h2>
                <p className="mb-3">You agree not to use our Services to:</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    Send unsolicited or spam messages to individuals who have not
                    opted in
                  </li>
                  <li>
                    Violate any applicable laws, including TCPA, CAN-SPAM, and
                    CCPA
                  </li>
                  <li>
                    Misrepresent your business, services, or pricing through the
                    AI chatbot or communications
                  </li>
                  <li>
                    Interfere with or attempt to gain unauthorized access to our
                    systems
                  </li>
                  <li>
                    Use the platform for any illegal or fraudulent purpose
                  </li>
                </ul>
              </div>

              {/* Service Availability */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  8. Service Availability
                </h2>
                <p>
                  We strive to maintain high availability of our Services but do
                  not guarantee uninterrupted access. We may perform scheduled
                  maintenance with reasonable advance notice. We are not liable
                  for any downtime, errors, or interruptions caused by
                  third-party services (Stripe, Twilio, Cal.com, hosting
                  providers, etc.).
                </p>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  9. Limitation of Liability
                </h2>
                <p className="mb-3">
                  To the maximum extent permitted by law:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    Mainline shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages, including loss
                    of revenue, profits, data, or business opportunities.
                  </li>
                  <li>
                    Our total liability for any claim arising from or related to
                    these Terms or our Services shall not exceed the total amount
                    you paid to us in the 12 months preceding the claim.
                  </li>
                  <li>
                    We are not responsible for the accuracy of AI-generated
                    responses. While we train the AI on your business data, you
                    are responsible for reviewing and approving the information
                    your chatbot provides to customers.
                  </li>
                </ul>
              </div>

              {/* Indemnification */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  10. Indemnification
                </h2>
                <p>
                  You agree to indemnify and hold harmless Mainline, its
                  officers, employees, and agents from any claims, damages,
                  losses, or expenses (including reasonable attorneys&apos; fees)
                  arising from your use of the Services, your violation of these
                  Terms, or your violation of any applicable law.
                </p>
              </div>

              {/* Governing Law */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  11. Governing Law
                </h2>
                <p>
                  These Terms are governed by and construed in accordance with
                  the laws of the State of California, without regard to its
                  conflict of law provisions. Any disputes arising from these
                  Terms or your use of the Services shall be resolved in the
                  state or federal courts located in California.
                </p>
              </div>

              {/* Modifications */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  12. Modifications to Terms
                </h2>
                <p>
                  We reserve the right to modify these Terms at any time. We
                  will notify you of material changes by email or through a
                  notice on our platform at least 30 days before the changes take
                  effect. Your continued use of the Services after the effective
                  date constitutes acceptance of the updated Terms.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-lg font-bold text-dark mb-3">
                  13. Contact
                </h2>
                <p>
                  Questions about these Terms? Contact us at:
                </p>
                <div className="mt-3 rounded-xl bg-light-bg p-4">
                  <p className="font-semibold text-dark">Mainline</p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:hello@mainlinehq.com"
                      className="text-accent hover:text-accent-hover font-medium transition-colors"
                    >
                      hello@mainlinehq.com
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

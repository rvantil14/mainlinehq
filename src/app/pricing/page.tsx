"use client";

import Link from "next/link";
import { useState } from "react";

const checkIcon = (
  <svg
    className="h-5 w-5 shrink-0 text-accent"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

const features = [
  "AI chatbot on your website (24/7 lead capture + booking)",
  "Trained on YOUR business, services, and pricing",
  "Online booking synced to your calendar",
  "Automated appointment reminders via SMS",
  "Automated review requests after every job",
  "Monthly performance report",
  "Done-for-you setup (live in under a week)",
  "Month-to-month, cancel anytime",
];

const faqs = [
  {
    q: "What do I get for $297/month?",
    a: "An AI chatbot trained on your specific business that lives on your website 24/7. It answers customer questions, captures leads, and helps book appointments. You also get automated SMS appointment reminders, review requests after every job, and a monthly performance report. We handle all the setup.",
  },
  {
    q: "Is there really no setup fee?",
    a: "No setup fee. No contracts. We get you live within a week and you try it free for 14 days. If it works, $297/month. If not, walk away. We take the risk, not you.",
  },
  {
    q: "How does this compare to Jobber or Housecall Pro?",
    a: "They give you software to figure out yourself. We build, configure, and manage your system for you. No learning curve, no tutorials. You tell us about your business, we handle the rest.",
  },
  {
    q: "What if I need something beyond the standard plan?",
    a: "We build custom automation for whatever is eating your time. AI phone answering, invoicing, follow-up sequences, CRM setup. Tell us the problem, we scope it and price it. No cookie-cutter packages.",
  },
  {
    q: "Do I need to be tech-savvy to use this?",
    a: "Not at all. We set everything up. If you can use a smartphone, you can use our system. Your techs just show up and do the job.",
  },
  {
    q: "What trades do you work with?",
    a: "Plumbing, HVAC, electrical, roofing, landscaping, painting, general contracting, pest control, cleaning services. Any service-based trade business that runs on appointments and job sites.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [avgJobValue, setAvgJobValue] = useState(500);
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(5);

  const monthlyRevenueLost =
    missedCallsPerWeek * 4 * 0.4 * avgJobValue;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="bg-light-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <section className="bg-dark text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Simple Pricing. Real Results.{" "}
            <span className="text-accent">No Contracts.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Try it free for 14 days. No setup fee. No contracts.
            If it works, $297/month. If not, walk away.
          </p>
        </div>
      </section>

      {/* Single Plan Card */}
      <section className="-mt-12 pb-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xl bg-white ring-2 ring-accent shadow-2xl shadow-accent/15">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center rounded-full bg-accent px-4 py-1 text-sm font-semibold text-white shadow-md">
                14-Day Free Trial
              </span>
            </div>

            <div className="p-8 sm:p-10">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary">
                  Everything You Need to Stop Missing Leads
                </h3>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-gray-900">$297</span>
                  <span className="text-gray-500 text-lg">/month</span>
                </div>
                <p className="mt-2 text-sm text-text-light">
                  No setup fee. No contracts. Cancel anytime.
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {checkIcon}
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3">
                <Link
                  href="/contact"
                  className="block w-full text-center rounded-lg py-3.5 px-4 text-base font-semibold bg-accent text-white hover:bg-accent-hover transition-colors shadow-sm shadow-accent/25"
                >
                  Start Your Free Trial
                </Link>
                <p className="text-center text-xs text-text-light">
                  No credit card required. Live in under a week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Automation Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-primary p-8 sm:p-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Got a Workflow That&apos;s Eating Your Time?
              </h2>
              <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                Every business runs differently. If there&apos;s something specific
                slowing you down, let&apos;s talk. We&apos;ll scope it, price it, and build it.
              </p>
            </div>
            <div className="p-8 sm:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "AI phone answering",
                  "Automated invoicing",
                  "Follow-up sequences",
                  "CRM setup and management",
                  "Estimate and proposal generation",
                  "Multi-tech scheduling",
                  "Google Ads management",
                  "Whatever else is on your plate",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold bg-primary hover:bg-primary-light text-white rounded-lg transition-colors"
                >
                  Let&apos;s Talk About Your Business
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-primary p-8 sm:p-12 text-white">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Still Thinking About It? Do the Math.
              </h2>
              <p className="mt-3 text-primary-light text-lg">
                Adjust the numbers below to match your business.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="avgJobValue"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your average job value
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-medium">
                    $
                  </span>
                  <input
                    id="avgJobValue"
                    type="number"
                    min={50}
                    max={50000}
                    step={50}
                    value={avgJobValue}
                    onChange={(e) =>
                      setAvgJobValue(Number(e.target.value) || 0)
                    }
                    className="w-full rounded-lg bg-white/10 border border-white/20 text-white text-2xl font-bold pl-9 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="missedCalls"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Calls you miss per week
                </label>
                <input
                  id="missedCalls"
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={missedCallsPerWeek}
                  onChange={(e) =>
                    setMissedCallsPerWeek(Number(e.target.value) || 0)
                  }
                  className="w-full rounded-lg bg-white/10 border border-white/20 text-white text-2xl font-bold px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-white/10 p-6 sm:p-8">
              <div className="grid grid-cols-3 gap-4 text-center items-center">
                <div>
                  <p className="text-sm text-gray-300">
                    Missed calls/mo
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {missedCallsPerWeek * 4}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">
                    x 40% close rate
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {Math.round(missedCallsPerWeek * 4 * 0.4)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">
                    x ${avgJobValue.toLocaleString()} avg job
                  </p>
                  <p className="text-2xl font-bold mt-1">=</p>
                </div>
              </div>
              <div className="mt-6 bg-accent/20 rounded-lg p-6 text-center">
                <p className="text-sm text-accent font-semibold uppercase tracking-wide">
                  Monthly revenue lost
                </p>
                <p className="text-4xl sm:text-5xl font-extrabold text-accent mt-2">
                  ${monthlyRevenueLost.toLocaleString()}
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-lg text-gray-200">
              You&apos;re leaving{" "}
              <span className="font-bold text-white">
                ${monthlyRevenueLost.toLocaleString()}/month
              </span>{" "}
              on the table. Mainline costs{" "}
              <span className="font-bold text-white">
                $297/month
              </span>
              .
            </p>

            <div className="mt-8 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3.5 text-sm font-semibold bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors shadow-md shadow-accent/25"
              >
                Schedule a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-500 text-center">
            Straight answers. No runaround.
          </p>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`rounded-lg border transition-all duration-200 ${openFaq === i ? "border-accent/20 bg-white shadow-md" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-base font-semibold text-gray-900 pr-4">
                    {faq.q}
                  </span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180 text-accent" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed text-gray-600">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">
            Ready to stop leaving money on the table?
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
            Book a 15-minute call. We&apos;ll look at your current setup, show
            you exactly where you&apos;re losing leads, and map out what
            automation would look like for your business. No pressure, no pitch
            deck.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center px-8 py-4 text-base font-semibold bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors shadow-md shadow-accent/25"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}

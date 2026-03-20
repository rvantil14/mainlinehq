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

const xIcon = (
  <svg
    className="h-4 w-4 text-gray-300"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const checkSmall = (
  <svg
    className="h-4 w-4 text-accent"
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

const tiers = [
  {
    name: "Starter",
    price: "$500",
    setup: "$3,000",
    audience: "For the one-truck operator who's tired of missing calls",
    description:
      "Everything a solo operator or small crew needs to stop missing calls and start collecting reviews.",
    popular: false,
    features: [
      "AI chatbot on your website (24/7 lead capture + booking)",
      "Online booking system synced to your calendar",
      "Automated appointment reminders via SMS",
      "Automated review requests after every job",
      "Basic monthly performance report",
    ],
  },
  {
    name: "Growth",
    price: "$1,500",
    setup: "$5,000",
    audience: "For the growing shop that needs to stop drowning in admin",
    description:
      "Full front office automation. AI answers your phone, sends invoices, and follows up with every lead.",
    popular: true,
    features: [
      "Everything in Starter, plus:",
      "AI phone receptionist (answers with YOUR business name)",
      "Automated invoicing + payment collection via text",
      "Smart scheduling with technician assignment",
      "CRM setup and full lead management",
      "Automated follow-up sequences for cold leads",
      "Google Business Profile optimization",
      "AI-generated estimates (you review & approve)",
    ],
  },
  {
    name: "Pro",
    price: "$2,500",
    setup: "$10,000",
    audience: "For the established operation ready to run on autopilot",
    description:
      "Custom-trained AI, multi-tech dispatch, customer portal, and a dedicated monthly strategy call.",
    popular: false,
    features: [
      "Everything in Growth, plus:",
      "Custom AI trained on your specific business",
      "Multi-technician dispatch optimization",
      "Automated quote generation",
      "Customer portal for job status + payments",
      "QuickBooks / accounting integration",
      "Automated contracts & proposals",
      "Monthly strategy call with your account lead",
      "Priority same-day support",
    ],
  },
];

const addOns = [
  {
    name: "Website Build",
    price: "$2,000 - $5,000",
    detail: "one-time",
  },
  {
    name: "Google Ads Management",
    price: "$500/mo",
    detail: "+ ad spend",
  },
  {
    name: "Social Media Automation",
    price: "$300/mo",
    detail: "content scheduling & posting",
  },
  {
    name: "Custom AI Training",
    price: "$150/hr",
    detail: "specialized workflows",
  },
];

const comparisonRows = [
  {
    label: "Monthly Cost",
    mainline: "$500 - $2,500",
    jobber: "$69 - $349",
    housecall: "$59 - $199",
    servicetitan: "$398+",
  },
  {
    label: "Setup Time",
    mainline: "Live in 1 week",
    jobber: "Self-serve (weeks)",
    housecall: "Self-serve (weeks)",
    servicetitan: "3-6 months",
  },
  {
    label: "Done-For-You Setup?",
    mainline: true,
    jobber: false,
    housecall: false,
    servicetitan: false,
  },
  {
    label: "AI Chatbot",
    mainline: true,
    jobber: false,
    housecall: false,
    servicetitan: false,
  },
  {
    label: "AI Phone Answering",
    mainline: true,
    jobber: false,
    housecall: false,
    servicetitan: false,
  },
  {
    label: "Invoicing & Payments",
    mainline: true,
    jobber: true,
    housecall: true,
    servicetitan: true,
  },
  {
    label: "Review Automation",
    mainline: true,
    jobber: false,
    housecall: false,
    servicetitan: true,
  },
  {
    label: "No Contracts",
    mainline: true,
    jobber: true,
    housecall: true,
    servicetitan: false,
  },
];

const faqs = [
  {
    q: "How does this compare to Jobber or Housecall Pro?",
    a: "They give you tools to figure out yourself. We build it, run it, and optimize it for you. With Mainline, we handle setup, train the AI on your specific business, and keep everything running. You focus on the work.",
  },
  {
    q: "What if it doesn't work for my business?",
    a: "All plans are month-to-month. If you're not seeing results, you can cancel anytime with 30 days notice. No long-term commitments.",
  },
  {
    q: "Are there long-term contracts?",
    a: "No. All plans are month-to-month after the initial setup. We earn your business every month. The setup fee covers onboarding and configuration. After that, cancel anytime with 30 days notice.",
  },
  {
    q: "How long does it take to get started?",
    a: "Live within one week for all plans. We handle everything. You just give us access to your existing tools and answer a few questions about your business, and we take it from there.",
  },
  {
    q: "What if I need features from a higher tier but don't want the full package?",
    a: "We can customize. If there's a specific feature from Growth or Pro that would move the needle for your business, reach out and we'll put together a plan that fits. No cookie-cutter nonsense.",
  },
  {
    q: "Do I need to be tech-savvy to use this?",
    a: "Not at all. We set everything up and train your team. If you can use a smartphone, you can use our system. Your techs just show up and do the job.",
  },
  {
    q: "What trades do you work with?",
    a: "Plumbing, HVAC, electrical, roofing, landscaping, painting, general contracting, pest control, cleaning services - any service-based trade business. The systems are built for how trade businesses actually operate: dispatch, job scheduling, estimates, and follow-ups.",
  },
];

function ComparisonCell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? checkSmall : xIcon;
  }
  return <span className="text-sm text-gray-700">{value}</span>;
}

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
            We don&apos;t sell software. We build, run, and optimize your
            entire front office, so you never miss another call, lead, or
            dollar.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="-mt-12 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-lg bg-white transition-all duration-300 hover:-translate-y-1 ${
                  tier.popular
                    ? "ring-2 ring-accent shadow-2xl shadow-accent/15"
                    : "ring-1 ring-gray-200 shadow-lg hover:shadow-xl"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-accent px-4 py-1 text-sm font-semibold text-white shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-xl font-bold text-primary">
                    {tier.name}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-accent">
                    {tier.audience}
                  </p>
                  <p className="mt-1.5 text-sm text-gray-500">
                    {tier.description}
                  </p>

                  <div className="mt-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {tier.price}
                    </span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <div className="mt-2 inline-flex items-center rounded-md bg-primary/5 px-3 py-1.5">
                    <span className="text-sm font-semibold text-primary">
                      One-time setup: {tier.setup}
                    </span>
                  </div>

                  <Link
                    href="/contact"
                    className={`mt-8 block w-full text-center rounded-lg py-3 px-4 text-sm font-semibold transition-colors ${
                      tier.popular
                        ? "bg-accent text-white hover:bg-accent-hover shadow-sm shadow-accent/25"
                        : "bg-primary text-white hover:bg-primary-light"
                    }`}
                  >
                    Schedule a Free Consultation
                  </Link>

                  <ul className="mt-8 space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {i === 0 && tier.name !== "Starter" ? (
                          <span className="h-5 w-5 shrink-0" />
                        ) : (
                          checkIcon
                        )}
                        <span
                          className={`text-sm ${
                            i === 0 && tier.name !== "Starter"
                              ? "font-semibold text-primary"
                              : "text-gray-600"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              Add-Ons
            </h2>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto">
              Layer these onto any plan to fill gaps or push growth further.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {addOns.map((addon) => (
              <div
                key={addon.name}
                className="rounded-lg border border-gray-200 p-6 text-center hover:border-accent/40 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                <p className="mt-2 text-2xl font-bold text-primary">
                  {addon.price}
                </p>
                <p className="mt-1 text-xs text-gray-400">{addon.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              Mainline vs. The Other Guys
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              They sell you software to figure out on your own. We build it, run
              it, and optimize it for you.
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-5 text-sm font-semibold text-gray-500 min-w-[140px] sm:w-[200px]">
                    Feature
                  </th>
                  <th className="py-4 px-5 text-sm font-bold text-primary bg-accent/5 min-w-[100px]">
                    Mainline
                  </th>
                  <th className="py-4 px-5 text-sm font-semibold text-gray-500 min-w-[100px]">
                    Jobber
                  </th>
                  <th className="py-4 px-5 text-sm font-semibold text-gray-500 min-w-[100px]">
                    Housecall Pro
                  </th>
                  <th className="py-4 px-5 text-sm font-semibold text-gray-500 min-w-[100px]">
                    ServiceTitan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td className="py-3.5 px-5 text-sm font-medium text-gray-900">
                      {row.label}
                    </td>
                    <td className="py-3.5 px-5 bg-accent/5">
                      <ComparisonCell value={row.mainline} />
                    </td>
                    <td className="py-3.5 px-5">
                      <ComparisonCell value={row.jobber} />
                    </td>
                    <td className="py-3.5 px-5">
                      <ComparisonCell value={row.housecall} />
                    </td>
                    <td className="py-3.5 px-5">
                      <ComparisonCell value={row.servicetitan} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center items-center">
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
                <div className="bg-accent/20 rounded-lg p-5 ring-2 ring-accent/30">
                  <p className="text-sm text-accent font-semibold uppercase tracking-wide">
                    Monthly revenue lost
                  </p>
                  <p className="text-4xl sm:text-5xl font-extrabold text-accent mt-2">
                    ${monthlyRevenueLost.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-lg text-gray-200">
              You&apos;re leaving{" "}
              <span className="font-bold text-white">
                ${monthlyRevenueLost.toLocaleString()}/month
              </span>{" "}
              on the table. Mainline costs{" "}
              <span className="font-bold text-white">
                $500 - $2,500/month
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
            Schedule a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

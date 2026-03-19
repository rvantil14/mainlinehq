import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies | Mainline",
  description:
    "See projected results for trade businesses using AI automation. Real scenarios from plumbing, HVAC, and electrical companies.",
};

const caseStudies = [
  {
    id: "riverside-plumbing",
    business: "Riverside Plumbing Co.",
    trade: "Plumbing",
    location: "Riverside, CA",
    size: "8-person team",
    revenue: "$1.2M revenue",
    package: "Starter",
    challenge:
      "Missing 30% of inbound calls while techs are on jobs. Owner spending 2 hours/day on scheduling and invoicing. No follow-up after jobs meant low repeat business and only 14 Google reviews.",
    solution:
      "Mainline Starter package: AI receptionist, automated scheduling, review requests.",
    results: [
      { label: "Missed calls", before: "30%", after: "2%", note: "AI answers 24/7" },
      { label: "New leads captured", before: "-", after: "+22/month", note: "" },
      { label: "Avg response time", before: "4+ hours", after: "Under 60 seconds", note: "" },
      { label: "Google reviews", before: "14", after: "47", note: "" },
      { label: "Revenue impact", before: "-", after: "+$8,400/mo", note: "From recovered leads" },
      { label: "Admin time saved", before: "-", after: "12 hrs/week", note: "" },
    ],
    quote:
      "I was losing 4-5 calls a day while my guys were on jobs. Now every call gets answered and half of them book before I even get back to the truck.",
    quoteName: "Mike T., Owner",
    icon: "🔧",
  },
  {
    id: "summit-climate",
    business: "Summit Climate Solutions",
    trade: "HVAC",
    location: "Dallas, TX",
    size: "15-person team",
    revenue: "$2.1M revenue",
    package: "Growth",
    challenge:
      "Seasonal demand spikes overwhelm the office. Summer means 60+ calls/day, but office staff can only handle 40. Invoices sent 3-5 days after job completion. Payment collection averaging 22 days.",
    solution:
      "Mainline Growth package: AI receptionist, smart scheduling, automated invoicing with text-to-pay, review automation.",
    results: [
      { label: "Call capacity", before: "40/day max", after: "100% handled", note: "No overflow during peak" },
      { label: "Invoice delivery", before: "3-5 days", after: "Same day", note: "" },
      { label: "Time to payment", before: "22 days", after: "3 days", note: "Text-to-pay" },
      { label: "Cash flow improvement", before: "-", after: "+$15,000/mo", note: "Faster collections" },
      { label: "Google reviews", before: "23", after: "68", note: "" },
      { label: "Revenue impact", before: "-", after: "+$12,000/mo", note: "Captured overflow leads" },
    ],
    quote:
      "Last summer we were drowning in calls. This year, every single one got answered. The invoicing alone paid for the service. We went from waiting 3 weeks for payment to getting paid same day.",
    quoteName: "Sarah K., Operations Manager",
    icon: "❄️",
  },
  {
    id: "southeastern-electrical",
    business: "Southeastern Electrical",
    trade: "Electrical",
    location: "Atlanta, GA",
    size: "6-person team",
    revenue: "$800K revenue",
    package: "Starter",
    challenge:
      "Owner spending Sunday nights doing estimates and invoices. No CRM, leads tracked in a notebook. Lost 3 large commercial jobs in one quarter because follow-up was too slow.",
    solution:
      "Mainline Starter package: AI chatbot, lead capture, automated estimates (owner reviews), follow-up sequences.",
    results: [
      { label: "Estimate turnaround", before: "3-5 days", after: "Same day", note: "AI drafts, owner approves" },
      { label: "Lead follow-up", before: "Manual/sporadic", after: "Within 1 hour", note: "Automated" },
      { label: "Lost leads recovered", before: "-", after: "8/month", note: "Was losing to faster competitors" },
      { label: "Weekend admin time", before: "6 hours", after: "45 minutes", note: "" },
      { label: "Revenue impact", before: "-", after: "+$6,200/mo", note: "" },
    ],
    quote:
      "I used to spend every Sunday night doing estimates and invoices. Now estimates go out the same day and invoices send themselves. I got my weekends back.",
    quoteName: "Tom R., Owner",
    icon: "⚡",
  },
];

function StatBar({ before, after, label, note }: { before: string; after: string; label: string; note: string }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
      <div className="w-36 sm:w-44 shrink-0">
        <p className="text-sm font-medium text-dark">{label}</p>
        {note && <p className="text-xs text-text-light">{note}</p>}
      </div>
      <div className="flex flex-1 items-center gap-3">
        {before !== "-" && (
          <>
            <span className="inline-block rounded bg-red-50 px-2.5 py-1 text-sm font-medium text-red-600">
              {before}
            </span>
            <svg className="h-4 w-4 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
        <span className="inline-block rounded bg-green-50 px-2.5 py-1 text-sm font-semibold text-green-700">
          {after}
        </span>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-300">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Projected Results
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              Projected Results for{" "}
              <span className="text-accent">Trade Businesses</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
              See how AI automation transforms operations for plumbing, HVAC, and electrical companies across the country.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {caseStudies.map((study, idx) => (
              <div
                key={study.id}
                id={study.id}
                className="scroll-mt-24"
              >
                {/* Divider between studies */}
                {idx > 0 && (
                  <div className="mb-20 border-t border-gray-200" />
                )}

                {/* Header */}
                <div className="flex flex-wrap items-start gap-4 mb-10">
                  <span className="text-5xl">{study.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-dark sm:text-3xl">
                      {study.business}
                    </h2>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-light">
                      <span>{study.trade}</span>
                      <span className="hidden sm:inline">&middot;</span>
                      <span>{study.location}</span>
                      <span className="hidden sm:inline">&middot;</span>
                      <span>{study.size}</span>
                      <span className="hidden sm:inline">&middot;</span>
                      <span>{study.revenue}</span>
                    </div>
                    <span className="mt-2 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">
                      {study.package} Package
                    </span>
                  </div>
                </div>

                <div className="grid gap-10 lg:grid-cols-2">
                  {/* Left: Challenge & Solution */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-2">
                        The Challenge
                      </h3>
                      <p className="leading-relaxed text-text-light">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                        The Solution
                      </h3>
                      <p className="leading-relaxed text-text-light">
                        {study.solution}
                      </p>
                    </div>

                    {/* Quote */}
                    <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
                      <blockquote className="text-dark leading-relaxed italic">
                        &ldquo;{study.quote}&rdquo;
                      </blockquote>
                      <p className="mt-3 text-sm font-semibold text-accent">
                        - {study.quoteName}
                      </p>
                    </div>
                  </div>

                  {/* Right: Results */}
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-green-600 mb-4">
                      Results After 90 Days
                    </h3>
                    <div className="rounded-2xl border border-gray-100 bg-light-bg p-6">
                      {study.results.map((result, i) => (
                        <StatBar
                          key={i}
                          before={result.before}
                          after={result.after}
                          label={result.label}
                          note={result.note}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-dark py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              See What This Could Look Like for You
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-gray-400">
              Schedule a free 15-minute call. We&apos;ll show you exactly how
              AI automation can transform your trade business.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-10 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover"
              >
                Book Your Free Consultation
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              No contracts. No commitment. Just a conversation about your business.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-light-bg py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-text-light">
            Results shown are projected based on industry benchmarks for AI-automated trade businesses. Individual results may vary.
          </p>
        </div>
      </section>
    </>
  );
}

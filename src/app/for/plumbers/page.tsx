import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Automation for Plumbing Businesses | Mainline",
  description:
    "Stop losing plumbing jobs to missed calls. Mainline answers your phone 24/7, books appointments, sends invoices, and gets you 5-star reviews, all on autopilot.",
};

const painPoints = [
  {
    icon: "",
    title: "Emergency Calls Missed While You're on a Job",
    description:
      "You're under a house fixing a slab leak and your phone is in the truck. Meanwhile, a homeowner with a burst pipe is calling, and when you don't answer, they call the next plumber on Google. That job is gone in 30 seconds.",
    solution:
      "Our AI receptionist answers every call instantly, 24/7, including nights and weekends. It qualifies the emergency, captures the details, and books the appointment. By the time you're back in your truck, the job is on your calendar.",
  },
  {
    icon: "",
    title: "Estimates Take Days to Send Out",
    description:
      "You do the walkthrough, take notes on your phone, then get busy with the next three jobs. By the time you sit down to write the estimate, it's been two days. Half the time, the customer already went with someone faster.",
    solution:
      "AI generates a rough estimate based on your pricing and the job details from the call. You review it on your phone, make any adjustments, and send it. Usually within hours, not days.",
  },
  {
    icon: "",
    title: "No Follow-Up After the Job",
    description:
      "You fixed their water heater. They were happy. Six months later they need a repipe and they can't remember your name, so they're back on Google searching for a new plumber.",
    solution:
      "Automated follow-up sequences keep you top of mind. Thank you texts, maintenance reminders, seasonal check-in emails. When they need a plumber again, your name is the first one they think of.",
  },
  {
    icon: "",
    title: "Invoices Sent Late, Payments Collected Later",
    description:
      "You finish the job at 4 PM and tell yourself you'll send the invoice tonight. Three days later you still haven't. The customer forgets. Now you're chasing payments instead of doing plumbing.",
    solution:
      "Invoices go out automatically at job completion with a text-to-pay link. Most customers pay the same day. No chasing. No awkward phone calls about money.",
  },
];

export default function PlumbersPage() {
  return (
    <div className="bg-light-bg">
      {/* Hero */}
      <section className="bg-dark pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/images/trades/plumbing.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/90 to-dark" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-300">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Built for Plumbing Businesses
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Stop Losing Plumbing Jobs to{" "}
              <span className="relative">
                <span className="relative z-10 text-accent">Missed Calls</span>
                <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-accent/15 sm:bottom-2 sm:h-4" />
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
              Every unanswered call is a customer calling the next plumber on
              Google. Our AI front office answers every call, books every job,
              and follows up with every customer, so you never lose work to a
              ringing phone again.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover sm:w-auto"
              >
                Schedule a Free Consultation
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Callout */}
      <section className="bg-primary py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">Missed Calls/Week</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-white mt-1">5+</p>
            </div>
            <div className="hidden sm:block text-3xl text-gray-400">&times;</div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">Avg Job Value</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-white mt-1">$350</p>
            </div>
            <div className="hidden sm:block text-3xl text-gray-400">=</div>
            <div className="rounded-lg bg-white/10 px-8 py-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">Monthly Revenue Lost</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-accent mt-1">$7,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points + Solutions */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              Problems Every Plumber Knows
            </h2>
            <p className="mt-4 text-lg text-text-light">
              You&apos;re great at plumbing. But the business side keeps getting in the way.
            </p>
          </div>

          <div className="mt-14 space-y-8">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-100 bg-light-bg p-8 sm:p-10"
              >
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                  <div>
                    <div className="flex items-start gap-3">
                      <h3 className="text-xl font-bold text-dark">
                        {point.title}
                      </h3>
                    </div>
                    <p className="mt-3 leading-relaxed text-text-light">
                      {point.description}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white border border-gray-100 p-6">
                    <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                      How Mainline Solves This
                    </p>
                    <p className="leading-relaxed text-dark">
                      {point.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Example */}
      <section className="bg-light-bg py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              The ROI Math for Plumbers
            </h2>
          </div>

          <div className="rounded-lg bg-white border border-gray-200 shadow-lg p-8 sm:p-12">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-dark">Without Mainline</h3>
                <ul className="space-y-3 text-text-light">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    5 missed calls/week
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    $7,000/month in lost revenue
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    Estimates sent 2-3 days late
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    12 Google reviews after 5 years
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-dark">With Mainline</h3>
                <ul className="space-y-3 text-text-light">
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    Every call answered, 24/7
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    20-35% more booked jobs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    Estimates out within hours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    47 Google reviews in 3 months
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-text-light">
                Mainline starts at <strong className="text-dark">$500/month</strong>.
                Even capturing <strong className="text-dark">2 extra jobs per month</strong> at $350 each
                means you&apos;re making <strong className="text-accent">$200+ more than you spend</strong>.
                Most plumbers see 5-10 extra jobs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-lg bg-light-bg border border-gray-100 p-10 sm:p-16 text-center">
            <span className="absolute top-6 left-8 text-7xl font-serif leading-none text-accent/10 select-none">&ldquo;</span>
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className="h-7 w-7 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="relative text-2xl font-medium leading-relaxed text-dark sm:text-3xl">
              &ldquo;I was missing 4-5 calls a day on job sites. Now every call gets answered
              and half of them book before I even get back to the truck.&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="font-bold text-dark text-lg">Mike T.</p>
              <p className="text-text-light">Ace Plumbing, Riverside</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Stop Losing Jobs to Missed Calls?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-gray-400">
            Schedule a free 15-minute call. We&apos;ll show you exactly how many
            calls you&apos;re missing and what your AI front office would look like.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-10 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover"
            >
              Schedule a Free Consultation
              <span className="inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            No contracts. No commitment. Just a conversation about your business.
          </p>
        </div>
      </section>
    </div>
  );
}

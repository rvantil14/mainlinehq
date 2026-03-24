import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Automation for HVAC Companies | Mainline",
  description:
    "Never miss another HVAC service call. Mainline handles your phones, scheduling, invoicing, and customer follow-up, even during peak season when your office can't keep up.",
};

const painPoints = [
  {
    icon: "",
    title: "Summer and Winter Spikes Overwhelm Your Office",
    description:
      "June hits and your phone explodes. Your one office person is juggling 40+ calls a day while also dispatching techs and handling walk-ins. Calls go to voicemail. Hold times go through the roof. Customers hang up and call your competitor.",
    solution:
      "Our AI receptionist handles unlimited simultaneous calls. During a heat wave, when 10 people call at the same time, every single one gets answered immediately. No hold times. No voicemail. No lost leads.",
  },
  {
    icon: "",
    title: "Slow Invoicing Kills Your Cash Flow",
    description:
      "Your tech finishes a $1,200 compressor replacement at 3 PM. The invoice doesn't go out until the office gets to it. Maybe tomorrow, maybe the next day. The customer forgets. Now you're chasing a payment that should've been collected on the spot.",
    solution:
      "Invoices go out automatically the moment a job is marked complete. The customer gets a text with a pay-now link. Most pay within hours, not weeks. Your cash flow goes from unpredictable to consistent.",
  },
  {
    icon: "",
    title: "No Maintenance Reminders = Lost Repeat Business",
    description:
      "You installed a new system last year. The customer was happy. But nobody followed up about the annual maintenance. They forgot. Now they're calling someone else for their spring tune-up, and you lost a recurring customer for no reason.",
    solution:
      "Automated maintenance reminders go out at the right time: seasonal tune-ups, filter changes, warranty check-ins. You stay top of mind and keep customers coming back without anyone on your team tracking it manually.",
  },
  {
    icon: "",
    title: "Scheduling Chaos with Multiple Techs",
    description:
      "You've got 5 techs in the field and your office manager is trying to coordinate their schedules on a whiteboard. Double bookings happen. Drive times aren't optimized. You're sending a tech 30 miles when another tech is around the corner.",
    solution:
      "Smart scheduling assigns jobs based on tech availability, location, and skillset. Your AI dispatcher knows which tech is closest and who's qualified for the job. Less windshield time, more billable hours.",
  },
];

export default function HvacPage() {
  return (
    <div className="bg-light-bg">
      {/* Hero */}
      <section className="bg-dark pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/images/trades/hvac.jpg"
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
              Built for HVAC Companies
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Never Miss Another{" "}
              <span className="relative">
                <span className="relative z-10 text-accent">HVAC Service Call</span>
                <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-accent/15 sm:bottom-2 sm:h-4" />
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
              Peak season doesn&apos;t have to mean chaos. Our AI front office
              answers every call, dispatches your techs, sends invoices, and
              keeps customers coming back for maintenance, even when your phone
              is ringing off the hook.
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
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">Peak Season Missed Calls</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-white mt-1">20+/wk</p>
            </div>
            <div className="hidden sm:block text-3xl text-gray-400">&times;</div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">Avg Job Value</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-white mt-1">$500</p>
            </div>
            <div className="hidden sm:block text-3xl text-gray-400">=</div>
            <div className="rounded-lg bg-white/10 px-8 py-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">Monthly Revenue Lost</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-accent mt-1">$40,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points + Solutions */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              The HVAC Business Bottlenecks
            </h2>
            <p className="mt-4 text-lg text-text-light">
              Your techs are great. Your office operations are holding you back.
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
              The ROI Math for HVAC Companies
            </h2>
          </div>

          <div className="rounded-lg bg-white border border-gray-200 shadow-lg p-8 sm:p-12">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-dark">Without Mainline</h3>
                <ul className="space-y-3 text-text-light">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    20+ missed calls/week in peak season
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    $40,000/month in lost revenue
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    $7,200/month for 2 office staff
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    4-6 Google reviews per month
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-dark">With Mainline</h3>
                <ul className="space-y-3 text-text-light">
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    100% answer rate, even during spikes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    37% more booked jobs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    $297/month, 14-day free trial
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    22-28 Google reviews per month
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-text-light">
                Even capturing <strong className="text-dark">10 extra service calls per month</strong> at
                $500 each adds <strong className="text-accent">$5,000 in monthly revenue</strong>, while
                your AI front office costs a fraction of a single office hire.
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
              &ldquo;The review automation alone paid for itself. We went from 12
              Google reviews to 47 in three months.&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="font-bold text-dark text-lg">Sarah K.</p>
              <p className="text-text-light">Summit HVAC, Phoenix</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready for Your Best Peak Season Yet?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-gray-400">
            Schedule a free 15-minute call. We&apos;ll show you exactly what an
            AI front office looks like for an HVAC company your size.
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

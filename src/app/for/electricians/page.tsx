import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Automation for Electrical Contractors | Mainline",
  description:
    "Your electrical business deserves a smarter front office. Mainline answers calls, generates estimates, books appointments, and handles follow-up, so you can focus on the work.",
};

const painPoints = [
  {
    icon: "📋",
    title: "Complex Estimates Take Forever",
    description:
      "A commercial client wants a bid on a full panel upgrade with sub-panel work. You need to walk the site, calculate materials, factor in permit costs, and write it all up. That's 2-3 hours per estimate, and you're backed up on six of them.",
    solution:
      "AI generates a draft estimate based on the job details from the initial call and your pricing history. You review it, adjust any specifics, and send it out. Usually the same day instead of next week. Faster estimates mean more closed deals.",
  },
  {
    icon: "🏃",
    title: "Commercial Leads Lost to Faster Competitors",
    description:
      "A property manager emails you about a multi-unit rewiring project. You see it 4 hours later between jobs. By then, two other electricians have already responded. Speed wins in commercial work, and you're always a step behind.",
    solution:
      "Our AI captures and responds to every lead (phone, email, web form) within 60 seconds. It qualifies the job, gathers details, and books a site visit. You show up prepared instead of scrambling to return calls at 8 PM.",
  },
  {
    icon: "❓",
    title: "Permit and Code Questions Pile Up",
    description:
      "Customers call asking about permit requirements, code compliance for their renovation, or whether their panel can handle a new EV charger. Good questions, but answering them all day eats into your billable hours.",
    solution:
      "The AI handles common pre-qualification questions based on your service area's code requirements and your expertise. It gives customers accurate preliminary answers and books a consultation when the job needs your personal assessment.",
  },
  {
    icon: "📆",
    title: "Owner Does Admin on Weekends",
    description:
      "You spent all week on job sites. Now it's Sunday night and you're doing invoices, updating the schedule, following up with leads from Tuesday, and prepping quotes for Monday. This is not what you started your business to do.",
    solution:
      "Invoices go out automatically. Appointments get booked without your input. Follow-ups happen on schedule. You get your weekends back because the AI front office handles the admin that was eating your nights and weekends.",
  },
];

export default function ElectriciansPage() {
  return (
    <div className="bg-light-bg">
      {/* Hero */}
      <section className="relative overflow-hidden bg-dark pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 right-[-10%] h-[500px] w-[500px] rounded-full bg-accent/8 blur-3xl" />
          <div className="absolute bottom-0 left-[-5%] h-[400px] w-[400px] rounded-full bg-primary-light/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-300">
              <span className="text-lg">⚡</span>
              Built for Electrical Contractors
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Your Electrical Business Deserves a{" "}
              <span className="relative">
                <span className="relative z-10 text-accent">Smarter Front Office</span>
                <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-accent/15 sm:bottom-2 sm:h-4" />
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
              Electrical work is complex enough without drowning in admin. Our AI
              front office handles your calls, estimates, scheduling, and
              follow-up, so you can focus on the work that actually requires
              your expertise.
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
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">Industry Avg Response</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-white mt-1">4+ hrs</p>
            </div>
            <div className="hidden sm:block text-3xl text-gray-400">vs</div>
            <div className="rounded-2xl bg-white/10 px-8 py-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">Mainline Response</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-accent mt-1">&lt;60 sec</p>
            </div>
            <div className="hidden sm:block text-3xl text-gray-400">=</div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">Close Rate Advantage</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-white mt-1">10x</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points + Solutions */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              The Electrical Contractor&apos;s Bottlenecks
            </h2>
            <p className="mt-4 text-lg text-text-light">
              You&apos;re great at the technical work. The business side shouldn&apos;t hold you back.
            </p>
          </div>

          <div className="mt-14 space-y-8">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-light-bg p-8 sm:p-10"
              >
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                  <div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{point.icon}</span>
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
      <section className="bg-light-bg py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              The ROI Math for Electricians
            </h2>
          </div>

          <div className="rounded-2xl bg-white border border-gray-200 shadow-lg p-8 sm:p-12">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-dark">Without Mainline</h3>
                <ul className="space-y-3 text-text-light">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    Leads get 4+ hour response time
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    Estimates take 3-5 business days
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    10+ hours/week on admin
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    No follow-up on old leads
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-dark">With Mainline</h3>
                <ul className="space-y-3 text-text-light">
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    Under 60-second response time
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    Draft estimates same day
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    Weekends back, admin handled
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    Automated lead nurturing sequences
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-text-light">
                Responding to leads 10x faster means closing more jobs at the same
                marketing spend. One extra commercial job per month at $2,000-$5,000
                pays for your entire AI front office{" "}
                <strong className="text-accent">multiple times over</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-light-bg border border-gray-100 p-10 sm:p-16 text-center">
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
              &ldquo;I used to spend my Sunday nights doing invoices. Now they go
              out automatically when my guys finish a job.&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="font-bold text-dark text-lg">Tom R.</p>
              <p className="text-text-light">Volt Electric, Austin</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-dark py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Run a Smarter Electrical Business?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-gray-400">
            Schedule a free 15-minute call. We&apos;ll show you how an AI front
            office works for electrical contractors and what it would look like
            for your business specifically.
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

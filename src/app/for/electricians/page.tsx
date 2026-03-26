import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Automation for Electrical Contractors | Mainline",
  description:
    "Your electrical business deserves a smarter front office. Mainline puts an AI chatbot on your website that captures leads, books appointments, and requests reviews, so you can focus on the work.",
};

const painPoints = [
  {
    icon: "",
    title: "Website Visitors Leave Without Reaching Out",
    description:
      "A property manager visits your website looking for a commercial electrician. They browse your services page, but there's no one to answer their questions at 7 PM. They leave and contact the next company that makes it easy.",
    solution:
      "Our AI chatbot engages every website visitor instantly, 24/7. It answers questions about your services, qualifies the job, gathers details, and helps them book a consultation. You wake up to leads instead of missed opportunities.",
  },
  {
    icon: "",
    title: "Permit and Code Questions Pile Up",
    description:
      "Customers reach out asking about permit requirements, code compliance for their renovation, or whether their panel can handle a new EV charger. Good questions, but answering them all day eats into your billable hours.",
    solution:
      "The chatbot handles common pre-qualification questions based on your service area and your expertise. It gives customers accurate preliminary answers and books a consultation when the job needs your personal assessment.",
  },
  {
    icon: "",
    title: "Great Work But No Google Reviews",
    description:
      "You've done 200+ jobs this year. Your customers were happy. But you've got 18 Google reviews because nobody remembers to ask. Meanwhile, a less experienced competitor with 95 reviews is outranking you.",
    solution:
      "Review request texts go out after every completed job. Your happy customers get a direct link to leave a Google review while the experience is still fresh. Your reputation catches up to the quality of your work.",
  },
  {
    icon: "",
    title: "Booking Is a Back-and-Forth Process",
    description:
      "A homeowner wants an EV charger installed. They fill out your contact form on Monday. You call back Tuesday. They miss it. You trade voicemails until Thursday. By then they've already booked with someone who made it simpler.",
    solution:
      "Customers book directly through the chatbot or your online booking page. SMS confirmations and reminders go out automatically. No phone tag, no lost leads, no back-and-forth.",
  },
];

export default function ElectriciansPage() {
  return (
    <div className="bg-light-bg">
      {/* Hero */}
      <section className="bg-dark pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/images/trades/electrical.jpg"
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
              Electrical work is complex enough without losing leads to a
              silent website. Our AI chatbot answers every visitor, captures
              every lead, books appointments, and requests reviews, so you
              can focus on the work that actually requires your expertise.
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
            <div className="rounded-lg bg-white/10 px-8 py-4">
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
      <section className="bg-white py-20">
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
              The ROI Math for Electricians
            </h2>
          </div>

          <div className="rounded-lg bg-white border border-gray-200 shadow-lg p-8 sm:p-12">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-dark">Without Mainline</h3>
                <ul className="space-y-3 text-text-light">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    Website visitors leave with no response
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    No after-hours lead capture
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    Booking requires phone tag
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    Few Google reviews despite great work
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-dark">With Mainline</h3>
                <ul className="space-y-3 text-text-light">
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    Every visitor answered instantly, 24/7
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    Leads captured even at 2 AM
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    Online booking with SMS reminders
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">&#10003;</span>
                    Review requests after every job
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
              &ldquo;We had zero way for customers to reach us after hours. Now
              the chatbot captures leads all night and I wake up to booked appointments.&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="font-bold text-dark text-lg">Tom R.</p>
              <p className="text-text-light">Volt Electric, Austin</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-dark py-20">
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

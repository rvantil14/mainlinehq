import Link from "next/link";
import type { Metadata } from "next";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Mainline | AI Automation for Trade Businesses",
    description:
      "We build and run your AI front office. Phone answering, scheduling, invoicing, and reviews, automated for plumbers, HVAC, electricians, and contractors.",
  },
};

const painPoints = [
  {
    title: "You're under a house fixing a slab leak. Phone rings 3 times. That's $1,000+ walking to your competitor.",
    description:
      "Every unanswered call is a customer calling the next guy on Google. You don't get a second chance at that first impression.",
  },
  {
    title: "Your quote sat in your truck for 2 days. The customer already hired someone else.",
    description:
      "The longer you wait to bill, the longer you wait to get paid. And chasing payments is nobody's idea of a good time.",
  },
  {
    title: "Last job was 3 weeks ago. No review request sent. No follow-up. Customer forgot your name.",
    description:
      "You did great work. They were happy. But six months later they can't remember your name, and they're back on Google.",
  },
  {
    title: "It's Sunday night. You're doing invoices instead of watching the game with your kids.",
    description:
      "You started your business to do the work you're good at. Not to drown in scheduling, invoicing, and paperwork every weekend.",
  },
];

const services = [
  {
    title: "We Answer Your Phone 24/7",
    emoji: "📞",
    description:
      "Our AI receptionist picks up every call. Nights, weekends, holidays. Every lead gets captured, every customer gets a real conversation.",
  },
  {
    title: "We Book Your Appointments",
    emoji: "📅",
    description:
      "Customers self-schedule based on your real availability. They get instant SMS confirmations. You just show up.",
  },
  {
    title: "We Send Your Invoices",
    emoji: "💸",
    description:
      "Invoices go out automatically at job completion with text-to-pay links. Most customers pay the same day.",
  },
  {
    title: "We Get You 5-Star Reviews",
    emoji: "⭐",
    description:
      "Automated review requests go out after every completed job. You build your Google reputation without lifting a finger.",
  },
  {
    title: "We Generate Your Estimates",
    emoji: "📝",
    description:
      "Customer describes the job, AI creates a rough estimate based on your pricing. You review and approve before it goes out. No more spending an hour on every quote.",
  },
  {
    title: "We Draft Your Contracts",
    emoji: "📋",
    description:
      "Job details go in, a professional proposal comes out. Service scope, pricing, terms, all formatted and ready for your signature. Edit or approve in one click.",
  },
];

const steps = [
  {
    number: "01",
    title: "Tell Us About Your Business",
    description:
      "A quick call to understand your services, your market, and how you work. We handle everything from there.",
  },
  {
    number: "02",
    title: "We Build Your AI System",
    description:
      "We configure your AI receptionist, booking flows, invoicing, review automation, and follow-up sequences. Fully customized to your business.",
  },
  {
    number: "03",
    title: "You Grow While We Handle the Rest",
    description:
      "Your AI front office runs 24/7. You focus on doing great work. We keep optimizing in the background.",
  },
];

const trades = [
  { icon: "🔧", name: "Plumbing" },
  { icon: "❄️", name: "HVAC" },
  { icon: "⚡", name: "Electrical" },
  { icon: "🎨", name: "Painting" },
  { icon: "🌿", name: "Landscaping" },
  { icon: "🏗️", name: "General Contracting" },
  { icon: "🏠", name: "Roofing" },
  { icon: "🧹", name: "Cleaning" },
];

const testimonials = [
  {
    quote:
      "I was missing 4-5 calls a day on job sites. Now every call gets answered and half of them book before I even get back to the truck.",
    name: "Mike T.",
    business: "Ace Plumbing",
    location: "Riverside",
    stars: 5,
  },
  {
    quote:
      "The review automation alone paid for itself. We went from 12 Google reviews to 47 in three months.",
    name: "Sarah K.",
    business: "Summit HVAC",
    location: "Phoenix",
    stars: 5,
  },
  {
    quote:
      "I used to spend my Sunday nights doing invoices. Now they go out automatically when my guys finish a job.",
    name: "Tom R.",
    business: "Volt Electric",
    location: "Austin",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="h-5 w-5 text-accent"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-dark pt-20 pb-28 sm:pt-32 sm:pb-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 right-[-10%] h-[500px] w-[500px] rounded-full bg-accent/8 blur-3xl" />
          <div className="absolute bottom-0 left-[-5%] h-[400px] w-[400px] rounded-full bg-primary-light/8 blur-3xl" />
          <div className="absolute top-40 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-primary-light/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-300">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Your AI Front Office, Built and Run For You
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl">
              Every Missed Call Is a Job{" "}
              <span className="relative">
                <span className="relative z-10 text-accent">You&apos;ll Never Get Back</span>
                <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-accent/15 sm:bottom-2 sm:h-4" />
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
              We answer your phone, book your jobs, send your invoices, and
              follow up with every customer, 24/7. You just do the work.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover sm:w-auto"
              >
                See How It Works
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
              <Link
                href="/contact"
                className="group flex w-full items-center justify-center gap-2 rounded-lg border-2 border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
              >
                Schedule a Free Consultation
              </Link>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Trusted by trade businesses nationwide
            </p>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              Sound Familiar?
            </h2>
            <p className="mt-4 text-lg text-text-light">
              These problems cost trade businesses thousands every month. Most
              owners just accept it as normal.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-gray-100 bg-light-bg p-8 transition-all duration-300 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <h3 className="text-lg font-bold text-dark">
                  {point.title}
                </h3>
                <p className="mt-3 leading-relaxed text-text-light">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-light-bg py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              Here&apos;s What Changes When You Work With Us
            </h2>
            <p className="mt-4 text-lg text-text-light">
              This isn't software you have to learn. We build it, run it, and
              optimize it. You just see the results.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-primary/10 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-2xl">
                  {service.emoji}
                </div>
                <h3 className="text-lg font-bold text-dark">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-text-light">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* You Stay In Control */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              You Stay In Control
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-text-light">
              We know what you&apos;re thinking: &ldquo;I don&apos;t want a robot talking to my customers.&rdquo; We get it.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-light-bg p-8">
              <h3 className="text-lg font-bold text-dark">
                AI drafts, you approve.
              </h3>
              <p className="mt-3 leading-relaxed text-text-light">
                Nothing goes to your customers without you seeing it first. Estimates, contracts, follow-ups. You review everything.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-light-bg p-8">
              <h3 className="text-lg font-bold text-dark">
                Trained on YOUR business.
              </h3>
              <p className="mt-3 leading-relaxed text-text-light">
                We learn YOUR prices, YOUR services, YOUR way of talking to people. Not a generic bot. A system that sounds like your front office.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-light-bg p-8">
              <h3 className="text-lg font-bold text-dark">
                Humans when it matters.
              </h3>
              <p className="mt-3 leading-relaxed text-text-light">
                Complex job? Angry customer? The AI hands off to you instantly. You get a notification and take over seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-dark py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Up and running in under a week. No kidding.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="absolute top-10 right-0 hidden h-px w-8 translate-x-full bg-white/10 sm:block" />
                )}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <span className="text-4xl font-black text-accent/80">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm font-medium text-accent">
            Live in under a week. No long onboarding. No learning curve.
          </p>
        </div>
      </section>

      {/* Who We Help */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              Built for Every Trade
            </h2>
            <p className="mt-4 text-lg text-text-light">
              If your business runs on appointments and job sites, we built this for you.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trades.map((trade, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-light-bg p-6 text-center transition-all hover:border-primary/10 hover:shadow-md"
              >
                <span className="text-4xl">{trade.icon}</span>
                <span className="text-sm font-semibold text-dark">
                  {trade.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-light-bg py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-text-light">
              Real results from real trade businesses.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="relative rounded-2xl border border-gray-100 bg-white p-10 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1"
              >
                <span className="absolute top-4 right-6 text-6xl font-serif leading-none text-accent/10 select-none">&ldquo;</span>
                <StarRating count={testimonial.stars} />
                <blockquote className="relative mt-5 text-lg leading-relaxed text-dark">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <p className="font-semibold text-dark">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-text-light">
                    {testimonial.business}, {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
            >
              See Full Case Studies
              <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-10">
            Powered By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 shadow-sm">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
              Claude AI
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 shadow-sm">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
              Stripe
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 shadow-sm">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              Twilio
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 shadow-sm">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
              Cal.com
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 shadow-sm">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>
              Pipedrive
            </span>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-4 py-2 text-xs font-semibold text-success">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
              SSL Encrypted
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-4 py-2 text-xs font-semibold text-success">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              CCPA Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-4 py-2 text-xs font-semibold text-accent">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              30-Day Money-Back Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-dark py-28 sm:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-primary-light/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Let&apos;s Talk About Your Business
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-gray-300">
              Schedule a free 15-minute call. We&apos;ll show you exactly how
              many calls you&apos;re missing and what we can do about it.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-10 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30"
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
    </>
  );
}

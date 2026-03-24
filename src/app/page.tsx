import Link from "next/link";
import Image from "next/image";
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
    description:
      "Our AI receptionist picks up every call. Nights, weekends, holidays. Every lead gets captured, every customer gets a real conversation.",
  },
  {
    title: "We Book Your Appointments",
    description:
      "Customers self-schedule based on your real availability. They get instant SMS confirmations. You just show up.",
  },
  {
    title: "We Send Your Invoices",
    description:
      "Invoices go out automatically at job completion with text-to-pay links. Most customers pay the same day.",
  },
  {
    title: "We Get You 5-Star Reviews",
    description:
      "Automated review requests go out after every completed job. You build your Google reputation without lifting a finger.",
  },
  {
    title: "We Generate Your Estimates",
    description:
      "Customer describes the job, AI creates a rough estimate based on your pricing. You review and approve before it goes out. No more spending an hour on every quote.",
  },
  {
    title: "We Draft Your Contracts",
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
  { name: "Plumbing", image: "/images/trades/plumbing.jpg", href: "/for/plumbers" },
  { name: "HVAC", image: "/images/trades/hvac.jpg", href: "/for/hvac" },
  { name: "Electrical", image: "/images/trades/electrical.jpg", href: "/for/electricians" },
  { name: "Painting", image: "/images/trades/painting.jpg", href: "/contact" },
  { name: "Landscaping", image: "/images/trades/landscaping.jpg", href: "/contact" },
  { name: "General Contracting", image: "/images/trades/contracting.jpg", href: "/contact" },
  { name: "Roofing", image: "/images/trades/roofing.jpg", href: "/contact" },
  { name: "Cleaning", image: "/images/trades/cleaning.jpg", href: "/contact" },
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
      <section className="bg-dark pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-300">
              <span className="inline-block h-2 w-2 bg-accent" />
              Your AI Front Office, Built and Run For You
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl">
              Every Missed Call Is a Job{" "}
              <span className="text-accent">You&apos;ll Never Get Back</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
              We answer your phone, book your jobs, send your invoices, and
              follow up with every customer, 24/7. You just do the work.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="group flex w-full items-center justify-center gap-2 rounded-md bg-accent px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-hover sm:w-auto"
              >
                See How It Works
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
              <Link
                href="/contact"
                className="group flex w-full items-center justify-center gap-2 rounded-md border-2 border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Schedule a Free Consultation
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              No contracts. Live in under a week.
            </p>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              Sound Familiar?
            </h2>
            <p className="mt-3 text-lg text-text-light">
              These problems cost trade businesses thousands every month. Most
              owners just accept it as normal.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-light-bg p-7"
              >
                <h3 className="text-lg font-bold text-dark">
                  {point.title}
                </h3>
                <p className="mt-2 leading-relaxed text-text-light">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-light-bg py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              Here&apos;s What Changes When You Work With Us
            </h2>
            <p className="mt-3 text-lg text-text-light">
              This isn't software you have to learn. We build it, run it, and
              optimize it. You just see the results.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <div
                key={i}
                className="rounded-lg border-l-4 border-l-accent border border-gray-200 bg-white p-7"
              >
                <h3 className="text-lg font-bold text-dark">
                  {service.title}
                </h3>
                <p className="mt-2 leading-relaxed text-text-light">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* You Stay In Control */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              You Stay In Control
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-text-light">
              We know what you&apos;re thinking: &ldquo;I don&apos;t want a robot talking to my customers.&rdquo; We get it.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-light-bg p-7">
              <h3 className="text-lg font-bold text-dark">
                AI drafts, you approve.
              </h3>
              <p className="mt-2 leading-relaxed text-text-light">
                Nothing goes to your customers without you seeing it first. Estimates, contracts, follow-ups. You review everything.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-light-bg p-7">
              <h3 className="text-lg font-bold text-dark">
                Trained on YOUR business.
              </h3>
              <p className="mt-2 leading-relaxed text-text-light">
                We learn YOUR prices, YOUR services, YOUR way of talking to people. Not a generic bot. A system that sounds like your front office.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-light-bg p-7">
              <h3 className="text-lg font-bold text-dark">
                Humans when it matters.
              </h3>
              <p className="mt-2 leading-relaxed text-text-light">
                Complex job? Angry customer? The AI hands off to you instantly. You get a notification and take over seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-dark py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-lg text-gray-400">
              Up and running in under a week. No kidding.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="absolute top-10 right-0 hidden h-px w-8 translate-x-full bg-white/10 sm:block" />
                )}
                <div className="rounded-lg border border-white/10 bg-white/5 p-7">
                  <span className="text-4xl font-black text-accent/80">
                    {step.number}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm font-medium text-accent">
            Live in under a week. No long onboarding. No learning curve.
          </p>
        </div>
      </section>

      {/* Who We Help */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              Built for Every Trade
            </h2>
            <p className="mt-3 text-lg text-text-light">
              If your business runs on appointments and job sites, we built this for you.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {trades.map((trade, i) => (
              <Link
                key={i}
                href={trade.href}
                className="group relative overflow-hidden rounded-lg h-44 sm:h-52"
              >
                <Image
                  src={trade.image}
                  alt={trade.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" />
                <div className="relative flex items-end h-full p-4">
                  <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {trade.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-light-bg py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              What Trade Businesses Are Saying
            </h2>
            <p className="mt-3 text-lg text-text-light">
              Results trade businesses can expect with AI automation.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="rounded-lg border-l-4 border-l-accent border border-gray-200 bg-white p-8"
              >
                <StarRating count={testimonial.stars} />
                <blockquote className="mt-4 text-lg leading-relaxed text-dark">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-5 border-t border-gray-100 pt-4">
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

          <p className="mt-6 text-center text-xs text-text-light">
            Based on projected results from industry benchmarks. Names and businesses are illustrative examples.
          </p>
          <div className="mt-3 text-center">
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

      {/* Bottom CTA */}
      <section className="bg-dark py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Let&apos;s Talk About Your Business
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-gray-300">
              Schedule a free 15-minute call. We&apos;ll show you exactly how
              many calls you&apos;re missing and what we can do about it.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-10 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book Your Free Consultation
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
            <p className="mt-5 text-sm text-gray-500">
              No contracts. No commitment. Just a conversation about your business.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

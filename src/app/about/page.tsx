import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Mainline",
  description:
    "Mainline builds and runs AI front offices for trade businesses. Done-for-you automation that goes live in under a week.",
  openGraph: {
    title: "About | Mainline",
    description:
      "Mainline builds and runs AI front offices for trade businesses. Done-for-you automation that goes live in under a week.",
    type: "website",
    url: "https://mainlinehq.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Mainline",
    description:
      "Mainline builds and runs AI front offices for trade businesses. Done-for-you automation that goes live in under a week.",
  },
};

const differentiators = [
  {
    title: "Done-for-You, Not DIY Software",
    description:
      "We do not hand you a login and wish you luck. We build, configure, and manage your entire automation system. You focus on the work. We handle the tech.",
  },
  {
    title: "Trained on Your Business",
    description:
      "Every chatbot, every workflow, every automation is built around how your specific business operates. Your services, your pricing, your service area, your voice.",
  },
  {
    title: "Month-to-Month, No Contracts",
    description:
      "We earn your business every single month. No long-term commitments, no cancellation fees. If it is not working, you walk. Simple as that.",
  },
  {
    title: "Live in Under a Week",
    description:
      "No months-long onboarding. No learning curve. We get your AI front office running within days so you start seeing results fast.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-light-bg">
      {/* Hero */}
      <section className="bg-dark text-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            We Build and Run{" "}
            <span className="text-accent">AI Front Offices</span>{" "}
            for Trade Businesses
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Plumbers, HVAC techs, electricians, and contractors lose thousands
            every month to missed calls, slow follow-ups, and manual admin. We
            built Mainline to fix that.
          </p>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              What We Believe
            </h2>
          </div>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
            Trade businesses deserve the same technology that big companies use,
            without having to figure it out themselves. The problem was never a
            lack of tools. It was that nobody built them specifically for the
            trades, and nobody stuck around to make sure they actually worked.
          </p>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
            That is what Mainline does. We take the phone answering, scheduling,
            invoicing, and follow-up off your plate so you can spend your time
            doing the work you are actually good at.
          </p>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              What Makes Us Different
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              There are plenty of software tools out there. We are not one of
              them.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {differentiators.map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5"
              >
                <h3 className="text-lg font-bold text-dark">
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-primary py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Our Mission
          </h2>
          <p className="mt-6 text-xl sm:text-2xl text-blue-100/80 leading-relaxed max-w-2xl mx-auto">
            Help trade businesses stop losing money to missed calls, slow
            follow-ups, and manual admin. Every contractor deserves a front
            office that works as hard as they do.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark tracking-tight">
            Ready to see what AI can do for your business?
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            15 minutes. No pitch deck. We will look at your current setup and
            show you exactly where automation would make a difference.
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

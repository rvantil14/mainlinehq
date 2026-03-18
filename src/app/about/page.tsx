import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Mainline",
  description:
    "Built by Ryan Van Til for trade businesses across the US. Done-for-you AI automation.",
  openGraph: {
    title: "About | Mainline",
    description:
      "Built by Ryan Van Til for trade businesses across the US. Done-for-you AI automation.",
    type: "website",
    url: "https://mainlinehq.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Mainline",
    description:
      "Built by Ryan Van Til for trade businesses across the US. Done-for-you AI automation.",
  },
};

const differentiators = [
  {
    icon: "🛠️",
    title: "Done-for-You, Not DIY Software",
    description:
      "We don't hand you a login and wish you luck. We build, configure, and manage your entire automation system. You focus on the work. We handle the tech.",
  },
  {
    icon: "📍",
    title: "Local Expertise",
    description:
      "We specialize in trade businesses. Plumbers, HVAC techs, electricians, painters. We know the industry inside and out.",
  },
  {
    icon: "🎯",
    title: "Trained on YOUR Business",
    description:
      "Every chatbot, every workflow, every automation is built around how your specific business operates: your services, your pricing, your service area, your voice.",
  },
  {
    icon: "🤝",
    title: "Month-to-Month, No Contracts",
    description:
      "We earn your business every single month. No long-term commitments, no cancellation fees. If it's not working, you walk. Simple as that.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-light-bg">
      {/* Hero */}
      <section className="bg-dark text-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Built for Contractors,{" "}
            <span className="text-accent">by Someone Who Gets It</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I work in mortgage lending and saw firsthand how small service
            businesses (plumbers, electricians, HVAC techs) lose thousands
            every month to missed calls, late invoices, and manual admin. These
            are skilled tradespeople who didn&apos;t get into the business to do
            paperwork. I built Mainline to fix that.
          </p>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-10">
            {/* Photo Placeholder */}
            <div className="shrink-0">
              <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center">
                <span className="text-4xl font-bold text-white">RV</span>
              </div>
            </div>

            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl mb-4">
                Meet the Founder
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                I&apos;m Ryan Van Til. I built Mainline as
                one system that answers your phone, books your appointments,
                sends your invoices, and follows up with every customer, so you
                can focus on the work you&apos;re actually good at.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-dark">Name:</span> Ryan
                  Van Til
                </p>
                <p>
                  <span className="font-semibold text-dark">Location:</span> San
                  Diego, CA
                </p>
                <p>
                  <span className="font-semibold text-dark">Phone:</span>{" "}
                  <a
                    href="tel:+18058011380"
                    className="text-accent hover:text-accent-hover transition-colors"
                  >
                    (805) 801-1380
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-dark">LinkedIn:</span>{" "}
                  <a
                    href="https://linkedin.com/in/ryanvantil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover transition-colors"
                  >
                    linkedin.com/in/ryanvantil
                  </a>
                </p>
              </div>
            </div>
          </div>
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
              There are plenty of software tools out there. We&apos;re not one
              of them.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {differentiators.map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5"
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="mt-4 text-lg font-bold text-dark">
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
            Help{" "}
            <span className="font-bold text-accent">
              100 trade businesses
            </span>{" "}
            across the country automate their front office in the next 12
            months.
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
            15 minutes. No pitch deck. We&apos;ll look at your current setup and
            show you exactly where automation would make a difference.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center px-8 py-4 text-base font-semibold bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors shadow-md shadow-accent/25"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </section>
    </div>
  );
}

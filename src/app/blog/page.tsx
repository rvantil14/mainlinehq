import type { Metadata } from "next";
import Link from "next/link";
import { blogArticles } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog | Mainline",
  description:
    "Tips, guides, and insights for trade business owners looking to automate and grow.",
};

const categoryColors: Record<string, string> = {
  Plumbing: "bg-blue-100 text-blue-700",
  HVAC: "bg-orange-100 text-orange-700",
  Electrical: "bg-yellow-100 text-yellow-700",
  General: "bg-gray-100 text-gray-700",
};

export default function BlogPage() {
  return (
    <div className="bg-light-bg">
      {/* Hero */}
      <section className="bg-dark py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            The Mainline Blog
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
            Tips for growing your trade business. No fluff, no corporate jargon,
            just actionable stuff that works.
          </p>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        categoryColors[article.category] || categoryColors.General
                      }`}
                    >
                      {article.category}
                    </span>
                    <span className="text-xs text-text-light">
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-dark group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-light">
                    {article.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <time
                      dateTime={article.date}
                      className="text-xs text-text-light"
                    >
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="text-sm font-semibold text-accent group-hover:underline">
                      Read more &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-dark py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Want to See What AI Can Do for Your Business?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-gray-400">
            Schedule a free consultation. We&apos;ll look at your specific
            business and show you where automation would make the biggest impact.
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
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogArticles } from "@/lib/blog-data";

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found | Mainline" };

  return {
    title: `${article.title} | Mainline Blog`,
    description: article.excerpt,
  };
}

const categoryColors: Record<string, string> = {
  Plumbing: "bg-blue-100 text-blue-700",
  HVAC: "bg-orange-100 text-orange-700",
  Electrical: "bg-yellow-100 text-yellow-700",
  General: "bg-gray-100 text-gray-700",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-light-bg">
      {/* Header */}
      <section className="bg-dark py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            &larr; Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                categoryColors[article.category] || categoryColors.General
              }`}
            >
              {article.category}
            </span>
            <span className="text-sm text-gray-400">{article.readTime}</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl leading-tight">
            {article.title}
          </h1>

          <time
            dateTime={article.date}
            className="mt-6 block text-sm text-gray-400"
          >
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <article
            className="prose prose-lg max-w-none
              prose-headings:text-dark prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-3
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-text-light prose-p:leading-[1.8] prose-p:text-base prose-p:sm:text-lg
              prose-strong:text-dark
              prose-ul:text-text-light prose-ul:space-y-2
              prose-li:leading-relaxed
              prose-a:text-accent prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6
              prose-table:border-collapse prose-table:w-full prose-table:text-sm
              prose-th:border prose-th:border-gray-200 prose-th:bg-light-bg prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-dark
              prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-3 prose-td:text-text-light"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to See What This Looks Like for Your Business?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-gray-400">
            Schedule a free consultation. No pitch deck, no pressure, just a
            conversation about your business and where automation makes sense.
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

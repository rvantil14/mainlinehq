import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-light-bg px-4">
      <div className="max-w-md text-center">
        <p className="text-6xl font-extrabold text-accent mb-4">404</p>
        <h1 className="text-2xl font-bold text-dark sm:text-3xl mb-3">
          Page Not Found
        </h1>
        <p className="text-text-light mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-accent/25 transition-colors hover:bg-accent-hover"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-dark shadow-sm transition-colors hover:bg-gray-50"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

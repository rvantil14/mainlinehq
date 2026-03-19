"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const tradeTypes = [
  "Plumbing",
  "HVAC",
  "Electrical",
  "Roofing",
  "Painting",
  "Landscaping",
  "General Contracting",
  "Cleaning",
  "Pest Control",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    trade: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          businessName: form.business,
          phone: form.phone,
          email: form.email,
          tradeType: form.trade,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-light-bg">
      {/* Hero */}
      <section className="bg-dark text-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Let&apos;s Talk About{" "}
            <span className="text-accent">Your Business</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            15 minutes. No pitch deck. We&apos;ll pull up your numbers and show you exactly where the leaks are.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-xl">
                    📞
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">Phone</p>
                    <a
                      href="tel:+18058011380"
                      className="text-sm text-gray-600 hover:text-accent transition-colors"
                    >
                      (805) 801-1380
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-xl">
                    ✉️
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">Email</p>
                    <a
                      href="mailto:hello@mainlinehq.com"
                      className="text-sm text-gray-600 hover:text-accent transition-colors"
                    >
                      hello@mainlinehq.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-xl">
                    📍
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">Location</p>
                    <p className="text-sm text-gray-600">
                      Serving trade businesses across the United States
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Response Promise */}
              <div className="mt-10 rounded-2xl bg-primary/5 border border-primary/10 p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">We respond fast</p>
                    <p className="mt-1 text-sm text-text-light">
                      Most inquiries get a response within a few hours. Call us directly at{" "}
                      <a
                        href="tel:+18058011380"
                        className="font-semibold text-accent hover:text-accent-hover transition-colors"
                      >
                        (805) 801-1380
                      </a>{" "}
                      if you want to talk now.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="rounded-2xl bg-white border border-gray-100 shadow-xl p-8 sm:p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-xl font-bold text-dark">
                      Message Received
                    </h3>
                    <p className="mt-2 text-gray-600">
                      We&apos;ll get back to you within one business day.
                      Usually sooner.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          business: "",
                          phone: "",
                          email: "",
                          trade: "",
                          message: "",
                        });
                      }}
                      className="mt-6 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-lg font-bold text-dark mb-1">
                      Send us a message
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Tell us a bit about your business and we&apos;ll reach out
                      with next steps.
                    </p>

                    {error && (
                      <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-light-bg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all"
                        placeholder="John Smith"
                      />
                    </div>

                    {/* Business Name */}
                    <div>
                      <label
                        htmlFor="business"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="business"
                        name="business"
                        required
                        value={form.business}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-light-bg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all"
                        placeholder="Smith Plumbing"
                      />
                    </div>

                    {/* Phone + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1.5"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-200 bg-light-bg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1.5"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-200 bg-light-bg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all"
                          placeholder="john@smithplumbing.com"
                        />
                      </div>
                    </div>

                    {/* Trade Type */}
                    <div>
                      <label
                        htmlFor="trade"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Trade Type
                      </label>
                      <select
                        id="trade"
                        name="trade"
                        required
                        value={form.trade}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-light-bg px-4 py-3 text-sm text-gray-900 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all"
                      >
                        <option value="" disabled>
                          Select your trade
                        </option>
                        {tradeTypes.map((trade) => (
                          <option key={trade} value={trade}>
                            {trade}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Message{" "}
                        <span className="text-gray-400 font-normal">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-light-bg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all resize-none"
                        placeholder="Tell us about your business, how many techs you have, what's taking up the most time..."
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-lg bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 text-sm font-semibold transition-colors shadow-sm shadow-accent/25"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      We&apos;ll respond within one business day. No spam, ever.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

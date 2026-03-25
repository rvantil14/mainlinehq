"use client";

import { useState, useMemo } from "react";

const tradeTypes = [
  "Plumbing",
  "HVAC",
  "Electrical",
  "Painting",
  "Roofing",
  "Landscaping",
  "General Contracting",
  "Cleaning",
  "Other",
];

const employeeOptions = ["1", "2-5", "6-10", "10+"];

const CLOSE_RATE = 0.4;

export default function AuditPage() {
  // Step 1: Business info
  const [tradeType, setTradeType] = useState("");
  const [numEmployees, setNumEmployees] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Step 2: Call volume
  const [callsPerWeek, setCallsPerWeek] = useState(20);
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(5);
  const [avgJobValue, setAvgJobValue] = useState(350);

  // Step 3: Contact info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const step1Complete = tradeType && numEmployees && city && state;

  const monthlyRevenueLost = useMemo(() => {
    return missedCallsPerWeek * 4 * CLOSE_RATE * avgJobValue;
  }, [missedCallsPerWeek, avgJobValue]);

  const yearlyRevenueLost = monthlyRevenueLost * 12;

  const missedCallsPerMonth = missedCallsPerWeek * 4;

  const missedPercent = callsPerWeek > 0
    ? Math.round((missedCallsPerWeek / callsPerWeek) * 100)
    : 0;

  function formatCurrency(n: number): string {
    return n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (!name.trim() || name.trim().length < 2) { setError("Please enter your name."); setSubmitting(false); return; }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) { setError("Please enter a valid 10-digit phone number."); setSubmitting(false); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) { setError("Please enter a valid email address."); setSubmitting(false); return; }

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          tradeType,
          numEmployees,
          city,
          state,
          callsPerWeek,
          missedCallsPerWeek,
          avgJobValue,
          monthlyRevenueLost,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-light-bg">
      {/* Hero */}
      <section className="bg-dark text-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/30 px-4 py-1.5 text-sm font-medium text-accent mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Free Missed Call Audit
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            How Many Calls Is Your{" "}
            <span className="text-accent">Business Missing?</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Enter a few details and we&apos;ll show you exactly how much revenue
            is walking out the door every month.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Step 1 */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white text-sm font-bold">
                1
              </div>
              <h2 className="text-xl font-bold text-dark">Tell us about your business</h2>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 shadow-lg p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Trade Type */}
                <div>
                  <label htmlFor="tradeType" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Trade Type
                  </label>
                  <select
                    id="tradeType"
                    value={tradeType}
                    onChange={(e) => setTradeType(e.target.value)}
                    className="w-full rounded-md border border-gray-200 bg-light-bg px-4 py-3 text-sm text-gray-900 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all"
                  >
                    <option value="" disabled>Select your trade</option>
                    {tradeTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Employees */}
                <div>
                  <label htmlFor="numEmployees" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Number of Techs / Employees
                  </label>
                  <select
                    id="numEmployees"
                    value={numEmployees}
                    onChange={(e) => setNumEmployees(e.target.value)}
                    className="w-full rounded-md border border-gray-200 bg-light-bg px-4 py-3 text-sm text-gray-900 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all"
                  >
                    <option value="" disabled>Select team size</option>
                    {employeeOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="San Diego"
                    className="w-full rounded-md border border-gray-200 bg-light-bg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all"
                  />
                </div>

                {/* State */}
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="CA"
                    maxLength={2}
                    className="w-full rounded-md border border-gray-200 bg-light-bg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all uppercase"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className={`mb-12 transition-opacity duration-500 ${step1Complete ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${step1Complete ? "bg-accent text-white" : "bg-gray-200 text-gray-500"}`}>
                2
              </div>
              <h2 className="text-xl font-bold text-dark">Your call volume</h2>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 shadow-lg p-6 sm:p-8 space-y-8">
              {/* Calls per week */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="callsPerWeek" className="text-sm font-medium text-gray-700">
                    How many calls do you get per week?
                  </label>
                  <span className="text-lg font-bold text-dark tabular-nums">{callsPerWeek}</span>
                </div>
                <input
                  type="range"
                  id="callsPerWeek"
                  min={5}
                  max={100}
                  value={callsPerWeek}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setCallsPerWeek(val);
                    if (missedCallsPerWeek > val) setMissedCallsPerWeek(val);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5</span>
                  <span>100</span>
                </div>
              </div>

              {/* Missed calls per week */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="missedCallsPerWeek" className="text-sm font-medium text-gray-700">
                    How many do you think you miss?
                  </label>
                  <span className="text-lg font-bold text-accent tabular-nums">{missedCallsPerWeek}</span>
                </div>
                <input
                  type="range"
                  id="missedCallsPerWeek"
                  min={1}
                  max={Math.min(50, callsPerWeek)}
                  value={missedCallsPerWeek}
                  onChange={(e) => setMissedCallsPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span>
                  <span>{Math.min(50, callsPerWeek)}</span>
                </div>
              </div>

              {/* Average job value */}
              <div>
                <label htmlFor="avgJobValue" className="block text-sm font-medium text-gray-700 mb-2">
                  Average job value
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">$</span>
                  <input
                    type="number"
                    id="avgJobValue"
                    min={50}
                    max={50000}
                    step={25}
                    value={avgJobValue}
                    onChange={(e) => setAvgJobValue(Number(e.target.value) || 0)}
                    className="w-full rounded-md border border-gray-200 bg-light-bg pl-8 pr-4 py-3 text-sm text-gray-900 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all tabular-nums"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Results */}
          <div className={`transition-opacity duration-500 ${step1Complete ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${step1Complete ? "bg-accent text-white" : "bg-gray-200 text-gray-500"}`}>
                3
              </div>
              <h2 className="text-xl font-bold text-dark">Your results</h2>
            </div>

            {/* Results Card */}
            <div className="rounded-xl bg-dark text-white border border-white/10 shadow-2xl overflow-hidden">
              <div className="p-8 sm:p-10">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Estimated monthly revenue you&apos;re losing
                </p>
                <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-accent tabular-nums leading-none">
                  {formatCurrency(monthlyRevenueLost)}
                </p>
                <p className="mt-3 text-lg text-gray-300">
                  per month
                </p>

                {/* Breakdown */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                    <p className="text-2xl font-bold text-white tabular-nums">{missedCallsPerMonth}</p>
                    <p className="text-sm text-gray-400 mt-1">missed calls/month</p>
                  </div>
                  <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                    <p className="text-2xl font-bold text-white tabular-nums">{missedPercent}%</p>
                    <p className="text-sm text-gray-400 mt-1">of calls unanswered</p>
                  </div>
                  <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                    <p className="text-2xl font-bold text-accent tabular-nums">{formatCurrency(yearlyRevenueLost)}</p>
                    <p className="text-sm text-gray-400 mt-1">lost per year</p>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-accent/10 border border-accent/20 p-4">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-accent">How we calculate this:</span>{" "}
                    {missedCallsPerWeek} missed calls/week &times; 4 weeks &times; 40% close rate &times; {formatCurrency(avgJobValue)} average job = {formatCurrency(monthlyRevenueLost)}/month
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10" />

              {/* CTA Form */}
              <div className="p-8 sm:p-10 bg-primary/30">
                <h3 className="text-xl font-bold text-white mb-2">
                  Want to fix this?
                </h3>
                <p className="text-gray-400 mb-6">
                  Enter your info and we&apos;ll send you a detailed audit with specific recommendations for your {tradeType ? tradeType.toLowerCase() : ""} business.
                </p>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-14 h-14 rounded-full bg-success/20 flex items-center justify-center mb-4">
                      <svg className="w-7 h-7 text-success" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      Your audit is on the way
                    </h4>
                    <p className="mt-2 text-gray-400">
                      We&apos;ll review your numbers and reach out with a full breakdown.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3">
                        <p className="text-sm text-red-300">{error}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Smith"
                          className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@aceplumbing.com"
                          className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(555) 123-4567"
                          className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-lg bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 px-6 text-sm font-semibold transition-colors shadow-lg shadow-accent/25"
                    >
                      {submitting ? "Sending..." : "Get My Free Audit Report"}
                    </button>

                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                      By submitting, you consent to receive calls or texts at the number provided.
                      Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out.{" "}
                      <a href="/privacy" className="underline hover:text-gray-400 transition-colors">Privacy Policy</a>.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Social proof / trust */}
          <div className="mt-16 text-center">
            <p className="text-sm text-text-light mb-4">
              Most trade businesses miss 20-40% of incoming calls. That adds up fast.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Takes 60 seconds
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                100% free
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                No commitment
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

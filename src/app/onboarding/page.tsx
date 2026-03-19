"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface FormData {
  /* Step 1: About Your Business */
  businessName: string;
  businessType: string;
  phone: string;
  email: string;
  ownerName: string;
  cityArea: string;
  /* Step 2: Package */
  selectedPackage: string;
}

const BUSINESS_TYPES = [
  "Plumbing",
  "HVAC",
  "Electrical",
  "Painting",
  "Landscaping",
  "General Contracting",
  "Roofing",
  "Cleaning",
  "Other",
];

const PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    price: "$500",
    period: "/mo",
    description: "Perfect for solo operators getting started with automation.",
    features: [
      "AI Chatbot",
      "Smart Scheduling",
      "SMS Confirmations",
      "Basic CRM",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$1,500",
    period: "/mo",
    popular: true,
    description: "The full stack for growing trade businesses.",
    features: [
      "Everything in Starter",
      "Automated Invoicing",
      "Review Automation",
      "Follow-up Sequences",
      "SMS Marketing",
      "Priority support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$2,500",
    period: "/mo",
    description: "For established businesses scaling to multiple crews.",
    features: [
      "Everything in Growth",
      "Multi-technician Routing",
      "Advanced Reporting",
      "Custom Integrations",
      "Dedicated Account Manager",
      "White-glove setup",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<FormData>({
    businessName: "",
    businessType: "",
    phone: "",
    email: "",
    ownerName: "",
    cityArea: "",
    selectedPackage: "",
  });

  /* ---- helpers ---- */

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!form.ownerName.trim()) e.ownerName = "Required";
      if (!form.businessName.trim()) e.businessName = "Required";
      if (!form.businessType) e.businessType = "Select a business type";
      if (!form.phone.trim()) e.phone = "Required";
      if (!form.email.trim()) e.email = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "Enter a valid email";
    }
    if (step === 2 && !form.selectedPackage) {
      e.selectedPackage = "Select a package to continue";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    setStep((s) => Math.min(s + 1, 3));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerName: form.ownerName,
          businessName: form.businessName,
          businessType: form.businessType,
          phone: form.phone,
          email: form.email,
          city: form.cityArea,
          selectedPackage: form.selectedPackage,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---- progress bar ---- */

  const stepLabels = ["About Your Business", "Pick Your Package", "Review & Submit"];
  const totalSteps = 3;

  /* ------------------------------------------------------------------ */
  /*  Success state                                                     */
  /* ------------------------------------------------------------------ */

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">You&apos;re all set!</h1>
          <p className="text-lg text-primary font-medium mb-6">Here&apos;s what happens next:</p>
          <ol className="text-left max-w-sm mx-auto space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent text-white text-sm font-bold shrink-0">1</span>
              <span className="text-gray-600">We&apos;ll call you within 24 hours to schedule your kickoff</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent text-white text-sm font-bold shrink-0">2</span>
              <span className="text-gray-600">We&apos;ll build your AI system in 3-5 business days</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent text-white text-sm font-bold shrink-0">3</span>
              <span className="text-gray-600">You&apos;ll be live and capturing leads within one week</span>
            </li>
          </ol>
          <div className="bg-light-bg rounded-xl p-4">
            <p className="text-sm text-text-light mb-1">Can&apos;t wait?</p>
            <a href="tel:+18058011380" className="text-lg font-bold text-primary hover:text-primary-light transition">
              Call us now: (805) 801-1380
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /*  Render                                                            */
  /* ------------------------------------------------------------------ */

  return (
    <div className="bg-light-bg min-h-screen py-12 sm:py-16 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight mb-2">
            Let&apos;s Get Your Business Set Up
          </h1>
          <p className="text-text-light text-lg">
            Fill out the form below and you&apos;ll be live within one week.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            {stepLabels.map((label, i) => {
              const stepNum = i + 1;
              const active = step === stepNum;
              const done = step > stepNum;
              return (
                <div key={label} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      done
                        ? "bg-accent text-white"
                        : active
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {done ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      stepNum
                    )}
                  </div>
                  <span
                    className={`mt-1.5 text-xs font-medium hidden sm:block ${
                      active ? "text-primary" : done ? "text-accent" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-400 mt-2">
            Step {step} of {totalSteps}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {/* ---- Step 1: About Your Business ---- */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-primary mb-1">About Your Business</h2>
              <p className="text-sm text-text-light mb-4">Tell us the basics so we can customize your AI system.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Owner Name" error={errors.ownerName}>
                  <input
                    type="text"
                    value={form.ownerName}
                    onChange={(e) => set("ownerName", e.target.value)}
                    placeholder="John Smith"
                    className={inputClass(errors.ownerName)}
                  />
                </Field>
                <Field label="Business Name" error={errors.businessName}>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={(e) => set("businessName", e.target.value)}
                    placeholder="Smith Plumbing"
                    className={inputClass(errors.businessName)}
                  />
                </Field>
                <Field label="Business Type" error={errors.businessType}>
                  <select
                    value={form.businessType}
                    onChange={(e) => set("businessType", e.target.value)}
                    className={inputClass(errors.businessType)}
                  >
                    <option value="">Select type...</option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className={inputClass(errors.phone)}
                  />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="john@smithplumbing.com"
                    className={inputClass(errors.email)}
                  />
                </Field>
                <Field label="City / Area" sublabel="(optional)">
                  <input
                    type="text"
                    value={form.cityArea}
                    onChange={(e) => set("cityArea", e.target.value)}
                    placeholder="Your City, ST"
                    className={inputClass()}
                  />
                </Field>
              </div>

              <p className="text-xs text-text-light italic mt-2">
                We&apos;ll gather your service details and hours during the kickoff call.
              </p>
            </div>
          )}

          {/* ---- Step 2: Package Selection ---- */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-primary mb-1">Pick Your Package</h2>
              <p className="text-sm text-text-light mb-6">Select the plan that fits your business. You can upgrade anytime.</p>
              {errors.selectedPackage && (
                <p className="text-sm text-red-500 mb-4">{errors.selectedPackage}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PACKAGES.map((pkg) => {
                  const selected = form.selectedPackage === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => set("selectedPackage", pkg.id)}
                      className={`relative text-left rounded-xl border-2 p-5 transition-all ${
                        selected
                          ? "border-accent bg-accent/5 shadow-md"
                          : "border-gray-100 hover:border-gray-200 bg-white"
                      }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wide bg-accent text-white px-3 py-0.5 rounded-full">
                          Most Popular
                        </span>
                      )}
                      <p className="text-sm font-semibold text-gray-900 mb-1">{pkg.name}</p>
                      <p className="text-2xl font-bold text-primary">
                        {pkg.price}
                        <span className="text-sm font-normal text-text-light">{pkg.period}</span>
                      </p>
                      <p className="text-xs text-text-light mt-1 mb-4">{pkg.description}</p>
                      <ul className="space-y-1.5">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                            <svg
                              className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2.5}
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {f}
                          </li>
                        ))}
                      </ul>
                      {selected && (
                        <div className="mt-4 text-center text-xs font-semibold text-accent">
                          Selected
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ---- Step 3: Review & Submit ---- */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-primary mb-1">Review & Submit</h2>
              <p className="text-sm text-text-light mb-4">Double check everything looks good, then hit submit.</p>

              {/* Business info summary */}
              <SummarySection title="About Your Business">
                <SummaryRow label="Owner" value={form.ownerName} />
                <SummaryRow label="Business" value={`${form.businessName} (${form.businessType})`} />
                <SummaryRow label="Phone" value={form.phone} />
                <SummaryRow label="Email" value={form.email} />
                {form.cityArea && <SummaryRow label="City / Area" value={form.cityArea} />}
              </SummarySection>

              {/* Package */}
              <SummarySection title="Selected Package">
                {(() => {
                  const pkg = PACKAGES.find((p) => p.id === form.selectedPackage);
                  if (!pkg) return <p className="text-sm text-text-light">No package selected</p>;
                  return (
                    <div>
                      <p className="text-lg font-bold text-primary">
                        {pkg.name}: {pkg.price}{pkg.period}
                      </p>
                      <p className="text-sm text-text-light">{pkg.description}</p>
                    </div>
                  );
                })()}
              </SummarySection>

              <p className="text-xs text-text-light italic">
                We&apos;ll gather your service details and hours during the kickoff call.
              </p>

              {submitError && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 mt-4">
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              )}
            </div>
          )}

          {/* ---- Navigation ---- */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={prev}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Back
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-lg transition-colors shadow-sm"
              >
                Continue
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-1.5 px-8 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm shadow-accent/25"
              >
                {submitting ? "Submitting..." : "Submit"}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared UI helpers                                                 */
/* ------------------------------------------------------------------ */

function inputClass(error?: string) {
  return `w-full text-sm border rounded-lg px-3 py-2.5 transition focus:ring-1 focus:outline-none ${
    error
      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
      : "border-gray-200 focus:border-primary focus:ring-primary/20"
  }`;
}

function Field({
  label,
  sublabel,
  error,
  children,
}: {
  label: string;
  sublabel?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {sublabel && <span className="font-normal text-text-light ml-1">{sublabel}</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function SummarySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-light-bg rounded-xl p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-light mb-2">{title}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-text-light shrink-0">{label}:</span>
      <span className="text-gray-800 font-medium">{value}</span>
    </div>
  );
}

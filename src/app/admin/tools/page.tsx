"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ToolId = "review_request" | "appointment_reminder" | "appointment_confirmation" | "quote" | "after_job_followup";

interface ToolDef {
  id: ToolId;
  title: string;
  description: string;
  icon: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const StarIcon = (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const BellIcon = (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const CheckCircleIcon = (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SparklesIcon = (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const HeartIcon = (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Tool Definitions                                                   */
/* ------------------------------------------------------------------ */

const tools: ToolDef[] = [
  {
    id: "review_request",
    title: "Send Review Request",
    description: "Ask a customer for a Google review via text",
    icon: StarIcon,
  },
  {
    id: "appointment_reminder",
    title: "Appointment Reminder",
    description: "Send a reminder text for an upcoming appointment",
    icon: BellIcon,
  },
  {
    id: "appointment_confirmation",
    title: "Appointment Confirmation",
    description: "Confirm an appointment with date, time, and location",
    icon: CheckCircleIcon,
  },
  {
    id: "quote",
    title: "AI Quick Quote",
    description: "Generate a rough estimate from a job description using AI",
    icon: SparklesIcon,
  },
  {
    id: "after_job_followup",
    title: "After-Job Follow-Up",
    description: "Thank the customer and ask for a review after service",
    icon: HeartIcon,
  },
];

/* ------------------------------------------------------------------ */
/*  SMS Preview Generators                                             */
/* ------------------------------------------------------------------ */

function getReviewRequestPreview(customerName: string, businessName: string, reviewUrl: string): string {
  if (!businessName) return "";
  const lines = [
    `Thanks for choosing ${businessName}! We hope everything went well.`,
    "",
    "If you have a moment, a quick review would mean a lot to us:",
    reviewUrl || "[Google Review URL]",
    "",
    "Reply STOP to opt out of texts.",
  ];
  return lines.join("\n");
}

function getReminderPreview(customerName: string, businessName: string, date: string, time: string): string {
  if (!businessName) return "";
  const lines = [
    `Reminder: You have an appointment with ${businessName} tomorrow.`,
    `Date: ${date || "[Date]"}`,
    `Time: ${time || "[Time]"}`,
    "",
    "Reply CANCEL if you need to reschedule.",
  ];
  return lines.join("\n");
}

function getConfirmationPreview(businessName: string, date: string, time: string, address: string): string {
  if (!businessName) return "";
  const lines = [
    `Your appointment with ${businessName} is confirmed.`,
    `Date: ${date || "[Date]"}`,
    `Time: ${time || "[Time]"}`,
  ];
  if (address) lines.push(`Location: ${address}`);
  lines.push("", "Reply CANCEL to cancel or RESCHEDULE to change your time.");
  return lines.join("\n");
}

function getFollowUpPreview(businessName: string, reviewUrl: string): string {
  if (!businessName) return "";
  const lines = [
    `Thanks for choosing ${businessName}! We hope everything went well.`,
    "",
    "If you have a moment, a quick review would mean a lot:",
    reviewUrl || "[Google Review URL]",
    "",
    "Reply STOP to opt out.",
  ];
  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Spinner                                                            */
/* ------------------------------------------------------------------ */

function Spinner() {
  return (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
}

/* ------------------------------------------------------------------ */
/*  Tool Forms                                                         */
/* ------------------------------------------------------------------ */

function ReviewRequestForm({ onClose }: { onClose: () => void }) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [reviewUrl, setReviewUrl] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const preview = getReviewRequestPreview(customerName, businessName, reviewUrl);
  const canSend = customerName && phone && businessName && reviewUrl && !sending;

  async function handleSend() {
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/admin/api/tools/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: phone,
          type: "review_request",
          data: { businessName, googleReviewUrl: reviewUrl, customerName },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResult({ success: true, message: `Review request sent to ${customerName} at ${phone}` });
      } else {
        setResult({ success: false, message: data.error || "Failed to send" });
      }
    } catch {
      setResult({ success: false, message: "Network error. Check your connection." });
    } finally {
      setSending(false);
    }
  }

  return (
    <ToolFormWrapper title="Send Review Request" onClose={onClose}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Customer Name" value={customerName} onChange={setCustomerName} placeholder="John Smith" />
        <Input label="Phone Number" value={phone} onChange={setPhone} placeholder="+15551234567" />
        <Input label="Business Name" value={businessName} onChange={setBusinessName} placeholder="Smith Plumbing" />
        <Input label="Google Review URL" value={reviewUrl} onChange={setReviewUrl} placeholder="https://g.page/r/..." />
      </div>
      {preview && <SmsPreview text={preview} />}
      <FormActions canSend={!!canSend} sending={sending} onSend={handleSend} label="Send Review Request" />
      {result && <ResultBanner result={result} />}
    </ToolFormWrapper>
  );
}

function AppointmentReminderForm({ onClose }: { onClose: () => void }) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const preview = getReminderPreview(customerName, businessName, date, time);
  const canSend = customerName && phone && businessName && date && time && !sending;

  async function handleSend() {
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/admin/api/tools/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: phone,
          type: "appointment_reminder",
          data: { businessName, date, time, customerName },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResult({ success: true, message: `Reminder sent to ${customerName} at ${phone}` });
      } else {
        setResult({ success: false, message: data.error || "Failed to send" });
      }
    } catch {
      setResult({ success: false, message: "Network error. Check your connection." });
    } finally {
      setSending(false);
    }
  }

  return (
    <ToolFormWrapper title="Appointment Reminder" onClose={onClose}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Customer Name" value={customerName} onChange={setCustomerName} placeholder="John Smith" />
        <Input label="Phone Number" value={phone} onChange={setPhone} placeholder="+15551234567" />
        <Input label="Business Name" value={businessName} onChange={setBusinessName} placeholder="Smith Plumbing" />
        <Input label="Date" value={date} onChange={setDate} placeholder="March 26, 2026" />
        <Input label="Time" value={time} onChange={setTime} placeholder="2:00 PM" />
      </div>
      {preview && <SmsPreview text={preview} />}
      <FormActions canSend={!!canSend} sending={sending} onSend={handleSend} label="Send Reminder" />
      {result && <ResultBanner result={result} />}
    </ToolFormWrapper>
  );
}

function AppointmentConfirmationForm({ onClose }: { onClose: () => void }) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const preview = getConfirmationPreview(businessName, date, time, address);
  const canSend = customerName && phone && businessName && date && time && !sending;

  async function handleSend() {
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/admin/api/tools/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: phone,
          type: "appointment_confirmation",
          data: { businessName, date, time, address: address || undefined, customerName },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResult({ success: true, message: `Confirmation sent to ${customerName} at ${phone}` });
      } else {
        setResult({ success: false, message: data.error || "Failed to send" });
      }
    } catch {
      setResult({ success: false, message: "Network error. Check your connection." });
    } finally {
      setSending(false);
    }
  }

  return (
    <ToolFormWrapper title="Appointment Confirmation" onClose={onClose}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Customer Name" value={customerName} onChange={setCustomerName} placeholder="John Smith" />
        <Input label="Phone Number" value={phone} onChange={setPhone} placeholder="+15551234567" />
        <Input label="Business Name" value={businessName} onChange={setBusinessName} placeholder="Smith Plumbing" />
        <Input label="Date" value={date} onChange={setDate} placeholder="March 26, 2026" />
        <Input label="Time" value={time} onChange={setTime} placeholder="2:00 PM" />
        <Input label="Address (optional)" value={address} onChange={setAddress} placeholder="123 Main St, San Diego" />
      </div>
      {preview && <SmsPreview text={preview} />}
      <FormActions canSend={!!canSend} sending={sending} onSend={handleSend} label="Send Confirmation" />
      {result && <ResultBanner result={result} />}
    </ToolFormWrapper>
  );
}

function QuoteForm({ onClose }: { onClose: () => void }) {
  const [businessName, setBusinessName] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generating, setGenerating] = useState(false);
  const [quote, setQuote] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const canGenerate = businessName && tradeType && jobDescription && !generating;

  async function handleGenerate() {
    setGenerating(true);
    setQuote("");
    setError("");
    try {
      const res = await fetch("/api/tools/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, tradeType, jobDescription }),
      });
      const data = await res.json();
      if (data.quote) {
        setQuote(data.quote);
      } else {
        setError(data.error || "Failed to generate quote");
      }
    } catch {
      setError("Network error. Check your connection.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(quote);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = quote;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const tradeOptions = [
    "Plumbing",
    "HVAC",
    "Electrical",
    "Painting",
    "Roofing",
    "Landscaping",
    "General Contracting",
    "Flooring",
    "Concrete",
    "Fencing",
    "Pest Control",
    "Cleaning",
    "Other",
  ];

  return (
    <ToolFormWrapper title="AI Quick Quote" onClose={onClose}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Business Name" value={businessName} onChange={setBusinessName} placeholder="Smith Plumbing" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Trade Type</label>
          <select
            value={tradeType}
            onChange={(e) => setTradeType(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="">Select trade...</option>
            {tradeOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Customer says: My kitchen faucet is leaking and I need it replaced. Standard single-handle faucet, no special fixtures."
          rows={4}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={!canGenerate}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {generating ? <Spinner /> : SparklesIcon}
        {generating ? "Generating..." : "Generate Quote"}
      </button>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {quote && (
        <div className="space-y-3">
          <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h4 className="text-sm font-semibold text-gray-900">Generated Quote</h4>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700 transition-colors shrink-0"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{quote}</pre>
          </div>
        </div>
      )}
    </ToolFormWrapper>
  );
}

function AfterJobFollowUpForm({ onClose }: { onClose: () => void }) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [reviewUrl, setReviewUrl] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const preview = getFollowUpPreview(businessName, reviewUrl);
  const canSend = customerName && phone && businessName && !sending;

  async function handleSend() {
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/admin/api/tools/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: phone,
          type: "after_job_followup",
          data: { businessName, googleReviewUrl: reviewUrl, customerName },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResult({ success: true, message: `Follow-up sent to ${customerName} at ${phone}` });
      } else {
        setResult({ success: false, message: data.error || "Failed to send" });
      }
    } catch {
      setResult({ success: false, message: "Network error. Check your connection." });
    } finally {
      setSending(false);
    }
  }

  return (
    <ToolFormWrapper title="After-Job Follow-Up" onClose={onClose}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Customer Name" value={customerName} onChange={setCustomerName} placeholder="John Smith" />
        <Input label="Phone Number" value={phone} onChange={setPhone} placeholder="+15551234567" />
        <Input label="Business Name" value={businessName} onChange={setBusinessName} placeholder="Smith Plumbing" />
        <Input label="Google Review URL (optional)" value={reviewUrl} onChange={setReviewUrl} placeholder="https://g.page/r/..." />
      </div>
      {preview && <SmsPreview text={preview} />}
      <FormActions canSend={!!canSend} sending={sending} onSend={handleSend} label="Send Follow-Up" />
      {result && <ResultBanner result={result} />}
    </ToolFormWrapper>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared Components                                                  */
/* ------------------------------------------------------------------ */

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
      />
    </div>
  );
}

function SmsPreview({ text }: { text: string }) {
  return (
    <div className="mt-4">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">SMS Preview</h4>
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{text}</pre>
      </div>
    </div>
  );
}

function FormActions({
  canSend,
  sending,
  onSend,
  label,
}: {
  canSend: boolean;
  sending: boolean;
  onSend: () => void;
  label: string;
}) {
  return (
    <div className="mt-5">
      <button
        onClick={onSend}
        disabled={!canSend}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sending ? <Spinner /> : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        )}
        {sending ? "Sending..." : label}
      </button>
    </div>
  );
}

function ResultBanner({ result }: { result: { success: boolean; message: string } }) {
  return (
    <div
      className={`mt-4 p-4 rounded-lg border ${
        result.success
          ? "bg-green-50 border-green-200"
          : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex items-center gap-2">
        {result.success ? (
          <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        )}
        <p className={`text-sm font-medium ${result.success ? "text-green-800" : "text-red-800"}`}>
          {result.message}
        </p>
      </div>
    </div>
  );
}

function ToolFormWrapper({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);

  function renderForm() {
    switch (activeTool) {
      case "review_request":
        return <ReviewRequestForm onClose={() => setActiveTool(null)} />;
      case "appointment_reminder":
        return <AppointmentReminderForm onClose={() => setActiveTool(null)} />;
      case "appointment_confirmation":
        return <AppointmentConfirmationForm onClose={() => setActiveTool(null)} />;
      case "quote":
        return <QuoteForm onClose={() => setActiveTool(null)} />;
      case "after_job_followup":
        return <AfterJobFollowUpForm onClose={() => setActiveTool(null)} />;
      default:
        return null;
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tools</h1>
        <p className="text-sm text-gray-500 mt-1">
          Quick-action tools for SMS, quotes, and follow-ups. Click a card to get started.
        </p>
      </div>

      {/* Tool Cards Grid */}
      {!activeTool && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:border-accent/40 hover:shadow-md transition-all group"
            >
              <div className="w-11 h-11 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                {tool.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-1">{tool.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{tool.description}</p>
            </button>
          ))}
        </div>
      )}

      {/* Active Tool Form */}
      {activeTool && (
        <div>
          <button
            onClick={() => setActiveTool(null)}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Tools
          </button>
          {renderForm()}
        </div>
      )}
    </div>
  );
}

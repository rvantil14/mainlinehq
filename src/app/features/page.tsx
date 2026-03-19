import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | Mainline",
  description:
    "Every call answered. Every appointment booked. Every invoice sent. See what your AI front office does for your trade business.",
  openGraph: {
    title: "Features | Mainline",
    description:
      "Every call answered. Every appointment booked. Every invoice sent. See what your AI front office does for your trade business.",
    type: "website",
    url: "https://mainlinehq.com/features",
  },
  twitter: {
    card: "summary_large_image",
    title: "Features | Mainline",
    description:
      "Every call answered. Every appointment booked. Every invoice sent. See what your AI front office does for your trade business.",
  },
};

const features: {
  id: string;
  title: string;
  description: string;
  mockup: string;
  comingSoon?: boolean;
}[] = [
  {
    id: "calls",
    title: "No More Missed Calls. Period.",
    description:
      "AI receptionist answers your phone 24/7 with your business name, your services, your pricing. Every lead captured, every customer gets a real conversation.",
    mockup: "phone",
  },
  {
    id: "scheduling",
    title: "Jobs on Your Calendar Without Lifting a Finger",
    description:
      "Customers self-schedule based on your real availability. SMS confirmations and reminders go out automatically. No more phone tag.",
    mockup: "calendar",
  },
  {
    id: "invoicing",
    title: "Get Paid the Same Day the Job's Done",
    description:
      "Invoice generated the second a job is marked complete. Payment link texted to the customer. Most pay within hours, not weeks.",
    mockup: "invoice",
  },
  {
    id: "reviews",
    title: "Your Google Reviews Go Up on Autopilot",
    description:
      "Review request sent after every job. AI drafts responses to all reviews. Your online reputation grows without you lifting a finger.",
    mockup: "review",
  },
  {
    id: "leads",
    title: "Stop Losing Customers to Faster Competitors",
    description:
      "Every inquiry tracked from first contact to closed job. Automated follow-ups for cold leads. Maintenance reminders bring past customers back.",
    mockup: "pipeline",
  },
  {
    id: "dashboard",
    title: "Know Exactly Where Your Business Stands",
    description:
      "Leads, appointments, invoices, and revenue, all in one place. Monthly performance reports delivered to your inbox.",
    mockup: "dashboard",
  },
  {
    id: "estimates",
    title: "Instant Estimates, Your Way",
    description:
      "Customer describes the job through chat or phone. AI generates a rough estimate based on YOUR pricing matrix. You review on your phone, adjust if needed, approve with one tap. Customers get a professional PDF in minutes, not days.",
    mockup: "estimate",
  },
  {
    id: "contracts",
    title: "Contracts & Proposals in Seconds",
    description:
      "AI drafts a professional proposal from the job details: scope of work, materials, timeline, payment terms. You review and edit before sending. Customer signs digitally. A 45-minute task becomes a 2-minute review.",
    mockup: "contract",
  },
  {
    id: "codes",
    title: "Building Code & Spec Assistant",
    description:
      "Ask building code questions in plain English. Upload spec books and get instant summaries. Jurisdiction-specific answers for your area, in seconds.",
    mockup: "codes",
    comingSoon: true,
  },
];

const differentiators = [
  {
    title: "We set it up. You don't learn new software.",
    description:
      "No tutorials, no onboarding videos, no figuring it out on weekends. We configure everything and hand you a system that works on day one.",
  },
  {
    title: "Trained on YOUR business. Not a generic bot.",
    description:
      "Your services, your pricing, your service area, your FAQ. The AI sounds like someone who actually works for you because we train it that way.",
  },
  {
    title: "Built specifically for the trades. We know your world.",
    description:
      "We work with trade businesses across the country. Plumbers, HVAC techs, electricians, painters. We understand the industry, the customers, and what works.",
  },
  {
    title: "Month-to-month. No contracts. Cancel anytime.",
    description:
      "We earn your business every month. If we're not delivering, you walk. No cancellation fees, no annual commitments, no games.",
  },
  {
    title: "AI assists, you decide.",
    description:
      "Nothing goes out without your approval. We draft, you review. Your customers still get the personal touch, just faster.",
  },
];

function FeatureMockup({ type }: { type: string }) {
  const mockups: Record<string, React.ReactNode> = {
    phone: (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 max-w-[340px] mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Incoming Call</p>
            <p className="text-xs text-gray-400">(805) 555-0142</p>
          </div>
          <div className="ml-auto">
            <span className="inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">AI Answered</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 space-y-2.5">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-[8px] font-bold">AI</span>
            </div>
            <p className="text-xs text-gray-700">&quot;Thanks for calling Smith Plumbing, how can I help you today?&quot;</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-[8px] font-bold">C</span>
            </div>
            <p className="text-xs text-gray-700">&quot;I&apos;ve got a burst pipe in my garage, I need someone out here today.&quot;</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-[8px] font-bold">AI</span>
            </div>
            <p className="text-xs text-gray-700">&quot;I&apos;m marking this as urgent. Let me get you booked for the next available slot this afternoon.&quot;</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1 text-accent font-medium">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            Lead captured
          </span>
          <span className="text-gray-300">|</span>
          <span className="inline-flex items-center gap-1 text-accent font-medium">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            Appointment booked
          </span>
        </div>
      </div>
    ),
    calendar: (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 max-w-[340px] mx-auto">
        <p className="text-sm font-semibold text-gray-900 mb-3">Select a Time</p>
        <div className="grid grid-cols-7 gap-1 text-center mb-3">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className="text-[10px] text-gray-400 font-medium">{d}</span>
          ))}
          {Array.from({ length: 14 }, (_, i) => i + 10).map((d) => (
            <div
              key={d}
              className={`text-[11px] py-1 rounded-md ${
                d === 15
                  ? "bg-accent text-white font-semibold"
                  : d === 13 || d === 20
                  ? "text-gray-300"
                  : "text-gray-700"
              }`}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          {["9:00 AM", "11:30 AM", "2:00 PM"].map((t, i) => (
            <div
              key={t}
              className={`text-xs px-3 py-2 rounded-lg border ${
                i === 1
                  ? "border-accent bg-accent/5 text-accent font-medium"
                  : "border-gray-100 text-gray-600"
              }`}
            >
              {t} {i === 1 && "- Selected"}
            </div>
          ))}
        </div>
        <div className="mt-3 bg-accent text-white text-xs font-semibold text-center py-2.5 rounded-lg">
          Confirm Booking
        </div>
        <div className="mt-2 flex items-center gap-1.5 justify-center">
          <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          <p className="text-[10px] text-gray-400">SMS confirmation sent automatically</p>
        </div>
      </div>
    ),
    invoice: (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 max-w-[340px] mx-auto">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-900">Invoice #1042</p>
          <span className="text-[10px] font-medium bg-success/10 text-success px-2 py-0.5 rounded-full">Paid</span>
        </div>
        <div className="border border-gray-100 rounded-lg divide-y divide-gray-50">
          <div className="flex justify-between px-3 py-2">
            <span className="text-xs text-gray-500">Kitchen faucet repair</span>
            <span className="text-xs text-gray-900 font-medium">$150.00</span>
          </div>
          <div className="flex justify-between px-3 py-2">
            <span className="text-xs text-gray-500">Parts - Moen cartridge</span>
            <span className="text-xs text-gray-900 font-medium">$28.00</span>
          </div>
          <div className="flex justify-between px-3 py-2 bg-gray-50">
            <span className="text-xs text-gray-900 font-semibold">Total</span>
            <span className="text-xs text-gray-900 font-semibold">$178.00</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 bg-success/5 rounded-lg px-3 py-2">
          <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[11px] text-success">Paid via text link - 4 minutes after job complete</p>
        </div>
      </div>
    ),
    review: (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 max-w-[340px] mx-auto">
        <div className="bg-gray-50 rounded-xl p-3 mb-3">
          <div className="flex items-center gap-1 mb-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">5.0</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">&quot;John came out same day and fixed our water heater. Fair price, great work. Highly recommend Smith Plumbing!&quot;</p>
          <p className="text-[10px] text-gray-400 mt-1">- Sarah M., 2 hours ago on Google</p>
        </div>
        <div className="border border-gray-100 rounded-xl p-3">
          <p className="text-[10px] text-gray-400 mb-1.5 font-medium uppercase tracking-wide">AI-Drafted Response</p>
          <p className="text-xs text-gray-700 leading-relaxed">&quot;Thank you Sarah! We&apos;re glad John could get your water heater fixed quickly. We appreciate you trusting Smith Plumbing.&quot;</p>
          <div className="flex gap-2 mt-2.5">
            <div className="bg-accent text-white text-[10px] font-medium rounded-full px-3 py-1.5">Post Response</div>
            <div className="bg-gray-100 text-gray-600 text-[10px] font-medium rounded-full px-3 py-1.5">Edit</div>
          </div>
        </div>
      </div>
    ),
    pipeline: (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 max-w-[340px] mx-auto">
        <p className="text-sm font-semibold text-gray-900 mb-3">Lead Pipeline</p>
        <div className="flex gap-1.5 mb-3">
          {[
            { label: "New", count: 5, color: "bg-blue-500" },
            { label: "Quoted", count: 3, color: "bg-yellow-500" },
            { label: "Scheduled", count: 4, color: "bg-accent" },
            { label: "Done", count: 12, color: "bg-success" },
          ].map((s) => (
            <div key={s.label} className="flex-1 text-center">
              <div className={`h-1.5 rounded-full ${s.color} mb-1`} />
              <p className="text-[10px] text-gray-500">{s.label}</p>
              <p className="text-sm font-semibold text-gray-900">{s.count}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[
            { name: "Mike R.", service: "AC Repair", status: "New Lead", time: "12m ago", dot: "bg-blue-500" },
            { name: "Sarah L.", service: "Faucet Install", status: "Quote Sent", time: "2h ago", dot: "bg-yellow-500" },
            { name: "Tom K.", service: "Panel Upgrade", status: "Scheduled", time: "Tomorrow", dot: "bg-accent" },
          ].map((l) => (
            <div key={l.name} className="flex items-center gap-2.5 border border-gray-50 rounded-lg px-3 py-2">
              <div className={`w-2 h-2 rounded-full ${l.dot} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900">{l.name} <span className="text-gray-400 font-normal">- {l.service}</span></p>
                <p className="text-[10px] text-gray-400">{l.status} &middot; {l.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 border-t border-gray-100 pt-2.5">
          <p className="text-[10px] text-gray-400">Auto follow-up sent to 2 cold leads today</p>
        </div>
      </div>
    ),
    dashboard: (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 max-w-[340px] mx-auto">
        <p className="text-sm font-semibold text-gray-900 mb-3">March Overview</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: "New Leads", value: "24", change: "+18%" },
            { label: "Jobs Completed", value: "16", change: "+12%" },
            { label: "Revenue", value: "$14,200", change: "+22%" },
            { label: "Avg Rating", value: "4.9", change: "+0.2" },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-50 rounded-lg p-3">
              <p className="text-[10px] text-gray-400">{stat.label}</p>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              <p className="text-[10px] text-success font-medium">{stat.change} vs last month</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-primary/5 rounded-lg px-3 py-2">
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <p className="text-[11px] text-primary">Monthly report emailed Mar 1</p>
        </div>
      </div>
    ),
  };

  const fallback = (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 max-w-[340px] mx-auto">
      <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center min-h-[200px]">
        <p className="text-sm text-gray-400 text-center">Feature preview coming soon</p>
      </div>
    </div>
  );

  mockups["estimate"] = (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 max-w-[340px] mx-auto">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-900">Estimate #247</p>
        <span className="text-[10px] font-medium bg-yellow-500/10 text-yellow-600 px-2 py-0.5 rounded-full">Pending Review</span>
      </div>
      <div className="bg-gray-50 rounded-xl p-3 mb-3 space-y-2">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-white text-[8px] font-bold">C</span>
          </div>
          <p className="text-xs text-gray-700">&quot;I need a 40-gallon water heater replaced in my garage. Gas line is already there.&quot;</p>
        </div>
      </div>
      <div className="border border-gray-100 rounded-lg divide-y divide-gray-50">
        <div className="flex justify-between px-3 py-2">
          <span className="text-xs text-gray-500">40-gal gas water heater</span>
          <span className="text-xs text-gray-900 font-medium">$1,100.00</span>
        </div>
        <div className="flex justify-between px-3 py-2">
          <span className="text-xs text-gray-500">Labor (3 hrs)</span>
          <span className="text-xs text-gray-900 font-medium">$450.00</span>
        </div>
        <div className="flex justify-between px-3 py-2">
          <span className="text-xs text-gray-500">Disposal &amp; permit</span>
          <span className="text-xs text-gray-900 font-medium">$150.00</span>
        </div>
        <div className="flex justify-between px-3 py-2 bg-gray-50">
          <span className="text-xs text-gray-900 font-semibold">Estimate Total</span>
          <span className="text-xs text-gray-900 font-semibold">$1,700.00</span>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <div className="flex-1 bg-accent text-white text-[11px] font-semibold text-center py-2.5 rounded-lg">Approve &amp; Send</div>
        <div className="flex-1 bg-gray-100 text-gray-600 text-[11px] font-semibold text-center py-2.5 rounded-lg">Edit</div>
      </div>
    </div>
  );

  mockups["contract"] = (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 max-w-[340px] mx-auto">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-900">Proposal</p>
        <span className="text-[10px] font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-full">Ready to Send</span>
      </div>
      <div className="border border-gray-100 rounded-lg p-3 space-y-2.5 mb-3">
        <div>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Scope of Work</p>
          <p className="text-xs text-gray-700 mt-0.5">Remove &amp; replace 40-gal gas water heater. Includes permit, disposal, and code-compliant installation.</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Timeline</p>
          <p className="text-xs text-gray-700 mt-0.5">1 day, scheduled March 22, 2026</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Payment Terms</p>
          <p className="text-xs text-gray-700 mt-0.5">50% deposit, 50% on completion</p>
        </div>
      </div>
      <div className="flex justify-between items-center border border-gray-100 rounded-lg px-3 py-2.5 mb-3 bg-gray-50">
        <span className="text-xs text-gray-900 font-semibold">Total</span>
        <span className="text-sm text-gray-900 font-bold">$1,700.00</span>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 bg-accent text-white text-[11px] font-semibold text-center py-2.5 rounded-lg">Send for Signature</div>
        <div className="flex-1 bg-gray-100 text-gray-600 text-[11px] font-semibold text-center py-2.5 rounded-lg">Edit</div>
      </div>
    </div>
  );

  mockups["codes"] = (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 max-w-[340px] mx-auto">
      <div className="flex items-center gap-2 mb-3">
        <p className="text-sm font-semibold text-gray-900">Code Assistant</p>
        <span className="text-[9px] font-bold bg-accent/10 text-accent px-2 py-0.5 rounded-full uppercase tracking-wide">Coming Soon</span>
      </div>
      <div className="bg-gray-50 rounded-xl p-3 space-y-2.5">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-white text-[8px] font-bold">Y</span>
          </div>
          <p className="text-xs text-gray-700">&quot;What size waterline do I need for a 3-bath house?&quot;</p>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-white text-[8px] font-bold">AI</span>
          </div>
          <div>
            <p className="text-xs text-gray-700">Per UPC, a 3-bath residence requires a minimum <span className="font-semibold">1-inch</span> main water supply line.</p>
            <p className="text-[10px] text-gray-400 mt-1">Source: CA Plumbing Code Table 610.4</p>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 bg-primary/5 rounded-lg px-3 py-2">
        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <p className="text-[11px] text-primary">Upload specs for instant summaries</p>
      </div>
    </div>
  );

  return <>{mockups[type] || fallback}</>;
}

export default function FeaturesPage() {
  return (
    <div className="bg-light-bg">
      {/* Hero */}
      <section className="bg-dark text-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Everything Your Front Office{" "}
            <span className="text-accent">Should Be Doing</span>{" "}
            (But Isn&apos;t)
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Calls answered. Jobs booked. Invoices sent. Estimates drafted.
            You focus on the work, we handle the rest.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white bg-accent hover:bg-accent-hover rounded-lg transition-colors shadow-lg shadow-accent/25"
            >
              See It In Action
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-gray-300 border border-white/20 hover:bg-white/5 rounded-lg transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <div>
        {features.map((feature, index) => {
          const isReversed = index % 2 === 1;
          const bgClass = index % 2 === 0 ? "bg-light-bg" : "bg-white";
          return (
            <section
              key={feature.id}
              id={feature.id}
              className={`${bgClass} py-20 sm:py-28`}
            >
              <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col ${
                isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-10 lg:gap-16`}>
              {/* Text */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {feature.comingSoon && (
                    <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight mb-4">
                  {feature.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Mockup */}
              <div className="flex-1 w-full flex justify-center">
                <div className="w-full max-w-sm">
                  <div className="rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
                    <FeatureMockup type={feature.mockup} />
                  </div>
                </div>
              </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* How We're Different */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              How We&apos;re Different
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Other companies sell you software and wish you luck. We build
              your system, run it, and make sure it works.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 border-t-4 border-t-accent bg-white p-8 hover:border-accent/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-lg font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            See it in action
          </h2>
          <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
            Book a live demo. We&apos;ll walk you through exactly how your AI
            front office would work for your specific business.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-accent hover:bg-accent-hover rounded-lg transition-colors shadow-lg shadow-accent/30"
          >
            See It In Action
          </Link>
        </div>
      </section>
    </div>
  );
}

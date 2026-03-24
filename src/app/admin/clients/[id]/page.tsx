"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import type {
  ClientRow,
  BusinessType,
  ClientPackage,
  ClientStatus,
  AiConfig,
} from "@/lib/database.types";

const BUSINESS_TYPES: { value: BusinessType; label: string }[] = [
  { value: "plumbing", label: "Plumbing" },
  { value: "hvac", label: "HVAC" },
  { value: "electrical", label: "Electrical" },
  { value: "painting", label: "Painting" },
  { value: "roofing", label: "Roofing" },
  { value: "landscaping", label: "Landscaping" },
  { value: "general_contracting", label: "General Contracting" },
  { value: "other", label: "Other" },
];

const PACKAGES: { value: ClientPackage; label: string; desc: string }[] = [
  { value: "starter", label: "Starter", desc: "$297/mo" },
  { value: "growth", label: "Growth", desc: "$797/mo" },
  { value: "pro", label: "Pro", desc: "$1,497/mo" },
];

const STATUS_OPTIONS: { value: ClientStatus; label: string; color: string }[] = [
  { value: "onboarding", label: "Onboarding", color: "bg-yellow-100 text-yellow-800" },
  { value: "active", label: "Active", color: "bg-green-100 text-green-800" },
  { value: "churned", label: "Churned", color: "bg-red-100 text-red-800" },
];

const INPUT_CLASS =
  "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent";

const LABEL_CLASS = "block text-sm font-medium text-gray-700 mb-1.5";

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [client, setClient] = useState<ClientRow | null>(null);
  const [counts, setCounts] = useState({ leads: 0, appointments: 0, conversations: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form fields
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessType, setBusinessType] = useState<BusinessType>("plumbing");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [clientPackage, setClientPackage] = useState<ClientPackage>("starter");
  const [status, setStatus] = useState<ClientStatus>("onboarding");

  // AI config
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [hours, setHours] = useState("");
  const [faqs, setFaqs] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    async function fetchClient() {
      try {
        const res = await fetch(`/admin/api/clients/${id}`);
        if (res.status === 401) {
          router.push("/admin");
          return;
        }
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        const c: ClientRow = data.client;
        setClient(c);
        setCounts(data.counts);

        // Populate form
        setBusinessName(c.business_name);
        setOwnerName(c.owner_name);
        setBusinessType(c.business_type);
        setPhone(c.phone || "");
        setEmail(c.email);
        setWebsite(c.website || "");
        setCity(c.city || "");
        setState(c.state || "");
        setClientPackage(c.package);
        setStatus(c.status);

        // Populate AI config
        const cfg: AiConfig = c.ai_config || {};
        setDescription((cfg.description as string) || "");
        setServices(
          cfg.services
            ? cfg.services.map((s) => s.name).join("\n")
            : ""
        );
        setServiceArea(
          cfg.serviceArea?.cities ? cfg.serviceArea.cities.join(", ") : ""
        );
        setHours(
          cfg.businessHours
            ? typeof cfg.businessHours === "object" && "note" in cfg.businessHours
              ? String((cfg.businessHours as unknown as Record<string, unknown>).note || "")
              : JSON.stringify(cfg.businessHours)
            : ""
        );
        setFaqs(
          cfg.faqs
            ? cfg.faqs.map((f) => `${f.question}|${f.answer}`).join("\n")
            : ""
        );
        setGreeting((cfg.greeting as string) || "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load client");
      } finally {
        setLoading(false);
      }
    }
    fetchClient();
  }, [id, router]);

  function buildAiConfig() {
    const parsedServices = services
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({ name, description: "" }));

    const parsedFaqs = faqs
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split("|");
        return {
          question: (parts[0] || "").trim(),
          answer: (parts[1] || "").trim(),
        };
      })
      .filter((f) => f.question && f.answer);

    return {
      description: description || undefined,
      services: parsedServices.length > 0 ? parsedServices : undefined,
      serviceArea: serviceArea
        ? { cities: serviceArea.split(",").map((c) => c.trim()).filter(Boolean) }
        : undefined,
      businessHours: hours ? { note: hours } : undefined,
      faqs: parsedFaqs.length > 0 ? parsedFaqs : undefined,
      greeting: greeting || undefined,
    };
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const aiConfig = buildAiConfig();
      const res = await fetch(`/admin/api/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: businessName,
          owner_name: ownerName,
          business_type: businessType,
          phone,
          email,
          website,
          city,
          state,
          package: clientPackage,
          status,
          ai_config: aiConfig,
        }),
      });

      if (res.status === 401) {
        router.push("/admin");
        return;
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setClient(data.client);
      setSuccess("Client saved successfully.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save client");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading client...</p>
      </div>
    );
  }

  if (!client && error) {
    return (
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
          <button
            onClick={() => router.push("/admin/clients")}
            className="text-gray-500 hover:text-white text-sm mt-4 inline-block"
          >
            &larr; Back to Clients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push("/admin/clients")}
          className="text-gray-500 hover:text-white text-sm mb-6 inline-block transition-colors"
        >
          &larr; Back to Clients
        </button>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">{client?.business_name}</h1>
            <p className="text-gray-500 mt-1">
              Client ID: {id.slice(0, 8)}...
            </p>
          </div>
          <a
            href={`/demo?client=${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-50 border border-gray-200 hover:bg-gray-100 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View Chatbot
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{counts.leads}</div>
            <div className="text-xs text-gray-500 mt-1">Leads</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{counts.appointments}</div>
            <div className="text-xs text-gray-500 mt-1">Appointments</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{counts.conversations}</div>
            <div className="text-xs text-gray-500 mt-1">Conversations</div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/30 border border-green-700 text-green-300 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-10">
          {/* Status Toggle */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Status</h2>
            <div className="flex gap-3">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    status === opt.value
                      ? `${opt.color} border-transparent`
                      : "border-gray-700 bg-white text-gray-500 hover:border-gray-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* Basic Info */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-200">
              Business Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={LABEL_CLASS}>Business Name *</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Owner Name *</label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Business Type *</label>
                <select
                  required
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                  className={INPUT_CLASS}
                >
                  {BUSINESS_TYPES.map((bt) => (
                    <option key={bt.value} value={bt.value}>
                      {bt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={LABEL_CLASS}>Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={INPUT_CLASS}
                  maxLength={2}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className={LABEL_CLASS}>Package</label>
              <div className="grid grid-cols-3 gap-3">
                {PACKAGES.map((pkg) => (
                  <button
                    key={pkg.value}
                    type="button"
                    onClick={() => setClientPackage(pkg.value)}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      clientPackage === pkg.value
                        ? "border-orange-600 bg-orange-600/10 text-orange-400"
                        : "border-gray-700 bg-white text-gray-600 hover:border-gray-600"
                    }`}
                  >
                    <div className="font-medium">{pkg.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{pkg.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* AI Config */}
          <section>
            <h2 className="text-lg font-semibold mb-1 text-gray-200">
              AI Configuration
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Powers the chatbot and AI assistant for this client.
            </p>

            <div className="space-y-4">
              <div>
                <label className={LABEL_CLASS}>Business Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={INPUT_CLASS}
                  rows={3}
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Services Offered (one per line)</label>
                <textarea
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                  className={INPUT_CLASS}
                  rows={4}
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Service Area</label>
                <input
                  type="text"
                  value={serviceArea}
                  onChange={(e) => setServiceArea(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Comma-separated cities"
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Business Hours</label>
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>
                  Common FAQs (question|answer format, one per line)
                </label>
                <textarea
                  value={faqs}
                  onChange={(e) => setFaqs(e.target.value)}
                  className={INPUT_CLASS}
                  rows={4}
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Greeting Message</label>
                <textarea
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  className={INPUT_CLASS}
                  rows={2}
                />
              </div>
            </div>
          </section>

          <div className="flex items-center gap-4 pt-2 pb-8">
            <button
              type="submit"
              disabled={saving}
              className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/clients")}
              className="text-gray-500 hover:text-white px-4 py-2.5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Embed Code */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Chat Widget Embed Code</h2>
          <p className="text-sm text-gray-500 mb-4">Add this script to the client&apos;s website to enable the AI chatbot.</p>
          <div className="relative">
            <pre className="bg-gray-900 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">
{`<script>
  window.MAINLINE_CLIENT_ID = "${id}";
</script>
<script src="https://mainlinehq.com/embed/chat.js" defer></script>`}
            </pre>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(
                  `<script>\n  window.MAINLINE_CLIENT_ID = "${id}";\n</script>\n<script src="https://mainlinehq.com/embed/chat.js" defer></script>`
                );
                setSuccess("Embed code copied!");
                setTimeout(() => setSuccess(""), 2000);
              }}
              className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-md transition-colors"
            >
              Copy
            </button>
          </div>
        </section>

        {/* Quick Links */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={`/admin/leads?client_id=${id}`}
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859" />
              </svg>
              View Leads ({counts.leads})
            </a>
            <a
              href={`/admin/conversations?client_id=${id}`}
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242" />
              </svg>
              View Conversations ({counts.conversations})
            </a>
            <a
              href={`/demo?client=${id}`}
              target="_blank"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm px-4 py-2.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              Test Chatbot
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

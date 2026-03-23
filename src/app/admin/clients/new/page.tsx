"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BusinessType, ClientPackage } from "@/lib/database.types";

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

const INPUT_CLASS =
  "w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent";

const LABEL_CLASS = "block text-sm font-medium text-gray-300 mb-1.5";

export default function NewClientPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Basic info
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessType, setBusinessType] = useState<BusinessType>("plumbing");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [clientPackage, setClientPackage] = useState<ClientPackage>("starter");

  // AI config
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [hours, setHours] = useState("");
  const [faqs, setFaqs] = useState("");
  const [greeting, setGreeting] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const aiConfig = buildAiConfig();

      const res = await fetch("/admin/api/clients", {
        method: "POST",
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
          ai_config: aiConfig,
        }),
      });

      if (res.status === 401) {
        router.push("/admin");
        return;
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      router.push("/admin/clients");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create client");
    } finally {
      setSaving(false);
    }
  }

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

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push("/admin/clients")}
          className="text-gray-400 hover:text-white text-sm mb-6 inline-block transition-colors"
        >
          &larr; Back to Clients
        </button>

        <h1 className="text-2xl font-bold mb-8">Add New Client</h1>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
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
                  placeholder="ABC Plumbing"
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
                  placeholder="John Smith"
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
                  placeholder="(555) 123-4567"
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
                  placeholder="john@abcplumbing.com"
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="https://abcplumbing.com"
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="San Diego"
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="CA"
                  maxLength={2}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className={LABEL_CLASS}>Package *</label>
              <div className="grid grid-cols-3 gap-3">
                {PACKAGES.map((pkg) => (
                  <button
                    key={pkg.value}
                    type="button"
                    onClick={() => setClientPackage(pkg.value)}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      clientPackage === pkg.value
                        ? "border-orange-600 bg-orange-600/10 text-orange-400"
                        : "border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-600"
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
              This powers the chatbot and AI assistant for this client.
            </p>

            <div className="space-y-4">
              <div>
                <label className={LABEL_CLASS}>Business Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={INPUT_CLASS}
                  rows={3}
                  placeholder="Family-owned plumbing company serving San Diego since 2005. Licensed, bonded, insured."
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Services Offered (one per line)</label>
                <textarea
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                  className={INPUT_CLASS}
                  rows={4}
                  placeholder={"Drain cleaning\nWater heater repair\nPipe repair\nToilet installation"}
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Service Area</label>
                <input
                  type="text"
                  value={serviceArea}
                  onChange={(e) => setServiceArea(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="San Diego, La Jolla, Chula Vista, El Cajon"
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Business Hours</label>
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Mon-Fri 7am-6pm, Sat 8am-2pm, Emergency 24/7"
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
                  placeholder={"Do you offer free estimates?|Yes, all estimates are free.\nWhat areas do you serve?|We serve all of San Diego county."}
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Greeting Message</label>
                <textarea
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  className={INPUT_CLASS}
                  rows={2}
                  placeholder="Hi there! Thanks for reaching out to ABC Plumbing. How can we help you today?"
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
              {saving ? "Creating..." : "Create Client"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/clients")}
              className="text-gray-400 hover:text-white px-4 py-2.5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

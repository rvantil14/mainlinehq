"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TRADE_TYPES = [
  "Plumbing",
  "HVAC",
  "Electrical",
  "Painting",
  "Roofing",
  "Landscaping",
  "General Contracting",
  "Other",
];

const INPUT_CLASS =
  "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent";

const LABEL_CLASS = "block text-sm font-medium text-gray-700 mb-1.5";

export default function NewProspectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("CA");
  const [googleReviews, setGoogleReviews] = useState("");
  const [hasChatWidget, setHasChatWidget] = useState(false);
  const [hasWebsite, setHasWebsite] = useState(true);
  const [notes, setNotes] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/admin/api/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: businessName,
          owner_name: ownerName || undefined,
          trade_type: tradeType || undefined,
          phone: phone || undefined,
          email: email || undefined,
          website: website || undefined,
          city: city || undefined,
          state: state || undefined,
          google_reviews: googleReviews ? parseInt(googleReviews, 10) : undefined,
          has_chat_widget: hasChatWidget,
          has_website: hasWebsite,
          notes: notes || undefined,
        }),
      });

      if (res.status === 401) {
        router.push("/admin");
        return;
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      router.push("/admin/prospects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create prospect");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push("/admin/prospects")}
          className="text-gray-500 hover:text-gray-700 text-sm mb-6 inline-block transition-colors"
        >
          &larr; Back to Prospects
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Add New Prospect
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
                <label className={LABEL_CLASS}>Owner Name</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Trade Type</label>
                <select
                  value={tradeType}
                  onChange={(e) => setTradeType(e.target.value)}
                  className={INPUT_CLASS}
                >
                  <option value="">Select trade...</option>
                  {TRADE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
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
                <label className={LABEL_CLASS}>Email</label>
                <input
                  type="email"
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
              <div>
                <label className={LABEL_CLASS}>Google Reviews Count</label>
                <input
                  type="number"
                  value={googleReviews}
                  onChange={(e) => setGoogleReviews(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div className="mt-4 flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasWebsite}
                  onChange={(e) => setHasWebsite(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm text-gray-700">Has Website</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasChatWidget}
                  onChange={(e) => setHasChatWidget(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm text-gray-700">Has Chat Widget</span>
              </label>
            </div>
          </section>

          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={INPUT_CLASS}
              rows={4}
              placeholder="Research notes, observations about their current setup, pain points..."
            />
          </section>

          <div className="flex items-center gap-4 pt-2 pb-8">
            <button
              type="submit"
              disabled={saving}
              className="bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              {saving ? "Creating..." : "Add Prospect"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/prospects")}
              className="text-gray-500 hover:text-gray-700 px-4 py-2.5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

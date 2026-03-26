"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { ProspectRow, ProspectStatus } from "@/lib/database.types";

const STATUS_COLORS: Record<ProspectStatus, string> = {
  researched: "bg-gray-100 text-gray-700",
  contacted: "bg-blue-100 text-blue-800",
  demo_scheduled: "bg-yellow-100 text-yellow-800",
  demo_done: "bg-purple-100 text-purple-800",
  negotiating: "bg-orange-100 text-orange-800",
  won: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
};

const STATUS_LABELS: Record<ProspectStatus, string> = {
  researched: "Researched",
  contacted: "Contacted",
  demo_scheduled: "Demo Scheduled",
  demo_done: "Demo Done",
  negotiating: "Negotiating",
  won: "Won",
  lost: "Lost",
};

const ALL_STATUSES: ProspectStatus[] = [
  "researched",
  "contacted",
  "demo_scheduled",
  "demo_done",
  "negotiating",
  "won",
  "lost",
];

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

const TRADE_COLORS: Record<string, string> = {
  plumbing: "bg-blue-100 text-blue-800",
  hvac: "bg-orange-100 text-orange-800",
  electrical: "bg-yellow-100 text-yellow-800",
  painting: "bg-purple-100 text-purple-800",
  roofing: "bg-red-100 text-red-800",
  landscaping: "bg-green-100 text-green-800",
  "general contracting": "bg-gray-200 text-gray-700",
  other: "bg-gray-200 text-gray-700",
};

function getTradeColor(trade: string | null): string {
  if (!trade) return "bg-gray-200 text-gray-700";
  return TRADE_COLORS[trade.toLowerCase()] || "bg-gray-200 text-gray-700";
}

function capitalizeTrade(trade: string | null): string {
  if (!trade) return "";
  if (trade.toLowerCase() === "hvac") return "HVAC";
  return trade
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function isOverdue(dateStr: string | null): boolean {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

function shortDomain(url: string | null): string {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
}

export default function ProspectsPage() {
  const router = useRouter();
  const [prospects, setProspects] = useState<ProspectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterTrade, setFilterTrade] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editForms, setEditForms] = useState<Record<string, Partial<ProspectRow>>>({});
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProspects = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.set("status", filterStatus);
      if (filterCity) params.set("city", filterCity);
      if (filterTrade) params.set("trade_type", filterTrade);

      const url = `/admin/api/prospects${params.toString() ? `?${params}` : ""}`;
      const res = await fetch(url);
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setProspects(data.prospects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load prospects");
    } finally {
      setLoading(false);
    }
  }, [router, filterStatus, filterCity, filterTrade]);

  useEffect(() => {
    fetchProspects();
  }, [fetchProspects]);

  function initEditForm(prospect: ProspectRow) {
    setEditForms((prev) => ({
      ...prev,
      [prospect.id]: {
        business_name: prospect.business_name,
        owner_name: prospect.owner_name,
        trade_type: prospect.trade_type,
        phone: prospect.phone,
        email: prospect.email,
        website: prospect.website,
        city: prospect.city,
        state: prospect.state,
        google_reviews: prospect.google_reviews,
        has_chat_widget: prospect.has_chat_widget,
        has_website: prospect.has_website,
        next_follow_up_at: prospect.next_follow_up_at,
        notes: prospect.notes,
        status: prospect.status,
      },
    }));
  }

  function updateField(id: string, field: string, value: unknown) {
    setEditForms((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  }

  async function saveProspect(id: string) {
    setUpdating(id);
    try {
      const form = editForms[id];
      if (!form) return;
      const prospect = prospects.find((p) => p.id === id);
      if (!prospect) return;

      const res = await fetch(`/admin/api/prospects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...prospect, ...form }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setProspects((prev) =>
        prev.map((p) => (p.id === id ? data.prospect : p))
      );
      setExpandedId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setUpdating(null);
    }
  }

  async function quickStatusUpdate(id: string, status: ProspectStatus) {
    setUpdating(id);
    try {
      const body: Record<string, unknown> = { status };
      if (status === "contacted") {
        body.last_contacted_at = new Date().toISOString();
      }
      const res = await fetch(`/admin/api/prospects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setProspects((prev) =>
        prev.map((p) => (p.id === id ? data.prospect : p))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setUpdating(null);
    }
  }

  async function deleteProspect(id: string) {
    if (!confirm("Delete this prospect? This cannot be undone.")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/admin/api/prospects/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setProspects((prev) => prev.filter((p) => p.id !== id));
      setExpandedId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleting(null);
    }
  }

  const filtered = prospects.filter((p) =>
    p.business_name.toLowerCase().includes(search.toLowerCase())
  );

  const statusCounts: Record<string, number> = {};
  for (const s of ALL_STATUSES) {
    statusCounts[s] = prospects.filter((p) => p.status === s).length;
  }

  const cities = Array.from(
    new Set(prospects.map((p) => p.city).filter(Boolean))
  ).sort() as string[];

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Prospects</h1>
            <p className="text-gray-500 mt-1">
              {prospects.length} total prospect{prospects.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/prospects/new")}
            className="bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
          >
            + Add Prospect
          </button>
        </div>

        {/* Status summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(filterStatus === s ? "" : s)}
              className={`rounded-xl border p-3 text-center transition-all ${
                filterStatus === s
                  ? "border-accent bg-accent/5 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className="text-2xl font-bold text-gray-900">
                {statusCounts[s] || 0}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {STATUS_LABELS[s]}
              </div>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by business name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={filterTrade}
            onChange={(e) => setFilterTrade(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">All Trades</option>
            {TRADE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {(filterStatus || filterCity || filterTrade) && (
            <button
              onClick={() => {
                setFilterStatus("");
                setFilterCity("");
                setFilterTrade("");
              }}
              className="text-gray-500 hover:text-gray-700 text-sm px-3 py-2.5 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              className="text-red-400 hover:text-red-600 ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {loading && (
          <div className="text-gray-400 text-center py-24 text-lg">
            Loading prospects...
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              {search || filterStatus || filterCity || filterTrade
                ? "No prospects match your filters"
                : "No prospects yet"}
            </h3>
            <p className="text-gray-400 text-sm">
              {search || filterStatus || filterCity || filterTrade
                ? "Try adjusting your search or filters."
                : "Add your first prospect to get started."}
            </p>
          </div>
        )}

        {/* Prospect cards */}
        {!loading && filtered.length > 0 && (
          <div className="flex flex-col gap-4">
            {filtered.map((prospect) => {
              const isExpanded = expandedId === prospect.id;
              const form = editForms[prospect.id] || {};
              const overdue = isOverdue(prospect.next_follow_up_at);

              return (
                <div
                  key={prospect.id}
                  className={`bg-white rounded-xl border transition-all ${
                    isExpanded
                      ? "border-accent/30 shadow-md"
                      : "border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300"
                  }`}
                >
                  {/* Card header - clickable */}
                  <div
                    onClick={() => {
                      if (isExpanded) {
                        setExpandedId(null);
                      } else {
                        initEditForm(prospect);
                        setExpandedId(prospect.id);
                      }
                    }}
                    className="px-5 py-4 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left side */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-bold text-gray-900 truncate">
                            {prospect.business_name}
                          </h3>
                          {prospect.trade_type && (
                            <span
                              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${getTradeColor(
                                prospect.trade_type
                              )}`}
                            >
                              {capitalizeTrade(prospect.trade_type)}
                            </span>
                          )}
                          <span
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                              STATUS_COLORS[prospect.status]
                            }`}
                          >
                            {STATUS_LABELS[prospect.status]}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1.5 text-sm text-gray-500">
                          {(prospect.city || prospect.state) && (
                            <span>
                              {[prospect.city, prospect.state].filter(Boolean).join(", ")}
                            </span>
                          )}
                          {prospect.owner_name && (
                            <span>Owner: {prospect.owner_name}</span>
                          )}
                          {prospect.email && (
                            <span className="hidden sm:inline text-gray-400">{prospect.email}</span>
                          )}
                          {overdue && prospect.next_follow_up_at && (
                            <span className="text-red-600 font-semibold text-xs">
                              Follow-up overdue ({formatDate(prospect.next_follow_up_at)})
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right side */}
                      <div className="flex items-center gap-5 flex-shrink-0">
                        {prospect.google_reviews != null && (
                          <div className="text-right hidden sm:block">
                            <div className="text-sm font-semibold text-gray-700">
                              {prospect.google_reviews}
                            </div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                              Reviews
                            </div>
                          </div>
                        )}
                        {prospect.website && (
                          <a
                            href={prospect.website.startsWith("http") ? prospect.website : `https://${prospect.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-accent hover:underline hidden sm:block whitespace-nowrap"
                          >
                            {shortDomain(prospect.website)}
                          </a>
                        )}
                        {prospect.phone && (
                          <a
                            href={`tel:${prospect.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm font-medium text-accent hover:underline whitespace-nowrap"
                          >
                            {prospect.phone}
                          </a>
                        )}
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Expanded edit form */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 px-5 py-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Business Name */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Business Name
                          </label>
                          <input
                            type="text"
                            value={(form.business_name as string) ?? ""}
                            onChange={(e) => updateField(prospect.id, "business_name", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          />
                        </div>

                        {/* Owner Name */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Owner Name
                          </label>
                          <input
                            type="text"
                            value={(form.owner_name as string) ?? ""}
                            onChange={(e) => updateField(prospect.id, "owner_name", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          />
                        </div>

                        {/* Trade Type */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Trade Type
                          </label>
                          <select
                            value={(form.trade_type as string) ?? ""}
                            onChange={(e) => updateField(prospect.id, "trade_type", e.target.value || null)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option value="">Select trade</option>
                            {TRADE_TYPES.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={(form.phone as string) ?? ""}
                            onChange={(e) => updateField(prospect.id, "phone", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={(form.email as string) ?? ""}
                            onChange={(e) => updateField(prospect.id, "email", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          />
                        </div>

                        {/* Website */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Website
                          </label>
                          <input
                            type="url"
                            value={(form.website as string) ?? ""}
                            onChange={(e) => updateField(prospect.id, "website", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          />
                        </div>

                        {/* City */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            value={(form.city as string) ?? ""}
                            onChange={(e) => updateField(prospect.id, "city", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          />
                        </div>

                        {/* State */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            value={(form.state as string) ?? ""}
                            onChange={(e) => updateField(prospect.id, "state", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          />
                        </div>

                        {/* Google Reviews */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Google Reviews
                          </label>
                          <input
                            type="number"
                            value={form.google_reviews ?? ""}
                            onChange={(e) =>
                              updateField(
                                prospect.id,
                                "google_reviews",
                                e.target.value ? parseInt(e.target.value, 10) : null
                              )
                            }
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          />
                        </div>

                        {/* Follow-up Date */}
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Next Follow-up
                          </label>
                          <input
                            type="date"
                            value={
                              form.next_follow_up_at
                                ? (form.next_follow_up_at as string).slice(0, 10)
                                : ""
                            }
                            onChange={(e) =>
                              updateField(
                                prospect.id,
                                "next_follow_up_at",
                                e.target.value ? new Date(e.target.value).toISOString() : null
                              )
                            }
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          />
                        </div>

                        {/* Checkboxes */}
                        <div className="flex items-end gap-6 pb-1">
                          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={(form.has_chat_widget as boolean) ?? false}
                              onChange={(e) =>
                                updateField(prospect.id, "has_chat_widget", e.target.checked)
                              }
                              className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
                            />
                            Has Chat Widget
                          </label>
                          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={(form.has_website as boolean) ?? false}
                              onChange={(e) =>
                                updateField(prospect.id, "has_website", e.target.checked)
                              }
                              className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
                            />
                            Has Website
                          </label>
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="mt-4">
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Notes
                        </label>
                        <textarea
                          value={(form.notes as string) ?? ""}
                          onChange={(e) => updateField(prospect.id, "notes", e.target.value)}
                          rows={3}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                          placeholder="Add notes about this prospect..."
                        />
                      </div>

                      {/* Actions row */}
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                        {/* Quick status buttons */}
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs font-medium text-gray-400 self-center mr-1">
                            Quick status:
                          </span>
                          {prospect.status !== "contacted" && (
                            <button
                              onClick={() => quickStatusUpdate(prospect.id, "contacted")}
                              disabled={updating === prospect.id}
                              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 font-medium"
                            >
                              Contacted
                            </button>
                          )}
                          {prospect.status !== "demo_scheduled" && (
                            <button
                              onClick={() => quickStatusUpdate(prospect.id, "demo_scheduled")}
                              disabled={updating === prospect.id}
                              className="text-xs bg-yellow-50 hover:bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 font-medium"
                            >
                              Demo Scheduled
                            </button>
                          )}
                          {prospect.status !== "won" && (
                            <button
                              onClick={() => quickStatusUpdate(prospect.id, "won")}
                              disabled={updating === prospect.id}
                              className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 font-medium"
                            >
                              Won
                            </button>
                          )}
                          {prospect.status !== "lost" && (
                            <button
                              onClick={() => quickStatusUpdate(prospect.id, "lost")}
                              disabled={updating === prospect.id}
                              className="text-xs bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 font-medium"
                            >
                              Lost
                            </button>
                          )}
                        </div>

                        {/* Save & Delete */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => deleteProspect(prospect.id)}
                            disabled={deleting === prospect.id}
                            className="text-xs text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 font-medium"
                          >
                            {deleting === prospect.id ? "Deleting..." : "Delete"}
                          </button>
                          <button
                            onClick={() => saveProspect(prospect.id)}
                            disabled={updating === prospect.id}
                            className="text-sm bg-accent hover:bg-accent-hover text-white px-5 py-2 rounded-lg transition-colors disabled:opacity-50 font-medium"
                          >
                            {updating === prospect.id ? "Saving..." : "Save Changes"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

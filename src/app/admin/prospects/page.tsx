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
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});
  const [updating, setUpdating] = useState<string | null>(null);

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

  async function saveNotes(id: string) {
    setUpdating(id);
    try {
      const prospect = prospects.find((p) => p.id === id);
      if (!prospect) return;
      const res = await fetch(`/admin/api/prospects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...prospect,
          notes: editingNotes[id] ?? prospect.notes,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setProspects((prev) =>
        prev.map((p) => (p.id === id ? data.prospect : p))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save notes");
    } finally {
      setUpdating(null);
    }
  }

  // Filter by search
  const filtered = prospects.filter((p) =>
    p.business_name.toLowerCase().includes(search.toLowerCase())
  );

  // Status counts
  const statusCounts: Record<string, number> = {};
  for (const s of ALL_STATUSES) {
    statusCounts[s] = prospects.filter((p) => p.status === s).length;
  }

  // Unique cities for filter
  const cities = Array.from(
    new Set(prospects.map((p) => p.city).filter(Boolean))
  ).sort() as string[];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
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
            className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg font-medium transition-colors"
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
              className={`rounded-lg border p-3 text-center transition-colors ${
                filterStatus === s
                  ? "border-accent bg-accent/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="text-xl font-bold text-gray-900">
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
            className="w-full md:w-72 bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
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
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
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
              className="text-gray-500 hover:text-gray-700 text-sm px-3 py-2"
            >
              Clear filters
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
            <button
              onClick={() => setError("")}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              Dismiss
            </button>
          </div>
        )}

        {loading && (
          <div className="text-gray-500 text-center py-20">
            Loading prospects...
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-gray-500 text-center py-20">
            {search || filterStatus || filterCity || filterTrade
              ? "No prospects match your filters."
              : "No prospects yet. Add your first one."}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3">Business</th>
                    <th className="px-4 py-3">Owner</th>
                    <th className="px-4 py-3">Trade</th>
                    <th className="px-4 py-3">City</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3 text-center">Reviews</th>
                    <th className="px-4 py-3 text-center">Widget</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Contacted</th>
                    <th className="px-4 py-3">Follow-up</th>
                  </tr>
                </thead>
                  {filtered.map((prospect) => {
                    const isExpanded = expandedId === prospect.id;
                    const overdue = isOverdue(prospect.next_follow_up_at);

                    return (
                      <tbody key={prospect.id}>
                        <tr
                          onClick={() =>
                            setExpandedId(isExpanded ? null : prospect.id)
                          }
                          className={`border-b border-gray-100 cursor-pointer transition-colors ${
                            isExpanded ? "bg-gray-50" : "hover:bg-gray-50"
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                            {prospect.business_name}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {prospect.owner_name || ""}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {prospect.trade_type || ""}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {prospect.city || ""}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {prospect.phone || ""}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-600">
                            {prospect.google_reviews ?? ""}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {prospect.has_chat_widget ? (
                              <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" title="Has chat widget" />
                            ) : (
                              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400" title="No chat widget" />
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
                                STATUS_COLORS[prospect.status]
                              }`}
                            >
                              {STATUS_LABELS[prospect.status]}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                            {formatDate(prospect.last_contacted_at)}
                          </td>
                          <td
                            className={`px-4 py-3 text-xs whitespace-nowrap ${
                              overdue
                                ? "text-red-600 font-semibold"
                                : "text-gray-500"
                            }`}
                          >
                            {formatDate(prospect.next_follow_up_at)}
                            {overdue && " (overdue)"}
                          </td>
                        </tr>

                        {/* Expanded row */}
                        {isExpanded && (
                          <tr className="bg-gray-50">
                            <td colSpan={10} className="px-4 py-4 border-b border-gray-100">
                              <div className="flex flex-col lg:flex-row gap-4">
                                {/* Notes */}
                                <div className="flex-1">
                                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                                    Notes
                                  </label>
                                  <textarea
                                    value={
                                      editingNotes[prospect.id] ??
                                      prospect.notes ??
                                      ""
                                    }
                                    onChange={(e) =>
                                      setEditingNotes((prev) => ({
                                        ...prev,
                                        [prospect.id]: e.target.value,
                                      }))
                                    }
                                    rows={3}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                                    placeholder="Add notes about this prospect..."
                                  />
                                  <button
                                    onClick={() => saveNotes(prospect.id)}
                                    disabled={updating === prospect.id}
                                    className="mt-2 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                                  >
                                    {updating === prospect.id
                                      ? "Saving..."
                                      : "Save Notes"}
                                  </button>
                                </div>

                                {/* Details */}
                                <div className="lg:w-48 text-xs text-gray-500 space-y-1">
                                  {prospect.email && (
                                    <div>
                                      <span className="font-medium text-gray-600">Email:</span>{" "}
                                      {prospect.email}
                                    </div>
                                  )}
                                  {prospect.website && (
                                    <div>
                                      <span className="font-medium text-gray-600">Web:</span>{" "}
                                      <a
                                        href={prospect.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent hover:underline"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        {prospect.website.replace(
                                          /^https?:\/\//,
                                          ""
                                        )}
                                      </a>
                                    </div>
                                  )}
                                  <div>
                                    <span className="font-medium text-gray-600">
                                      Has Website:
                                    </span>{" "}
                                    {prospect.has_website ? "Yes" : "No"}
                                  </div>
                                </div>

                                {/* Quick actions */}
                                <div className="flex flex-wrap lg:flex-col gap-2 lg:w-40">
                                  <span className="text-xs font-medium text-gray-500 w-full">
                                    Quick Actions
                                  </span>
                                  {prospect.status !== "contacted" && (
                                    <button
                                      onClick={() =>
                                        quickStatusUpdate(
                                          prospect.id,
                                          "contacted"
                                        )
                                      }
                                      disabled={updating === prospect.id}
                                      className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                                    >
                                      Mark Contacted
                                    </button>
                                  )}
                                  {prospect.status !== "demo_scheduled" && (
                                    <button
                                      onClick={() =>
                                        quickStatusUpdate(
                                          prospect.id,
                                          "demo_scheduled"
                                        )
                                      }
                                      disabled={updating === prospect.id}
                                      className="text-xs bg-yellow-50 hover:bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                                    >
                                      Schedule Demo
                                    </button>
                                  )}
                                  {prospect.status !== "won" && (
                                    <button
                                      onClick={() =>
                                        quickStatusUpdate(prospect.id, "won")
                                      }
                                      disabled={updating === prospect.id}
                                      className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                                    >
                                      Mark Won
                                    </button>
                                  )}
                                  {prospect.status !== "lost" && (
                                    <button
                                      onClick={() =>
                                        quickStatusUpdate(prospect.id, "lost")
                                      }
                                      disabled={updating === prospect.id}
                                      className="text-xs bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                                    >
                                      Mark Lost
                                    </button>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    );
                  })}
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

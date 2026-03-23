"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Lead {
  id: string;
  client_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  source: string;
  job_type: string | null;
  urgency: string;
  notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  business_name: string | null;
}

interface ClientOption {
  id: string;
  business_name: string;
}

const urgencyColors: Record<string, string> = {
  emergency: "bg-red-100 text-red-700",
  urgent: "bg-yellow-100 text-yellow-700",
  normal: "bg-gray-100 text-gray-600",
};

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  quoted: "bg-purple-100 text-purple-700",
  booked: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  lost: "bg-red-100 text-red-700",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  // Filters
  const [filterClient, setFilterClient] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterUrgency, setFilterUrgency] = useState("");

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterClient) params.set("client_id", filterClient);
      if (filterStatus) params.set("status", filterStatus);
      if (filterUrgency) params.set("urgency", filterUrgency);

      const res = await fetch(`/admin/api/leads?${params.toString()}`);
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/admin";
          return;
        }
        throw new Error("Failed to fetch leads");
      }
      const data = await res.json();
      setLeads(data.leads || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [filterClient, filterStatus, filterUrgency]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateLeadStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await fetch(`/admin/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      // Update local state
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );
    } catch {
      alert("Failed to update lead status");
    } finally {
      setUpdating(null);
    }
  };

  // Derive unique clients for filter dropdown
  const clientOptions: ClientOption[] = [];
  const seen = new Set<string>();
  for (const lead of leads) {
    if (lead.client_id && !seen.has(lead.client_id)) {
      seen.add(lead.client_id);
      clientOptions.push({
        id: lead.client_id,
        business_name: lead.business_name || lead.client_id,
      });
    }
  }

  return (
    <div className="min-h-screen bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Link
                href="/admin"
                className="text-text-light hover:text-primary transition text-sm"
              >
                Admin
              </Link>
              <span className="text-text-light">/</span>
              <h1 className="text-2xl font-bold text-primary">Leads</h1>
            </div>
            <p className="text-text-light text-sm">
              {leads.length} lead{leads.length !== 1 ? "s" : ""} total
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-primary">Filters:</span>

            <select
              value={filterClient}
              onChange={(e) => setFilterClient(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="">All Clients</option>
              {clientOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.business_name}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="quoted">Quoted</option>
              <option value="booked">Booked</option>
              <option value="completed">Completed</option>
              <option value="lost">Lost</option>
            </select>

            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="">All Urgency</option>
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="emergency">Emergency</option>
            </select>

            {(filterClient || filterStatus || filterUrgency) && (
              <button
                onClick={() => {
                  setFilterClient("");
                  setFilterStatus("");
                  setFilterUrgency("");
                }}
                className="text-sm text-accent hover:text-accent-hover transition"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
            <p className="text-text-light text-sm">Loading leads...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && leads.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-text-light">No leads found.</p>
          </div>
        )}

        {/* Table */}
        {!loading && leads.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-text-light border-b border-gray-200 bg-gray-50/50">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Phone</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Email</th>
                    <th className="px-4 py-3 font-medium">Client</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Source</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Job Type</th>
                    <th className="px-4 py-3 font-medium">Urgency</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <>
                      <tr
                        key={lead.id}
                        onClick={() =>
                          setExpandedId(expandedId === lead.id ? null : lead.id)
                        }
                        className={`hover:bg-gray-50 transition cursor-pointer border-b border-gray-100 ${
                          expandedId === lead.id ? "bg-gray-50" : ""
                        }`}
                      >
                        <td className="px-4 py-3 font-medium text-primary">
                          {lead.name}
                        </td>
                        <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                          {lead.phone || "-"}
                        </td>
                        <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">
                          {lead.email || "-"}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {lead.business_name || "-"}
                        </td>
                        <td className="px-4 py-3 text-gray-600 hidden sm:table-cell capitalize">
                          {lead.source}
                        </td>
                        <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">
                          {lead.job_type || "-"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                              urgencyColors[lead.urgency] || "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {lead.urgency}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                              statusColors[lead.status] || "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell whitespace-nowrap">
                          {formatDate(lead.created_at)}
                        </td>
                      </tr>

                      {/* Expanded row */}
                      {expandedId === lead.id && (
                        <tr key={`${lead.id}-expanded`}>
                          <td
                            colSpan={9}
                            className="px-4 py-4 bg-gray-50 border-b border-gray-200"
                          >
                            <div className="flex flex-col sm:flex-row gap-4">
                              {/* Notes */}
                              <div className="flex-1">
                                <h4 className="text-xs font-semibold text-text-light uppercase tracking-wide mb-1">
                                  Notes
                                </h4>
                                <p className="text-sm text-primary">
                                  {lead.notes || "No notes yet."}
                                </p>

                                {/* Mobile-only contact info */}
                                <div className="mt-3 sm:hidden space-y-1">
                                  {lead.phone && (
                                    <p className="text-xs text-gray-600">
                                      Phone: {lead.phone}
                                    </p>
                                  )}
                                  {lead.email && (
                                    <p className="text-xs text-gray-600">
                                      Email: {lead.email}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Quick actions */}
                              <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                                <h4 className="w-full sm:w-auto text-xs font-semibold text-text-light uppercase tracking-wide mb-1">
                                  Quick Actions
                                </h4>
                                {lead.status !== "contacted" && (
                                  <button
                                    disabled={updating === lead.id}
                                    onClick={() =>
                                      updateLeadStatus(lead.id, "contacted")
                                    }
                                    className="text-xs px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition disabled:opacity-50"
                                  >
                                    Mark Contacted
                                  </button>
                                )}
                                {lead.status !== "booked" && (
                                  <button
                                    disabled={updating === lead.id}
                                    onClick={() =>
                                      updateLeadStatus(lead.id, "booked")
                                    }
                                    className="text-xs px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                                  >
                                    Mark Booked
                                  </button>
                                )}
                                {lead.status !== "lost" && (
                                  <button
                                    disabled={updating === lead.id}
                                    onClick={() =>
                                      updateLeadStatus(lead.id, "lost")
                                    }
                                    className="text-xs px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition disabled:opacity-50"
                                  >
                                    Mark Lost
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

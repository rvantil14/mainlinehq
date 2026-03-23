"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ClientRow } from "@/lib/database.types";

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  onboarding: "bg-yellow-100 text-yellow-800",
  churned: "bg-red-100 text-red-800",
};

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  plumbing: "Plumbing",
  hvac: "HVAC",
  electrical: "Electrical",
  painting: "Painting",
  roofing: "Roofing",
  landscaping: "Landscaping",
  general_contracting: "General Contracting",
  other: "Other",
};

const PACKAGE_LABELS: Record<string, string> = {
  starter: "Starter",
  growth: "Growth",
  pro: "Pro",
};

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch("/admin/api/clients");
        if (res.status === 401) {
          router.push("/admin");
          return;
        }
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setClients(data.clients || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load clients");
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, [router]);

  const filtered = clients.filter((c) =>
    c.business_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Clients</h1>
            <p className="text-gray-400 mt-1">
              {clients.length} total client{clients.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/clients/new")}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + Add Client
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by business name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
          />
        </div>

        {loading && (
          <div className="text-gray-400 text-center py-20">Loading clients...</div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-gray-500 text-center py-20">
            {search ? "No clients match your search." : "No clients yet. Add your first one."}
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-sm">
                  <th className="pb-3 pr-4">Business</th>
                  <th className="pb-3 pr-4">Owner</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Package</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((client) => (
                  <tr
                    key={client.id}
                    onClick={() => router.push(`/admin/clients/${client.id}`)}
                    className="border-b border-gray-800/50 hover:bg-gray-900 cursor-pointer transition-colors"
                  >
                    <td className="py-4 pr-4 font-medium">{client.business_name}</td>
                    <td className="py-4 pr-4 text-gray-300">{client.owner_name}</td>
                    <td className="py-4 pr-4 text-gray-300">
                      {BUSINESS_TYPE_LABELS[client.business_type] || client.business_type}
                    </td>
                    <td className="py-4 pr-4">
                      <span className="bg-gray-800 text-gray-200 text-xs px-2 py-1 rounded-full">
                        {PACKAGE_LABELS[client.package] || client.package}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          STATUS_COLORS[client.status] || "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-400 text-sm">
                      {new Date(client.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

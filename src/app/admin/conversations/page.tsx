"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  client_id: string;
  lead_id: string | null;
  messages: ChatMessage[];
  lead_captured: boolean;
  appointment_booked: boolean;
  created_at: string;
  updated_at: string;
  business_name: string | null;
}

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

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getLastMessage(messages: ChatMessage[]): string {
  if (!messages || messages.length === 0) return "No messages";
  const last = messages[messages.length - 1];
  const preview = last.content.length > 100
    ? last.content.slice(0, 100) + "..."
    : last.content;
  return preview;
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterClient, setFilterClient] = useState("");

  useEffect(() => {
    async function fetchConversations() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filterClient) params.set("client_id", filterClient);

        const res = await fetch(
          `/admin/api/conversations?${params.toString()}`
        );
        if (!res.ok) {
          if (res.status === 401) {
            window.location.href = "/admin";
            return;
          }
          throw new Error("Failed to fetch conversations");
        }
        const data = await res.json();
        setConversations(data.conversations || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchConversations();
  }, [filterClient]);

  // Derive unique clients
  const clientOptions: { id: string; name: string }[] = [];
  const seen = new Set<string>();
  for (const conv of conversations) {
    if (conv.client_id && !seen.has(conv.client_id)) {
      seen.add(conv.client_id);
      clientOptions.push({
        id: conv.client_id,
        name: conv.business_name || conv.client_id,
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
              <h1 className="text-2xl font-bold text-primary">
                Conversations
              </h1>
            </div>
            <p className="text-text-light text-sm">
              {conversations.length} conversation
              {conversations.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-primary">Filter:</span>
            <select
              value={filterClient}
              onChange={(e) => setFilterClient(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="">All Clients</option>
              {clientOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {filterClient && (
              <button
                onClick={() => setFilterClient("")}
                className="text-sm text-accent hover:text-accent-hover transition"
              >
                Clear filter
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
            <p className="text-text-light text-sm">
              Loading conversations...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && conversations.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-text-light">No conversations found.</p>
          </div>
        )}

        {/* Conversation cards */}
        {!loading && conversations.length > 0 && (
          <div className="space-y-3">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                {/* Summary row */}
                <button
                  onClick={() =>
                    setExpandedId(expandedId === conv.id ? null : conv.id)
                  }
                  className="w-full text-left px-5 py-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold text-primary text-sm">
                          {conv.business_name || "Unknown Client"}
                        </span>
                        {conv.lead_captured && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">
                            Lead Captured
                          </span>
                        )}
                        {conv.appointment_booked && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
                            Appointment Booked
                          </span>
                        )}
                        <span className="text-xs text-text-light">
                          {conv.messages?.length || 0} message
                          {(conv.messages?.length || 0) !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {getLastMessage(conv.messages)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatDate(conv.updated_at)}
                      </span>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          expandedId === conv.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Expanded thread */}
                {expandedId === conv.id && (
                  <div className="border-t border-gray-200 bg-gray-50 px-5 py-4">
                    <div className="max-h-[500px] overflow-y-auto space-y-3 pr-1">
                      {(!conv.messages || conv.messages.length === 0) && (
                        <p className="text-sm text-text-light text-center py-4">
                          No messages in this conversation.
                        </p>
                      )}
                      {conv.messages?.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${
                            msg.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-xl px-4 py-2.5 ${
                              msg.role === "user"
                                ? "bg-accent text-white rounded-br-sm"
                                : "bg-white border border-gray-200 text-primary rounded-bl-sm"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">
                              {msg.content}
                            </p>
                            {msg.timestamp && (
                              <p
                                className={`text-[10px] mt-1 ${
                                  msg.role === "user"
                                    ? "text-white/60"
                                    : "text-gray-400"
                                }`}
                              >
                                {formatTime(msg.timestamp)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

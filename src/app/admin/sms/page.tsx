"use client";

import { useState, useEffect } from "react";

interface SmsMessage {
  id: string;
  client_id: string | null;
  lead_id: string | null;
  direction: "inbound" | "outbound";
  phone_number: string;
  message: string;
  twilio_sid: string | null;
  status: string | null;
  created_at: string;
}

export default function SmsLogPage() {
  const [messages, setMessages] = useState<SmsMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState<string>("");

  useEffect(() => {
    fetchMessages();
  }, [direction]);

  async function fetchMessages() {
    setLoading(true);
    const params = new URLSearchParams();
    if (direction) params.set("direction", direction);
    params.set("limit", "100");

    try {
      const res = await fetch(`/admin/api/sms?${params}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SMS Log</h1>
          <p className="text-sm text-gray-500 mt-1">All inbound and outbound text messages</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {[
          { value: "", label: "All Messages" },
          { value: "outbound", label: "Outbound" },
          { value: "inbound", label: "Inbound" },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => setDirection(opt.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              direction === opt.value
                ? "bg-primary text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No SMS messages yet</h3>
          <p className="text-sm text-gray-500">Messages will appear here once Twilio is connected and SMS are sent or received.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-xl border border-gray-200 p-5 flex gap-4 ${
                msg.direction === "inbound" ? "border-l-4 border-l-blue-400" : "border-l-4 border-l-accent"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      msg.direction === "inbound"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-orange-50 text-orange-700"
                    }`}
                  >
                    {msg.direction === "inbound" ? "Received" : "Sent"}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{msg.phone_number}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(msg.created_at).toLocaleString()}
                  </span>
                  {msg.status && (
                    <span className="text-xs text-gray-400 ml-auto">{msg.status}</span>
                  )}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

const stats = [
  { label: "Conversations This Month", value: "47", icon: "\uD83D\uDCAC", change: "+12% from last month" },
  { label: "Leads Captured", value: "23", icon: "\uD83C\uDFAF", change: "+8% from last month" },
  { label: "Appointments Booked", value: "18", icon: "\uD83D\uDCC5", change: "+22% from last month" },
  { label: "Revenue Collected", value: "$12,450", icon: "\uD83D\uDCB0", change: "+15% from last month" },
];

const conversations = [
  {
    name: "Sarah M.",
    message: "I need someone to look at my water heater...",
    status: "Lead Captured",
    time: "2 hours ago",
  },
  {
    name: "James R.",
    message: "Do you do emergency service? My pipe burst...",
    status: "Appointment Booked",
    time: "5 hours ago",
  },
  {
    name: "Lisa K.",
    message: "How much for a drain cleaning?",
    status: "New",
    time: "1 day ago",
  },
  {
    name: "Tom W.",
    message: "Can I schedule a toilet installation next week?",
    status: "Appointment Booked",
    time: "2 days ago",
  },
];

const appointments = [
  { customer: "James R.", service: "Emergency Pipe Repair", date: "Mar 18", time: "9:00 AM", status: "Confirmed" },
  { customer: "Tom W.", service: "Toilet Installation", date: "Mar 19", time: "11:00 AM", status: "Confirmed" },
  { customer: "Angela P.", service: "Kitchen Faucet Replacement", date: "Mar 20", time: "2:00 PM", status: "Pending" },
  { customer: "David L.", service: "Water Heater Inspection", date: "Mar 21", time: "10:00 AM", status: "Confirmed" },
  { customer: "Maria S.", service: "Drain Cleaning", date: "Mar 22", time: "1:00 PM", status: "Pending" },
];

const invoices = [
  { id: "INV-1047", customer: "Robert K.", amount: "$2,350", status: "Paid", date: "Mar 14" },
  { id: "INV-1046", customer: "James R.", amount: "$875", status: "Sent", date: "Mar 12" },
  { id: "INV-1045", customer: "Angela P.", amount: "$1,200", status: "Paid", date: "Mar 10" },
  { id: "INV-1044", customer: "Susan T.", amount: "$450", status: "Overdue", date: "Feb 28" },
  { id: "INV-1043", customer: "David L.", amount: "$3,100", status: "Paid", date: "Feb 25" },
];

const chartData = [
  { month: "Oct", leads: 12 },
  { month: "Nov", leads: 15 },
  { month: "Dec", leads: 18 },
  { month: "Jan", leads: 22 },
  { month: "Feb", leads: 28 },
  { month: "Mar", leads: 23 },
];

function statusColor(status: string) {
  switch (status) {
    case "Lead Captured":
      return "bg-blue-100 text-blue-700";
    case "Appointment Booked":
      return "bg-green-100 text-green-700";
    case "New":
      return "bg-orange-100 text-orange-700";
    case "Confirmed":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Paid":
      return "bg-green-100 text-green-700";
    case "Sent":
      return "bg-blue-100 text-blue-700";
    case "Overdue":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"conversations" | "appointments" | "invoices">("conversations");
  const maxLeads = Math.max(...chartData.map((d) => d.leads));

  return (
    <div className="min-h-screen bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Banner */}
        <div className="bg-accent/10 border border-accent/30 rounded-lg px-4 py-3 mb-6 flex items-start gap-3">
          <span className="text-accent text-lg mt-0.5">&#9432;</span>
          <p className="text-sm text-primary">
            <strong>This is a demo dashboard.</strong> Your actual dashboard will show real data from your business.
          </p>
        </div>

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Welcome back, Mike</h1>
          <p className="text-text-light mt-1">Here&apos;s what&apos;s happening at Ace Plumbing &amp; Drain today.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-text-light">{stat.label}</span>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-success mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Conversations + Tabs */}
          <div className="lg:col-span-2">
            {/* Tab Switcher */}
            <div className="flex gap-1 bg-white rounded-t-xl border border-b-0 border-gray-200 p-1 overflow-x-auto">
              {(["conversations", "appointments", "invoices"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-w-0 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-primary text-white"
                      : "text-text-light hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {tab === "conversations" ? "Conversations" : tab === "appointments" ? "Appointments" : "Invoices"}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-b-xl border border-gray-200 divide-y divide-gray-100">
              {/* Conversations Panel */}
              {activeTab === "conversations" &&
                conversations.map((c, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 hover:bg-gray-50 transition cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary shrink-0">
                      {c.name.split(" ")[0][0]}{c.name.split(" ")[1]?.[0] || ""}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-primary text-sm">{c.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(c.status)}`}>
                          {c.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{c.message}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 mt-1">{c.time}</span>
                  </div>
                ))}

              {/* Appointments Panel */}
              {activeTab === "appointments" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-text-light border-b border-gray-100">
                        <th className="px-4 py-3 font-medium">Customer</th>
                        <th className="px-4 py-3 font-medium">Service</th>
                        <th className="px-4 py-3 font-medium hidden sm:table-cell">Date</th>
                        <th className="px-4 py-3 font-medium hidden sm:table-cell">Time</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((a, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition border-b border-gray-50 last:border-0">
                          <td className="px-4 py-3 font-medium text-primary">{a.customer}</td>
                          <td className="px-4 py-3 text-gray-600">{a.service}</td>
                          <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{a.date}</td>
                          <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{a.time}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(a.status)}`}>
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Invoices Panel */}
              {activeTab === "invoices" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-text-light border-b border-gray-100">
                        <th className="px-4 py-3 font-medium">Invoice #</th>
                        <th className="px-4 py-3 font-medium">Customer</th>
                        <th className="px-4 py-3 font-medium">Amount</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium hidden sm:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((inv, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition border-b border-gray-50 last:border-0">
                          <td className="px-4 py-3 font-mono text-primary font-medium">{inv.id}</td>
                          <td className="px-4 py-3 text-gray-600">{inv.customer}</td>
                          <td className="px-4 py-3 font-semibold text-primary">{inv.amount}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(inv.status)}`}>
                              {inv.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{inv.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Chart */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-5 h-full">
              <h3 className="text-sm font-semibold text-primary mb-1">Leads Per Month</h3>
              <p className="text-xs text-gray-400 mb-6">Last 6 months</p>

              <div className="flex items-end gap-3 h-48">
                {chartData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-primary">{d.leads}</span>
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 ${
                        d.month === "Mar" ? "bg-accent" : "bg-primary"
                      }`}
                      style={{
                        height: `${(d.leads / maxLeads) * 100}%`,
                        minHeight: "8px",
                      }}
                    />
                    <span className="text-xs text-text-light">{d.month}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-light">Total Leads (6 mo)</span>
                  <span className="font-bold text-primary">118</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-text-light">Avg per Month</span>
                  <span className="font-bold text-primary">19.7</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-text-light">Best Month</span>
                  <span className="font-bold text-accent">Feb (28)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="relative bg-white rounded-xl border border-gray-200 p-5 text-left opacity-75 cursor-default group">
            <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider text-text-light bg-gray-100 px-2 py-0.5 rounded-full">
              Demo
            </span>
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-semibold text-primary">AI Chat Settings</h3>
            <p className="text-xs text-text-light mt-1">Customize your chatbot responses, tone, and availability hours.</p>
          </div>
          <div className="relative bg-white rounded-xl border border-gray-200 p-5 text-left opacity-75 cursor-default group">
            <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider text-text-light bg-gray-100 px-2 py-0.5 rounded-full">
              Demo
            </span>
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-primary">Full Reports</h3>
            <p className="text-xs text-text-light mt-1">View detailed analytics on leads, conversions, and revenue trends.</p>
          </div>
          <div className="relative bg-white rounded-xl border border-gray-200 p-5 text-left opacity-75 cursor-default group">
            <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider text-text-light bg-gray-100 px-2 py-0.5 rounded-full">
              Demo
            </span>
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-primary">Quick Actions</h3>
            <p className="text-xs text-text-light mt-1">Send follow-ups, create invoices, or manage your schedule.</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-primary rounded-2xl p-8 sm:p-10 text-center shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Want This For Your Business?
          </h2>
          <p className="text-gray-300 text-sm max-w-lg mx-auto mb-6">
            Get your own AI-powered dashboard with real-time lead capture, automated scheduling, and smart follow-ups, built for your trade.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-accent hover:bg-accent-hover text-primary font-semibold text-sm rounded-lg transition-colors shadow-sm shadow-accent/25"
          >
            Schedule a Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}

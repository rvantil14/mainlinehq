"use client";

import { useState } from "react";
import Link from "next/link";

const stats = [
  { label: "Conversations This Month", value: "47", icon: "chat", change: "+12% from last month" },
  { label: "Leads Captured", value: "23", icon: "target", change: "+8% from last month" },
  { label: "Appointments Booked", value: "18", icon: "calendar", change: "+22% from last month" },
  { label: "Revenue Collected", value: "$12,450", icon: "dollar", change: "+15% from last month" },
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
                <span className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                  {stat.icon === "chat" && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>}
                  {stat.icon === "target" && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" /></svg>}
                  {stat.icon === "calendar" && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>}
                  {stat.icon === "dollar" && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                </span>
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
            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mb-2"><svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg></div>
            <h3 className="font-semibold text-primary">AI Chat Settings</h3>
            <p className="text-xs text-text-light mt-1">Customize your chatbot responses, tone, and availability hours.</p>
          </div>
          <div className="relative bg-white rounded-xl border border-gray-200 p-5 text-left opacity-75 cursor-default group">
            <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider text-text-light bg-gray-100 px-2 py-0.5 rounded-full">
              Demo
            </span>
            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mb-2"><svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg></div>
            <h3 className="font-semibold text-primary">Full Reports</h3>
            <p className="text-xs text-text-light mt-1">View detailed analytics on leads, conversions, and revenue trends.</p>
          </div>
          <div className="relative bg-white rounded-xl border border-gray-200 p-5 text-left opacity-75 cursor-default group">
            <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider text-text-light bg-gray-100 px-2 py-0.5 rounded-full">
              Demo
            </span>
            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mb-2"><svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg></div>
            <h3 className="font-semibold text-primary">Quick Actions</h3>
            <p className="text-xs text-text-light mt-1">Send follow-ups, create invoices, or manage your schedule.</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-primary rounded-lg p-8 sm:p-10 text-center shadow-lg">
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

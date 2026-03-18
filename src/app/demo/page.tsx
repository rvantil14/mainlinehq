"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ============================================================
// Demo Page: The key sales tool for Mainline
// Lets prospects try the AI chatbot with 4 demo businesses.
// ============================================================

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface DemoBusiness {
  clientId: string;
  name: string;
  icon: string;
  greeting: string;
  features: string[];
  suggestedMessages: string[];
}

const BUSINESSES: DemoBusiness[] = [
  {
    clientId: "demo-plumbing",
    name: "Ace Plumbing",
    icon: "\uD83D\uDD27",
    greeting:
      "Hi! Thanks for reaching out to Ace Plumbing & Drain. Whether you have a leaky faucet or a full plumbing emergency, we're here to help. What can I do for you today?",
    features: ["AI Chatbot", "Lead Capture", "Scheduling", "Emergency Routing"],
    suggestedMessages: [
      "I have a leaking pipe under my kitchen sink",
      "How much for a water heater replacement?",
      "My basement is flooding, I need someone NOW",
      "Can I schedule a drain cleaning?",
    ],
  },
  {
    clientId: "demo-hvac",
    name: "Summit HVAC",
    icon: "\u2744\uFE0F",
    greeting:
      "Hello! Welcome to Summit HVAC. From AC installs to furnace repairs, we keep your home comfortable year-round. How can I help you today?",
    features: ["AI Chatbot", "Lead Capture", "Scheduling", "Seasonal Promos"],
    suggestedMessages: [
      "My AC stopped blowing cold air",
      "How much does a new furnace cost?",
      "Can you come out today? It\u2019s 100 degrees",
      "I need my system serviced before summer",
    ],
  },
  {
    clientId: "demo-electrical",
    name: "Volt Electric",
    icon: "\u26A1",
    greeting:
      "Hey there! Thanks for contacting Volt Electric. We handle everything from panel upgrades to outlet installs. What do you need help with?",
    features: ["AI Chatbot", "Lead Capture", "Scheduling", "Safety Alerts"],
    suggestedMessages: [
      "Half my outlets stopped working",
      "I need a panel upgrade for my new EV charger",
      "How much to install recessed lighting?",
      "I smell something burning near my breaker box",
    ],
  },
  {
    clientId: "demo-painting",
    name: "Fresh Coat Painters",
    icon: "\uD83C\uDFA8",
    greeting:
      "Hi! Welcome to Fresh Coat Painters. Whether it's interior, exterior, or a full color consultation, we'd love to help transform your space. What are you looking to get done?",
    features: ["AI Chatbot", "Lead Capture", "Estimates", "Color Consult"],
    suggestedMessages: [
      "I need the exterior of my house painted",
      "How much for a 3-bedroom interior?",
      "Do you do commercial painting?",
      "Can you match an existing color?",
    ],
  },
];

function makeGreeting(biz: DemoBusiness): Message {
  return {
    id: "greeting",
    role: "assistant",
    content: biz.greeting,
    timestamp: new Date(),
  };
}

export default function DemoPage() {
  const [activeBusiness, setActiveBusiness] = useState(BUSINESSES[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [mounted, setMounted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Only render chat after mount to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    setMessages([{
      id: "greeting",
      role: "assistant",
      content: BUSINESSES[0].greeting,
      timestamp: new Date(),
    }]);
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    if (mounted) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, mounted]);

  const switchBusiness = (biz: DemoBusiness) => {
    if (biz.clientId === activeBusiness.clientId) return;
    setActiveBusiness(biz);
    setMessages([{
      id: "greeting",
      role: "assistant",
      content: biz.greeting,
      timestamp: new Date(),
    }]);
    setConversationId(null);
    setLeadCaptured(false);
    setAppointmentBooked(false);
    setInput("");
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: activeBusiness.clientId,
          conversationId,
          message: text.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      const data = await res.json();

      if (data.conversationId) setConversationId(data.conversationId);
      if (data.leadCaptured) setLeadCaptured(true);
      if (data.appointmentBooked) setAppointmentBooked(true);

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "Hmm, something went wrong on our end. Give it another try in a moment. If it keeps happening, reach out to us directly.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-light-bg min-h-screen">
      {/* Hero Header */}
      <div className="bg-dark text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            See Mainline In Action
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Pick a business below and chat with the AI. Watch it answer questions,
            capture leads, and book appointments, all on autopilot.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Simulated Demo Banner */}
        <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-center">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Simulated demo</span>: responses
            show real AI capabilities.{" "}
            <Link
              href="/contact"
              className="font-semibold underline underline-offset-2 hover:text-amber-950 transition-colors"
            >
              Schedule a live demo
            </Link>{" "}
            configured for your business.
          </p>
        </div>

        {/* Business Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {BUSINESSES.map((biz) => (
            <button
              key={biz.clientId}
              onClick={() => switchBusiness(biz)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeBusiness.clientId === biz.clientId
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span className="text-lg leading-none">{biz.icon}</span>
              <span>{biz.name}</span>
              {activeBusiness.clientId === biz.clientId && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-accent rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Main Content: Chat (60%) + Info Panel (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Chat Panel - 3/5 = 60% */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col min-h-[400px] lg:min-h-[500px]">
              {/* Chat Header */}
              <div className="px-5 py-3.5 flex items-center gap-3 border-b border-gray-100 bg-primary">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
                  {activeBusiness.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">
                    {activeBusiness.name}
                  </p>
                  <p className="text-white/70 text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-success rounded-full inline-block" />
                    Online now
                  </p>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-gray-50/50">
                {mounted && messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" ? (
                      /* AI message - left-aligned with avatar */
                      <div className="flex gap-2.5 max-w-[85%] sm:max-w-[75%]">
                        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm bg-white border border-gray-200 shadow-sm">
                          {activeBusiness.icon}
                        </div>
                        <div>
                          <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed text-gray-800 shadow-sm">
                            {msg.content}
                          </div>
                          <p className="text-[10px] text-gray-400 mt-1 ml-1">
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* User message - right-aligned */
                      <div className="max-w-[85%] sm:max-w-[75%]">
                        <div className="bg-accent text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed shadow-sm">
                          {msg.content}
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 text-right mr-1">
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <div className="flex justify-start">
                    <div className="flex gap-2.5 max-w-[85%] sm:max-w-[75%]">
                      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm bg-white border border-gray-200 shadow-sm">
                        {activeBusiness.icon}
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm">
                        <div className="flex gap-1">
                          <span
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms", animationDuration: "0.6s" }}
                          />
                          <span
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms", animationDuration: "0.6s" }}
                          />
                          <span
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms", animationDuration: "0.6s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 bg-white">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={loading}
                    autoFocus
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-50 disabled:bg-gray-50 bg-gray-50"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-4 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Info Panel - 2/5 = 40% */}
          <div className="lg:col-span-2 space-y-5">
            {/* Active Business Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 pt-5 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
                    {activeBusiness.icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {activeBusiness.name}
                    </p>
                    <p className="text-xs text-text-light">Demo Business</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="px-6 py-4 border-b border-gray-100">
                <p className="text-xs font-semibold text-text-light uppercase tracking-wider mb-2.5">
                  Active Features
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeBusiness.features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Indicators */}
              <div className="px-6 py-4 space-y-2.5">
                <p className="text-xs font-semibold text-text-light uppercase tracking-wider mb-1">
                  What Just Happened
                </p>
                <div className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-gray-50">
                  <span className="text-sm text-gray-700 font-medium">Lead Captured</span>
                  {leadCaptured ? (
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-success">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Captured
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm text-gray-400">
                      <span className="w-4 h-4 rounded-full border-2 border-gray-300 inline-block" />
                      Waiting
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-gray-50">
                  <span className="text-sm text-gray-700 font-medium">Appointment Booked</span>
                  {appointmentBooked ? (
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-success">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Booked
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm text-gray-400">
                      <span className="w-4 h-4 rounded-full border-2 border-gray-300 inline-block" />
                      Waiting
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Suggested Messages */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <p className="text-xs font-semibold text-text-light uppercase tracking-wider mb-3">
                Try Asking
              </p>
              <div className="space-y-2">
                {activeBusiness.suggestedMessages.map((msg, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(msg)}
                    disabled={loading}
                    className="w-full text-left px-3.5 py-2.5 text-sm text-gray-700 rounded-xl transition-all border border-gray-200 hover:border-accent hover:bg-accent/5 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    &ldquo;{msg}&rdquo;
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="bg-primary rounded-2xl p-6 text-center shadow-lg">
              <p className="text-white font-semibold mb-1.5">
                Want This For Your Business?
              </p>
              <p className="text-gray-300 text-sm mb-4">
                Your own AI assistant, trained on your services, prices, and brand voice.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold text-sm rounded-lg transition-colors shadow-sm"
              >
                Schedule a Free Consultation
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 mb-8 text-center">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 px-8 py-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Want This For Your Business?
            </h2>
            <p className="text-text-light text-base mb-6 max-w-lg mx-auto">
              We build and train a custom AI chatbot for your trade business,
              answering questions, capturing leads, and booking jobs 24/7.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl text-base transition-colors shadow-md"
              >
                Schedule a Free Consultation
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 px-6 py-3 text-primary font-semibold text-base hover:text-primary-light transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

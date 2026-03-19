// ============================================================
// Mainline Sales Client Config
// Powers the self-hosted chat widget on mainlinehq.com
// ============================================================

import { ClientConfig } from "../types";

export const mainlineSalesConfig: ClientConfig = {
  id: "mainline-sales",
  businessName: "Mainline",
  businessType: "technology",
  phoneNumber: "(805) 801-1380",
  email: "hello@mainlinehq.com",
  website: "https://mainlinehq.com",
  ownerName: undefined,
  tagline: "The main line between your customers and your calendar.",
  brandVoice: "friendly",
  services: [
    {
      name: "AI Chatbot",
      description:
        "24/7 AI chatbot that answers customer questions, captures leads, and books appointments on your website",
      priceRange: "Included in all plans",
    },
    {
      name: "Smart Scheduling",
      description:
        "Automated appointment booking with SMS confirmations and reminders",
      priceRange: "Included in all plans",
    },
    {
      name: "Automated Invoicing",
      description:
        "Invoices generated at job completion with text-to-pay links",
      priceRange: "Growth plan and above",
    },
    {
      name: "Review Automation",
      description: "Automated review requests sent after every job",
      priceRange: "Included in all plans",
    },
    {
      name: "AI Estimates",
      description:
        "AI-generated rough estimates that you review and approve before sending",
      priceRange: "Growth plan and above",
    },
    {
      name: "Contract Generation",
      description: "Automated proposals with scope, pricing, and terms",
      priceRange: "Pro plan",
    },
  ],
  serviceArea: {
    cities: ["Nationwide"],
    radius: "United States",
  },
  faqs: [
    {
      question: "How much does it cost?",
      answer:
        "Starter is $500/month + $3,000 setup. Growth is $1,500/month + $5,000 setup. Pro is $2,500/month + $10,000 setup. All plans are month-to-month with no contracts.",
    },
    {
      question: "How long does setup take?",
      answer:
        "We get you live within one week. We handle all the setup. You just tell us about your business.",
    },
    {
      question: "What trades do you work with?",
      answer:
        "Plumbing, HVAC, electrical, painting, landscaping, roofing, general contracting, and cleaning services.",
    },
    {
      question: "Is there a guarantee?",
      answer:
        "Yes. 30-day money-back guarantee on your setup fee. If you don't see results, we refund it.",
    },
  ],
  businessHours: {
    monday: { open: "08:00", close: "18:00" },
    tuesday: { open: "08:00", close: "18:00" },
    wednesday: { open: "08:00", close: "18:00" },
    thursday: { open: "08:00", close: "18:00" },
    friday: { open: "08:00", close: "18:00" },
  },
  emergencyAvailable: false,
  features: {
    chatbot: true,
    scheduling: true,
    invoicing: false,
    smsReminders: false,
    reviewRequests: false,
    leadCapture: true,
  },
};

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
  email: "ryan@mainlinehq.com",
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
      priceRange: "Custom automation",
    },
    {
      name: "Review Automation",
      description: "Automated review requests sent after every job",
      priceRange: "Included",
    },
    {
      name: "AI Estimates",
      description:
        "AI-generated rough estimates that you review and approve before sending",
      priceRange: "Custom automation",
    },
    {
      name: "Contract Generation",
      description: "Automated proposals with scope, pricing, and terms",
      priceRange: "Custom automation",
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
        "$297/month with a 14-day free trial. No setup fee, no contracts. We also build custom automation for anything else your business needs. Just tell us the problem.",
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
      question: "Are there contracts?",
      answer:
        "No. All plans are month-to-month. Cancel anytime with 30 days notice. We earn your business every month.",
    },
    {
      question: "How do I schedule a call or demo?",
      answer:
        "You can book a free 15-minute discovery call here: https://calendly.com/ryan-mainlinehq. No pitch, just a conversation about your business.",
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

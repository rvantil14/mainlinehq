// ============================================================
// Demo Client: Volt Electric Co.
// Template for electrical businesses
// ============================================================

import { ClientConfig } from "../types";

export const demoElectricalConfig: ClientConfig = {
  id: "demo-electrical",
  businessName: "Volt Electric Co.",
  businessType: "electrical",
  phoneNumber: "(555) 789-0123",
  email: "info@voltelectric.com",
  website: "https://voltelectric.com",
  address: "Austin, Texas",
  ownerName: "James Rivera",
  tagline: "Licensed Electricians You Can Trust",
  brandVoice: "professional",

  services: [
    {
      name: "Emergency Electrical Service",
      description: "24/7 emergency service for power outages, sparking outlets, burning smells, or exposed wiring",
      priceRange: "$150 to $500",
      estimatedDuration: "1 to 4 hours",
      isEmergency: true,
    },
    {
      name: "Electrical Panel Upgrade",
      description: "Upgrade your electrical panel from 100 to 200 amp service to handle modern electrical demands",
      priceRange: "$1,500 to $4,000",
      estimatedDuration: "4 to 8 hours",
    },
    {
      name: "Outlet & Switch Installation",
      description: "Install new outlets, switches, USB outlets, GFCI outlets, and smart switches",
      priceRange: "$100 to $300 per outlet",
      estimatedDuration: "30 minutes to 2 hours per outlet",
    },
    {
      name: "Lighting Installation",
      description: "Install recessed lights, ceiling fans, chandeliers, under cabinet lighting, and landscape lighting",
      priceRange: "$150 to $500 per fixture",
      estimatedDuration: "1 to 3 hours per fixture",
    },
    {
      name: "Whole Home Rewiring",
      description: "Complete rewiring for older homes with outdated knob and tube or aluminum wiring",
      priceRange: "$8,000 to $20,000 (based on home size)",
      estimatedDuration: "3 to 7 days",
    },
    {
      name: "EV Charger Installation",
      description: "Install Level 2 electric vehicle chargers (Tesla, ChargePoint, JuiceBox, and more)",
      priceRange: "$500 to $2,000 (plus charger cost)",
      estimatedDuration: "2 to 4 hours",
    },
    {
      name: "Generator Installation",
      description: "Whole home standby generator installation (Generac, Kohler) with automatic transfer switch",
      priceRange: "$5,000 to $15,000 (including generator)",
      estimatedDuration: "1 to 2 days",
    },
    {
      name: "Electrical Inspection",
      description: "Comprehensive electrical safety inspection for home buyers, sellers, or peace of mind",
      priceRange: "$150 to $300",
      estimatedDuration: "1 to 2 hours",
    },
  ],

  serviceArea: {
    cities: [
      "Austin", "Round Rock", "Cedar Park", "Georgetown",
      "Pflugerville", "Leander", "Bee Cave", "Lakeway",
      "Kyle", "Buda",
    ],
    radius: "35 miles from downtown Austin",
  },

  faqs: [
    {
      question: "Are you licensed?",
      answer: "Yes. We are a fully licensed master electrician (TX License #12345) with over 15 years of experience. All our work is done to code and we pull permits on every job that requires one.",
    },
    {
      question: "Do you offer free estimates?",
      answer: "We offer free estimates for most projects. For complex jobs requiring diagnosis (like tracking down an electrical issue), there is a $79 diagnostic fee that gets credited toward the repair if you hire us.",
    },
    {
      question: "How long does it take to install an EV charger?",
      answer: "Most EV charger installations take 2 to 4 hours if your panel has capacity. If a panel upgrade is needed, it may take an additional half day. We handle the permit and everything.",
    },
    {
      question: "Do you work on commercial properties?",
      answer: "Yes! We handle both residential and light commercial electrical work including office build outs, retail spaces, and restaurants.",
    },
    {
      question: "Can you add more circuits to my panel?",
      answer: "It depends on your current panel capacity. If your panel is full, we may need to upgrade it first. We will assess your panel during our visit and give you options.",
    },
  ],

  businessHours: {
    monday: { open: "07:00", close: "18:00" },
    tuesday: { open: "07:00", close: "18:00" },
    wednesday: { open: "07:00", close: "18:00" },
    thursday: { open: "07:00", close: "18:00" },
    friday: { open: "07:00", close: "18:00" },
    saturday: { open: "08:00", close: "14:00" },
  },
  emergencyAvailable: true,
  emergencyPhone: "(555) 789-0199",

  features: {
    chatbot: true,
    scheduling: true,
    invoicing: true,
    smsReminders: true,
    reviewRequests: true,
    leadCapture: true,
  },
};

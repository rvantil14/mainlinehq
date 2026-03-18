// ============================================================
// Demo Client: Ace Plumbing & Drain
// This is a fictional plumbing company used for demos and sales.
// Copy this file and customize it for each real client.
// ============================================================

import { ClientConfig } from "../types";

export const demoPlumbingConfig: ClientConfig = {
  id: "demo-plumbing",
  businessName: "Ace Plumbing & Drain",
  businessType: "plumbing",
  phoneNumber: "(555) 234-5678",
  email: "info@aceplumbing.com",
  website: "https://aceplumbing.com",
  address: "Riverside, California",
  ownerName: "Mike Torres",
  tagline: "Your Local Plumbing Experts Since 2010",
  brandVoice: "friendly",

  services: [
    {
      name: "Emergency Plumbing",
      description: "24/7 emergency service for burst pipes, major leaks, sewer backups, and no hot water situations",
      priceRange: "$150 to $500 (depending on severity)",
      estimatedDuration: "1 to 4 hours",
      isEmergency: true,
    },
    {
      name: "Drain Cleaning",
      description: "Professional drain cleaning for clogged sinks, showers, tubs, and main sewer lines",
      priceRange: "$99 to $350",
      estimatedDuration: "1 to 2 hours",
    },
    {
      name: "Water Heater Repair & Installation",
      description: "Repair or replace tank and tankless water heaters. We work with all major brands.",
      priceRange: "$200 to $2,500 (repair vs full replacement)",
      estimatedDuration: "2 to 6 hours",
    },
    {
      name: "Leak Detection & Repair",
      description: "Find and fix hidden leaks in walls, floors, and underground pipes using advanced detection equipment",
      priceRange: "$150 to $800",
      estimatedDuration: "1 to 4 hours",
    },
    {
      name: "Toilet Repair & Installation",
      description: "Fix running toilets, clogs, leaks, or install new toilets",
      priceRange: "$100 to $500",
      estimatedDuration: "1 to 2 hours",
    },
    {
      name: "Faucet & Fixture Installation",
      description: "Install or replace kitchen and bathroom faucets, garbage disposals, and other fixtures",
      priceRange: "$100 to $400 (plus cost of fixture)",
      estimatedDuration: "1 to 3 hours",
    },
    {
      name: "Sewer Line Repair",
      description: "Repair or replace damaged sewer lines, including trenchless options",
      priceRange: "$500 to $5,000+",
      estimatedDuration: "4 to 8 hours",
    },
    {
      name: "Repipe / Repiping",
      description: "Full or partial home repiping for older homes with galvanized or polybutylene pipes",
      priceRange: "$2,000 to $15,000",
      estimatedDuration: "1 to 3 days",
    },
  ],

  serviceArea: {
    cities: [
      "Riverside",
      "Corona",
      "Moreno Valley",
      "Norco",
      "Eastvale",
      "Jurupa Valley",
      "Rubidoux",
      "Glen Avon",
      "Mira Loma",
    ],
    radius: "25 miles from downtown Riverside",
  },

  faqs: [
    {
      question: "Do you charge for estimates?",
      answer: "We provide free estimates for most jobs. For complex projects like repiping or sewer line work, there may be a diagnostic fee of $49 that gets applied to the cost of the job if you move forward with us.",
    },
    {
      question: "Are you licensed and insured?",
      answer: "Absolutely. We are fully licensed (CA License #1234567), bonded, and insured. All our technicians are background checked and drug tested.",
    },
    {
      question: "Do you offer financing?",
      answer: "Yes, we offer financing through GreenSky for larger projects. You can apply online and get approved in minutes with payments as low as $50/month.",
    },
    {
      question: "How quickly can you get here?",
      answer: "For emergencies, we typically arrive within 60 to 90 minutes. For scheduled appointments, we offer same day and next day service when available.",
    },
    {
      question: "Do you guarantee your work?",
      answer: "Yes. All our work comes with a 1 year labor warranty. Parts warranties vary by manufacturer but are typically 5 to 10 years. If something we fixed breaks again within the warranty period, we will come back and fix it at no charge.",
    },
    {
      question: "What forms of payment do you accept?",
      answer: "We accept cash, checks, all major credit cards (Visa, Mastercard, Amex, Discover), and offer financing for larger jobs. Payment is due upon completion of work.",
    },
  ],

  businessHours: {
    monday: { open: "07:00", close: "18:00" },
    tuesday: { open: "07:00", close: "18:00" },
    wednesday: { open: "07:00", close: "18:00" },
    thursday: { open: "07:00", close: "18:00" },
    friday: { open: "07:00", close: "18:00" },
    saturday: { open: "08:00", close: "14:00" },
    // Sunday: closed (not defined)
  },
  emergencyAvailable: true,
  emergencyPhone: "(555) 234-5679",

  features: {
    chatbot: true,
    scheduling: true,
    invoicing: true,
    smsReminders: true,
    reviewRequests: true,
    leadCapture: true,
  },
};

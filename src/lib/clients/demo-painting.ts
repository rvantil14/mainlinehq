// ============================================================
// Demo Client: Fresh Coat Painters
// Template for painting businesses
// ============================================================

import { ClientConfig } from "../types";

export const demoPaintingConfig: ClientConfig = {
  id: "demo-painting",
  businessName: "Fresh Coat Painters",
  businessType: "painting",
  phoneNumber: "(555) 321-6543",
  email: "info@freshcoatpainters.com",
  website: "https://freshcoatpainters.com",
  address: "Denver, Colorado",
  ownerName: "Maria Santos",
  tagline: "Transforming Homes One Coat at a Time",
  brandVoice: "friendly",

  services: [
    {
      name: "Interior Painting",
      description: "Full interior painting including walls, ceilings, trim, and doors. We handle all prep work, patching, and cleanup.",
      priceRange: "$1,500 to $6,000 per room or $2 to $5 per square foot",
      estimatedDuration: "1 to 5 days depending on project size",
    },
    {
      name: "Exterior Painting",
      description: "Complete exterior painting including siding, trim, shutters, doors, and garage doors. Includes power washing and prep.",
      priceRange: "$3,000 to $15,000 depending on home size",
      estimatedDuration: "3 to 7 days",
    },
    {
      name: "Cabinet Painting & Refinishing",
      description: "Transform your kitchen or bathroom with professionally painted cabinets. Includes degreasing, sanding, priming, and 2 coats of paint.",
      priceRange: "$3,000 to $8,000",
      estimatedDuration: "3 to 5 days",
    },
    {
      name: "Deck & Fence Staining",
      description: "Power wash and stain or seal your deck, fence, or pergola to protect against Colorado weather",
      priceRange: "$500 to $3,000",
      estimatedDuration: "1 to 3 days",
    },
    {
      name: "Drywall Repair",
      description: "Patch holes, fix water damage, repair cracks, and skim coat walls before painting",
      priceRange: "$200 to $1,000 depending on extent",
      estimatedDuration: "1 to 2 days (including dry time)",
    },
    {
      name: "Color Consultation",
      description: "Free in home color consultation with our certified color specialist. We bring sample boards and help you choose the perfect palette.",
      priceRange: "Free with any painting project",
      estimatedDuration: "1 hour",
    },
    {
      name: "Commercial Painting",
      description: "Office spaces, retail locations, restaurants, and HOA common areas. We work nights and weekends to minimize disruption.",
      priceRange: "Custom quote based on scope",
      estimatedDuration: "Varies by project",
    },
  ],

  serviceArea: {
    cities: [
      "Denver", "Aurora", "Lakewood", "Englewood", "Littleton",
      "Centennial", "Highlands Ranch", "Parker", "Castle Rock",
      "Arvada", "Westminster", "Broomfield", "Golden",
    ],
    radius: "30 miles from downtown Denver",
  },

  faqs: [
    {
      question: "What paint brands do you use?",
      answer: "We use premium paints from Benjamin Moore, Sherwin Williams, and Behr. For most projects we recommend Benjamin Moore Regal Select for interiors and Aura for exteriors. Higher quality paint means better coverage, richer color, and longer lasting results.",
    },
    {
      question: "How long will the paint last?",
      answer: "Interior paint typically lasts 7 to 10 years with proper care. Exterior paint lasts 5 to 7 years in Colorado's climate. Using premium paint and proper prep work extends these timelines significantly.",
    },
    {
      question: "Do I need to move my furniture?",
      answer: "No! We handle all furniture moving and covering. We use drop cloths on all floors and plastic sheeting on furniture. Everything goes back where it was when we are done.",
    },
    {
      question: "How do you handle prep work?",
      answer: "Prep is everything. We fill all holes and cracks, sand smooth surfaces, caulk gaps, prime stains, and tape off edges. For exteriors, we power wash, scrape loose paint, and prime bare wood. Proper prep is what separates a professional job from a DIY one.",
    },
    {
      question: "Do you offer warranties?",
      answer: "Yes! We offer a 3 year warranty on all interior work and a 5 year warranty on exterior work. If the paint peels, cracks, or blisters due to our workmanship, we come back and fix it free of charge.",
    },
    {
      question: "Can you match an existing color?",
      answer: "Absolutely. Bring us a sample or show us the existing paint and we can color match it exactly. We can also work with paint codes if you have them.",
    },
  ],

  businessHours: {
    monday: { open: "08:00", close: "17:00" },
    tuesday: { open: "08:00", close: "17:00" },
    wednesday: { open: "08:00", close: "17:00" },
    thursday: { open: "08:00", close: "17:00" },
    friday: { open: "08:00", close: "17:00" },
    saturday: { open: "09:00", close: "13:00" },
  },
  emergencyAvailable: false,

  features: {
    chatbot: true,
    scheduling: true,
    invoicing: true,
    smsReminders: true,
    reviewRequests: true,
    leadCapture: true,
  },
};

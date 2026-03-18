// ============================================================
// Demo Client: Summit HVAC Solutions
// Template for HVAC businesses
// ============================================================

import { ClientConfig } from "../types";

export const demoHvacConfig: ClientConfig = {
  id: "demo-hvac",
  businessName: "Summit HVAC Solutions",
  businessType: "hvac",
  phoneNumber: "(555) 456-7890",
  email: "info@summithvac.com",
  website: "https://summithvac.com",
  address: "Phoenix, Arizona",
  ownerName: "Sarah Chen",
  tagline: "Keeping You Comfortable Year Round",
  brandVoice: "professional",

  services: [
    {
      name: "Emergency AC Repair",
      description: "24/7 emergency air conditioning repair. We know how dangerous Arizona heat can be.",
      priceRange: "$150 to $600",
      estimatedDuration: "1 to 4 hours",
      isEmergency: true,
    },
    {
      name: "Emergency Heating Repair",
      description: "24/7 furnace and heat pump repair when you need warmth fast",
      priceRange: "$150 to $600",
      estimatedDuration: "1 to 4 hours",
      isEmergency: true,
    },
    {
      name: "AC Tune Up / Maintenance",
      description: "Comprehensive AC inspection, cleaning, and tune up to keep your system running efficiently and prevent breakdowns",
      priceRange: "$89 to $149",
      estimatedDuration: "1 to 2 hours",
    },
    {
      name: "Furnace Tune Up / Maintenance",
      description: "Complete furnace inspection, cleaning, and safety check before winter",
      priceRange: "$89 to $149",
      estimatedDuration: "1 to 2 hours",
    },
    {
      name: "AC Installation / Replacement",
      description: "New air conditioning system installation. We carry all major brands including Carrier, Lennox, Trane, and Goodman.",
      priceRange: "$3,500 to $12,000 (depends on system size and efficiency)",
      estimatedDuration: "1 to 2 days",
    },
    {
      name: "Furnace Installation / Replacement",
      description: "New furnace installation with all major brands available",
      priceRange: "$2,500 to $8,000",
      estimatedDuration: "1 day",
    },
    {
      name: "Duct Cleaning",
      description: "Professional air duct cleaning to improve air quality and system efficiency",
      priceRange: "$300 to $800 (based on home size)",
      estimatedDuration: "3 to 5 hours",
    },
    {
      name: "Indoor Air Quality",
      description: "Air purifiers, humidifiers, UV lights, and filtration system installation",
      priceRange: "$200 to $2,000",
      estimatedDuration: "2 to 4 hours",
    },
    {
      name: "Smart Thermostat Installation",
      description: "Install and configure smart thermostats (Nest, Ecobee, Honeywell) for optimal comfort and energy savings",
      priceRange: "$150 to $400 (including thermostat)",
      estimatedDuration: "1 hour",
    },
  ],

  serviceArea: {
    cities: [
      "Phoenix", "Scottsdale", "Tempe", "Mesa", "Chandler",
      "Gilbert", "Glendale", "Peoria", "Surprise", "Goodyear",
    ],
    radius: "40 miles from central Phoenix",
  },

  faqs: [
    {
      question: "How often should I service my AC?",
      answer: "We recommend a professional tune up twice a year: once in spring before cooling season and once in fall before heating season. Regular maintenance extends the life of your system by 5 to 10 years and prevents costly breakdowns.",
    },
    {
      question: "How do I know if I need a new AC unit?",
      answer: "Consider replacement if your system is over 15 years old, requires frequent repairs, your energy bills are rising, it uses R22 refrigerant (being phased out), or it cannot keep your home comfortable. We offer free in home consultations to help you decide.",
    },
    {
      question: "Do you offer financing?",
      answer: "Yes! We offer 0% financing for 12 months on qualifying systems, and extended financing options up to 72 months through Wells Fargo. Apply online and get approved in minutes.",
    },
    {
      question: "Are you licensed and insured?",
      answer: "Yes. We are a licensed HVAC contractor (AZ ROC #123456), fully bonded, and carry $2M in liability insurance. All our technicians are NATE certified.",
    },
    {
      question: "What brands do you work on?",
      answer: "We service and install all major brands: Carrier, Lennox, Trane, Goodman, Rheem, Daikin, Mitsubishi, and more. We are a Carrier Factory Authorized Dealer.",
    },
  ],

  businessHours: {
    monday: { open: "07:00", close: "19:00" },
    tuesday: { open: "07:00", close: "19:00" },
    wednesday: { open: "07:00", close: "19:00" },
    thursday: { open: "07:00", close: "19:00" },
    friday: { open: "07:00", close: "19:00" },
    saturday: { open: "08:00", close: "16:00" },
    sunday: { open: "09:00", close: "14:00" },
  },
  emergencyAvailable: true,
  emergencyPhone: "(555) 456-7899",

  features: {
    chatbot: true,
    scheduling: true,
    invoicing: true,
    smsReminders: true,
    reviewRequests: true,
    leadCapture: true,
  },
};

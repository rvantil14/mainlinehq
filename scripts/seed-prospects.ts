// Run with: npx tsx scripts/seed-prospects.ts
// Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are in your .env

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, key);

const prospects = [
  {
    business_name: "LY's Plumbing",
    owner_name: null,
    trade_type: "plumbing",
    phone: "(619) 486-9855",
    email: null,
    website: "https://residentialplumbingsandiego.com",
    city: "San Diego",
    state: "CA",
    google_reviews: null,
    has_chat_widget: false,
    has_website: true,
    status: "researched",
    notes: "Residential + commercial plumbing. Hours M-F 8-5, Sat 8-12, closed Sunday. No email listed, no chat, no online booking. Pain points: missing after-hours calls, no way for customers to reach them on evenings/weekends/Sunday. Basic website. San Diego 92103.",
  },
  {
    business_name: "Express Plumbing San Diego",
    owner_name: null,
    trade_type: "plumbing",
    phone: null,
    email: null,
    website: "https://expressplumbingwaterheaters.com",
    city: "San Diego",
    state: "CA",
    google_reviews: null,
    has_chat_widget: false,
    has_website: true,
    status: "researched",
    notes: "Focuses on water heater install/repair/replacement. Very thin website with almost no content. No phone visible, no email, no chat. Pain points: website isn't generating leads, no contact method besides maybe a form. Harder to contact, find number on Google Maps.",
  },
  {
    business_name: "Solid Plumbing & Drains Inc",
    owner_name: null,
    trade_type: "plumbing",
    phone: "(619) 597-2566",
    email: "solidplumbingdrains@gmail.com",
    website: "https://solidplumbingdrains.com",
    city: "San Diego",
    state: "CA",
    google_reviews: null,
    has_chat_widget: false,
    has_website: true,
    status: "researched",
    notes: "Licensed CSLB #1056718. Full service: residential, commercial, emergency, hydro jetting, camera inspections, sewer line, backflow. Has dispatchers and fleet of trucks (likely 3-10 employees). 24/7 phone support but no chat. Uses Gmail = small operation. Pain points: using personal Gmail, no chat on site, probably missing web leads. Good prospect, established operation. Address: 1901 1st Ave Suite 217-H, SD 92101.",
  },
  {
    business_name: "Next Level Plumbing",
    owner_name: null,
    trade_type: "plumbing",
    phone: null,
    email: null,
    website: "https://oceansideplumbingservices.com",
    city: "Oceanside",
    state: "CA",
    google_reviews: null,
    has_chat_widget: false,
    has_website: true,
    status: "researched",
    notes: "Very minimal website, almost no info visible. Based in Oceanside 92058. Pain points: website is barely functional, not generating any leads. Find phone number on Google Maps before calling.",
  },
  {
    business_name: "Absolute Plumbing",
    owner_name: null,
    trade_type: "plumbing",
    phone: "(619) 862-0397",
    email: null,
    website: "https://absoluteplumbingheating.com",
    city: "San Diego",
    state: "CA",
    google_reviews: null,
    has_chat_widget: false,
    has_website: true,
    status: "researched",
    notes: "TOP PROSPECT. 30+ years experience. Full service: drains, hydro jetting, leak detection, cameras, water heaters, repiping, gas lines, kitchen/bath remodels. 24/7 emergency. No email listed, just contact form. Pain points: long-established business with no chat, no online booking, relying entirely on phone. 30 years = owner probably not tech-savvy and would love a done-for-you solution.",
  },
  {
    business_name: "A&A Plumbing",
    owner_name: null,
    trade_type: "plumbing",
    phone: "(619) 637-5215",
    email: null,
    website: "https://aaplumbingsandiego.com",
    city: "San Diego",
    state: "CA",
    google_reviews: null,
    has_chat_widget: false,
    has_website: true,
    status: "researched",
    notes: "TOP PROSPECT. 20+ years experience. Serves SD, National City, Chula Vista. Full service: drains, leak detection, water heaters, slab leaks, hydro jetting, gas lines. Hours M-Sat 7am-11:30pm, 24/7 emergency. No email on site. Pain points: open late but still phone-only, no chat, no online booking. Established and probably has steady work but missing online leads.",
  },
  {
    business_name: "Lifetime Plumbing & Drains",
    owner_name: null,
    trade_type: "plumbing",
    phone: "(619) 495-6162",
    email: "info@lifetimeplumbing.com",
    website: "https://lifetimeplumbing.com",
    city: "San Diego",
    state: "CA",
    google_reviews: null,
    has_chat_widget: false,
    has_website: true,
    status: "researched",
    notes: "TOP PROSPECT. 1-10 employees. Licensed CSLB# 1147450. Full service: emergency, repiping, leak detection, slab leaks, drains, water heaters, gas lines, water filtration. Contact form but no chat. Pain points: small team means calls go missed when techs are on jobs. Has a proper email which shows some professionalism. Address: 2535 Camino Del Rio S #348, SD 92108.",
  },
  {
    business_name: "Cass Plumbing",
    owner_name: null,
    trade_type: "plumbing",
    phone: null,
    email: null,
    website: "http://cassplumbing.com",
    city: "San Diego",
    state: "CA",
    google_reviews: null,
    has_chat_widget: false,
    has_website: true,
    status: "researched",
    notes: "SSL certificate EXPIRED. Website is literally broken and showing security warnings to visitors. Pain points: their website is turning away customers right now. If you can reach them, the pitch writes itself. Find number on Google Maps.",
  },
  {
    business_name: "Plumbing Drains Solutions",
    owner_name: null,
    trade_type: "plumbing",
    phone: null,
    email: null,
    website: "https://sandiegoplumber.biz",
    city: "San Diego",
    state: "CA",
    google_reviews: null,
    has_chat_widget: false,
    has_website: true,
    status: "researched",
    notes: "Emergency plumbing, drain cleaning, sewer lines, water heaters. WordPress site. No phone visible on site. Downtown SD 92101. Pain points: no visible phone number is terrible for converting visitors. No chat. Find number on Google Maps.",
  },
  {
    business_name: "Coastal Rooter",
    owner_name: null,
    trade_type: "plumbing",
    phone: null,
    email: null,
    website: "https://coastalrooterca.com",
    city: "Chula Vista",
    state: "CA",
    google_reviews: null,
    has_chat_widget: false,
    has_website: true,
    status: "researched",
    notes: "Positions as '#1 Plumbing Company' in Chula Vista. Limited web presence, no chat. Pain points: limited info on site, no chat. Find number on Google Maps.",
  },
  {
    business_name: "RDZ Plumbing",
    owner_name: null,
    trade_type: "plumbing",
    phone: null,
    email: null,
    website: "https://www.rdzplumbing.com",
    city: "San Diego",
    state: "CA",
    google_reviews: null,
    has_chat_widget: false,
    has_website: true,
    status: "researched",
    notes: "Website blocked scraping (403). Could not pull details. Find all info on Google Maps before calling.",
  },
  {
    business_name: "Pipe Patrol Plumbers & Drains",
    owner_name: null,
    trade_type: "plumbing",
    phone: "(858) 324-6400",
    email: null,
    website: "https://pipepatrolplumbing.com",
    city: "San Diego",
    state: "CA",
    google_reviews: null,
    has_chat_widget: false,
    has_website: true,
    status: "researched",
    notes: "TOP PROSPECT. 15+ years experience. Drains, repairs, water heaters, sewer lines, leak detection, emergency. Network of licensed contractors. Hours 7am-10pm. Serves all SD county. Contact form only, no chat. Pain points: closes at 10pm so missing late night emergency calls, no chat for web visitors, using contractor network model = coordination overhead.",
  },
];

async function seed() {
  console.log(`Inserting ${prospects.length} prospects...`);

  const { data, error } = await supabase
    .from("prospects")
    .insert(prospects)
    .select("id, business_name");

  if (error) {
    console.error("Error inserting prospects:", error.message);
    process.exit(1);
  }

  console.log(`Successfully inserted ${data.length} prospects:`);
  data.forEach((p) => console.log(`  - ${p.business_name} (${p.id.slice(0, 8)})`));
}

seed();

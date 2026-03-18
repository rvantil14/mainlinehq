TRADESAI
AI Automation Agency for Trade Businesses
Complete Business Plan, Technical Architecture & Build Guide
Prepared for Ryan  |  March 2026
CONFIDENTIAL
1. Executive Summary
TradesAI is an AI automation agency that delivers turnkey AI solutions to small trade businesses (plumbing, HVAC, electrical, painting, landscaping, and general contracting). These businesses are too busy running jobs to figure out technology, yet they desperately need it to compete. TradesAI bridges that gap by packaging AI chatbots, automated scheduling, invoicing, payment processing, and customer communication into a simple monthly service.
The Opportunity
Market Size: The U.S. home services market is projected to exceed $800 billion in 2026, with the field service management software market alone at $6.26 billion and growing at 11.5% CAGR.
Adoption Gap: While 68% of small businesses now use some form of AI, only 12% of trade contractors have fully embedded AI into their operations. 54% say they plan to invest in AI within 1 to 3 years. This is the window.
Labor Crisis: 46% of trade business owners report difficulty finding skilled workers. AI automation directly addresses the labor shortage by handling administrative tasks that would otherwise require additional hires.
Proven ROI: Service businesses using AI in at least one workflow report 4.3x ROI in their first year, with payback periods of 2 to 6 months.
The Business Model
Setup Fee: $3,000 to $10,000 per client (depending on package)
Monthly Retainer: $500 to $2,500 per client per month
Infrastructure Cost: $50 to $200 per client per month
Gross Margin: 70 to 85%
Year 1 Target: 10 clients = $120,000 to $300,000 annual revenue
Year 2 Target: 30 clients = $360,000 to $900,000 annual revenue
2. Market Analysis: What the Research Shows
2.1 Target Customer Profile
The ideal customer is a small trade business with 3 to 50 employees, $250K to $5M in annual revenue, and an owner who is too busy doing the actual work to deal with technology. They are currently losing money from missed calls, forgotten follow ups, slow invoicing, and manual scheduling.
Trade
Avg Revenue
Profit Margin
AI Readiness
Plumbing
$500K to $2M
20 to 35%
High (highest adoption)
HVAC
$500K to $3M
15 to 25%
High
Electrical
$400K to $2M
15 to 25%
High (highest satisfaction)
Painting
$200K to $1M
20 to 40%
Medium
Landscaping
$300K to $1.5M
15 to 25%
Medium
General Contracting
$500K to $5M
10 to 20%
Medium
2.2 Pain Points You Will Solve
Every trade business owner deals with the same problems. Here is what they lose money on every single day, and exactly what you will fix:
Missed Calls and Lost Leads. A plumber on a job cannot answer the phone. That caller goes to the next listing. An AI receptionist answers 24/7, books the appointment, and captures the lead instantly.
Manual Scheduling Chaos. Most small shops still use whiteboards or paper calendars. Double bookings, forgotten appointments, and wasted drive time are the norm. Automated scheduling with route optimization solves this immediately.
Slow Invoicing and Late Payments. Many trade businesses send invoices days or weeks after completing a job. Some forget entirely. Automatic invoice generation at job completion with payment links via text message gets them paid same day.
Zero Follow Up. After a job is done, the customer never hears from the business again. Automated review requests, maintenance reminders, and seasonal promotions keep revenue flowing without the owner lifting a finger.
No Online Presence. Many trade businesses have either no website or one built in 2014. A modern, AI integrated landing page with chat, booking, and reviews converts visitors into customers.
2.3 Competitive Landscape
The market has large platforms and emerging AI startups, but a massive gap exists for personalized, done for you implementation at the small business level:
Competitor
Price/Month
Target
AI Level
Your Advantage
ServiceTitan
$250 to $500/tech
Enterprise
Advanced
Too expensive and complex for small shops
Housecall Pro
$69 to $149
SMB
Moderate
Self serve. Your clients want done for you.
Jobber
$25 to $109
SMB
Basic
Limited AI. No chatbot or voice AI.
Netic
Custom (high)
Enterprise
Advanced
Enterprise only. Small shops cannot afford.
TradesAI (You)
$500 to $2,500
Small Trades
Tailored
Done for you, affordable, personalized
Your positioning is clear: you are the done for you AI partner for small trade businesses that cannot afford enterprise software but desperately need automation. The big platforms are either self serve (Jobber, Housecall Pro) or enterprise priced (ServiceTitan, Netic). You fill the middle.
3. What You Will Sell: Service Packages
Tier 1: Starter  |  $500/month + $3,000 Setup
For the solo operator or 2 to 5 person shop that just needs the basics:
AI chatbot on their website that answers FAQs, captures leads, and books appointments 24/7
Online booking system synced to their calendar
Automated appointment reminders via SMS
Automated review request after job completion
Basic monthly performance report
Tier 2: Growth  |  $1,500/month + $5,000 Setup
For the 5 to 20 person operation ready to scale:
Everything in Starter, plus:
AI phone receptionist that handles calls when the owner cannot answer
Automated invoicing and payment collection via text message
Smart scheduling with technician assignment and route optimization
CRM setup and management (lead tracking from call to close)
Automated follow up sequences (maintenance reminders, seasonal promotions)
Google Business Profile optimization
Tier 3: Pro  |  $2,500/month + $10,000 Setup
For the established shop with 15 to 50 employees looking for full automation:
Everything in Growth, plus:
Custom AI trained on their specific services, pricing, and service area
Multi technician dispatch and scheduling optimization
Automated quote generation based on job type
Customer portal for job status, payments, and history
Integration with QuickBooks or other accounting software
Monthly strategy call with performance review and optimization
Priority support with same day response
Add On Services
Website Build/Redesign: $2,000 to $5,000 one time
Google Ads Management: $500/month + ad spend
Social Media Automation: $300/month
Additional AI Training/Custom Features: $150/hour
4. Technical Architecture: How to Build It
4.1 Core Tech Stack
This is the exact stack you will use. Everything is chosen for cost efficiency, scalability, and ease of management as a solo founder:
Component
Tool
Monthly Cost
Why This One
AI Chatbot
Claude API (Haiku/Sonnet)
$3 to $50/client
Best cost/quality ratio. Batch API = 50% off.
Chatbot UI
Botpress or custom widget
$0 to $79/mo
White label, multi channel, production ready
Scheduling
Cal.com (self hosted)
$0 to $15/client
Open source, API first, embeddable
Payments
Stripe
2.9% + $0.30/txn
Industry standard. Best APIs.
Invoicing
Stripe Invoicing API
Included w/ Stripe
Auto generate, auto send, auto collect
SMS/Voice
Twilio
$5 to $50/client
Pay as you go. SMS + voice + WhatsApp.
CRM
Pipedrive
$15 to $30/client
Intuitive. Sales focused. Great API.
Automation
Make.com (start) / n8n (scale)
$20 to $100
Visual workflows. n8n = self hosted savings.
Database
Supabase
$25 to $50
PostgreSQL + Auth + Realtime. All in one.
Frontend
Next.js on Vercel
$20 to $50
Fast. Free tier generous. Great DX.
Total infrastructure cost per client: $50 to $200/month depending on usage volume. At a $1,500/month retainer, that is 87% to 97% gross margin on recurring revenue.
4.2 System Architecture Overview
Here is how the pieces connect for a typical trade business client:
Customer visits website and the AI chatbot (Claude API via Botpress widget) greets them, answers questions about services and pricing, and captures their information.
Chatbot books appointment directly through Cal.com API, matching the customer's need with technician availability and location.
Twilio sends SMS confirmation to the customer with appointment details, plus a reminder 24 hours before and 1 hour before the job.
Lead is created in Pipedrive CRM automatically via Make.com automation, tracking the customer from first contact through job completion.
After job completion, the technician marks it done in the system. Stripe Invoicing API generates and sends an invoice with a payment link via SMS.
Customer pays via text, Stripe processes payment, and the system automatically sends a receipt and a Google review request.
Follow up automation kicks in: maintenance reminders at 6 months, seasonal promotion emails, and rebooking nudges for recurring services.
4.3 What to Build with Claude API
The Claude API is your primary competitive advantage. Here is exactly what you will build with it:
Intelligent Website Chatbot. Train it on each client's specific services, pricing, service area, and FAQs. Use Claude Haiku for cost efficiency (roughly $0.003 per conversation). Implement prompt caching for common questions to cut costs by 90%.
Lead Qualification Engine. The chatbot classifies incoming requests (emergency vs maintenance vs estimate request) and routes them appropriately. Emergency = instant notification to owner. Estimate = automated booking. Maintenance = scheduled callback.
Quote Generator. For standard jobs, Claude generates ballpark estimates based on job type, square footage, and complexity. Example: a customer describes their painting job and gets an instant range estimate before the technician even arrives.
Review Response Writer. Claude drafts personalized responses to Google reviews (both positive and negative) for the owner to approve and post. This saves hours per week and improves online reputation.
Customer Communication. Generate professional follow up emails, maintenance reminder text messages, and seasonal promotion copy, all customized to each business's voice and services.
5. Build Roadmap: Phase by Phase
Phase 1: MVP (Weeks 1 to 4) — Get Your First Paying Client
The goal here is speed to revenue. Build the minimum viable product and get one paying client. Do not over engineer. Ship fast.
Week 1 to 2: Core Chatbot
Build a Claude API powered chatbot with a simple web widget
Create a system prompt template that can be customized per client (services, pricing, area, hours)
Connect to Cal.com for appointment booking
Deploy on a simple Next.js landing page
Week 3: Automation Layer
Set up Make.com workflows: chatbot lead capture to Pipedrive CRM to SMS confirmation via Twilio
Build invoice automation: job completion trigger to Stripe invoice to SMS payment link
Create automated review request sequence (sent 2 hours after job completion)
Week 4: Package and Sell
Create your own website and landing page showcasing the service
Build a demo you can show prospects (use a fake plumbing company as the example)
Reach out to 50 local trade businesses. Offer the first client a discounted rate ($250/month) in exchange for a case study and testimonial.
Phase 2: Productize (Months 2 to 3) — Scale to 5 to 10 Clients
Build a client onboarding process: intake form that captures business details, services, pricing, FAQ answers, and branding
Create reusable templates so spinning up a new client takes hours, not days
Build a simple admin dashboard (Supabase + Next.js) to manage all clients from one place
Add AI phone receptionist via Twilio Voice + Claude API for the Growth tier
Create case study content from your first client's results
Begin outbound sales: local networking, Facebook groups for contractors, door to door at supply houses
Phase 3: Scale (Months 4 to 6) — 10 to 30 Clients
Migrate from Make.com to self hosted n8n for cost savings at scale
Build white label client dashboard where business owners can see their leads, appointments, and revenue
Add QuickBooks integration for Pro tier clients
Hire a part time VA for client support and onboarding
Explore referral partnerships: offer $500 referral bonus to existing clients
Consider hiring a part time sales person on commission
Phase 4: Platform (Months 7 to 12) — 30+ Clients
Build full multi tenant SaaS platform (shared infrastructure, isolated data per client)
Add advanced features: dispatch optimization, fleet tracking, customer portal
Explore vertical expansion: cleaning services, pest control, roofing, moving companies
Consider raising a small round of funding or bootstrapping to profitability
Build content marketing engine: blog posts, YouTube tutorials, case studies targeting trade business owners
6. Critical Gaps: What Is Missing from Your Plan
Based on deep research of what works and what fails in this space, here are the gaps that would sink most people and exactly how to address each one:
6.1 Legal and Compliance
Business entity: Form an LLC immediately. You will be handling client data and processing payments. Personal liability protection is not optional.
Service agreements: You need a solid contract template covering scope of work, payment terms, data handling, uptime guarantees, and termination clauses. Budget $500 to $1,500 for a lawyer to draft this.
Data privacy: You will handle customer PII (names, phone numbers, addresses). Implement proper data encryption, access controls, and a privacy policy. CCPA compliance is required if serving California businesses.
Payment processing compliance: Stripe handles PCI compliance for you, but document this in your agreements.
6.2 Sales and Client Acquisition Strategy
This is the number one reason AI agencies fail: they build the tech but have no plan for getting clients. Here is your playbook:
Direct outreach (highest conversion): Visit plumbing supply houses, electrical distributors, and contractor hangouts. These owners are there in person. Bring a tablet showing the demo. Offer a free audit of their current online presence and missed call rate.
Local SEO and Google Ads: Target searches like 'AI for plumbing business' and 'automated scheduling for contractors' in your metro area.
Trade association partnerships: Join your local plumbing, HVAC, and electrical contractor associations. Offer to give a free presentation on 'How AI Can Book You More Jobs Without Hiring.' This positions you as the expert.
Referral program: Offer existing clients $500 off their next month for every referral that signs up. Trade business owners know other trade business owners.
Content marketing: Create short YouTube videos showing 'before and after' of businesses you have automated. Trade owners watch YouTube. A 3 minute video of a live chatbot booking an appointment is worth more than any sales pitch.
6.3 Client Success and Retention
Onboarding process: You need a structured 2 week onboarding for every client. Intake form, kickoff call, system setup, testing, training, and go live. Document every step.
Monthly reporting: Send every client a simple monthly report showing: calls handled by AI, appointments booked, invoices sent, payments collected, and review requests sent. Show them the ROI every month so they never question the cost.
SLA and support: Define response times. Starter tier = 48 hour response. Growth = 24 hour. Pro = same day. Set expectations upfront.
Churn prevention: The number one reason clients leave is they stop seeing value. The monthly report solves this. Also schedule a quarterly review call with every client to discuss optimization and upsell opportunities.
6.4 Financial Planning
Startup costs: Budget $3,000 to $5,000 for LLC formation, lawyer fees, initial software subscriptions, and a professional website for your agency.
Cash flow management: Collect setup fees upfront (before doing any work) and monthly retainers on the 1st. Never start work without payment.
Pricing psychology: Always frame pricing in terms of ROI. Do not say 'it costs $1,500 per month.' Say 'if this system books you 5 extra jobs per month at $500 average, that is $2,500 in new revenue for a $1,500 investment. You make your money back in the first 2 weeks.'
Tax planning: Set aside 25 to 30% of revenue for taxes. Consult a CPA before year end.
6.5 Technical Gaps to Address
Error handling and monitoring: Set up alerts (Sentry, UptimeRobot) so you know when a chatbot goes down or an automation fails before your client does.
Backup and redundancy: If Cal.com goes down, appointments stop booking. Have fallback procedures documented.
Testing protocol: Before going live with any client, run 50 test conversations through the chatbot, book 10 test appointments, send 5 test invoices. Never ship untested.
Version control: Keep system prompts, automation workflows, and configurations in Git. When you have 20 clients, you need to know exactly what each one is running.
7. Revenue Projections
Conservative Scenario (Year 1)
Month
New Clients
Total Clients
Setup Revenue
Monthly Rev
Total Rev
Month 1
1
1
$3,000
$500
$3,500
Month 2
1
2
$3,000
$1,000
$4,000
Month 3
1
3
$5,000
$2,500
$7,500
Month 6
2
8
$10,000
$8,000
$18,000
Month 12
2
15
$10,000
$18,000
$28,000
Year 1 Total (Conservative): Approximately $150,000 to $200,000 in revenue with 15 clients. After infrastructure costs (~$150/client/month = $27,000/year) and business expenses (~$15,000/year), net profit of approximately $108,000 to $158,000.
Aggressive Scenario (Year 1)
If you execute the sales playbook aggressively and land a mix of Growth and Pro tier clients:
20 clients by month 12 (average $1,500/month retainer + $5,000 average setup)
Year 1 revenue: $280,000 to $360,000
Year 1 net profit: $200,000 to $280,000
The key insight: recurring revenue compounds. By month 12, you are earning $18,000 to $30,000 per month in retainers alone. That is $216,000 to $360,000 annualized before any new setup fees. This is a real business.
8. Getting Started: What to Build First in Code
Here is the priority order for what to build and prototype using the Claude API. Each of these can be developed and tested before you have a single client:
Priority 1: AI Chatbot Core (Build This Week)
Build a Python or Node.js script that takes a system prompt (customized per business) and handles a conversation via the Claude API. This is the heart of everything.
What the system prompt needs to include for each client:
Business name, phone number, service area, and hours of operation
Complete list of services offered with price ranges
Common FAQs and their answers
Booking instructions (what information to collect from the customer)
Emergency vs non emergency classification rules
Tone and personality guidelines (friendly and professional for most trades)
Priority 2: Booking Integration (Week 2)
Connect the chatbot to Cal.com API so it can actually book appointments. The chatbot collects customer info, checks availability via the Cal.com API, and confirms the booking, all within the conversation.
Priority 3: SMS Automation (Week 2 to 3)
Use Twilio API to send appointment confirmations, reminders, and post job follow ups. This is straightforward API integration. Appointment booked triggers confirmation SMS. 24 hours before triggers reminder. Job completed triggers invoice and review request.
Priority 4: Invoice Automation (Week 3)
Use Stripe Invoicing API to generate and send invoices automatically when a job is marked complete. Include a payment link in the SMS so the customer can pay instantly from their phone.
Priority 5: Automation Orchestration (Week 3 to 4)
Wire everything together in Make.com. The key workflows are: New chatbot lead creates a deal in Pipedrive. Appointment booked sends SMS confirmation. Job completed generates Stripe invoice and sends payment link. Payment received sends receipt and review request. No response in 3 days sends follow up.
Priority 6: Demo Environment (Week 4)
Build a complete demo for a fictional plumbing company. This is your sales tool. When you walk into a supply house or a contractor meeting, you pull out your laptop, show the chatbot in action, show an appointment getting booked in real time, and show an invoice being generated. This demo sells itself.
9. Immediate Action Items: Your First 7 Days
Day 1: Get a Claude API key from console.anthropic.com. Set up your development environment (Node.js or Python). Write your first chatbot system prompt for a fictional plumbing company.
Day 2: Build the chatbot conversation handler. Test it with 20 different customer scenarios (emergency leak, request for estimate, general question, after hours call).
Day 3: Sign up for Cal.com and Twilio. Connect the chatbot to Cal.com for booking. Send your first test SMS via Twilio.
Day 4: Set up Stripe account and build invoice automation. Test end to end: chatbot books appointment, SMS confirms, invoice generates.
Day 5: Set up Make.com and connect all the pieces. Build the CRM pipeline in Pipedrive free tier.
Day 6: Build your demo landing page. Record a screen capture walkthrough showing the full customer journey.
Day 7: Make a list of 50 local trade businesses. Start reaching out. Your first client is out there waiting for exactly what you are building.
The businesses you are targeting are losing money every single day to missed calls, forgotten follow ups, and manual processes. You have the skills to fix that. The market is ready. The tools exist. Now build it.

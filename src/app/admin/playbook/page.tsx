"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Expandable Card                                                    */
/* ------------------------------------------------------------------ */

function Card({
  title,
  tag,
  children,
  defaultOpen = false,
}: {
  title: string;
  tag?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-[15px] font-semibold text-gray-900">
            {title}
          </span>
          {tag && (
            <span className="text-[11px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full bg-accent/10 text-accent">
              {tag}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-100">{children}</div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                    */
/* ------------------------------------------------------------------ */

function Section({
  number,
  title,
  children,
}: {
  number: number | string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-3 text-lg font-bold text-gray-900">
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent text-white text-xs font-bold shrink-0">
          {number}
        </span>
        {title}
      </h2>
      <div className="space-y-2 pl-10">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function ScriptBlock({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div className="mt-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-1">
        {label}
      </p>
      <p className="text-[14px] leading-relaxed text-gray-700 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100 italic">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

function Objection({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <Card title={question}>
      <p className="text-[14px] leading-relaxed text-gray-700 mt-3 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
        {answer}
      </p>
    </Card>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[14px] text-gray-700 leading-relaxed">
      <span className="text-accent mt-1 shrink-0">&#9679;</span>
      <span>{children}</span>
    </li>
  );
}

function FollowUpTemplate({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <Card title={title}>
      <p className="text-[14px] leading-relaxed text-gray-700 mt-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 whitespace-pre-line italic">
        &ldquo;{body}&rdquo;
      </p>
    </Card>
  );
}

function DemoStep({
  step,
  text,
}: {
  step: number;
  text: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold shrink-0 mt-0.5">
        {step}
      </span>
      <span className="text-[14px] text-gray-700 leading-relaxed">{text}</span>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Cost / Close block (shared across scripts)                         */
/* ------------------------------------------------------------------ */

const COST_RESPONSE =
  "$297 a month. No setup fee. You try it free for 14 days first. If it doesn't work, you walk away. I take the risk.";

const CLOSE_LINE =
  "Let me send you a quick demo so you can see exactly what it looks like. What's the best email to send it to?";

function CostCloseBlock() {
  return (
    <>
      <ScriptBlock label="If they ask about cost" text={COST_RESPONSE} />
      <ScriptBlock label="Close" text={CLOSE_LINE} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PlaybookPage() {
  return (
    <div className="max-w-3xl space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sales Playbook</h1>
        <p className="text-sm text-gray-500 mt-1">
          Scripts, talking points, and objection handlers. Click any card to
          expand.
        </p>
      </div>

      {/* ------------------------------------------------------------ */}
      {/*  SECTION 1: Cold Call Scripts                                  */}
      {/* ------------------------------------------------------------ */}
      <Section number={1} title="Cold Call Scripts">
        {/* Plumbing */}
        <Card title="Plumbing Script" tag="Plumbing">
          <ScriptBlock
            label="Opening"
            text="Hey [name], this is Ryan with Mainline. I was looking at [business name]'s website and noticed you don't have a way for customers to reach you after hours or when you're on a job. I built an AI system specifically for plumbers that answers your phone 24/7 and books jobs while you're under a house. Takes 2 minutes to show you how it works. You got a sec?"
          />
          <ScriptBlock
            label="If they ask what it is"
            text="It's an AI assistant trained on your specific business. Knows your services, your pricing, your service area. When someone visits your website or calls after hours, it answers their questions, captures their info, and books them on your calendar. You just show up and do the work."
          />
          <CostCloseBlock />
        </Card>

        {/* HVAC */}
        <Card title="HVAC Script" tag="HVAC">
          <ScriptBlock
            label="Opening"
            text="Hey [name], this is Ryan with Mainline. I work with HVAC companies and I noticed [business name] doesn't have a chat system on your site. Summer's coming and when your phone starts blowing up with AC calls, how many do you think go to voicemail? I built something that handles that. Got 2 minutes?"
          />
          <ScriptBlock
            label="If they ask what it is"
            text="It's an AI front office for HVAC companies. Answers every call and web inquiry 24/7. Knows your services, handles emergency vs routine, captures the lead, and gets them booked. During peak season when you're getting 40-50 calls a day, it handles the overflow so nothing gets missed."
          />
          <CostCloseBlock />
        </Card>

        {/* Electrical */}
        <Card title="Electrical Script" tag="Electrical">
          <ScriptBlock
            label="Opening"
            text="Hey [name], this is Ryan with Mainline. I work with electrical contractors in San Diego. Quick question: when you're on a job site and your phone rings 3 times, how many of those turn into callbacks? I built a system that answers every one of those calls for you. Takes 2 minutes to show you."
          />
          <ScriptBlock
            label="If they ask what it is"
            text="AI assistant trained on your specific electrical business. Handles the common questions like 'how much for a panel upgrade' or 'can you come out today for an outlet issue.' Captures the customer's info, qualifies the job, and gets them booked. You focus on the work."
          />
          <CostCloseBlock />
        </Card>

        {/* General */}
        <Card title="General / Any Trade Script" tag="Universal">
          <ScriptBlock
            label="Opening"
            text="Hey [name], this is Ryan with Mainline. I build AI systems for trade businesses that answer your phone and book jobs 24/7. I noticed [business name] doesn't have anything like that on your site. Most trade guys miss 20-30% of their calls when they're on jobs. I can fix that in under a week. Got 2 minutes?"
          />
          <CostCloseBlock />
        </Card>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/*  SECTION 2: Key Talking Points                                */}
      {/* ------------------------------------------------------------ */}
      <Section number={2} title="Key Talking Points">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <ul className="space-y-2.5">
            <Bullet>
              The average trade business misses 27% of inbound calls
            </Bullet>
            <Bullet>
              Each missed call is worth $350-500 in potential revenue
            </Bullet>
            <Bullet>
              That&apos;s $3,000-7,000/month walking to your competitor
            </Bullet>
            <Bullet>Your AI answers in under 5 seconds, 24/7/365</Bullet>
            <Bullet>
              It&apos;s trained on YOUR business, not a generic script
            </Bullet>
            <Bullet>
              We handle all the setup. You just tell us about your business
            </Bullet>
            <Bullet>
              $297/month. Less than one missed job pays for a full year
            </Bullet>
            <Bullet>
              14-day free trial. No setup fee. No contracts. Cancel anytime
            </Bullet>
            <Bullet>Live in under a week</Bullet>
          </ul>
        </div>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/*  SECTION 3: Objection Handlers                                */}
      {/* ------------------------------------------------------------ */}
      <Section number={3} title="Objection Handlers">
        <Objection
          question="I don't want a robot talking to my customers"
          answer="Totally get it. That's the #1 thing I hear. Here's the difference: this isn't a generic phone tree or a 'press 1 for this' system. It's trained on your specific business. It knows your services, your prices, your service area. Customers think they're talking to your front office. And anything it can't handle, it routes straight to you with a notification. You stay in control."
        />
        <Objection
          question="I already have enough work"
          answer="That's great. But are you getting the RIGHT work? The AI doesn't just answer calls, it qualifies them. Filters out the tire-kickers and books the real jobs. Plus it sends review requests after every job, so your Google reviews go up on autopilot. More reviews = better leads = higher-value jobs."
        />
        <Objection
          question="I can't afford $297/month"
          answer="I hear you. Let me ask this: how many calls do you think you miss per week? Even 2-3? At your average job value, that's $700-1,500 in lost revenue every month. The system pays for itself if it catches ONE extra job. And you try it free for 14 days, so there's zero risk."
        />
        <Objection
          question="I need to think about it"
          answer="Totally fair. Here's what I'd suggest: I'll set it up for you this week, you try it free for 14 days, and we look at the numbers together. If it's not working, you walk away and it costs you nothing. No commitment to decide on right now."
        />
        <Objection
          question="I already have a website / chat thing"
          answer="Nice, that's a good start. But is it trained on your business or is it generic? Does it know your pricing? Can it book appointments? Most chat widgets just collect a name and email. Ours actually has a conversation, qualifies the job, and books them. Want to see the difference? Takes 60 seconds."
        />
        <Objection
          question="How is this different from Jobber/Housecall Pro?"
          answer="Those are great tools but they're software YOU have to learn and manage. I'm not selling you software. I build, configure, and run your entire AI front office. You don't log into anything. You don't set anything up. I handle all of it. You just get more booked jobs."
        />
        <Objection
          question="I'll do it later / not the right time"
          answer="When would be the right time? Because every week without it is another 5-10 missed calls walking to your competitor. The setup takes a week and you try it free. There's literally nothing to lose by starting now."
        />
      </Section>

      {/* ------------------------------------------------------------ */}
      {/*  SECTION 4: Demo Script                                       */}
      {/* ------------------------------------------------------------ */}
      <Section number={4} title="Demo Script (Screen Share)">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <ol className="space-y-3">
            <DemoStep
              step={1}
              text={`"Let me show you exactly what your customers would see. I'm going to pretend I'm a homeowner with a plumbing emergency."`}
            />
            <DemoStep
              step={2}
              text="Open the demo page, select the plumber demo."
            />
            <DemoStep
              step={3}
              text={`Type: "I have a burst pipe in my garage, I need someone today"`}
            />
            <DemoStep
              step={4}
              text="Show how the AI responds, qualifies the emergency, captures info, and books."
            />
            <DemoStep
              step={5}
              text={`"See that? It took 30 seconds. That customer is now booked on your calendar instead of calling the next plumber on Google."`}
            />
            <DemoStep
              step={6}
              text={`"And this is trained on YOUR business. Your services, your pricing, your service area."`}
            />
            <DemoStep
              step={7}
              text={`"14 days free. I set it up for you this week. Want to try it?"`}
            />
          </ol>
        </div>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/*  SECTION 5: Follow-Up Templates                               */}
      {/* ------------------------------------------------------------ */}
      <Section number={5} title="Follow-Up Templates">
        <FollowUpTemplate
          title="After First Call (no demo scheduled)"
          body="Hey [name], this is Ryan from Mainline. Good talking to you today. Here's the demo I mentioned so you can see how the AI works for plumbing businesses: mainlinehq.com/demo. No pressure. Just wanted you to see it in action. Let me know if you want to set up a quick call."
        />
        <FollowUpTemplate
          title="After Demo (didn't close)"
          body="Hey [name], thanks for checking out the demo today. Just wanted to recap: $297/month, 14-day free trial, no setup fee. I handle everything. If you want to get started, I can have your AI live by [day]. Just say the word."
        />
        <FollowUpTemplate
          title="After No Response (3 days)"
          body="Hey [name], just following up. Didn't want this to slip through the cracks. The free trial is still available whenever you're ready. If now isn't the right time, no worries at all. Just reply 'later' and I'll check back next month."
        />
        <FollowUpTemplate
          title="After They Sign Up (welcome)"
          body="Hey [name], welcome to Mainline! I'm building your AI assistant this week. I'll need a few details from you: your services, pricing, hours, and service area. I'll send you a quick form. Once I have that, you'll be live in 3-5 days."
        />
      </Section>

      {/* ---- Section 6: Industry Stats & Ammo ---- */}
      <Section number="06" title="Industry Stats (Use on Calls)">
        <Card title="Missed Call Stats" tag="Data">
          <ul className="space-y-2 text-sm text-gray-700">
            <li><strong className="text-gray-900">27%</strong> of calls to contractor businesses go unanswered (industry call tracking data)</li>
            <li><strong className="text-gray-900">62%</strong> of customers say they won&apos;t leave a voicemail and will call the next business instead</li>
            <li><strong className="text-gray-900">78%</strong> of customers hire the first company that responds to their inquiry</li>
            <li><strong className="text-gray-900">85%</strong> of customers who can&apos;t reach a business on the first call won&apos;t call back</li>
            <li>Average plumber misses <strong className="text-gray-900">5-8 calls per week</strong> while on jobs</li>
            <li>At $350-500 avg job value, that&apos;s <strong className="text-accent">$3,000-7,000/month</strong> in lost revenue</li>
          </ul>
        </Card>
        <Card title="Review Stats">
          <ul className="space-y-2 text-sm text-gray-700">
            <li><strong className="text-gray-900">93%</strong> of consumers say online reviews influence their purchasing decisions</li>
            <li>Businesses with <strong className="text-gray-900">50+ reviews</strong> earn 4.6x more revenue than those with fewer than 10</li>
            <li>Only <strong className="text-gray-900">5-10%</strong> of customers leave a review without being asked</li>
            <li>When asked via text within 1 hour of service, review rates jump to <strong className="text-gray-900">30-40%</strong></li>
            <li>A half-star increase on Google = <strong className="text-accent">5-9% increase in revenue</strong></li>
          </ul>
        </Card>
        <Card title="Industry Revenue Benchmarks">
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Average plumbing service call: <strong className="text-gray-900">$350-500</strong></li>
            <li>Average HVAC service call: <strong className="text-gray-900">$300-600</strong></li>
            <li>Average electrical service call: <strong className="text-gray-900">$200-500</strong></li>
            <li>Water heater replacement: <strong className="text-gray-900">$1,200-2,500</strong></li>
            <li>AC install: <strong className="text-gray-900">$3,000-7,000</strong></li>
            <li>Panel upgrade: <strong className="text-gray-900">$1,500-4,000</strong></li>
            <li>Mainline at $297/mo = <strong className="text-accent">less than one missed job</strong></li>
          </ul>
        </Card>
      </Section>

      {/* ---- Section 7: Pre-Call Checklist ---- */}
      <Section number="07" title="Pre-Call Checklist">
        <div className="bg-gray-50 rounded-lg p-5">
          <p className="text-sm text-gray-500 mb-4">Do this for each prospect before you pick up the phone:</p>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 w-5 h-5 rounded border border-gray-300 flex items-center justify-center text-xs shrink-0">1</span>
              <span><strong>Open their website</strong> in a tab. Know what they offer and what&apos;s missing (chat, booking, reviews).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 w-5 h-5 rounded border border-gray-300 flex items-center justify-center text-xs shrink-0">2</span>
              <span><strong>Check their Google reviews</strong>. Note the count and rating. If low, that&apos;s a talking point.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 w-5 h-5 rounded border border-gray-300 flex items-center justify-center text-xs shrink-0">3</span>
              <span><strong>Read their prospect notes</strong> in your admin panel. Know their pain points.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 w-5 h-5 rounded border border-gray-300 flex items-center justify-center text-xs shrink-0">4</span>
              <span><strong>Have the demo ready</strong> at mainlinehq.com/demo in another tab.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 w-5 h-5 rounded border border-gray-300 flex items-center justify-center text-xs shrink-0">5</span>
              <span><strong>Know their name</strong>. Use it. &quot;Hey Mike&quot; is 10x better than &quot;Hey, is this the owner?&quot;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 w-5 h-5 rounded border border-gray-300 flex items-center justify-center text-xs shrink-0">6</span>
              <span><strong>Stand up when you call</strong>. Seriously. Your energy changes when you&apos;re on your feet.</span>
            </li>
          </ul>
        </div>
      </Section>

      {/* ---- Section 8: Mindset & Psychology ---- */}
      <Section number="08" title="Sales Mindset">
        <Card title="Remember This Before Every Call">
          <div className="space-y-4 text-sm text-gray-700">
            <p><strong className="text-gray-900">You are not selling.</strong> You are solving a problem they already have. Every plumber knows they miss calls. Every HVAC guy knows his phone goes crazy in summer. You are offering to fix something that&apos;s already costing them money.</p>
            <p><strong className="text-gray-900">Most will say no.</strong> That&apos;s normal. You need 10 calls to get 2-3 conversations. You need 2-3 conversations to get 1 demo. You need 2-3 demos to get 1 client. That&apos;s a 10% conversion rate from cold call to customer, which is excellent.</p>
            <p><strong className="text-gray-900">They respect hustle.</strong> Trade guys work hard. They respect someone who picks up the phone and calls them directly instead of sending a mass email. Be real, be direct, don&apos;t waste their time.</p>
            <p><strong className="text-gray-900">The free trial closes the deal.</strong> When they hesitate, the answer is always: &quot;Try it free for 14 days. If it doesn&apos;t work, walk away. I take the risk.&quot; There is zero downside for them.</p>
          </div>
        </Card>
        <Card title="The Numbers Game">
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">10</div>
                <div className="text-xs text-gray-500 mt-1">Calls/day</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-xs text-gray-500 mt-1">Conversations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1</div>
                <div className="text-xs text-gray-500 mt-1">Demo booked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">$297</div>
                <div className="text-xs text-gray-500 mt-1">MRR per close</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">3 demos/week = 1 new client/week = $1,188 MRR in one month</p>
          </div>
        </Card>
        <Card title="What to Do When They Say No">
          <ul className="space-y-2 text-sm text-gray-700">
            <li><strong className="text-gray-900">&quot;No thanks&quot;</strong> = &quot;Totally get it. Mind if I send you a link to the demo in case anything changes? No follow-up, just there if you want to look.&quot; Then send the demo link and move on.</li>
            <li><strong className="text-gray-900">&quot;Not interested&quot;</strong> = &quot;No worries at all. Quick question before I go, just curious: how do you handle calls when you&apos;re on a job?&quot; Sometimes this reopens the conversation.</li>
            <li><strong className="text-gray-900">&quot;Call back later&quot;</strong> = &quot;When works best? I&apos;ll put it on my calendar.&quot; Set the follow-up date in your prospect tracker.</li>
            <li><strong className="text-gray-900">Voicemail</strong> = &quot;Hey [name], this is Ryan with Mainline. I work with plumbers in San Diego and help them catch the calls they miss when they&apos;re on jobs. Takes 2 minutes to see how it works. My number is 805-801-1380. No pressure.&quot; Keep it under 20 seconds.</li>
          </ul>
        </Card>
      </Section>

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  );
}

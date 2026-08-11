import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import {
  ArrowRight, ArrowLeft, CheckCircle2, XCircle, TrendingUp,
  Star, ChevronDown,
} from "lucide-react";
import { useEditableContent } from "@/hooks/useEditableContent";

const NAVY = "#0A1628";
const BLUE = "#1A6FE8";
const ORANGE = "#FF6B2B";
const GREEN = "#22C55E";
const RED = "#DC2626";
const MUTED = "#4B5563";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    {...fadeUp}
    className="text-2xl md:text-3xl font-bold mt-14 mb-5 pl-4 border-l-4"
    style={{ color: NAVY, borderColor: BLUE }}
  >
    {children}
  </motion.h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg md:text-xl font-bold mt-8 mb-2" style={{ color: BLUE }}>
    {children}
  </h3>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base md:text-[17px] leading-relaxed mb-4" style={{ color: NAVY }}>
    {children}
  </p>
);

const Callout = ({
  children,
  tone = "red",
}: {
  children: React.ReactNode;
  tone?: "red" | "green" | "blue";
}) => {
  const map = {
    red: { bg: "#FFF5F5", border: RED, text: "#7F1D1D" },
    green: { bg: "#F0FDF4", border: GREEN, text: "#14532D" },
    blue: { bg: "#EFF6FF", border: BLUE, text: "#1E3A8A" },
  } as const;
  const c = map[tone];
  return (
    <motion.div
      {...fadeUp}
      className="rounded-xl px-5 py-5 md:px-6 md:py-6 my-7 border-l-4"
      style={{ background: c.bg, borderColor: c.border }}
    >
      <p className="font-semibold text-[15px] md:text-[17px] leading-relaxed m-0" style={{ color: c.text }}>
        {children}
      </p>
    </motion.div>
  );
};

const Screenshot = ({
  tag,
  src,
  alt,
  caption,
}: {
  tag: string;
  src: string;
  alt: string;
  caption: string;
}) => (
  <motion.div {...fadeUp} className="my-8">
    <span
      className="block text-center text-[11px] md:text-xs font-bold tracking-wider uppercase mb-3"
      style={{ color: BLUE }}
    >
      {tag}
    </span>
    <div
      className="rounded-xl overflow-hidden border"
      style={{ borderColor: "#E5E7EB", boxShadow: "0 8px 24px rgba(10,22,40,0.08)" }}
    >
      <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
    </div>
    <p className="text-center text-sm italic mt-3" style={{ color: MUTED }}>
      {caption}
    </p>
  </motion.div>
);

const domino = [
  "Less visibility",
  "Less enquiries",
  "Fewer bookings",
  "Lower cash flow",
  "Reduced confidence to invest",
  "Competitors kept growing faster",
];

const internalChallenges = [
  { title: "No Online Booking", text: "Every booking required someone to answer calls. Customers couldn't book instantly. Some enquiries were simply lost." },
  { title: "No Fleet Intelligence", text: "Which bike earns the most? Which vehicle remains idle? Which branch performs best? Nobody had exact answers." },
  { title: "Pricing Was Static", text: "Demand changed every weekend. Pricing stayed the same. Revenue opportunities were being missed." },
  { title: "No Customer Insights", text: "Who books every month? Who rents premium bikes? Who should receive offers? Everything was stored manually. Nothing was measurable." },
  { title: "Vehicle Documentation", text: "When bikes were rented, there was no proper digital record of odometer, front, side, and back images. Disputes became difficult to handle." },
];

const badFuture = [
  "Competitors would dominate Google Search",
  "Repeat customers would slowly shift elsewhere",
  "Customer acquisition cost would increase",
  "Referrals would dry up",
  "Cash flow would become unstable",
  "Expansion plans would stop",
];

const dashboardBullets = [
  "Which vehicle has the highest demand — so they know exactly what to add to the fleet next",
  "Which day of the week is their busiest — so staffing and stock are never caught off guard",
  "Where bookings are actually coming from — so they know which marketing is working and which is dead weight",
  "Which customers are booking again and again — the difference between guessing who your loyal customers are, and knowing",
];

const topStats = [
  { num: "Daily", label: "New customers coming in — not just references anymore" },
  { num: "Live", label: "Google Ads running, generating consistent bookings" },
  { num: "↑", label: "Revenue increased" },
];

const numberStats = [
  { num: "177", label: "Total bookings processed through the new system" },
  { num: "₹1,60,054", label: "Revenue collected and tracked in-platform" },
  { num: "230", label: "Customers now managed in one system, not scattered notebooks" },
  { num: "164", label: "Customers with confirmed bookings — real, trackable relationships" },
  { num: "30", label: "Vehicles under live digital fleet management" },
  { num: "3", label: "Branches unified into a single dashboard" },
];

const IMG = "/case-studies/riant-bikes";

const CaseStudyRiantBikes = () => {
  // Hero headline/subtitle are editable from admin (Pages > Content tab) without a code
  // change. The rest of the article body is still authored in code — see useEditableContent.
  const editable = useEditableContent("riant-bikes", {
    heroTitle: "They Built Riant Bikes From Zero. The Internet Almost Killed It.",
    heroSubtitle:
      "This is the story of a bike rental business that ruled Ahmedabad with almost no marketing — and then watched itself slowly disappear because it never adapted. Here's how we brought it back from the edge.",
  });
  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="relative pt-[72px] overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${NAVY}, #142A5C)` }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full animate-drift"
            style={{
              width: 500, height: 500, top: "-15%", right: "-10%",
              background: "radial-gradient(circle, rgba(26,111,232,0.25) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-16 pb-14 md:pt-20 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-medium mb-6"
              style={{ color: "#C7D2FE" }}
            >
              <ArrowLeft size={15} /> All Case Studies
            </Link>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: BLUE, color: "#fff" }}
            >
              Case Study &middot; Local Business
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.15] text-white mb-6 tracking-tight">
              {editable.heroTitle}
            </h1>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#C7D2FE" }}>
              {editable.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-14 md:py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp} className="text-lg md:text-xl italic mb-2" style={{ color: MUTED }}>
            Every business owner thinks it won't happen to them. Riant Bikes thought so too — right up
            until the bookings stopped coming.
          </motion.p>

          <H2>The Business</H2>
          <P>
            Riant Bikes rents two-wheelers on rent across three branches in Ahmedabad — Naranpura,
            Maninagar, and Vaishnodevi. Simple business. You need a bike, they hand you one. No drama,
            no complexity.
          </P>
          <P>Except the drama was coming. It just hadn't arrived yet.</P>

          <H2>The Golden Years</H2>
          <P>
            In 2016, when Riant Bikes opened its doors, renting a two-wheeler wasn't even a "thing" in
            Ahmedabad. Nobody was doing it seriously. So the moment they showed up, they didn't just
            enter a market — <strong style={{ color: NAVY }}>they created one.</strong>
          </P>
          <P>
            A few Google reviews. A little word of mouth. That's it. That's all it took. Customers found
            them, booked with them, and came back. Low marketing, high returns — the kind of start most
            business owners dream about and never get.
          </P>
          <P>For a while, it felt like Riant Bikes had cracked the code.</P>

          <H2>Then the Ground Shifted &mdash; And Nobody Told Them</H2>
          <P>Here's the brutal truth about business: the market doesn't wait for you to notice it's changed.</P>
          <P>
            While Riant Bikes kept running on the same playbook that worked in 2016, competitors weren't
            sitting around admiring them. They were building websites. Running ads. Stacking Google
            reviews. Showing up first — every single time a customer searched "bike on rent near me."
          </P>
          <P>
            And a customer scrolling on their phone doesn't care who was first to the market.{" "}
            <strong style={{ color: NAVY }}>
              They book whoever looks the most trustworthy, right now, on the screen in front of them.
            </strong>
          </P>

          <Callout tone="red">
            That's the part that stings the most — Riant Bikes wasn't losing because their service got
            worse. They were losing because they went invisible while everyone else got louder.
          </Callout>

          <P>
            Cash flow started drying up. Fewer customers walked in. The only bookings left were from
            people who already knew someone at Riant Bikes personally — pure reference business, the
            last life-support system before a business quietly fades out.
          </P>
          <P>
            This is exactly how good businesses die. Not with a crash. With a slow, silent leak — while
            the owner keeps telling themselves "business will pick up soon."
          </P>
          <P>
            It doesn't pick up on its own. Not anymore.{" "}
            <strong style={{ color: NAVY }}>
              Not in a market where your competitor is one Google search ahead of you, 24 hours a day.
            </strong>
          </P>

          <H2>The Domino Effect</H2>
          <P>One problem created another.</P>
          <motion.div
            {...fadeUp}
            className="rounded-xl border bg-white px-5 py-6 md:px-7 md:py-7 my-6 text-center"
            style={{ borderColor: "#E5E7EB" }}
          >
            {domino.map((step, i) => (
              <div key={step}>
                <div
                  className="font-semibold py-1.5 text-[15px] md:text-[17px]"
                  style={{ color: i === domino.length - 1 ? RED : NAVY }}
                >
                  {step}
                </div>
                {i < domino.length - 1 && (
                  <ChevronDown size={18} className="mx-auto" style={{ color: BLUE }} />
                )}
              </div>
            ))}
          </motion.div>
          <P>
            This wasn't just a marketing problem anymore.{" "}
            <strong style={{ color: NAVY }}>It was becoming a business survival problem.</strong>
          </P>

          <H2>Internal Challenges</H2>
          <P>Apart from customer acquisition, the operations had also become difficult.</P>
          {internalChallenges.map((c) => (
            <div key={c.title}>
              <H3>{c.title}</H3>
              <P>{c.text}</P>
            </div>
          ))}

          <H2>What Could Have Happened?</H2>
          <P>This is the scary part. If nothing changed, the future was predictable:</P>
          <motion.ul {...fadeUp} className="list-none p-0 my-4 space-y-2.5">
            {badFuture.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[15px] md:text-[17px]" style={{ color: NAVY }}>
                <XCircle size={19} style={{ color: RED }} className="mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </motion.ul>
          <Callout tone="red">
            Many traditional businesses don't fail because they're bad. They fail because customers stop
            discovering them.
          </Callout>

          <H2>What We Built</H2>
          <P>
            Riant Bikes didn't need another logo or a "nice-looking" website. They needed a machine that
            could go out and fight for customers on its own, every single day. So that's what we built.
          </P>

          <H3>1. A website that actually sells</H3>
          <P>
            We designed and built their website with a full online booking platform baked in. No calling.
            No waiting on hold. A customer lands on the site, picks a bike, books it. Done.
          </P>

          <H3>2. Book a bike like you'd book a cab</H3>
          <P>
            Customers can now rent a two-wheeler directly through the website — no middleman, no
            friction, no reason to abandon the booking halfway.
          </P>
          <Screenshot
            tag="Live on the Riant Admin Panel"
            src={`${IMG}/booking-dashboard.png`}
            alt="Riant Bikes booking management dashboard showing live bookings across branches"
            caption="Every booking — pickup, drop-off, payment, status — flowing in automatically. No phone calls, no missed enquiries."
          />

          <H3>3. Fleet control that actually makes them money</H3>
          <P>
            In the backend, Riant Bikes can manage fleet availability in real time and adjust rental
            rates as demand shifts. Festival season, weekend rush, high demand? They control pricing
            instantly — instead of leaving money on the table.
          </P>
          <Screenshot
            tag="Fleet Management"
            src={`${IMG}/fleet-management.png`}
            alt="Riant Bikes fleet management dashboard showing vehicles across branches with live availability status"
            caption="30 vehicles, 3 branches, one screen — every bike tracked as available or occupied in real time."
          />
          <Screenshot
            tag="Dynamic Pricing"
            src={`${IMG}/dynamic-pricing.png`}
            alt="Riant Bikes pricing and tariff dashboard with per-branch rate overrides and seasonal surge pricing"
            caption="Rates that flex by category and branch — with seasonal surge pricing built in for high-demand dates."
          />

          <H3>4. Proof built into every handover</H3>
          <P>
            Every time a vehicle goes out, the team uploads odometer readings and photos — front, side,
            back — straight into the backend. It protects the business from disputes and gives the
            customer confidence they're dealing with people who run things properly.
          </P>
          <P>
            And it did something for the Riant Bikes team too — it gave them back their confidence. For
            the first time in a while, they felt like they could actually go toe-to-toe with the
            competitors who'd been eating their lunch.
          </P>

          <H3>5. A dashboard that thinks ahead of them</H3>
          <P>
            We didn't stop at bookings. On the backend, Riant Bikes now sees exactly what's happening in
            their own business, in real time:
          </P>
          <motion.ul {...fadeUp} className="list-none p-0 my-4 space-y-2.5">
            {dashboardBullets.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[15px] md:text-[17px]" style={{ color: NAVY }}>
                <CheckCircle2 size={19} style={{ color: GREEN }} className="mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </motion.ul>
          <Screenshot
            tag="The Owner's Morning View"
            src={`${IMG}/owner-dashboard.png`}
            alt="Riant Bikes owner dashboard showing total bookings, revenue, top vehicles, busiest days and branch performance"
            caption="The exact screen Riant Bikes checks every morning — bookings, revenue, top-performing vehicles, and busiest days, all in one place."
          />

          <H3>6. Reviews doing the selling, on autopilot</H3>
          <P>
            We pulled in Google reviews automatically from all 3 branches, straight onto the website.
            Every visitor now sees real social proof the second they land — no manual copy-pasting, no
            delay, just trust built in from the first scroll.
          </P>

          <H2>The Results</H2>
          <motion.div {...fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-7">
            {topStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border bg-white text-center px-5 py-6"
                style={{ borderColor: "#E5E7EB" }}
              >
                <span className="block text-2xl font-black mb-1.5" style={{ color: BLUE }}>
                  {s.num}
                </span>
                <span className="text-sm" style={{ color: MUTED }}>{s.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-3 gap-4 my-7">
            {numberStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border bg-white text-center px-4 py-5"
                style={{ borderColor: "#E5E7EB" }}
              >
                <span className="block text-xl md:text-2xl font-black mb-1.5" style={{ color: BLUE }}>
                  {s.num}
                </span>
                <span className="text-xs md:text-sm leading-snug" style={{ color: MUTED }}>{s.label}</span>
              </div>
            ))}
          </motion.div>

          <Screenshot
            tag="Every Customer, One System"
            src={`${IMG}/customer-database.png`}
            alt="Riant Bikes customer database showing total customers, approved documents, and confirmed bookings"
            caption="230 customers, fully organized — documents, booking history, and prospects, all searchable in seconds."
          />
          <Screenshot
            tag="Every Rupee, Accounted For"
            src={`${IMG}/cash-collection.png`}
            alt="Riant Bikes cash collection log showing total revenue and transaction entries by staff and branch"
            caption="₹3,86,000 tracked across 242 entries — every payment logged by branch and staff, with zero guesswork."
          />

          <P>
            Riant Bikes didn't need a facelift. They needed a system that could actually compete in a
            market that had already moved on without them. We built that system. Now they're not
            surviving the competition —{" "}
            <strong style={{ color: NAVY }}>
              they're back in the race, and winning bookings the competitors thought were already theirs.
            </strong>
          </P>

          <Callout tone="blue">
            Here's the real lesson in this story: Riant Bikes had the best reputation in the game for
            years — and it still nearly wasn't enough. If your business isn't showing up online today, it
            doesn't matter how good you are. Somebody else, who is worse than you, is taking your customer
            right now — simply because they showed up first on the screen.
          </Callout>

          {/* Testimonial */}
          <div className="mt-14">
            <H2>In Their Own Words</H2>
            <P>This is the Google review Riant Bikes left for us, unedited.</P>

            <motion.div
              {...fadeUp}
              className="rounded-2xl border bg-white px-5 py-7 md:px-8 md:py-9 mt-5"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 8px 24px rgba(10,22,40,0.06)" }}
            >
              <div className="flex items-center gap-3.5 mb-1.5">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ background: NAVY }}
                >
                  HB
                </div>
                <div>
                  <div className="font-bold text-[17px]" style={{ color: NAVY }}>Hardik Bhatt</div>
                  <div className="text-[13px]" style={{ color: MUTED }}>
                    Owner, Riant Bikes &middot; Local Guide &middot; 42 reviews
                  </div>
                </div>
              </div>
              <div className="flex gap-0.5 my-2.5" style={{ color: "#F59E0B" }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#F59E0B" strokeWidth={0} />)}
              </div>

              <div className="text-[15px] md:text-[16px] leading-[1.8]" style={{ color: NAVY }}>
                <p className="font-bold mb-3.5">A Well-Deserved Shoutout to Digital Aura! 🏆</p>
                <p className="mb-3.5">
                  Running a business for over a decade teaches you one important lesson—having the right
                  technology partner can make all the difference.
                </p>
                <p className="mb-3.5">
                  At Riant Bikes, we've been serving customers in Ahmedabad for years. However, with
                  increasing competition in the self-drive two-wheeler rental market, we started noticing
                  that our pipeline of new customers was gradually shrinking. We knew that simply having a
                  website was no longer enough. We needed a complete digital transformation with a modern,
                  customer-friendly platform that could support our long-term growth.
                </p>
                <p className="mb-3.5">
                  When it came to selecting the right agency, Digital Aura was naturally one of the names
                  we considered.
                </p>
                <p className="mb-3.5">
                  Our association with their leadership goes back nearly 20 years, and we've always known
                  them as ethical professionals. Even then, we didn't make our decision based only on our
                  relationship. We conducted our own research, explored different options, asked difficult
                  questions, and evaluated what each company could offer.
                </p>
                <p className="mb-3.5">
                  What ultimately convinced us to choose Digital Aura was their clarity, transparency,
                  openness, flexibility, and willingness to understand our business before proposing
                  solutions. Right from our initial discussions, we felt confident that we were partnering
                  with a team that genuinely wanted to contribute to our success rather than simply
                  complete another project.
                </p>
                <p className="mb-3.5">
                  From the very beginning of the website development process, the entire journey has been
                  outstanding.
                </p>
                <p className="mb-3.5">
                  Every requirement—whether major or minor—was handled patiently. Every suggestion was
                  discussed openly. Every query was answered promptly. What impressed us the most was the
                  speed at which the team implemented changes. Sometimes we'd discuss an improvement, and
                  within a very short time it was already live. It genuinely felt as though our own
                  internal team was working on the project rather than an external agency.
                </p>
                <p className="mb-3.5">That level of ownership is rare to find.</p>
                <p className="mb-3.5">
                  Today, our new website for Riant Bikes is working exactly as we had envisioned. The
                  design is modern, the functionality aligns with our operational requirements, and the
                  platform has been built keeping both customer convenience and future business growth in
                  mind. More importantly, the foundation is now in place for online bookings, digital
                  marketing, SEO, and further expansion.
                </p>
                <p className="mb-3.5">
                  Throughout the project, one thing remained consistent—their responsiveness. At no point
                  did we feel that our concerns were ignored or delayed unnecessarily. Their team has
                  always been approachable, solution-oriented, and proactive.
                </p>
                <p className="mb-3.5">
                  What makes me recommend Digital Aura isn't just the quality of their technical work.
                </p>
                <p className="mb-3.5">
                  It is because they operate with the same values that we strongly believe in at Riant
                  Bikes:
                </p>
                <p className="mb-3.5">
                  Transparency
                  <br />
                  Honesty
                  <br />
                  Customer-First Approach
                </p>
                <p className="mb-3.5">
                  When your service partner shares your core business values, the entire working
                  relationship becomes smooth and productive.
                </p>
                <p className="mb-3.5">
                  We're excited to continue working with them for our digital marketing and future
                  technology initiatives, and we're confident this partnership will help us achieve even
                  greater milestones.
                </p>
                <p className="mb-3.5">
                  A sincere thank you to the entire Digital Aura team for your hard work, commitment, and
                  exceptional support. Wishing you continued growth and success—you truly deserve it.
                </p>
                <p className="mb-3.5">
                  If you're a business owner looking for a dependable partner for website development,
                  SEO, branding, digital marketing, or business automation, I would wholeheartedly
                  recommend giving Digital Aura an opportunity. They don't just build websites—they build
                  long-term business relationships through their knowledge, experience and love.
                </p>
                <p>Thank you once again, Team Digital Aura!!</p>
              </div>

              <div className="mt-6">
                <img
                  src={`${IMG}/google-review.png`}
                  alt="Google review screenshot from Hardik Bhatt, owner of Riant Bikes, giving Digital Aura a 5-star rating"
                  loading="lazy"
                  className="w-full max-w-[440px] mx-auto block rounded-lg border"
                  style={{ borderColor: "#E5E7EB", boxShadow: "0 8px 24px rgba(10,22,40,0.08)" }}
                />
              </div>

              <div
                className="text-center text-[13px] mt-5 pt-4 border-t"
                style={{ color: MUTED, borderColor: "#E5E7EB" }}
              >
                Posted on Google &middot; Verified Local Guide review
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            {...fadeUp}
            className="mt-14 rounded-2xl text-center px-6 py-10 md:px-10 md:py-12"
            style={{ background: NAVY }}
          >
            <h2 className="text-2xl md:text-[28px] font-bold text-white mb-3">
              Don't Wait Until Your "Reference Customers" Are the Only Ones Left
            </h2>
            <p className="text-[15px] md:text-base max-w-xl mx-auto mb-6" style={{ color: "#C7D2FE" }}>
              Every day without a real digital presence is a day a competitor books the customer that
              should've been yours. Riant Bikes waited. You don't have to.
            </p>
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2 inline-flex">
              Talk to Digital Aura Today <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudyRiantBikes;

import { getAttribution } from "@/lib/leadTracking";
import { useState, type FormEvent } from "react";
import { ArrowRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Reveal, SectionLabel, SectionLabelDark } from "./Reveal";
import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";
import { PillarFaq, PillarSection } from "@/components/pillar/Pillar";
import VisitUs from "@/components/pillar/VisitUs";

export const logos = [
  { name: "Clarity Eye Surgeons", category: "Healthcare", src: "/wds/logos/clarity-eye-surgeons.png" },
  { name: "Grand Bavarchi", category: "Restaurant", src: "/wds/logos/grand-bavarchi.png" },
  { name: "Mainstream Real Estate", category: "Real Estate", src: "/wds/logos/mainstream-real-estate.png" },
  { name: "Parasher Academy", category: "Education", src: "/wds/logos/parasher-academy.png" },
  { name: "A-One Autocare", category: "Automotive", src: "/wds/logos/a-one-autocare.png" },
  { name: "Amvi Hospital", category: "Healthcare", src: "/wds/logos/amvi-hospital.png" },
  { name: "DP Electric", category: "Electrical Services", src: "/wds/logos/dp-electric.png" },
  { name: "Dr. Parth Shah", category: "Healthcare", src: "/wds/logos/dr-parth-shah.png" },
  { name: "Game Zone Events", category: "Entertainment", src: "/wds/logos/game-zone-events.webp" },
  { name: "Inn of the Dove", category: "Hospitality", src: "/wds/logos/inn-of-the-dove.png" },
  { name: "Krisha Eye Hospital", category: "Healthcare", src: "/wds/logos/krisha-eye-hospital.webp" },
  { name: "Krisha Hospital", category: "Healthcare", src: "/wds/logos/krisha-hospital.png" },
  { name: "Levapor", category: "Industrial", src: "/wds/logos/levapor.png" },
  { name: "Prism Calibration", category: "Industrial", src: "/wds/logos/prism-calibration.png" },
  { name: "Shukan Hospital", category: "Healthcare", src: "/wds/logos/shukan-hospital.png" },
  { name: "The Grand Palace", category: "Hospitality", src: "/wds/logos/the-grand-palace.webp" },
];

export function LogoMarquee() {
  useCMSEditor();
  const s = useSettings(["wds_logos_h2", "wds_logos_subtitle"]);
  return (
    <section id="clients" className="border-y border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 data-cms-key="wds_logos_h2" data-cms-label="Logos Heading" data-cms-attr="text" className="text-section">
            {s.wds_logos_h2 || "Clients We've Grown"}
          </h2>
          <p
            data-cms-key="wds_logos_subtitle"
            data-cms-label="Logos Subtitle"
            data-cms-attr="text"
            className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-primary"
          >
            {s.wds_logos_subtitle || "120+ Businesses We've Helped Grow"}
          </p>
        </div>
      </div>
      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-marquee gap-5">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="hover-lift w-56 shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]"
            >
              <div className="flex h-28 items-center justify-center bg-gradient-to-br from-primary/10 to-navy/10 p-5">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="border-t border-border bg-background px-4 py-4 text-center">
                <p className="truncate text-sm font-extrabold">{logo.name}</p>
                <p className="mt-0.5 text-xs font-bold text-primary">{logo.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      "The team reached out professionally, understood my requirements and guided me through every step — designing the website, migrating platforms and fixing my email issues. The final website looks professional and works exactly the way my business needs it to.",
    name: "Dhruv Patel",
    role: "Local Guide, Google Review",
  },
  {
    quote:
      "Sambhav and his team built thereviewhive.blog and walked me through a full business plan for it. Many of my queries were answered tirelessly — very helpful and approachable.",
    name: "Maya Pillai",
    role: "Founder, The Review Hive",
  },
  {
    quote:
      "Digital Aura designed my company's website and built our social media platforms from scratch, with innovative ideas to showcase our work and attract new clients. Recommendable service.",
    name: "Anubhav Tripathi",
    role: "Business Owner",
  },
];

export function Testimonials() {
  useCMSEditor();
  const s = useSettings([
    "wds_testimonials_label",
    "wds_testimonials_h2",
    "wds_testimonials_verified_badge",
    ...testimonials.flatMap((_, i) => [
      `wds_testimonial_${i}_quote`,
      `wds_testimonial_${i}_name`,
      `wds_testimonial_${i}_role`,
    ]),
  ]);
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>
              <span data-cms-key="wds_testimonials_label" data-cms-label="Testimonials Label" data-cms-attr="text">
                {s.wds_testimonials_label || "Client Feedback"}
              </span>
            </SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2
              data-cms-key="wds_testimonials_h2"
              data-cms-label="Testimonials Heading"
              data-cms-attr="text"
              className="mt-5 text-section"
            >
              {s.wds_testimonials_h2 || "What our clients say changed after launch"}
            </h2>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="hover-lift gradient-border flex h-full flex-col rounded-2xl border border-border bg-background p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:border-primary/40">
                <div className="flex items-center justify-between gap-3">
                  <Quote className="h-7 w-7 text-primary/50" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} className="h-[18px] w-[18px] fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <blockquote
                  data-cms-key={`wds_testimonial_${i}_quote`}
                  data-cms-label={`Testimonial ${i + 1} Quote`}
                  data-cms-attr="text"
                  className="mt-6 flex-1 text-[15px] leading-relaxed text-foreground/85"
                >
                  &ldquo;{s[`wds_testimonial_${i}_quote`] || t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex min-w-0 items-center gap-3 border-t border-border pt-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-sm font-extrabold text-primary">
                    {(s[`wds_testimonial_${i}_name`] || t.name).charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span
                      data-cms-key={`wds_testimonial_${i}_name`}
                      data-cms-label={`Testimonial ${i + 1} Name`}
                      data-cms-attr="text"
                      className="block truncate text-sm font-extrabold"
                    >
                      {s[`wds_testimonial_${i}_name`] || t.name}
                    </span>
                    <span
                      data-cms-key={`wds_testimonial_${i}_role`}
                      data-cms-label={`Testimonial ${i + 1} Role`}
                      data-cms-attr="text"
                      className="block truncate text-xs font-semibold text-muted-foreground"
                    >
                      {s[`wds_testimonial_${i}_role`] || t.role}
                    </span>
                  </span>
                  <span
                    data-cms-key="wds_testimonials_verified_badge"
                    data-cms-label="Testimonials Verified Badge"
                    data-cms-attr="text"
                    className="ml-auto shrink-0 rounded-full bg-primary/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-primary"
                  >
                    {s.wds_testimonials_verified_badge || "Verified"}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export const faqs = [
  {
    q: "How long do website development services in Ahmedabad take?",
    a: "Most business websites launch in four to seven weeks. Ecommerce and custom builds usually take eight to fourteen weeks. Either way, you get a clear timeline before work begins.",
  },
  {
    q: "Will a website redesign hurt our Google rankings?",
    a: "No, not if it's done right. We map every existing URL, set up redirects and carry forward the content that already ranks, so visibility usually improves after launch, not drops.",
  },
  {
    q: "Can we update the website ourselves after launch?",
    a: "Yes. Every site comes with an editable CMS plus a short training session, so your team can update content and offers without calling a developer.",
  },
  {
    q: "How much does website development in Ahmedabad cost?",
    a: "Business websites typically start in the mid four figures; ecommerce and custom builds are scoped individually. You always get one fixed quote, never an hourly guess.",
  },
  {
    q: "Do you provide website maintenance after launch?",
    a: "Yes. Our monthly plans cover updates, backups, security monitoring and small content changes, so your site stays fast and secure long after it goes live.",
  },
  {
    q: "How do you know if the website is actually working?",
    a: "We track it against the numbers that matter — enquiries, conversion rate, speed and search visibility — with reporting set up before launch so there's a clear baseline.",
  },
  {
    q: "What website development services do you offer in Ahmedabad?",
    a: "Our website development services in Ahmedabad cover business websites, ecommerce stores on Shopify and WooCommerce, custom web applications, landing pages, website redesign and ongoing maintenance. Every project includes mobile-first design, speed optimisation and SEO-ready setup, so the site is built to be found and to convert.",
  },
  {
    q: "What is the difference between website design and web development?",
    a: "Website design is how the site looks and feels: layout, brand, content flow and user experience. Web development is how it is built and runs: code, CMS, speed, security and integrations. A good web development company in Ahmedabad does both together, which is how we work, so the design is never handed to a developer who cannot build it properly.",
  },
  {
    q: "How do I choose a web development company in Ahmedabad?",
    a: "Ask to see live websites they have built, who will actually work on your project, what the quote includes, and how they handle speed, SEO and support after launch. Compare fixed quotes line by line, not just the headline price. Our website development cost guide explains what to compare.",
  },
  {
    q: "Which platforms do your website developers in Ahmedabad work on?",
    a: "WordPress, WooCommerce, Shopify, BigCommerce and custom builds. We recommend the platform that suits your goals and budget, not the one that is easiest for us.",
  },
  {
    q: "Do you build websites for businesses outside Ahmedabad?",
    a: "Yes. We are based in Ahmedabad and work with businesses across Gujarat and India, and we build Shopify stores for brands that sell outside India. Calls, reviews and handover all happen online.",
  },
];

export function Faq() {
  useCMSEditor();
  const s = useSettings([
    "wds_faq_label",
    "wds_faq_h2",
    "wds_faq_p",
    ...faqs.flatMap((_, i) => [`wds_faq_${i}_q`, `wds_faq_${i}_a`]),
  ]);
  return (
    <PillarSection
      id="faq"
      tone="light"
      eyebrow={<span data-cms-key="wds_faq_label" data-cms-label="FAQ Label" data-cms-attr="text">{s.wds_faq_label || "FAQ"}</span>}
      title={<span data-cms-key="wds_faq_h2" data-cms-label="FAQ Heading" data-cms-attr="text">{s.wds_faq_h2 || "Questions worth asking before you hire us"}</span>}
      intro={<span data-cms-key="wds_faq_p" data-cms-label="FAQ Paragraph" data-cms-attr="text">{s.wds_faq_p || "Still unsure about something? Ask it on the strategy call — no obligation, no sales script."}</span>}
    >
      {/* Plain question and answer, always open (same FAQ look on every page). */}
      <PillarFaq
        items={faqs.map((f, i) => ({
          key: f.q,
          q: <span data-cms-key={`wds_faq_${i}_q`} data-cms-label={`FAQ ${i + 1} Question`} data-cms-attr="text">{s[`wds_faq_${i}_q`] || f.q}</span>,
          a: <span data-cms-key={`wds_faq_${i}_a`} data-cms-label={`FAQ ${i + 1} Answer`} data-cms-attr="text">{s[`wds_faq_${i}_a`] || f.a}</span>,
        }))}
      />
    </PillarSection>
  );
}

const finalCtaSteps = [
  {
    title: "Project Discussion",
    text: "A short call to understand your goals, audience and timeline.",
  },
  {
    title: "Requirement Analysis",
    text: "We map the scope, platform and features your business actually needs.",
  },
  {
    title: "Custom Proposal",
    text: "You receive a fixed-price proposal and timeline within two business days.",
  },
];

const budgetRanges = [
  "Under ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,50,000",
  "₹2,50,000+",
  "Not sure yet",
];

export function FinalCta() {
  useCMSEditor();
  const s = useSettings([
    "wds_finalcta_label",
    "wds_finalcta_h2",
    "wds_finalcta_p",
    "wds_finalcta_button",
    "wds_finalcta_footnote",
    ...finalCtaSteps.flatMap((_, i) => [`wds_finalcta_step_${i}_title`, `wds_finalcta_step_${i}_text`]),
  ]);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSubmitting(true);
    try {
      const messageParts = [
        fd.get("budget") ? `Budget: ${fd.get("budget")}` : null,
        fd.get("goal") ? `Requirements: ${fd.get("goal")}` : null,
      ].filter(Boolean);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          company: fd.get("business"),
          message: [fd.get("site"), ...messageParts].filter(Boolean).join(" — "),
          project: fd.get("type") || "Website Development",
          source: "website-development-services-ahmedabad",
          ...getAttribution(),
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setSent(true);
      form.reset();
      toast.success("Thanks — we'll be in touch within one business day.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="strategy" className="relative overflow-hidden bg-navy py-16 text-navy-foreground">
      <div className="pointer-events-none absolute inset-0 grid-dark opacity-40" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-primary/18 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:py-4">
          <Reveal>
            <SectionLabelDark>
              <span data-cms-key="wds_finalcta_label" data-cms-label="Final CTA Label" data-cms-attr="text">
                {s.wds_finalcta_label || "Free Website Strategy Session"}
              </span>
            </SectionLabelDark>
          </Reveal>
          <Reveal delay={80}>
            <h2
              data-cms-key="wds_finalcta_h2"
              data-cms-label="Final CTA Heading"
              data-cms-attr="text"
              className="mt-6 text-section text-navy-foreground"
            >
              {s.wds_finalcta_h2 || "Book Your Website Strategy Session"}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              data-cms-key="wds_finalcta_p"
              data-cms-label="Final CTA Paragraph"
              data-cms-attr="text"
              className="mt-5 max-w-lg text-navy-foreground/70"
            >
              {s.wds_finalcta_p ||
                "Fill in the form and our team will review your details before we speak. Here's exactly what happens after you submit it:"}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-10 space-y-6">
              {finalCtaSteps.map((step, i) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p
                      data-cms-key={`wds_finalcta_step_${i}_title`}
                      data-cms-label={`Final CTA Step ${i + 1} Title`}
                      data-cms-attr="text"
                      className="text-base font-extrabold text-navy-foreground"
                    >
                      {s[`wds_finalcta_step_${i}_title`] || step.title}
                    </p>
                    <p
                      data-cms-key={`wds_finalcta_step_${i}_text`}
                      data-cms-label={`Final CTA Step ${i + 1} Text`}
                      data-cms-attr="text"
                      className="mt-1 text-sm text-navy-foreground/70"
                    >
                      {s[`wds_finalcta_step_${i}_text`] || step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={180} className="min-w-0">
          <form
            onSubmit={handleSubmit}
            className="glass-dark rounded-[1.75rem] p-7 shadow-[var(--shadow-mock)] sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-[0.12em] text-navy-foreground/60">
                  Full Name
                </Label>
                <Input id="name" name="name" required placeholder="Priya Sharma" className="h-12 border-white/15 bg-white/5 text-navy-foreground placeholder:text-navy-foreground/40" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="business" className="text-xs font-bold uppercase tracking-[0.12em] text-navy-foreground/60">
                  Company Name
                </Label>
                <Input id="business" name="business" required placeholder="Sharma Enterprises Pvt Ltd" className="h-12 border-white/15 bg-white/5 text-navy-foreground placeholder:text-navy-foreground/40" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-[0.12em] text-navy-foreground/60">
                  Business Email
                </Label>
                <Input id="email" name="email" type="email" required placeholder="priya@business.com" className="h-12 border-white/15 bg-white/5 text-navy-foreground placeholder:text-navy-foreground/40" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-[0.12em] text-navy-foreground/60">
                  Phone Number
                </Label>
                <Input id="phone" name="phone" required placeholder="+91 98XXX XXXXX" className="h-12 border-white/15 bg-white/5 text-navy-foreground placeholder:text-navy-foreground/40" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site" className="text-xs font-bold uppercase tracking-[0.12em] text-navy-foreground/60">
                  Website URL (Optional)
                </Label>
                <Input id="site" name="site" placeholder="www.yourbusiness.com" className="h-12 border-white/15 bg-white/5 text-navy-foreground placeholder:text-navy-foreground/40" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type" className="text-xs font-bold uppercase tracking-[0.12em] text-navy-foreground/60">
                  Project Type
                </Label>
                <Select name="type">
                  <SelectTrigger id="type" className="h-12 border-white/15 bg-white/5 text-navy-foreground [&>span]:text-navy-foreground data-[placeholder]:text-navy-foreground/40">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New Website">New Website</SelectItem>
                    <SelectItem value="Website Redesign">Website Redesign</SelectItem>
                    <SelectItem value="Ecommerce Website">Ecommerce Website</SelectItem>
                    <SelectItem value="Landing Page">Landing Page</SelectItem>
                    <SelectItem value="Not Sure Yet">Not Sure Yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="budget" className="text-xs font-bold uppercase tracking-[0.12em] text-navy-foreground/60">
                  Project Budget
                </Label>
                <Select name="budget">
                  <SelectTrigger id="budget" className="h-12 border-white/15 bg-white/5 text-navy-foreground [&>span]:text-navy-foreground data-[placeholder]:text-navy-foreground/40">
                    <SelectValue placeholder="Select a budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="goal" className="text-xs font-bold uppercase tracking-[0.12em] text-navy-foreground/60">
                  Project Requirements
                </Label>
                <Textarea
                  id="goal"
                  name="goal"
                  rows={4}
                  placeholder="More enquiries, faster pages, a redesign, an online store…"
                  className="border-white/15 bg-white/5 text-navy-foreground placeholder:text-navy-foreground/40"
                />
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="group mt-8 h-[3.25rem] w-full rounded-full text-base font-bold shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
            >
              {sent ? (
                "Request Received"
              ) : submitting ? (
                "Sending..."
              ) : (
                <span data-cms-key="wds_finalcta_button" data-cms-label="Final CTA Button" data-cms-attr="text">
                  {s.wds_finalcta_button || "Request My Website Proposal"}
                </span>
              )}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <p
              data-cms-key="wds_finalcta_footnote"
              data-cms-label="Final CTA Footnote"
              data-cms-attr="text"
              className="mt-4 text-center text-xs font-semibold text-navy-foreground/50"
            >
              {s.wds_finalcta_footnote ||
                "No obligation, no sales pressure. Most enquiries receive a response within one business day."}
            </p>
          </form>
        </Reveal>
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <VisitUs auditHref="#strategy" auditLabel="Request a website proposal" />
      </div>
    </section>
  );
}

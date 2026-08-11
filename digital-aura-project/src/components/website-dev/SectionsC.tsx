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

const logos = [
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
            {s.wds_logos_subtitle || "750+ Businesses We've Helped Grow"}
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

const ratingPlatforms = [
  {
    name: "Clutch",
    src: "/wds/logos/clutch-badge.png",
    badge: "Best of Clutch · Digital Marketing 2025",
    rating: "4.9",
    reviews: "50+ reviews",
    pillClass: "bg-red-50 text-red-600",
    starClass: "fill-red-500 text-red-500",
    ratingClass: "text-red-600",
  },
  {
    name: "GoodFirms",
    src: "/wds/logos/goodfirms-badge.png",
    badge: "Top Digital Marketing Company",
    rating: "4.8",
    reviews: "40+ reviews",
    pillClass: "bg-blue-50 text-blue-600",
    starClass: "fill-blue-500 text-blue-500",
    ratingClass: "text-blue-600",
  },
  {
    name: "DesignRush",
    src: "/wds/logos/designrush-badge.webp",
    badge: "Best Digital Marketing Agencies",
    rating: "4.7",
    reviews: "30+ reviews",
    pillClass: "bg-violet-50 text-violet-600",
    starClass: "fill-violet-500 text-violet-500",
    ratingClass: "text-violet-600",
  },
  {
    name: "Google Reviews",
    src: null,
    badge: "Google Reviews",
    rating: "5.0",
    reviews: "100+ reviews",
    pillClass: "bg-blue-50 text-blue-600",
    starClass: "fill-blue-500 text-blue-500",
    ratingClass: "text-blue-600",
  },
];

function GoogleWordmark() {
  return (
    <p className="text-3xl font-extrabold tracking-tight">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </p>
  );
}

export function RatedPlatforms() {
  useCMSEditor();
  const s = useSettings([
    "wds_rated_h2",
    "wds_rated_p",
    ...ratingPlatforms.flatMap((_, i) => [
      `wds_rated_${i}_badge`,
      `wds_rated_${i}_rating`,
      `wds_rated_${i}_reviews`,
    ]),
  ]);
  return (
    <section id="results" className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 data-cms-key="wds_rated_h2" data-cms-label="Rated Heading" data-cms-attr="text" className="text-section">
            {s.wds_rated_h2 || "Rated on Top Platforms"}
          </h2>
          <p
            data-cms-key="wds_rated_p"
            data-cms-label="Rated Paragraph"
            data-cms-attr="text"
            className="mt-4 text-muted-foreground"
          >
            {s.wds_rated_p || "Recognised by leading industry directories across India and worldwide."}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ratingPlatforms.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <div className="hover-lift flex h-full flex-col items-center rounded-2xl border border-border bg-background p-7 text-center shadow-[var(--shadow-soft)]">
                <div className="flex h-16 items-center justify-center">
                  {p.src ? (
                    <img src={p.src} alt={p.name} className="h-16 w-auto object-contain" />
                  ) : (
                    <GoogleWordmark />
                  )}
                </div>
                <span
                  data-cms-key={`wds_rated_${i}_badge`}
                  data-cms-label={`Rated Platform ${i + 1} Badge`}
                  data-cms-attr="text"
                  className={`mt-5 inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${p.pillClass}`}
                >
                  {s[`wds_rated_${i}_badge`] || p.badge}
                </span>
                <div className="mt-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} className={`h-[18px] w-[18px] ${p.starClass}`} />
                  ))}
                </div>
                <p
                  data-cms-key={`wds_rated_${i}_rating`}
                  data-cms-label={`Rated Platform ${i + 1} Rating`}
                  data-cms-attr="text"
                  className={`mt-2 text-3xl font-extrabold tracking-tight ${p.ratingClass}`}
                >
                  {s[`wds_rated_${i}_rating`] || p.rating}
                </p>
                <p
                  data-cms-key={`wds_rated_${i}_reviews`}
                  data-cms-label={`Rated Platform ${i + 1} Reviews`}
                  data-cms-attr="text"
                  className="mt-1 text-xs font-semibold text-muted-foreground"
                >
                  {s[`wds_rated_${i}_reviews`] || p.reviews}
                </p>
              </div>
            </Reveal>
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

const faqs = [
  {
    q: "How long does website development take?",
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
    q: "What does a professional website cost?",
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
    <section id="faq" className="bg-cream">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel>
              <span data-cms-key="wds_faq_label" data-cms-label="FAQ Label" data-cms-attr="text">
                {s.wds_faq_label || "FAQ"}
              </span>
            </SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2
              data-cms-key="wds_faq_h2"
              data-cms-label="FAQ Heading"
              data-cms-attr="text"
              className="mt-5 text-section"
            >
              {s.wds_faq_h2 || "Questions worth asking before you hire us"}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              data-cms-key="wds_faq_p"
              data-cms-label="FAQ Paragraph"
              data-cms-attr="text"
              className="mt-4 text-muted-foreground"
            >
              {s.wds_faq_p ||
                "Still unsure about something? Ask it on the strategy call — no obligation, no sales script."}
            </p>
          </Reveal>
        </div>
        <Reveal delay={160} className="mt-14 block">
          {/* Accordion identity (key/value) stays tied to the original question text so
              open/close state doesn't break if the CMS overrides the displayed copy. */}
          <Accordion type="single" collapsible defaultValue={faqs[0].q} className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={f.q}
                className="mb-3 overflow-hidden rounded-2xl border border-border bg-background px-5 shadow-[var(--shadow-soft)] transition-colors hover:border-primary/40"
              >
                <AccordionTrigger className="py-5 text-left text-base font-extrabold tracking-tight hover:no-underline">
                  <span data-cms-key={`wds_faq_${i}_q`} data-cms-label={`FAQ ${i + 1} Question`} data-cms-attr="text">
                    {s[`wds_faq_${i}_q`] || f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">
                  <span data-cms-key={`wds_faq_${i}_a`} data-cms-label={`FAQ ${i + 1} Answer`} data-cms-attr="text">
                    {s[`wds_faq_${i}_a`] || f.a}
                  </span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
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

      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
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

        <Reveal delay={180}>
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
    </section>
  );
}

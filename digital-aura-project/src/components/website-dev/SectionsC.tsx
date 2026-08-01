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
  return (
    <section id="clients" className="border-y border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-section">Clients We've Grown</h2>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            750+ Businesses We've Helped Grow
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
  return (
    <section id="results" className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-section">Rated on Top Platforms</h2>
          <p className="mt-4 text-muted-foreground">
            Recognised by leading industry directories across India and worldwide.
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
                <span className={`mt-5 inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${p.pillClass}`}>
                  {p.badge}
                </span>
                <div className="mt-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className={`h-[18px] w-[18px] ${p.starClass}`} />
                  ))}
                </div>
                <p className={`mt-2 text-3xl font-extrabold tracking-tight ${p.ratingClass}`}>
                  {p.rating}
                </p>
                <p className="mt-1 text-xs font-semibold text-muted-foreground">{p.reviews}</p>
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
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Client Feedback</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-section">What our clients say changed after launch</h2>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="hover-lift gradient-border flex h-full flex-col rounded-2xl border border-border bg-background p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:border-primary/40">
                <div className="flex items-center justify-between gap-3">
                  <Quote className="h-7 w-7 text-primary/50" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-[18px] w-[18px] fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-6 flex-1 text-[15px] leading-relaxed text-foreground/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex min-w-0 items-center gap-3 border-t border-border pt-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-sm font-extrabold text-primary">
                    {t.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-extrabold">{t.name}</span>
                    <span className="block truncate text-xs font-semibold text-muted-foreground">
                      {t.role}
                    </span>
                  </span>
                  <span className="ml-auto shrink-0 rounded-full bg-primary/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
                    Verified
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
  return (
    <section id="faq" className="bg-cream">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel>FAQ</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-section">Questions worth asking before you hire us</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-muted-foreground">
              Still unsure about something? Ask it on the strategy call — no obligation, no sales
              script.
            </p>
          </Reveal>
        </div>
        <Reveal delay={160} className="mt-14 block">
          <Accordion type="single" collapsible defaultValue={faqs[0].q} className="w-full">
            {faqs.map((f) => (
              <AccordionItem
                key={f.q}
                value={f.q}
                className="mb-3 overflow-hidden rounded-2xl border border-border bg-background px-5 shadow-[var(--shadow-soft)] transition-colors hover:border-primary/40"
              >
                <AccordionTrigger className="py-5 text-left text-base font-extrabold tracking-tight hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">
                  {f.a}
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
            <SectionLabelDark>Free Website Strategy Session</SectionLabelDark>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-section text-navy-foreground">
              Book Your Website Strategy Session
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 max-w-lg text-navy-foreground/70">
              Fill in the form and our team will review your details before we speak. Here's
              exactly what happens after you submit it:
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
                    <p className="text-base font-extrabold text-navy-foreground">{step.title}</p>
                    <p className="mt-1 text-sm text-navy-foreground/70">{step.text}</p>
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
              {sent ? "Request Received" : submitting ? "Sending..." : "Request My Website Proposal"}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="mt-4 text-center text-xs font-semibold text-navy-foreground/50">
              No obligation, no sales pressure. Most enquiries receive a response within one
              business day.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

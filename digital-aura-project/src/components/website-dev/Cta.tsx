import { useState, type FormEvent } from "react";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";

export function CtaBand({
  tone = "dark",
  headline,
  description,
  buttonText,
  href,
}: {
  tone?: "dark" | "light";
  headline: string;
  description?: string;
  buttonText: string;
  href: string;
}) {
  const dark = tone === "dark";
  return (
    <section
      className={
        dark
          ? "relative overflow-hidden bg-navy py-16 text-navy-foreground"
          : "relative overflow-hidden bg-primary-soft/50 py-16"
      }
    >
      {dark && (
        <>
          <div className="pointer-events-none absolute inset-0 grid-dark opacity-40" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        </>
      )}
      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className={dark ? "text-section text-navy-foreground" : "text-section"}>
            {headline}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={80}>
            <p className={dark ? "mt-4 text-navy-foreground/70" : "mt-4 text-muted-foreground"}>
              {description}
            </p>
          </Reveal>
        )}
        <Reveal delay={140}>
          <Button
            asChild
            size="lg"
            className="group mt-8 h-[3.25rem] rounded-full px-7 text-base font-bold shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
          >
            <a href={href}>
              {buttonText}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBanner({
  headline,
  buttonText,
  href,
  bg = "bg-background",
}: {
  headline: string;
  buttonText: string;
  href: string;
  bg?: string;
}) {
  return (
    <section className={bg}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="hover-lift gradient-border flex flex-col items-center justify-between gap-6 rounded-3xl border border-border bg-card px-7 py-9 text-center shadow-[var(--shadow-soft)] sm:flex-row sm:text-left">
            <h3 className="text-xl font-extrabold tracking-tight sm:text-2xl">{headline}</h3>
            <Button
              asChild
              size="lg"
              className="group h-12 shrink-0 rounded-full px-6 text-sm font-bold shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
            >
              <a href={href}>
                {buttonText}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const projectTypes = [
  "New Website",
  "Website Redesign",
  "Ecommerce Website",
  "Landing Page",
  "Not Sure Yet",
];

export function QuickEnquiry() {
  useCMSEditor();
  const s = useSettings([
    "wds_enquiry_badge",
    "wds_enquiry_h2",
    "wds_enquiry_p",
    "wds_enquiry_button",
  ]);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          message: fd.get("site") || "",
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
    <section id="enquiry" className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary">
              <MessageSquareText className="h-3.5 w-3.5" />
              <span data-cms-key="wds_enquiry_badge" data-cms-label="Enquiry Badge" data-cms-attr="text">
                {s.wds_enquiry_badge || "Start the Conversation"}
              </span>
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              data-cms-key="wds_enquiry_h2"
              data-cms-label="Enquiry Heading"
              data-cms-attr="text"
              className="mt-5 text-section"
            >
              {s.wds_enquiry_h2 || "Every project starts with your goals, not a template"}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              data-cms-key="wds_enquiry_p"
              data-cms-label="Enquiry Paragraph"
              data-cms-attr="text"
              className="mt-4 max-w-md text-muted-foreground"
            >
              {s.wds_enquiry_p ||
                "Before we talk design or platform, we take the time to understand your business, your buyers and what you actually need this website to achieve. Share a few details and we'll come back with next steps."}
            </p>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <form
            onSubmit={handleSubmit}
            className="rounded-[1.75rem] border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="qe-name" className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Name
                </Label>
                <Input id="qe-name" name="name" required placeholder="Priya Sharma" className="h-12" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="qe-email" className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Business Email
                </Label>
                <Input id="qe-email" name="email" type="email" required placeholder="priya@business.com" className="h-12" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="qe-phone" className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Phone
                </Label>
                <Input id="qe-phone" name="phone" required placeholder="+91 98XXX XXXXX" className="h-12" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="qe-site" className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Website URL (Optional)
                </Label>
                <Input id="qe-site" name="site" placeholder="www.yourbusiness.com" className="h-12" />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="qe-type" className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Project Type
                </Label>
                <Select name="type">
                  <SelectTrigger id="qe-type" className="h-12">
                    <SelectValue placeholder="Select a project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="group mt-6 h-[3.25rem] w-full rounded-full text-base font-bold shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
            >
              {sent ? (
                "Request Received"
              ) : submitting ? (
                "Sending..."
              ) : (
                <span data-cms-key="wds_enquiry_button" data-cms-label="Enquiry Button" data-cms-attr="text">
                  {s.wds_enquiry_button || "Request My Website Proposal"}
                </span>
              )}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

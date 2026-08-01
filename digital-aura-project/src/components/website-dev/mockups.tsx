import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  children,
  url = "thedigitalaura.com",
  className,
  dark = false,
}: {
  children: ReactNode;
  url?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border",
        dark ? "border-white/10 bg-navy-soft" : "border-border bg-card",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b px-4 py-3",
          dark ? "border-white/10 bg-navy" : "border-border bg-muted",
        )}
      >
        <div className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        </div>
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-1",
            dark ? "bg-white/5 text-navy-foreground/60" : "bg-background text-muted-foreground",
          )}
        >
          <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor">
            <path strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-12V7a4 4 0 10-8 0v4" />
          </svg>
          <span className="truncate text-[11px] font-semibold">{url}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

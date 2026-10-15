import { Section, SectionHead } from "../shared/SectionPrimitives";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SNAPSHOTS = [
  { src: "/performance/snapshot-1.webp", alt: "Google Ads campaign performance — clicks, impressions, CPC, cost, conversions and conversion value" },
  { src: "/performance/snapshot-2.webp", alt: "Google Ads campaign performance — clicks, impressions, CPC, cost and conversions" },
  { src: "/performance/snapshot-3.webp", alt: "Google Ads campaign performance — clicks, conversions, cost per conversion and cost" },
];

export function DashboardGallery() {
  return (
    <Section id="gallery" className="bg-surface-cream">
      <SectionHead
        eyebrow="Verified account data"
        title="Google Ads performance snapshots"
        lead="Real campaign dashboards from active client accounts. Sensitive information has been hidden for privacy."
      />

      <Carousel className="mx-auto max-w-4xl">
        <CarouselContent>
          {SNAPSHOTS.map((s) => (
            <CarouselItem key={s.src}>
              <div className="rounded-3xl border border-border bg-surface-cream p-3 shadow-card md:p-5">
                <img
                  src={s.src}
                  alt={s.alt}
                  className="w-full h-auto rounded-2xl border border-border"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 size-12 xl:-left-16" />
        <CarouselNext className="right-2 size-12 xl:-right-16" />
      </Carousel>
    </Section>
  );
}

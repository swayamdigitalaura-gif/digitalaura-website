import { Eyebrow, H2, Lead, Section } from "../shared/SectionPrimitives";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SNAPSHOTS = [
  { src: "/performance/snapshot-1.png", alt: "Google Ads campaign performance — clicks, impressions, CPC, cost, conversions and conversion value" },
  { src: "/performance/snapshot-2.png", alt: "Google Ads campaign performance — clicks, impressions, CPC, cost and conversions" },
  { src: "/performance/snapshot-3.png", alt: "Google Ads campaign performance — clicks, conversions, cost per conversion and cost" },
];

export function DashboardGallery() {
  return (
    <Section id="gallery" className="bg-white">
      <div className="mx-auto max-w-3xl text-center mb-14">
        <Eyebrow>Verified Account Data</Eyebrow>
        <H2 className="mt-6">Google Ads Performance Snapshots</H2>
        <Lead className="mt-6 mx-auto">
          Real Google Ads campaign dashboards from active client accounts. Sensitive information has been hidden for privacy.
        </Lead>
      </div>

      <Carousel className="mx-auto max-w-5xl">
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
        <CarouselPrevious className="-left-4 size-12 md:-left-16" />
        <CarouselNext className="-right-4 size-12 md:-right-16" />
      </Carousel>
    </Section>
  );
}

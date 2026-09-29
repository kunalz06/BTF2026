import { AboutSection } from "@/components/about-section";
import { ClosingCta, Footer } from "@/components/closing-cta";
import { FaqSection } from "@/components/faq-section";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Highlights } from "@/components/highlights";
import { HostsSection } from "@/components/hosts-section";
import { KeyInformation } from "@/components/key-information";
import { RulesSection } from "@/components/rules-section";
import { TimelineSection } from "@/components/timeline-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <AboutSection />
        <KeyInformation />
        <TimelineSection />
        <RulesSection />
        <HostsSection />
        <FaqSection />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}

import { Hero } from "../components/sections/Hero";
import { TrustStrip } from "../components/sections/TrustStrip";
import { StatsBar } from "../components/sections/StatsBar";
import { HowItWorks } from "../components/sections/HowItWorks";
import { LearnSection } from "../components/sections/LearnSection";
import { PopularTerms } from "../components/sections/PopularTerms";
import { FeaturedContent } from "../components/sections/FeaturedContent";
import { IdCardShowcase } from "../components/sections/IdCardShowcase";
import { NewsletterCTA } from "../components/sections/NewsletterCTA";
import { NewsletterSignup } from "../components/sections/NewsletterSignup";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <StatsBar />
      <HowItWorks />
      <LearnSection />
      <PopularTerms />
      <FeaturedContent />
      <IdCardShowcase />
      <NewsletterCTA />
      <NewsletterSignup />
    </>
  );
}

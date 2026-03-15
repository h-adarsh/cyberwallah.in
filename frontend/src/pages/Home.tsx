import { Hero } from "../components/sections/Hero";
import { StatsBar } from "../components/sections/StatsBar";
import { LearnSection } from "../components/sections/LearnSection";
import { NewsletterCTA } from "../components/sections/NewsletterCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <LearnSection />
      <NewsletterCTA />
    </>
  );
}
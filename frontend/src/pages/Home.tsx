import { Hero } from "../components/sections/Hero";
import { StatsBar } from "../components/sections/StatsBar";
import { LearnSection } from "../components/sections/LearnSection";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <LearnSection />
    </>
  );
}
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Selective } from "@/components/sections/Selective";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
// Projects section is temporarily disabled — not ready to show yet, but kept for later use.
// import { Projects } from "@/components/sections/Projects";
import { GuidingPrinciples } from "@/components/sections/GuidingPrinciples";
import { WytesStandard } from "@/components/sections/WytesStandard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Selective />
      <Services />
      <Process />
      {/* <Projects /> */}
      <GuidingPrinciples />
      <WytesStandard />
      <CtaBand />
      <Footer />
    </main>
  );
}

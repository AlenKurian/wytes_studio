import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { Philosophy } from "@/components/about/Philosophy";
import { WhyWeExist } from "@/components/about/WhyWeExist";
import { Approach } from "@/components/about/Approach";
import { WhatWeBelieve } from "@/components/about/WhatWeBelieve";

const ABOUT_DESCRIPTION =
  "Wytes Studio is a strategy-led branding and creative studio for businesses that are intentional about how they compete, communicate and command attention.";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT_DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    title: "About — WYTES Studio",
    description: ABOUT_DESCRIPTION,
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — WYTES Studio",
    description: ABOUT_DESCRIPTION,
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <WhoWeAre />
      <Philosophy />
      <WhyWeExist />
      <Approach />
      <WhatWeBelieve />
    </main>
  );
}

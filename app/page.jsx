import CTASection from "@/components/callToAction";
import Features from "@/components/features";
import HeroSection1 from "@/components/hero/hero-section";
import HowItWorksSection from "@/components/how-it-works";
import StatsSection from "@/components/stats";
import TestimonialsSection from "@/components/testinomials/testinomial-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <HeroSection1 />
      <StatsSection />

      <Features />

      <HowItWorksSection />

      <TestimonialsSection />

      <CTASection />
    </div>
  );
}

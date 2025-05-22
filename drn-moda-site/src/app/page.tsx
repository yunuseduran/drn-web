import React from "react";
import VideoBanner from "@/components/home/VideoBanner";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import StatsSection from "@/components/home/StatsSection";
import LocationsSection from "@/components/home/LocationsSection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import HRSection from "@/components/home/HRSection";
import NewsSection from "@/components/home/NewsSection";

export default function Home() {
  return (
    <main>
      <VideoBanner />
      <AboutSection />
      <ServicesSection />
      <CategoryShowcase />
      <StatsSection />
      <LocationsSection />
      <SustainabilitySection />
      <HRSection />
      <NewsSection />
    </main>
  );
}

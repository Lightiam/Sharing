import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import PricingSection from '../components/sections/PricingSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import FAQSection from '../components/sections/FAQSection';

export default function LandingPage() {
  return (
    <div className="ud-bg-white dark:ud-bg-dark">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
}

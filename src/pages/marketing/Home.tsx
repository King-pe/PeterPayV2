import React from 'react';
import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { Hero } from '../../components/marketing/sections/Hero';
import { ChannelsStrip } from '../../components/marketing/sections/ChannelsStrip';
import { FeatureGrid } from '../../components/marketing/sections/FeatureGrid';
import { DeveloperSection } from '../../components/marketing/sections/DeveloperSection';
import { MetricsStrip } from '../../components/marketing/sections/MetricsStrip';
import { SecurityCards } from '../../components/marketing/sections/SecurityCards';
import { Testimonials } from '../../components/marketing/sections/Testimonials';
import { PricingTeaser } from '../../components/marketing/sections/PricingTeaser';
import { FinalCTA } from '../../components/marketing/sections/FinalCTA';
import { useScreenInit } from '../../useScreenInit';
export function Home() {
  useScreenInit();
  return (
    <MarketingLayout>
      <Hero />
      <ChannelsStrip />
      <FeatureGrid />
      <DeveloperSection />
      <MetricsStrip />
      <SecurityCards />
      <Testimonials />
      <PricingTeaser />
      <FinalCTA />
    </MarketingLayout>);

}
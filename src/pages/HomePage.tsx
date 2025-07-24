import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import PropertiesSection from '../components/PropertiesSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <PropertiesSection />
      <StatsSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
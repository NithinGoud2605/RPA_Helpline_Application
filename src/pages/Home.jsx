import { HeroSection } from '../components/hero/HeroSection';
import { ServicesSection } from '../components/hero/ServicesSection';
import { TelemetrySection } from '../components/telemetry/TelemetrySection';

export const Home = () => {
  return (
    <>
      <HeroSection />
      <TelemetrySection />
      <ServicesSection />
    </>
  );
};


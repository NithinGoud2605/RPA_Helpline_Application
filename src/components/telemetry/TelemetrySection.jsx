import { FaWaveSquare } from 'react-icons/fa';
import { Container } from '../layout/Container';
import { TelemetryCard } from './TelemetryCard';

export const TelemetrySection = () => {
  const metrics = [
    {
      label: 'ACTIVE RPA DEVS',
      value: 78,
      suffix: '+',
      delay: 0,
    },
    {
      label: 'MISSIONS COMPLETE',
      value: 22,
      delay: 0.1,
    },
    {
      label: 'SUCCESS RATE',
      value: 99.2,
      suffix: '%',
      delay: 0.2,
    },
    {
      label: 'SUPPORT UPTIME',
      value: 24,
      suffix: '/7',
      delay: 0.3,
    },
  ];

  return (
    <section className="py-20">
      <Container>
        <div className="border-2 border-t-primary-red border-r-primary-red border-b-primary-blue border-l-primary-blue bg-dark-surface p-8">
          <div className="flex items-center gap-2 mb-8">
            <FaWaveSquare className="text-primary-blue" />
            <h2 className="text-white text-sm font-mono uppercase tracking-wide">LIVE TELEMETRY DATA</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <TelemetryCard key={index} {...metric} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};


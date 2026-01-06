import { memo, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Rocket, Search, Handshake, CheckCircle, Shield, Zap, Clock, Globe } from 'lucide-react';

export const HowItWorks = memo(() => {
  const steps = useMemo(() => [
    {
      icon: Rocket,
      title: 'Launch Mission',
      description: 'Post your project or search for RPA talent with AI-powered matching.',
    },
    {
      icon: Search,
      title: 'Browse & Filter',
      description: 'Explore profiles, portfolios, and reviews. Filter by skills and experience.',
    },
    {
      icon: Handshake,
      title: 'Connect',
      description: 'Communicate directly with specialists. Discuss requirements and timelines.',
    },
    {
      icon: CheckCircle,
      title: 'Complete',
      description: 'Deliver results together. Rate and review your experience.',
    },
  ], []);

  const features = useMemo(() => [
    { icon: Shield, title: 'Expert Talent', desc: 'Verified RPA specialists with proven track records' },
    { icon: Zap, title: 'Fast Matching', desc: 'AI connects you with ideal candidates in hours' },
    { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock assistance for smooth projects' },
    { icon: Globe, title: 'Transparent', desc: 'Clear communication and honest reviews' },
  ], []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 star-field opacity-40 pointer-events-none" />
      <div className="fixed inset-0 grid-overlay opacity-20 pointer-events-none" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center py-16 md:py-20 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[10px] md:text-xs font-mono text-secondary mb-2 tracking-widest">// OPERATIONAL PROTOCOL</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-2 font-display uppercase tracking-tight">
              <span className="text-foreground">HOW IT</span>{' '}
              <span className="text-primary">WORKS</span>
            </h1>
            <p className="text-muted-foreground font-mono text-xs sm:text-sm max-w-xl mx-auto">
              Simple, fast, and efficient. Get your RPA projects off the ground in minutes.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="text-center tech-panel hover-lift border-border hover:border-primary/50 bg-card/50">
                  <CardHeader className="pb-2 pt-3 md:pt-4 px-2 md:px-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 border border-primary/30 rounded flex items-center justify-center mx-auto mb-1 md:mb-2">
                      <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div className="text-lg md:text-xl font-black text-foreground mb-0.5 md:mb-1 font-display">{index + 1}</div>
                    <CardTitle className="text-xs md:text-sm font-display uppercase">{step.title}</CardTitle>
                    <CardDescription className="text-muted-foreground font-mono text-[10px] md:text-xs leading-tight">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Why Choose Us */}
          <Card className="tech-panel-strong border-glow-blue">
            <CardHeader className="pb-2 md:pb-3 pt-3 md:pt-4">
              <CardTitle className="text-base md:text-xl font-display uppercase text-center">WHY CHOOSE RPA HELPLINE?</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 md:pb-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center justify-center mx-auto mb-1 md:mb-2">
                      <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                    </div>
                    <h3 className="text-xs md:text-sm font-black text-secondary mb-0.5 md:mb-1 font-display uppercase">{feature.title}</h3>
                    <p className="text-muted-foreground font-mono text-[10px] md:text-xs">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

HowItWorks.displayName = 'HowItWorks';

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Rocket, Home, ArrowLeft, Radio, Navigation } from 'lucide-react';

export const NotFound = memo(() => {
  return (
    <div className="h-screen flex items-center justify-center overflow-hidden relative">
      {/* Background effects */}
      <div className="fixed inset-0 star-field opacity-60 pointer-events-none" />
      <div className="fixed inset-0 grid-overlay opacity-30 pointer-events-none" />

      {/* Floating gradient orbs - smaller on mobile */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 md:w-48 md:h-48 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow delay-150" />

      <div className="relative z-10 text-center px-4 md:px-6 max-w-xl mx-auto">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 tech-panel rounded-full mb-6 border-glow-red">
          <Radio className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs font-mono text-primary tracking-wider">SIGNAL LOST</span>
        </div>

        {/* Icon */}
        <div className="mb-4 md:mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-primary/10 border-2 border-primary/30 rounded-2xl flex items-center justify-center">
            <Rocket className="w-8 h-8 md:w-10 md:h-10 text-primary animate-bounce" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-2 font-display tracking-tight">
          4<span className="text-primary">0</span>4
        </h1>

        {/* Title */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 md:mb-3 font-display uppercase tracking-wider">
          MISSION NOT FOUND
        </h2>

        {/* Description */}
        <p className="text-muted-foreground mb-6 md:mb-8 font-mono text-xs md:text-sm max-w-md mx-auto">
          The destination you're seeking has drifted beyond our radar. Return to the homepage to recalibrate your trajectory.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 md:gap-3 justify-center">
          <Link to="/">
            <Button variant="primary" size="lg" className="font-display uppercase tracking-wider glow-red group w-full sm:w-auto min-h-[44px]">
              <Home className="mr-2 h-4 w-4" />
              RETURN TO BASE
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="font-display uppercase tracking-wider border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary group w-full sm:w-auto min-h-[44px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            GO BACK
          </Button>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-xs font-mono text-muted-foreground/60">
          <Navigation className="w-3 h-3 inline mr-1" />
          ERROR CODE: MISSION_TRAJECTORY_UNDEFINED
        </p>
      </div>
    </div>
  );
});

NotFound.displayName = 'NotFound';

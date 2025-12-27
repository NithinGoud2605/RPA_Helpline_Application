import { useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export const MainLayout = ({ children }) => {
  useSmoothScroll();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [children]);

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg bg-starfield">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};


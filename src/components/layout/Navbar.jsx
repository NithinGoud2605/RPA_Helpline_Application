import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRocket, FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '../ui/Button';
import { Container } from './Container';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'SERVICES' },
    { to: '/projects', label: 'RPAFreelancer' },
    { to: '/register/trainer', label: 'OPERATIONS' },
    { to: '/projects', label: 'PROJECTS' },
  ];

  return (
    <nav className="bg-dark-surface/80 backdrop-blur-sm border-b border-dark-border fixed top-0 left-0 right-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-accent-yellow flex items-center justify-center flex-shrink-0">
              <FaRocket className="text-dark-bg text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white uppercase tracking-wide leading-tight">RPA HELPLINE</span>
              <span className="text-xs text-gray-400 uppercase leading-tight">ROBOTIC PROCESS AUTOMATION</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-white hover:text-primary-blue transition-colors text-sm font-mono uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/sign-in"
              className="text-white text-sm font-mono uppercase tracking-wider hover:text-primary-blue transition-colors"
            >
              SIGN IN
            </Link>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/register/client')}
              className="font-mono uppercase tracking-wider"
            >
              LAUNCH MISSION
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-primary-blue transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-border">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-300 hover:text-primary-blue transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  navigate('/register/client');
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2"
              >
                <FaRocket className="mr-2" />
                Launch Mission
              </Button>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
};


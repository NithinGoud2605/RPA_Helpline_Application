import { Link } from 'react-router-dom';
import { Container } from './Container';

export const Footer = () => {
  return (
    <footer className="bg-dark-surface border-t border-dark-border mt-auto">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">RPA Helpline</h3>
            <p className="text-gray-400 text-sm">
              Connecting businesses with elite RPA talent for mission-critical automation.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/register/developer" className="hover:text-primary-blue transition-colors">Hire Developers</Link></li>
              <li><Link to="/register/freelancer" className="hover:text-primary-blue transition-colors">Find Freelancers</Link></li>
              <li><Link to="/register/trainer" className="hover:text-primary-blue transition-colors">Training Programs</Link></li>
              <li><Link to="/register/project" className="hover:text-primary-blue transition-colors">Post Project</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/how-it-works" className="hover:text-primary-blue transition-colors">How It Works</Link></li>
              <li><Link to="/projects" className="hover:text-primary-blue transition-colors">Browse Projects</Link></li>
              <li><a href="#" className="hover:text-primary-blue transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-blue transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-primary-blue transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary-blue transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary-blue transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary-blue transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-border pt-8 pb-6 text-center text-gray-400 text-sm">
          <p>&copy; 2024 RPA Helpline. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};


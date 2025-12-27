// SEO component - Note: Install react-helmet-async for full functionality
// For now, SEO is handled in index.html
// To use this component: npm install react-helmet-async
// Then wrap your app with <HelmetProvider> in main.jsx

// import { Helmet } from 'react-helmet-async';

// SEO component placeholder
// To enable: npm install react-helmet-async
// Then uncomment and use this component in your pages

export const SEO = ({
  title = 'RPA Helpline - Robotic Process Automation Services',
  description = 'Connect with elite RPA developers, freelancers, and trainers. Find automation projects, hire talent, and accelerate your business processes.',
  keywords = 'RPA, Robotic Process Automation, Automation Developers, RPA Freelancers, Automation Training',
  image = '/og-image.png',
  url = '',
}) => {
  // Update document title
  if (typeof document !== 'undefined') {
    const fullTitle = title.includes('RPA Helpline') ? title : `${title} | RPA Helpline`;
    document.title = fullTitle;
  }

  return null; // Meta tags are handled in index.html
};


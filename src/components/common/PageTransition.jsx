import { memo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export const PageTransition = memo(({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] // Custom easing for smoother animation
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
});

PageTransition.displayName = 'PageTransition';


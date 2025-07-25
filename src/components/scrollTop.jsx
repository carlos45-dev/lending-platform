import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Only scroll to top for PUSH or REPLACE navigations (not POP for back/forward)
    if (navigationType !== 'POP') {
      // Defer scroll to next event loop to ensure it happens after new page renders
      const timer = setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'auto', 
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname, navigationType]);

  return null; 
}

export default ScrollToTop;
import { useEffect } from 'react';

const VALID_SECTION_HASHES = new Set([
  '#home',
  '#about',
  '#education',
  '#skills',
  '#experience',
  '#projects',
  '#certifications',
  '#contact',
]);

/**
 * Ensures the portfolio starts at the Home/Hero section on normal page refresh
 * or fresh visit, while preserving explicit intentional section URL/hash navigation,
 * smooth in-page navigation, and browser back/forward history traversal.
 */
export function useScrollRestoration(): void {
  useEffect(() => {
    // Disable automatic browser scroll restoration to prevent stale position restore
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Determine if the current page load is a refresh/reload
    let isReload = false;
    try {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        isReload = (navEntries[0] as PerformanceNavigationTiming).type === 'reload';
      } else if (window.performance && window.performance.navigation) {
        // Fallback for older Navigation Timing API
        isReload = window.performance.navigation.type === 1;
      }
    } catch {
      isReload = false;
    }

    const currentHash = window.location.hash;

    if (isReload) {
      // On refresh: always reset to Home section.
      // Strip any stale hash so the browser doesn't anchor-jump.
      if (currentHash && currentHash !== '#home') {
        window.history.replaceState(
          null,
          '',
          window.location.pathname + window.location.search
        );
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else if (currentHash && VALID_SECTION_HASHES.has(currentHash) && currentHash !== '#home') {
      // User explicitly opened a valid section URL/hash in a new tab or via direct address entry.
      // Allow DOM to settle, then navigate smoothly to the target section.
      const target = document.querySelector(currentHash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Fresh visit to root URL or #home: ensure viewport starts at Home.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // Handle browser back/forward button traversal
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash && VALID_SECTION_HASHES.has(hash)) {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);
}

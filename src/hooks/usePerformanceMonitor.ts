import { useEffect } from 'react';

export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Monitor performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navigationEntry = entry as PerformanceNavigationTiming;
            console.log('🚀 Navigation Performance:', {
              'DNS Lookup': navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart,
              'Connection': navigationEntry.connectEnd - navigationEntry.connectStart,
              'Response Time': navigationEntry.responseEnd - navigationEntry.requestStart,
              'DOM Content Loaded': navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart,
              'Load Complete': navigationEntry.loadEventEnd - navigationEntry.fetchStart
            });
          }
        });
      });

      observer.observe({ entryTypes: ['navigation', 'measure'] });

      return () => observer.disconnect();
    }
  }, []);

  // Report Web Vitals in production
  useEffect(() => {
    if (typeof window !== 'undefined' && 'reportWebVitals' in window) {
      // @ts-ignore
      window.reportWebVitals = (metric: any) => {
        console.log('📊 Web Vital:', metric);
        // Could send to analytics service here
      };
    }
  }, []);
};
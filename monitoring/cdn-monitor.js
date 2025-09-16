/**
 * MovingWalls DS - CDN Performance Monitor
 * Real-time performance tracking and analytics
 */
(function() {
  'use strict';
  
  // Performance monitoring configuration
  const CONFIG = {
    package: 'movingwalls-ds',
    version: '1.0.0',
    endpoint: 'https://api.mwdesignsystem.com/analytics', // Replace with your endpoint
    sessionId: generateSessionId(),
    enabled: true
  };
  
  // Performance metrics collector
  class PerformanceCollector {
    constructor() {
      this.metrics = {
        session: CONFIG.sessionId,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        referrer: document.referrer,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        connection: this.getConnectionInfo(),
        resources: [],
        errors: [],
        timing: {},
        cdn: {
          primary: null,
          fallback: null,
          used: null,
          failover: false
        }
      };
      
      this.startTime = performance.now();
      this.setupListeners();
    }
    
    getConnectionInfo() {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      return connection ? {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      } : null;
    }
    
    setupListeners() {
      // Resource timing observer
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            if (entry.name.includes('movingwalls-ds')) {
              this.recordResourceLoad(entry);
            }
          });
        });
        observer.observe({ entryTypes: ['resource'] });
      }
      
      // Error tracking
      window.addEventListener('error', (event) => {
        if (event.target.src && event.target.src.includes('movingwalls-ds')) {
          this.recordError({
            type: 'resource_error',
            url: event.target.src,
            timestamp: Date.now(),
            message: 'Resource failed to load'
          });
        }
      });
      
      // Unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        this.recordError({
          type: 'promise_rejection',
          message: event.reason?.message || 'Unknown error',
          timestamp: Date.now()
        });
      });
      
      // Page visibility change
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.sendMetrics();
        }
      });
      
      // Before page unload
      window.addEventListener('beforeunload', () => {
        this.sendMetrics();
      });
    }
    
    recordResourceLoad(entry) {
      const resource = {
        name: entry.name,
        type: this.getResourceType(entry.name),
        size: entry.transferSize || 0,
        duration: entry.duration,
        startTime: entry.startTime,
        endTime: entry.startTime + entry.duration,
        cdn: this.detectCDN(entry.name),
        cached: entry.transferSize === 0 && entry.duration < 50,
        compressed: entry.encodedBodySize < entry.decodedBodySize
      };
      
      this.metrics.resources.push(resource);
      this.updateCDNUsage(resource);
      
      // Auto-send metrics for critical resources
      if (resource.type === 'script' || resource.type === 'stylesheet') {
        setTimeout(() => this.sendMetrics(), 1000);
      }
    }
    
    getResourceType(url) {
      if (url.includes('.js')) return 'script';
      if (url.includes('.css')) return 'stylesheet';
      if (url.includes('/fonts/')) return 'font';
      return 'other';
    }
    
    detectCDN(url) {
      if (url.includes('unpkg.com')) return 'unpkg';
      if (url.includes('jsdelivr.net')) return 'jsdelivr';
      if (url.includes('cdnjs.cloudflare.com')) return 'cdnjs';
      return 'unknown';
    }
    
    updateCDNUsage(resource) {
      const cdn = resource.cdn;
      if (cdn === 'unpkg') {
        this.metrics.cdn.primary = 'unpkg';
        this.metrics.cdn.used = 'primary';
      } else if (cdn === 'jsdelivr') {
        if (this.metrics.cdn.primary === 'unpkg') {
          this.metrics.cdn.fallback = 'jsdelivr';
          this.metrics.cdn.used = 'fallback';
          this.metrics.cdn.failover = true;
        } else {
          this.metrics.cdn.primary = 'jsdelivr';
          this.metrics.cdn.used = 'primary';
        }
      }
    }
    
    recordError(error) {
      this.metrics.errors.push(error);
      
      // Send error immediately for critical issues
      if (error.type === 'resource_error') {
        this.sendMetrics();
      }
    }
    
    recordLoadComplete() {
      this.metrics.timing = {
        total: performance.now() - this.startTime,
        domContentLoaded: this.getDOMContentLoadedTime(),
        load: this.getLoadTime(),
        firstContentfulPaint: this.getFirstContentfulPaint(),
        largestContentfulPaint: this.getLargestContentfulPaint()
      };
      
      // Send final metrics
      setTimeout(() => this.sendMetrics(), 2000);
    }
    
    getDOMContentLoadedTime() {
      const timing = performance.getEntriesByType('navigation')[0];
      return timing ? timing.domContentLoadedEventEnd - timing.startTime : null;
    }
    
    getLoadTime() {
      const timing = performance.getEntriesByType('navigation')[0];
      return timing ? timing.loadEventEnd - timing.startTime : null;
    }
    
    getFirstContentfulPaint() {
      const fcp = performance.getEntriesByName('first-contentful-paint')[0];
      return fcp ? fcp.startTime : null;
    }
    
    getLargestContentfulPaint() {
      return new Promise((resolve) => {
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            if (entries.length > 0) {
              resolve(entries[entries.length - 1].startTime);
            }
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
          
          // Fallback timeout
          setTimeout(() => resolve(null), 5000);
        } else {
          resolve(null);
        }
      });
    }
    
    sendMetrics() {
      if (!CONFIG.enabled) return;
      
      const payload = {
        ...this.metrics,
        timestamp: Date.now(),
        version: CONFIG.version
      };
      
      // Use sendBeacon for reliability
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          CONFIG.endpoint,
          JSON.stringify(payload)
        );
      } else {
        // Fallback to fetch
        fetch(CONFIG.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(() => {
          // Silent fail - don't impact user experience
        });
      }
      
      // Also log to console in development
      if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev')) {
        console.log('📊 MovingWalls DS Metrics:', payload);
      }
    }
    
    // Public API
    track(eventName, data = {}) {
      this.metrics.customEvents = this.metrics.customEvents || [];
      this.metrics.customEvents.push({
        name: eventName,
        data,
        timestamp: Date.now()
      });
    }
  }
  
  // Utility functions
  function generateSessionId() {
    return 'mw_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }
  
  // Initialize monitoring
  const monitor = new PerformanceCollector();
  
  // Expose global API
  window.MovingWallsMonitor = {
    track: (event, data) => monitor.track(event, data),
    getMetrics: () => monitor.metrics,
    sendMetrics: () => monitor.sendMetrics(),
    config: CONFIG
  };
  
  // Start monitoring when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      monitor.recordLoadComplete();
    });
  } else {
    monitor.recordLoadComplete();
  }
  
  // Auto-send metrics every 30 seconds
  setInterval(() => {
    monitor.sendMetrics();
  }, 30000);
  
})();
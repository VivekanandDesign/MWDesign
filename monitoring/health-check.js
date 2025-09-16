/**
 * CDN Health Check System
 * Monitors CDN availability and performance
 */
class CDNHealthCheck {
  constructor() {
    this.endpoints = [
      'https://unpkg.com/movingwalls-ds@1.0.0/dist/index.umd.js',
      'https://cdn.jsdelivr.net/npm/movingwalls-ds@1.0.0/dist/index.umd.js'
    ];
    this.status = {
      timestamp: Date.now(),
      checks: []
    };
  }
  
  async checkEndpoint(url) {
    const startTime = performance.now();
    
    try {
      const response = await fetch(url, { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      return {
        url,
        status: 'success',
        loadTime,
        timestamp: Date.now(),
        available: true
      };
    } catch (error) {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      return {
        url,
        status: 'error',
        error: error.message,
        loadTime,
        timestamp: Date.now(),
        available: false
      };
    }
  }
  
  async runHealthCheck() {
    console.log('🏥 Running CDN health check...');
    
    const checks = await Promise.all(
      this.endpoints.map(url => this.checkEndpoint(url))
    );
    
    this.status.checks = checks;
    this.status.timestamp = Date.now();
    
    // Calculate overall health
    const availableEndpoints = checks.filter(c => c.available).length;
    const healthPercentage = (availableEndpoints / checks.length) * 100;
    
    this.status.health = {
      percentage: healthPercentage,
      status: healthPercentage >= 50 ? 'healthy' : 'degraded',
      availableEndpoints,
      totalEndpoints: checks.length
    };
    
    // Log results
    console.log('📊 CDN Health Status:', this.status);
    
    return this.status;
  }
  
  getRecommendation() {
    const healthy = this.status.checks.filter(c => c.available);
    const fastest = healthy.sort((a, b) => a.loadTime - b.loadTime)[0];
    
    return {
      recommendedCDN: fastest?.url || null,
      reason: fastest ? `Fastest response: ${fastest.loadTime.toFixed(2)}ms` : 'No CDNs available',
      alternatives: healthy.slice(1).map(c => ({
        url: c.url,
        loadTime: c.loadTime
      }))
    };
  }
}

// Auto-run health check
const healthCheck = new CDNHealthCheck();
window.MovingWallsHealthCheck = healthCheck;
// server/analytics.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage (replace with database)
const analytics = {
  sessions: new Map(),
  metrics: [],
  errors: [],
  performance: []
};

// Analytics endpoint
app.post('/analytics', (req, res) => {
  const data = req.body;
  
  // Store session data
  if (data.session) {
    analytics.sessions.set(data.session, {
      ...data,
      receivedAt: new Date()
    });
  }
  
  // Store performance metrics
  if (data.resources) {
    analytics.performance.push({
      session: data.session,
      resources: data.resources,
      timing: data.timing,
      timestamp: new Date()
    });
  }
  
  // Store errors
  if (data.errors && data.errors.length > 0) {
    analytics.errors.push(...data.errors.map(error => ({
      ...error,
      session: data.session,
      timestamp: new Date()
    })));
  }
  
  res.status(200).json({ status: 'received' });
});

// Dashboard API
app.get('/api/dashboard', (req, res) => {
  const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  const recentMetrics = analytics.performance.filter(
    p => p.timestamp > last24h
  );
  
  const stats = {
    totalSessions: analytics.sessions.size,
    totalRequests: recentMetrics.reduce((sum, p) => sum + p.resources.length, 0),
    avgLoadTime: calculateAverageLoadTime(recentMetrics),
    errorRate: calculateErrorRate(),
    cdnUsage: calculateCDNUsage(recentMetrics),
    topErrors: getTopErrors()
  };
  
  res.json(stats);
});

function calculateAverageLoadTime(metrics) {
  const allResources = metrics.flatMap(m => m.resources);
  const totalTime = allResources.reduce((sum, r) => sum + r.duration, 0);
  return allResources.length > 0 ? Math.round(totalTime / allResources.length) : 0;
}

function calculateErrorRate() {
  const totalRequests = analytics.performance.reduce((sum, p) => sum + p.resources.length, 0);
  const errorCount = analytics.errors.length;
  return totalRequests > 0 ? ((errorCount / totalRequests) * 100).toFixed(2) : 0;
}

function calculateCDNUsage(metrics) {
  const cdnCounts = {};
  metrics.forEach(m => {
    m.resources.forEach(r => {
      cdnCounts[r.cdn] = (cdnCounts[r.cdn] || 0) + 1;
    });
  });
  return cdnCounts;
}

function getTopErrors() {
  const errorCounts = {};
  analytics.errors.forEach(error => {
    errorCounts[error.message] = (errorCounts[error.message] || 0) + 1;
  });
  
  return Object.entries(errorCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([message, count]) => ({ message, count }));
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`📊 Analytics server running on port ${PORT}`);
});

module.exports = app;
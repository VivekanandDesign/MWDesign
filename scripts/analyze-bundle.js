#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { gzipSync } = require('zlib');

/**
 * Bundle Size Analyzer for MovingWalls DS CDN Optimization
 * Analyzes current bundle sizes and provides optimization recommendations
 */

const DIST_PATH = path.join(__dirname, '../dist');
const BUNDLE_SIZE_LIMITS = {
  'index.umd.js': 500 * 1024, // 500KB limit for main bundle
  'index.esm.js': 400 * 1024, // 400KB for ESM
  'styles/index.css': 200 * 1024, // 200KB for styles
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    const originalSize = content.length;
    const gzippedSize = gzipSync(content).length;
    const compressionRatio = ((originalSize - gzippedSize) / originalSize * 100).toFixed(1);
    
    return {
      originalSize,
      gzippedSize,
      compressionRatio,
      exists: true
    };
  } catch (error) {
    return {
      originalSize: 0,
      gzippedSize: 0,
      compressionRatio: 0,
      exists: false,
      error: error.message
    };
  }
}

function generateReport() {
  console.log('\n🔍 MovingWalls DS - Bundle Size Analysis\n');
  console.log('=' .repeat(60));
  
  const files = [
    'index.umd.js',
    'index.esm.js', 
    'index.js',
    'styles/index.css',
    'tokens/tokens.css',
    'tokens/tokens.json'
  ];
  
  let totalOriginal = 0;
  let totalGzipped = 0;
  const results = [];
  
  files.forEach(file => {
    const filePath = path.join(DIST_PATH, file);
    const analysis = analyzeFile(filePath);
    
    if (analysis.exists) {
      totalOriginal += analysis.originalSize;
      totalGzipped += analysis.gzippedSize;
      
      const limit = BUNDLE_SIZE_LIMITS[file];
      const exceedsLimit = limit && analysis.originalSize > limit;
      
      console.log(`📦 ${file}`);
      console.log(`   Original: ${formatBytes(analysis.originalSize)}`);
      console.log(`   Gzipped:  ${formatBytes(analysis.gzippedSize)} (${analysis.compressionRatio}% compression)`);
      
      if (exceedsLimit) {
        console.log(`   ⚠️  EXCEEDS LIMIT: ${formatBytes(limit)} (${formatBytes(analysis.originalSize - limit)} over)`);
      } else if (limit) {
        console.log(`   ✅ Within limit: ${formatBytes(limit)}`);
      }
      
      console.log('');
      
      results.push({
        file,
        ...analysis,
        exceedsLimit,
        limit
      });
    } else {
      console.log(`❌ ${file} - File not found: ${analysis.error}\n`);
    }
  });
  
  console.log('=' .repeat(60));
  console.log(`📊 TOTAL BUNDLE SIZE`);
  console.log(`   Original: ${formatBytes(totalOriginal)}`);
  console.log(`   Gzipped:  ${formatBytes(totalGzipped)} (${((totalOriginal - totalGzipped) / totalOriginal * 100).toFixed(1)}% compression)`);
  console.log('=' .repeat(60));
  
  // Generate optimization recommendations
  console.log('\n🚀 OPTIMIZATION RECOMMENDATIONS:\n');
  
  const oversizedFiles = results.filter(r => r.exceedsLimit);
  if (oversizedFiles.length > 0) {
    console.log('🔴 HIGH PRIORITY - Bundle Size Issues:');
    oversizedFiles.forEach(file => {
      console.log(`   • ${file.file}: Reduce by ${formatBytes(file.originalSize - file.limit)}`);
    });
    console.log('');
  }
  
  console.log('💡 GENERAL OPTIMIZATIONS:');
  console.log('   • Tree-shaking: Remove unused exports');
  console.log('   • Code splitting: Create component-specific bundles');
  console.log('   • Minification: Ensure proper minification');
  console.log('   • External dependencies: Externalize React/ReactDOM');
  console.log('   • Compression: Enable Brotli compression on CDN');
  console.log('');
  
  console.log('📈 PERFORMANCE IMPACT:');
  console.log(`   • 3G Load Time: ~${Math.ceil(totalGzipped / (50 * 1024))} seconds`);
  console.log(`   • 4G Load Time: ~${Math.ceil(totalGzipped / (200 * 1024))} seconds`);
  console.log(`   • Broadband Load Time: ~${Math.ceil(totalGzipped / (1000 * 1024))} seconds`);
  console.log('');
  
  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    totalOriginal,
    totalGzipped,
    files: results,
    recommendations: {
      treeshaking: totalOriginal > 1000 * 1024,
      codeSplitting: results.some(r => r.originalSize > 300 * 1024),
      compressionOptimization: (totalOriginal - totalGzipped) / totalOriginal < 0.7
    }
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../bundle-analysis.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('💾 Detailed report saved to: bundle-analysis.json\n');
}

if (require.main === module) {
  generateReport();
}

module.exports = { analyzeFile, formatBytes, generateReport };

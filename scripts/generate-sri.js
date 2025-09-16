#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/**
 * SRI Hash Generator for MovingWalls DS CDN Security
 * Generates integrity hashes for secure CDN delivery
 */

const DIST_PATH = path.join(__dirname, '../dist');
const CDN_BASE_URL = 'https://unpkg.com/movingwalls-ds@1.0.0/dist';
const JSDELIVR_BASE_URL = 'https://cdn.jsdelivr.net/npm/movingwalls-ds@1.0.0/dist';

function generateSRIHash(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha384').update(content).digest('base64');
    return `sha384-${hash}`;
  } catch (error) {
    console.error(`Error generating hash for ${filePath}:`, error.message);
    return null;
  }
}

function generateCDNSnippets() {
  const files = [
    'index.umd.js',
    'index.esm.js',
    'styles/index.css',
    'tokens/tokens.css'
  ];
  
  console.log('\n🔐 MovingWalls DS - SRI Hash Generation\n');
  console.log('=' .repeat(80));
  
  const sriData = {};
  const snippets = [];
  
  files.forEach(file => {
    const filePath = path.join(DIST_PATH, file);
    const hash = generateSRIHash(filePath);
    
    if (hash) {
      sriData[file] = {
        hash,
        unpkg: `${CDN_BASE_URL}/${file}`,
        jsdelivr: `${JSDELIVR_BASE_URL}/${file}`
      };
      
      console.log(`📄 ${file}`);
      console.log(`   Hash: ${hash}`);
      console.log(`   Size: ${fs.statSync(filePath).size} bytes`);
      console.log('');
      
      // Generate HTML snippets
      if (file.endsWith('.js')) {
        snippets.push({
          type: 'script',
          file,
          html: `<script src="${CDN_BASE_URL}/${file}" 
         integrity="${hash}" 
         crossorigin="anonymous"
         onerror="this.onerror=null;this.src='${JSDELIVR_BASE_URL}/${file}'">
</script>`
        });
      } else if (file.endsWith('.css')) {
        snippets.push({
          type: 'link',
          file,
          html: `<link rel="stylesheet" 
      href="${CDN_BASE_URL}/${file}" 
      integrity="${hash}" 
      crossorigin="anonymous"
      onerror="this.onerror=null;this.href='${JSDELIVR_BASE_URL}/${file}'">`
        });
      }
    }
  });
  
  console.log('=' .repeat(80));
  console.log('\n🔗 SECURE CDN SNIPPETS WITH FALLBACK:\n');
  
  snippets.forEach(snippet => {
    console.log(`<!-- ${snippet.file} -->`);
    console.log(snippet.html);
    console.log('');
  });
  
  // Generate JavaScript fallback code
  console.log('🔄 JAVASCRIPT FALLBACK IMPLEMENTATION:\n');
  console.log(`<script>
// Secure CDN loader with SRI and fallback
window.MovingWallsCDN = {
  loadCSS: function(primary, fallback, integrity) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = primary;
    link.integrity = integrity;
    link.crossOrigin = 'anonymous';
    
    link.onerror = function() {
      console.warn('Primary CDN failed, switching to fallback:', fallback);
      this.onerror = null;
      this.href = fallback;
    };
    
    document.head.appendChild(link);
  },
  
  loadJS: function(primary, fallback, integrity, callback) {
    const script = document.createElement('script');
    script.src = primary;
    script.integrity = integrity;
    script.crossOrigin = 'anonymous';
    
    script.onload = callback;
    script.onerror = function() {
      console.warn('Primary CDN failed, switching to fallback:', fallback);
      this.onerror = null;
      this.onload = callback;
      this.src = fallback;
    };
    
    document.head.appendChild(script);
  }
};

// Load MovingWalls DS securely
MovingWallsCDN.loadCSS(
  '${CDN_BASE_URL}/styles/index.css',
  '${JSDELIVR_BASE_URL}/styles/index.css',
  '${sriData['styles/index.css']?.hash}'
);

MovingWallsCDN.loadJS(
  '${CDN_BASE_URL}/index.umd.js',
  '${JSDELIVR_BASE_URL}/index.umd.js',
  '${sriData['index.umd.js']?.hash}',
  function() {
    console.log('MovingWalls DS loaded successfully');
    // Your initialization code here
  }
);
</script>`);
  
  // Save SRI data
  const sriReport = {
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    files: sriData,
    snippets: snippets.map(s => ({ type: s.type, file: s.file, html: s.html })),
    usage: {
      primary_cdn: 'unpkg.com',
      fallback_cdn: 'jsdelivr.net',
      security: 'sha384',
      crossorigin: 'anonymous'
    }
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../sri-hashes.json'),
    JSON.stringify(sriReport, null, 2)
  );
  
  console.log('\n💾 SRI data saved to: sri-hashes.json');
  console.log('\n✅ Security implementation complete!');
  console.log('\nNext steps:');
  console.log('1. Update CDN documentation with SRI hashes');
  console.log('2. Test fallback mechanisms');
  console.log('3. Monitor CDN performance');
  console.log('4. Update package version when bundles change\n');
}

if (require.main === module) {
  generateCDNSnippets();
}

module.exports = { generateSRIHash, generateCDNSnippets };

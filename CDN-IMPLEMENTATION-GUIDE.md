# 🔐 MovingWalls DS - Secure CDN Implementation Guide

## Quick Start (Secure)

### Basic HTML Integration with SRI Security

```html
<!DOCTYPE html>
<html>
<head>
    <!-- MovingWalls DS Styles with SRI -->
    <link rel="stylesheet" 
          href="https://unpkg.com/movingwalls-ds@1.0.0/dist/styles/index.css" 
          integrity="sha384-HcDiEqLkmwe6FB1S5vTwqdGbMNvRwT6DsXEmbm/SovST0D34Aa1cEU+1IcBvlOLm" 
          crossorigin="anonymous">
</head>
<body>
    <!-- Your content -->
    
    <!-- MovingWalls DS Script with SRI and Fallback -->
    <script src="https://unpkg.com/movingwalls-ds@1.0.0/dist/index.umd.js" 
            integrity="sha384-3U3GNZbsLseR8c9yB/jeXMzb59V4mosjh2NoACbIn61ZPXxPTG4KL+HjS+RS9dGf" 
            crossorigin="anonymous"
            onerror="this.onerror=null;this.src='https://cdn.jsdelivr.net/npm/movingwalls-ds@1.0.0/dist/index.umd.js'">
    </script>
    
    <script>
        // Use MovingWalls DS components
        console.log('MovingWalls DS loaded:', typeof MovingWallsDS);
    </script>
</body>
</html>
```

## 🚀 Performance Optimized Loading

### JavaScript Loader with Fallback

```html
<script>
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
  'https://unpkg.com/movingwalls-ds@1.0.0/dist/styles/index.css',
  'https://cdn.jsdelivr.net/npm/movingwalls-ds@1.0.0/dist/styles/index.css',
  'sha384-HcDiEqLkmwe6FB1S5vTwqdGbMNvRwT6DsXEmbm/SovST0D34Aa1cEU+1IcBvlOLm'
);

MovingWallsCDN.loadJS(
  'https://unpkg.com/movingwalls-ds@1.0.0/dist/index.umd.js',
  'https://cdn.jsdelivr.net/npm/movingwalls-ds@1.0.0/dist/index.umd.js',
  'sha384-3U3GNZbsLseR8c9yB/jeXMzb59V4mosjh2NoACbIn61ZPXxPTG4KL+HjS+RS9dGf',
  function() {
    console.log('MovingWalls DS loaded successfully');
    // Your initialization code here
  }
);
</script>
```

## 📦 Bundle Options

### 1. Full Bundle (Recommended for most users)
```html
<!-- UMD Bundle - 207KB gzipped -->
<script src="https://unpkg.com/movingwalls-ds@1.0.0/dist/index.umd.js"
        integrity="sha384-3U3GNZbsLseR8c9yB/jeXMzb59V4mosjh2NoACbIn61ZPXxPTG4KL+HjS+RS9dGf"
        crossorigin="anonymous"></script>
```

### 2. ESM Bundle (For modern applications)
```html
<script type="module">
  import { Button, Card } from 'https://unpkg.com/movingwalls-ds@1.0.0/dist/index.esm.js';
</script>
```

### 3. Tokens Only (Lightweight - Design tokens only)
```html
<script src="https://unpkg.com/movingwalls-ds@1.0.0/dist/tokens-only.umd.js"
        crossorigin="anonymous"></script>
```

### 4. Component-Specific Bundles (Coming Soon)
```html
<!-- Individual components for tree-shaking -->
<script type="module">
  import Button from 'https://unpkg.com/movingwalls-ds@1.0.0/dist/components/Button.js';
</script>
```

## 🔐 Security Features

### Subresource Integrity (SRI)
All CDN resources include SHA-384 integrity hashes to prevent tampering:

| File | Size | SRI Hash |
|------|------|----------|
| `index.umd.js` | 817KB (207KB gzipped) | `sha384-3U3GNZ...` |
| `index.esm.js` | 1.6MB (261KB gzipped) | `sha384-421W55...` |
| `styles/index.css` | 3.3KB (739B gzipped) | `sha384-HcDiEq...` |
| `tokens/tokens.css` | 5.9KB (1.4KB gzipped) | `sha384-3RNDK...` |

### CORS Configuration
All resources use `crossorigin="anonymous"` to enable SRI verification.

### CDN Redundancy
- **Primary**: unpkg.com (Cloudflare CDN)
- **Fallback**: jsdelivr.net (Cloudflare + Fastly CDN)
- **Automatic failover** when primary CDN is unavailable

## ⚡ Performance Optimization

### Bundle Size Analysis
```
Total Bundle Size: 3.93MB (733KB gzipped)
├── index.umd.js: 817KB (207KB gzipped) ⚠️ Large
├── index.esm.js: 1.6MB (261KB gzipped) ⚠️ Large  
├── styles/index.css: 3.3KB (739B gzipped) ✅ Good
└── tokens/: 8.4KB (2.1KB gzipped) ✅ Good

Load Times (estimated):
├── 3G: ~15 seconds
├── 4G: ~4 seconds  
└── Broadband: ~1 second
```

### Optimization Recommendations

1. **Tree Shaking**: Use ESM imports for specific components
2. **External Dependencies**: React/ReactDOM should be loaded separately
3. **Component Splitting**: Load only needed components
4. **Compression**: Enable Brotli compression on your server

## 🌐 CDN Endpoints

### Primary CDN (unpkg.com)
```
https://unpkg.com/movingwalls-ds@1.0.0/dist/
├── index.umd.js
├── index.esm.js
├── styles/index.css
├── tokens/tokens.css
└── tokens/tokens.json
```

### Fallback CDN (jsdelivr.net)
```
https://cdn.jsdelivr.net/npm/movingwalls-ds@1.0.0/dist/
├── index.umd.js
├── index.esm.js
├── styles/index.css
├── tokens/tokens.css
└── tokens/tokens.json
```

## 🧪 Testing Your Implementation

1. **Open**: `cdn-test-enhanced.html` in your browser
2. **Check**: Console for load times and CDN used
3. **Verify**: SRI integrity verification
4. **Test**: Fallback mechanism by blocking primary CDN

## 🔄 Version Management

### Pinned Version (Recommended for Production)
```html
<script src="https://unpkg.com/movingwalls-ds@1.0.0/dist/index.umd.js"></script>
```

### Latest Version (Development Only)
```html
<script src="https://unpkg.com/movingwalls-ds@latest/dist/index.umd.js"></script>
```

### Specific Version Range
```html
<script src="https://unpkg.com/movingwalls-ds@^1.0.0/dist/index.umd.js"></script>
```

## 🚨 Security Best Practices

1. **Always use SRI hashes** for production
2. **Pin specific versions** instead of using @latest
3. **Monitor CDN status** and have fallback plans
4. **Test integrity verification** in different browsers
5. **Use HTTPS only** for all CDN resources
6. **Implement CSP headers** to restrict resource loading

## 📈 Monitoring & Analytics

### Performance Monitoring
```javascript
// Monitor CDN performance
const loadStart = performance.now();
MovingWallsCDN.loadJS(
  'https://unpkg.com/movingwalls-ds@1.0.0/dist/index.umd.js',
  'https://cdn.jsdelivr.net/npm/movingwalls-ds@1.0.0/dist/index.umd.js',
  'sha384-3U3GNZ...',
  function() {
    const loadTime = performance.now() - loadStart;
    console.log(`CDN load time: ${loadTime}ms`);
    // Send to analytics
  }
);
```

### Error Tracking
```javascript
window.addEventListener('error', function(e) {
  if (e.target.src && e.target.src.includes('movingwalls-ds')) {
    console.error('CDN load failed:', e.target.src);
    // Send to error tracking service
  }
});
```

## 🆘 Troubleshooting

### Common Issues

1. **SRI Verification Failed**
   - Ensure integrity hash matches the file version
   - Check for CORS configuration

2. **CDN Not Loading**
   - Verify internet connectivity
   - Check browser console for errors
   - Test fallback CDN manually

3. **Performance Issues**
   - Use component-specific bundles
   - Implement proper caching headers
   - Consider bundling with your application

### Support
- **Documentation**: https://mwdesignsystem.netlify.app
- **Issues**: GitHub repository issues
- **CDN Status**: Monitor unpkg.com and jsdelivr.net status pages

---

**Last Updated**: $(date)  
**Package Version**: movingwalls-ds@1.0.0  
**CDN Status**: ✅ Operational

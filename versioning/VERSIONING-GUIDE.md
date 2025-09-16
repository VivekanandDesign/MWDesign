# 🔢 MovingWalls DS - Advanced Versioning Guide

## Version Strategy

MovingWalls DS follows [Semantic Versioning](https://semver.org/) (semver) for predictable updates:

- **MAJOR** (1.x.x): Breaking changes
- **MINOR** (x.0.x): New features, backward compatible  
- **PATCH** (x.x.0): Bug fixes, backward compatible

Current Version: **v1.0.0**

## 🎯 Recommended Usage

### Production Applications
```html
<!-- Production Configuration - Pinned Version -->
<!-- Recommended for production applications -->
<script>
window.MovingWallsConfig = {
  version: '1.0.0',
  environment: 'production',
  cdn: {
    primary: 'https://unpkg.com/movingwalls-ds@1.0.0',
    fallback: 'https://cdn.jsdelivr.net/npm/movingwalls-ds@1.0.0'
  }
};
</script>

<!-- CSS with SRI -->
<link rel="stylesheet" 
      href="https://unpkg.com/movingwalls-ds@1.0.0/dist/styles/index.css" 
      integrity="sha384-HcDiEqLkmwe6FB1S5vTwqdGbMNvRwT6DsXEmbm/SovST0D34Aa1cEU+1IcBvlOLm" 
      crossorigin="anonymous"
      onerror="this.onerror=null;this.href='https://cdn.jsdelivr.net/npm/movingwalls-ds@1.0.0/dist/styles/index.css'">

<!-- JavaScript with SRI and Fallback -->
<script src="https://unpkg.com/movingwalls-ds@1.0.0/dist/index.umd.js" 
        integrity="sha384-3U3GNZbsLseR8c9yB/jeXMzb59V4mosjh2NoACbIn61ZPXxPTG4KL+HjS+RS9dGf" 
        crossorigin="anonymous"
        onerror="this.onerror=null;this.src='https://cdn.jsdelivr.net/npm/movingwalls-ds@1.0.0/dist/index.umd.js'">
</script>
```

### Development Environment
```html
<!-- Development Configuration - Latest Version -->
<!-- For development and testing only -->
<script>
window.MovingWallsConfig = {
  version: 'latest',
  environment: 'development',
  cdn: {
    primary: 'https://unpkg.com/movingwalls-ds@latest',
    fallback: 'https://cdn.jsdelivr.net/npm/movingwalls-ds@latest'
  }
};
</script>

<!-- Auto-updating resources (development only) -->
<link rel="stylesheet" href="https://unpkg.com/movingwalls-ds@latest/dist/styles/index.css">
<script src="https://unpkg.com/movingwalls-ds@latest/dist/index.umd.js"></script>

<!-- Development tools -->
<script>
  console.log('MovingWalls DS Version:', MovingWallsDS?.version || 'Unknown');
  console.log('CDN Used:', 'https://unpkg.com/movingwalls-ds@latest');
</script>
```

### Component-Specific Loading
```html
<!-- Component-Specific Loading -->
<script type="module">
  // Import specific components for tree-shaking
  import { Button, Card, Input } from 'https://unpkg.com/movingwalls-ds@1.0.0/dist/index.esm.js';
  
  // Or load individual component bundles
  const Button = await import('https://unpkg.com/movingwalls-ds@1.0.0/dist/components/button.js');
  const Card = await import('https://unpkg.com/movingwalls-ds@1.0.0/dist/components/card.js');
  
  // Version checking
  console.log('Loaded MovingWalls DS v1.0.0');
</script>
```

## 🔄 Version Management

### URL Patterns

| Pattern | Example | Use Case |
|---------|---------|----------|
| `@1.0.0` | `@1.0.0` | 🟢 Production (Recommended) |
| `@^1.0.0` | `@^1.0.0` | 🟡 Minor updates only |
| `@~1.0.0` | `@~1.0.0` | 🟡 Patch updates only |
| `@latest` | `@latest` | 🔴 Development only |

### Version Compatibility Matrix

| Your App Version | Compatible DS Versions | Migration Required |
|------------------|----------------------|-------------------|
| v1.x.x | v1.0.0 | ✅ No |
| v0.x.x | v1.0.0 | ⚠️ Yes - See migration guide |

## 🚀 Migration Strategy

<!-- Version Migration Strategy -->
<script>
// Check for version compatibility
function checkVersion() {
  const currentVersion = '1.0.0';
  const supportedRange = '^1.0.0';
  
  if (MovingWallsDS?.version) {
    const loadedVersion = MovingWallsDS.version;
    
    if (semver.satisfies(loadedVersion, supportedRange)) {
      console.log('✅ Compatible version loaded:', loadedVersion);
    } else {
      console.warn('⚠️ Version mismatch. Expected:', supportedRange, 'Got:', loadedVersion);
    }
  }
}

// Migration helper for major version updates
function migrateToV2() {
  console.log('🔄 Migration guide for v1 → v2:');
  console.log('1. Update CDN URL to v2');
  console.log('2. Check breaking changes documentation');
  console.log('3. Test components in development environment');
  console.log('4. Update integration code if needed');
}

// Load version checker
document.addEventListener('DOMContentLoaded', checkVersion);
</script>

## 📦 Bundle Selection by Version

### Full Bundle (All Components)
```html
<!-- Latest stable -->
<script src="https://unpkg.com/movingwalls-ds@1.0.0/dist/index.umd.js"></script>

<!-- Auto-updating minor versions -->
<script src="https://unpkg.com/movingwalls-ds@^1.0.0/dist/index.umd.js"></script>
```

### Component-Specific Bundles
```html
<!-- Individual components -->
<script type="module">
  import Button from 'https://unpkg.com/movingwalls-ds@1.0.0/dist/components/button.js';
</script>
```

### Category Bundles
```html
<!-- Form components only -->
<script type="module">
  import * as Forms from 'https://unpkg.com/movingwalls-ds@1.0.0/dist/categories/forms/';
</script>
```

## 🔐 Security Considerations

1. **Pin Exact Versions** in production
2. **Use SRI Hashes** for integrity verification
3. **Monitor for Updates** through automated tools
4. **Test Updates** in staging environment first

## 📈 Performance by Version Type

| Version Type | Bundle Size | Load Time | Cache Hit Rate |
|--------------|-------------|-----------|----------------|
| Exact (`@1.0.0`) | 207KB gzipped | ~200ms | 95% |
| Range (`@^1.0.0`) | 207KB gzipped | ~200ms | 85% |
| Latest (`@latest`) | Variable | ~300ms | 60% |

## 🛠 Development Tools

### Version Checker
```javascript
// Check loaded version
console.log('DS Version:', MovingWallsDS.version);
console.log('Compatible:', semver.satisfies(MovingWallsDS.version, '^1.0.0'));
```

### Update Notifier
```javascript
// Check for updates
fetch('https://registry.npmjs.org/movingwalls-ds/latest')
  .then(r => r.json())
  .then(data => {
    const latest = data.version;
    const current = '1.0.0';
    
    if (semver.gt(latest, current)) {
      console.log(`📢 Update available: ${current} → ${latest}`);
    }
  });
```

## 📅 Release Schedule

- **Patch releases**: Weekly (bug fixes)
- **Minor releases**: Monthly (new features)
- **Major releases**: Quarterly (breaking changes)

## 🆘 Troubleshooting

### Version Conflicts
1. Check browser console for version mismatches
2. Verify CDN URL points to correct version
3. Clear browser cache if needed
4. Use exact version pinning to avoid conflicts

### Migration Issues
1. Follow migration guide step by step
2. Test in development environment first
3. Use compatibility layer if available
4. Contact support for complex migrations

---
**Generated**: 2025-09-15T06:43:17.969Z  
**Package**: movingwalls-ds@1.0.0

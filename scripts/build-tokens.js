const fs = require('fs');
const path = require('path');

// Design tokens definition (inline for build script)
const tokens = {
  colors: {
    primary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    },
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      900: '#14532d'
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      900: '#78350f'
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      900: '#7f1d1d'
    },
    info: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a'
    }
  },
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem'
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }]
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  },
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
  }
};

// Build design tokens in multiple formats
function buildTokens() {
  const distDir = path.join(__dirname, '../dist/tokens');
  
  // Create dist directory if it doesn't exist
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  // JSON format
  fs.writeFileSync(
    path.join(distDir, 'tokens.json'),
    JSON.stringify(tokens, null, 2)
  );
  
  // JavaScript format
  const jsContent = `
export const tokens = ${JSON.stringify(tokens, null, 2)};
export const colors = tokens.colors;
export const spacing = tokens.spacing;
export const typography = tokens.typography;
export const shadows = tokens.shadows;
export const borderRadius = tokens.borderRadius;
export default tokens;
`;
  
  fs.writeFileSync(
    path.join(distDir, 'index.js'),
    jsContent
  );
  
  // CSS Custom Properties
  const cssContent = `
:root {
  /* Colors */
${Object.entries(tokens.colors).map(([colorName, colorScale]) => {
  if (typeof colorScale === 'object') {
    return Object.entries(colorScale).map(([shade, value]) => 
      `  --color-${colorName}-${shade}: ${value};`
    ).join('\n');
  }
  return '';
}).join('\n')}

  /* Spacing */
${Object.entries(tokens.spacing).map(([key, value]) => 
  `  --spacing-${key}: ${value};`
).join('\n')}

  /* Border Radius */
${Object.entries(tokens.borderRadius).map(([key, value]) => 
  `  --radius-${key}: ${value};`
).join('\n')}

  /* Shadows */
${Object.entries(tokens.shadows).map(([key, value]) => 
  `  --shadow-${key}: ${value};`
).join('\n')}

  /* Typography */
  --font-family-sans: ${tokens.typography.fontFamily.sans.join(', ')};
  --font-family-mono: ${tokens.typography.fontFamily.mono.join(', ')};
${Object.entries(tokens.typography.fontSize).map(([key, [size]]) => 
  `  --font-size-${key}: ${size};`
).join('\n')}
${Object.entries(tokens.typography.fontWeight).map(([key, value]) => 
  `  --font-weight-${key}: ${value};`
).join('\n')}
}

/* Color utilities */
${Object.entries(tokens.colors).map(([colorName, colorScale]) => {
  if (typeof colorScale === 'object') {
    return Object.entries(colorScale).map(([shade, value]) => 
      `.text-${colorName}-${shade} { color: ${value}; }\n.bg-${colorName}-${shade} { background-color: ${value}; }\n.border-${colorName}-${shade} { border-color: ${value}; }`
    ).join('\n');
  }
  return '';
}).join('\n')}

/* Spacing utilities */
${Object.entries(tokens.spacing).map(([key, value]) => 
  `.p-${key} { padding: ${value}; }\n.m-${key} { margin: ${value}; }\n.gap-${key} { gap: ${value}; }`
).join('\n')}
`;
  
  fs.writeFileSync(
    path.join(distDir, 'tokens.css'),
    cssContent
  );
  
  // SCSS variables
  const scssContent = `
// MW Design System Tokens
// Colors
${Object.entries(tokens.colors).map(([colorName, colorScale]) => {
  if (typeof colorScale === 'object') {
    return Object.entries(colorScale).map(([shade, value]) => 
      `$${colorName}-${shade}: ${value};`
    ).join('\n');
  }
  return '';
}).join('\n')}

// Spacing
${Object.entries(tokens.spacing).map(([key, value]) => 
  `$spacing-${key}: ${value};`
).join('\n')}

// Typography
$font-family-sans: ${tokens.typography.fontFamily.sans.map(f => `"${f}"`).join(', ')};
$font-family-mono: ${tokens.typography.fontFamily.mono.map(f => `"${f}"`).join(', ')};

${Object.entries(tokens.typography.fontSize).map(([key, [size]]) => 
  `$text-${key}: ${size};`
).join('\n')}

${Object.entries(tokens.typography.fontWeight).map(([key, value]) => 
  `$font-${key}: ${value};`
).join('\n')}

// Shadows
${Object.entries(tokens.shadows).map(([key, value]) => 
  `$shadow-${key}: ${value};`
).join('\n')}

// Border Radius
${Object.entries(tokens.borderRadius).map(([key, value]) => 
  `$radius-${key}: ${value};`
).join('\n')}
`;
  
  fs.writeFileSync(
    path.join(distDir, 'tokens.scss'),
    scssContent
  );
  
  console.log('✅ Design tokens built successfully');
  console.log(`📂 Tokens available at: ${distDir}`);
  console.log('📄 Formats: JSON, JS, CSS, SCSS');
}

buildTokens();

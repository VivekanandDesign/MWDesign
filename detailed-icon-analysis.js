// Detailed analysis to find missing icons
const fs = require('fs');

// Read the files
const iconPageContent = fs.readFileSync('src/app/icons/page.tsx', 'utf8');
const iconIndexContent = fs.readFileSync('src/components/icons/index.tsx', 'utf8');

// Extract all icon names from the page categories
const iconMatches = iconPageContent.match(/'([A-Za-z0-9]+)'/g);
const allDefinedIcons = iconMatches ? iconMatches.map(icon => icon.replace(/'/g, '')) : [];
const uniqueDefinedIcons = [...new Set(allDefinedIcons)];

// Extract implemented icons from index.tsx
const implementedIcons = new Set();

// Parse the main export block
const exportMatch = iconIndexContent.match(/export \{([^}]+)\}/s);
if (exportMatch) {
  const exportContent = exportMatch[1];
  const lines = exportContent.split('\n');
  
  lines.forEach(line => {
    // Remove comments and whitespace
    const cleanLine = line.replace(/\/\/.*$/, '').trim();
    if (cleanLine) {
      // Extract icon names, handling aliases
      const iconNames = cleanLine.match(/(\w+)(?:\s+as\s+(\w+))?/g);
      if (iconNames) {
        iconNames.forEach(name => {
          const parts = name.split(' as ');
          const exportedName = parts.length > 1 ? parts[1].replace(',', '') : parts[0].replace(',', '');
          if (exportedName && exportedName !== 'type') {
            implementedIcons.add(exportedName.trim());
          }
        });
      }
    }
  });
}

// Add custom filled variants and aliases
implementedIcons.add('HeartFilled');
implementedIcons.add('StarFilled');
implementedIcons.add('InfoCircle');
implementedIcons.add('Help');

// Find missing icons
const missingIcons = uniqueDefinedIcons.filter(icon => !implementedIcons.has(icon));

console.log('=== DETAILED ICON ANALYSIS ===');
console.log('Total unique icons in page:', uniqueDefinedIcons.length);
console.log('Total implemented icons:', implementedIcons.size);
console.log('Missing icons:', missingIcons.length);
console.log('');

if (missingIcons.length > 0) {
  console.log('MISSING ICONS:');
  missingIcons.forEach((icon, index) => {
    console.log(`${(index + 1).toString().padStart(3, ' ')}. ${icon}`);
  });
} else {
  console.log('✅ All icons are implemented!');
}

// Save missing icons to a file for reference
fs.writeFileSync('missing-icons.txt', missingIcons.join('\n'));
console.log('\n📝 Missing icons saved to missing-icons.txt');

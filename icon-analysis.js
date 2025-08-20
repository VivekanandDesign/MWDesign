// Complete icon analysis script to find missing icons

const fs = require('fs');

// Read the icons page
const iconPageContent = fs.readFileSync('src/app/icons/page.tsx', 'utf8');
const iconIndexContent = fs.readFileSync('src/components/icons/index.tsx', 'utf8');

// Extract all icon categories from the page
const categoryMatch = iconPageContent.match(/const iconCategories = (\[[^]*?\]\s*;)/);
if (!categoryMatch) {
  console.log('Could not find iconCategories in the file');
  process.exit(1);
}
const categoriesCode = categoryMatch[1];

// Extract all icon names from categories
const iconMatches = categoriesCode.match(/'([A-Za-z0-9]+)'/g);
const allDefinedIcons = iconMatches.map(icon => icon.replace(/'/g, ''));

// Get unique icons
const uniqueDefinedIcons = [...new Set(allDefinedIcons)];

// Extract implemented icons from the index file
const exportMatches = iconIndexContent.match(/export \{[^}]*\}/g);
const implementedIconsSet = new Set();

// Parse exports
exportMatches.forEach(exportBlock => {
  const iconNames = exportBlock.match(/(\w+)(?:\s+as\s+\w+)?/g);
  if (iconNames) {
    iconNames.forEach(name => {
      // Clean up the name (remove 'as alias' parts)
      const cleanName = name.replace(/\s+as\s+\w+/, '').trim();
      if (cleanName !== 'export' && cleanName !== '{' && cleanName !== '}') {
        implementedIconsSet.add(cleanName);
      }
    });
  }
});

// Also parse aliases and custom icons
const aliasMatches = iconIndexContent.match(/export const (\w+)/g);
if (aliasMatches) {
  aliasMatches.forEach(alias => {
    const name = alias.replace('export const ', '');
    implementedIconsSet.add(name);
  });
}

// Convert to array and add known custom icons
const implementedIcons = Array.from(implementedIconsSet);
implementedIcons.push('HeartFilled', 'StarFilled', 'InfoCircle', 'Help');

// Find missing icons
const missingIcons = uniqueDefinedIcons.filter(icon => !implementedIcons.includes(icon));

console.log('=== COMPREHENSIVE ICON ANALYSIS ===');
console.log('Total unique icons defined in page:', uniqueDefinedIcons.length);
console.log('Total implemented icons:', implementedIcons.length);
console.log('Missing icons:', missingIcons.length);
console.log('');

if (missingIcons.length > 0) {
  console.log('MISSING ICONS:');
  missingIcons.forEach((icon, index) => {
    console.log(`${index + 1}. ${icon}`);
  });
} else {
  console.log('✅ All icons are implemented!');
}

console.log('');
console.log('First 10 defined icons:', uniqueDefinedIcons.slice(0, 10));
console.log('First 10 implemented icons:', implementedIcons.slice(0, 10));

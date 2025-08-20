const fs = require('fs');

// Read the icons page to extract all icon names
const iconsPageContent = fs.readFileSync('src/app/icons/page.tsx', 'utf8');

// Read the icons index to see what's exported
const iconsIndexContent = fs.readFileSync('src/components/icons/index.tsx', 'utf8');

// Extract icon names from the icons page by looking for the icons arrays
const iconArrayRegex = /icons:\s*\[([\s\S]*?)\]/g;
let allIconNames = new Set();

let match;
while ((match = iconArrayRegex.exec(iconsPageContent)) !== null) {
  const iconList = match[1];
  // Extract icon names (remove quotes and spaces)
  const icons = iconList.match(/'([^']+)'/g);
  if (icons) {
    icons.forEach(icon => {
      const iconName = icon.replace(/'/g, '');
      allIconNames.add(iconName);
    });
  }
}

console.log(`Found ${allIconNames.size} unique icon names in the icons page`);

// Extract exported icons from the index file
const exportRegex = /export\s+{\s*([^}]+)\s*}/g;
const exportedIcons = new Set();

// Also look for individual exports
const individualExportRegex = /export\s+(?:const|function)\s+(\w+)/g;

while ((match = exportRegex.exec(iconsIndexContent)) !== null) {
  const exports = match[1];
  // Split by comma and clean up
  const iconNames = exports.split(',').map(name => {
    // Handle aliases like "Info as InfoCircle"
    const aliasMatch = name.trim().match(/(\w+)\s+as\s+(\w+)/);
    if (aliasMatch) {
      return aliasMatch[1]; // Return the original name
    }
    return name.trim();
  }).filter(name => name && !name.includes('LucideProps'));
  
  iconNames.forEach(name => exportedIcons.add(name));
}

// Check for individual exports (custom components)
while ((match = individualExportRegex.exec(iconsIndexContent)) !== null) {
  exportedIcons.add(match[1]);
}

console.log(`Found ${exportedIcons.size} exported icons in the index file`);

// Find missing icons
const missingIcons = [];
allIconNames.forEach(iconName => {
  if (!exportedIcons.has(iconName)) {
    missingIcons.push(iconName);
  }
});

console.log(`\nMissing icons (${missingIcons.length}):`);
missingIcons.forEach(icon => console.log(`- ${icon}`));

// Save to file for further analysis
fs.writeFileSync('actual-missing-icons.txt', missingIcons.join('\n'));
console.log('\nMissing icons saved to actual-missing-icons.txt');

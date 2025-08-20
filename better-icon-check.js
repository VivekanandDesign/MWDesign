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

// Extract all exported icons and their aliases
const exportedIcons = new Set();

// Look for export blocks with aliases
const exportWithAliasRegex = /export\s*{\s*([^}]+)\s*}/g;
while ((match = exportWithAliasRegex.exec(iconsIndexContent)) !== null) {
  const exports = match[1];
  const exportItems = exports.split(',');
  
  exportItems.forEach(item => {
    const cleanItem = item.trim();
    
    // Handle "LucideName as AliasName" format
    const aliasMatch = cleanItem.match(/(\w+)\s+as\s+(\w+)/);
    if (aliasMatch) {
      const [, original, alias] = aliasMatch;
      exportedIcons.add(alias); // Add the alias name
      exportedIcons.add(original); // Also add the original name
    } else if (cleanItem && !cleanItem.includes('LucideProps') && !cleanItem.includes('type')) {
      exportedIcons.add(cleanItem);
    }
  });
}

// Look for individual export statements
const individualExportRegex = /export\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"]/g;
while ((match = individualExportRegex.exec(iconsIndexContent)) !== null) {
  const exports = match[1];
  const exportItems = exports.split(',');
  
  exportItems.forEach(item => {
    const cleanItem = item.trim();
    
    // Handle "LucideName as AliasName" format
    const aliasMatch = cleanItem.match(/(\w+)\s+as\s+(\w+)/);
    if (aliasMatch) {
      const [, original, alias] = aliasMatch;
      exportedIcons.add(alias); // Add the alias name
      exportedIcons.add(original); // Also add the original name
    } else if (cleanItem && !cleanItem.includes('LucideProps') && !cleanItem.includes('type')) {
      exportedIcons.add(cleanItem);
    }
  });
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

// Also show what's exported for debugging
console.log(`\nFirst 20 exported icons for reference:`);
const exportedArray = Array.from(exportedIcons);
exportedArray.slice(0, 20).forEach(icon => console.log(`- ${icon}`));

// Save to file for further analysis
fs.writeFileSync('true-missing-icons.txt', missingIcons.join('\n'));
console.log('\nMissing icons saved to true-missing-icons.txt');

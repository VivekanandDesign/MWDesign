// Check which icons from the page are actually missing
const fs = require('fs');

// Read the icons page
const iconsPageContent = fs.readFileSync('src/app/icons/page.tsx', 'utf8');

// Extract all icon names from all categories
const iconArrayRegex = /icons:\s*\[([\s\S]*?)\]/g;
let allIconNames = new Set();

let match;
while ((match = iconArrayRegex.exec(iconsPageContent)) !== null) {
  const iconList = match[1];
  const icons = iconList.match(/'([^']+)'/g);
  if (icons) {
    icons.forEach(icon => {
      const iconName = icon.replace(/'/g, '');
      allIconNames.add(iconName);
    });
  }
}

// Try to import from the index file to see what's actually exported
try {
  const iconsIndexContent = fs.readFileSync('src/components/icons/index.tsx', 'utf8');
  
  // Look for all export statements
  const exportMatches = iconsIndexContent.match(/export\s*{[^}]+}/g) || [];
  const constExportMatches = iconsIndexContent.match(/export\s+const\s+\w+/g) || [];
  
  const exportedIcons = new Set();
  
  // Parse regular exports
  exportMatches.forEach(exportMatch => {
    const exports = exportMatch.match(/\w+(?:\s+as\s+\w+)?/g) || [];
    exports.forEach(exp => {
      if (exp.includes(' as ')) {
        const alias = exp.split(' as ')[1].trim();
        exportedIcons.add(alias);
      } else if (!exp.includes('LucideProps') && !exp.includes('type')) {
        exportedIcons.add(exp.trim());
      }
    });
  });
  
  // Parse const exports
  constExportMatches.forEach(constMatch => {
    const iconName = constMatch.match(/export\s+const\s+(\w+)/)?.[1];
    if (iconName) {
      exportedIcons.add(iconName);
    }
  });
  
  console.log(`Total icons in page: ${allIconNames.size}`);
  console.log(`Total exported icons: ${exportedIcons.size}`);
  
  // Find icons that might show as question marks
  const problematicIcons = [];
  allIconNames.forEach(iconName => {
    if (!exportedIcons.has(iconName)) {
      problematicIcons.push(iconName);
    }
  });
  
  console.log('\nIcons that might show as question marks (potentially "striked"):');
  console.log(problematicIcons);
  
  // Save for further analysis
  fs.writeFileSync('potentially-striked-icons.txt', problematicIcons.join('\n'));
  
} catch (error) {
  console.error('Error analyzing icons:', error.message);
}

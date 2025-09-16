// Test script for Lucide icon lookup
const LucideIcons = require('lucide-react');

function getLucideIcon(iconName) {
  const IconComponent = LucideIcons[iconName];
  
  if (IconComponent && 
      (typeof IconComponent === 'function' || 
       (IconComponent.$$typeof && IconComponent.render))) {
    return IconComponent;
  }
  return null;
}

// Test the updated function
const testIcons = ['Accessibility', 'Heart', 'ArrowRight', 'Search', 'InvalidIcon'];
console.log('Testing updated getLucideIcon function:');
testIcons.forEach(iconName => {
  const component = getLucideIcon(iconName);
  console.log(`${iconName}: ${component ? 'Found' : 'NOT FOUND'}`);
});

// Test some icons from our JSON data
const jsonIcons = ['AlignHorizontalSpaceAround', 'BluetoothSearching', 'BookHeart'];
console.log('\nTesting icons from JSON data:');
jsonIcons.forEach(iconName => {
  const component = getLucideIcon(iconName);
  console.log(`${iconName}: ${component ? 'Found' : 'NOT FOUND'}`);
});

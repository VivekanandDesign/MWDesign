const fs = require('fs');

// Read the missing icons
const missingIcons = fs.readFileSync('actual-missing-icons.txt', 'utf8').split('\n').filter(Boolean);

// Common Lucide icon mappings for icons that might have different names
const iconMappings = {
  'ArrowUp': 'ArrowUp',
  'Menu': 'Menu',
  'Check': 'Check',
  'Home': 'Home',
  'Smartphone': 'Smartphone',
  'Trophy': 'Trophy',
  'GraduationCap': 'GraduationCap',
  'Calc': 'Calculator',
  'WorldIcon': 'Globe',
  'Package2': 'Package',
  'Location': 'MapPin',
  'Payment': 'CreditCard',
  'Present': 'Gift',
  'ViewIcon': 'Eye',
  'HideIcon': 'EyeOff',
  'SecurityAlert': 'Shield',
  'Community': 'Users',
  'AddUser': 'UserPlus',
  'RemoveUser': 'UserMinus',
  'Like': 'Heart',
  'ShareIcon': 'Share',
  'Comment': 'MessageSquare',
  'Notification': 'Bell',
  'Rating': 'Star',
  'Time': 'Clock',
  'Attach': 'Paperclip',
  'Document': 'File',
  'Telephone': 'Phone',
  'Email': 'Mail',
  'SendIcon': 'Send',
  'ErrorCircle': 'AlertCircle',
  'Warning': 'AlertTriangle',
  'Loading': 'Loader',
  'PowerOn': 'Power',
  'Layout': 'Layout',
  'Grid3x3': 'Grid3X3',
  'Grid2x2': 'Grid2X2',
  'Box': 'Box',
  'CircleIcon': 'Circle',
  'Road': 'Navigation',
  'Taxi': 'Car',
  'CloudLightning': 'CloudLightning',
  'Seedling': 'Sprout',
  'Lightning': 'Zap',
  'Bullseye': 'Target',
  'Fitness': 'Activity',
  'Tea': 'Coffee',
  'IceCream': 'IceCream2',
  'HealthHeart': 'Heart',
  'MedicalThermometer': 'Thermometer',
  'MedicalPlus': 'Plus',
  'Diploma': 'Award',
  'Directory': 'Folder',
  'Zip': 'Archive',
  'PrintIcon': 'Printer',
  'Notes': 'StickyNote',
  'Sticky': 'StickyNote',
  'Schedule': 'Calendar',
  'Stopwatch': 'Timer',
  'Achievement': 'Award',
  'Recognition': 'Medal',
  'Approve': 'CheckCircle',
  'Disapprove': 'XCircle',
  'Report': 'Flag',
  'Premium': 'Crown',
  'Person': 'User',
  'Verified': 'BadgeCheck',
  'Blocked': 'Ban',
  'Surveillance': 'Eye',
  'Key': 'Key',
  'Cash': 'Banknote',
  'Money': 'DollarSign',
  'Bill': 'Receipt',
  'Price': 'Tag',
  'Prices': 'Tags',
  'Discount': 'Percent',
  'DoubleArrowUp': 'ChevronsUp',
  'DoubleArrowDown': 'ChevronsDown',
  'DoubleArrowLeft': 'ChevronsLeft',
  'DoubleArrowRight': 'ChevronsRight',
  'SortAsc': 'ArrowUpDown',
  'SortDesc': 'ArrowDownUp',
  'Refresh': 'RotateCcw',
  'Print': 'Printer',
  'Cut': 'Scissors',
  'Fullscreen': 'Maximize',
  'Play': 'Play',
  'Stop': 'Square',
  'Volume': 'Volume2',
  'Mute': 'VolumeX',
  'Attachment': 'Paperclip',
  'VideoFile': 'Video',
  'Record': 'Circle',
  'DollarSign': 'DollarSign',
  'GrowthChart': 'TrendingUp',
  'Invoice': 'FileText'
};

console.log('Icons to implement with their Lucide mappings:');
console.log('='.repeat(50));

missingIcons.forEach(icon => {
  const lucideIcon = iconMappings[icon] || icon;
  console.log(`${icon} -> ${lucideIcon}`);
});

// Create import statements
const imports = Object.values(iconMappings).filter((value, index, arr) => arr.indexOf(value) === index);
console.log('\n\nImport statement for missing icons:');
console.log('='.repeat(50));
console.log(`import {`);
console.log(`  ${imports.join(',\n  ')}`);
console.log(`} from 'lucide-react'`);

// Create export statements
console.log('\n\nExport statements to add:');
console.log('='.repeat(50));
missingIcons.forEach(icon => {
  const lucideIcon = iconMappings[icon] || icon;
  if (lucideIcon !== icon) {
    console.log(`export { ${lucideIcon} as ${icon} } from 'lucide-react'`);
  } else {
    console.log(`export { ${icon} } from 'lucide-react'`);
  }
});

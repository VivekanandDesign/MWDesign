// Quick test to verify all icons are accessible
const fs = require('fs');

// Try to import and test a few key icons that were reported as missing
const testCode = `
import { 
  ArrowUp, Menu, HeartFilled, StarFilled, Play, DollarSign,
  Smartphone, Check, Home, Layout, CloudLightning, Trophy,
  GraduationCap, Package2, Key
} from './src/components/icons/index';

console.log('Testing icon imports...');
console.log('ArrowUp:', typeof ArrowUp);
console.log('Menu:', typeof Menu);
console.log('HeartFilled:', typeof HeartFilled);
console.log('StarFilled:', typeof StarFilled);
console.log('Play:', typeof Play);
console.log('DollarSign:', typeof DollarSign);
console.log('All icons imported successfully!');
`;

fs.writeFileSync('test-icons.mjs', testCode);
console.log('Created test file. Now checking icon imports...');

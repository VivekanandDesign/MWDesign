#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import all lucide-react icons
function generateIconsData() {
  try {
    console.log('🔍 Extracting all Lucide icons...');
    
    // Import lucide-react
    const lucideModule = require('lucide-react');
    
    // Extract all icon names (they start with uppercase and don't end with 'Icon')
    const allExports = Object.keys(lucideModule);
    const iconNames = allExports.filter(key => {
      const exportedItem = lucideModule[key];
      return (
        key !== 'default' &&
        typeof exportedItem === 'object' &&
        exportedItem !== null &&
        key.charAt(0) === key.charAt(0).toUpperCase() &&
        !key.endsWith('Icon') && // Filter out *Icon duplicates
        !['LucideProps', 'IconNode', 'createElement', 'LucideIcon'].includes(key)
      );
    });

    console.log(`📊 Found ${iconNames.length} icons`);
    console.log(`📝 First 10 icons: ${iconNames.slice(0, 10).join(', ')}`);

    // Create categories based on Lucide's official categorization
    const iconCategories = {
      accessibility: {
        name: 'Accessibility',
        description: 'Icons for accessibility features and inclusive design',
        icons: []
      },
      arrows: {
        name: 'Arrows & Direction',
        description: 'Navigation and directional indicators',
        icons: []
      },
      communication: {
        name: 'Communication',
        description: 'Messaging, social, and communication icons',
        icons: []
      },
      files: {
        name: 'Files & Documents',
        description: 'File types, folders, and document icons',
        icons: []
      },
      interface: {
        name: 'Interface & Controls',
        description: 'UI elements, buttons, and controls',
        icons: []
      },
      media: {
        name: 'Media & Entertainment',
        description: 'Audio, video, and multimedia icons',
        icons: []
      },
      navigation: {
        name: 'Navigation & Maps',
        description: 'Location, maps, and navigation icons',
        icons: []
      },
      business: {
        name: 'Business & Finance',
        description: 'Money, commerce, and business icons',
        icons: []
      },
      technology: {
        name: 'Technology & Devices',
        description: 'Computers, mobile, and tech devices',
        icons: []
      },
      design: {
        name: 'Design & Tools',
        description: 'Creative tools and design elements',
        icons: []
      },
      nature: {
        name: 'Nature & Weather',
        description: 'Plants, animals, and weather icons',
        icons: []
      },
      people: {
        name: 'People & Users',
        description: 'User profiles and people icons',
        icons: []
      },
      time: {
        name: 'Time & Calendar',
        description: 'Clock, calendar, and time-related icons',
        icons: []
      },
      transport: {
        name: 'Transportation',
        description: 'Vehicles and transportation icons',
        icons: []
      },
      security: {
        name: 'Security & Privacy',
        description: 'Lock, shield, and security icons',
        icons: []
      },
      medical: {
        name: 'Medical & Health',
        description: 'Healthcare and medical icons',
        icons: []
      },
      sports: {
        name: 'Sports & Gaming',
        description: 'Sports, fitness, and gaming icons',
        icons: []
      },
      shopping: {
        name: 'Shopping & Commerce',
        description: 'E-commerce and shopping icons',
        icons: []
      },
      social: {
        name: 'Social & Brands',
        description: 'Social media and brand icons',
        icons: []
      },
      miscellaneous: {
        name: 'Miscellaneous',
        description: 'Other useful icons',
        icons: []
      }
    };

    // Categorize icons based on name patterns
    iconNames.forEach(iconName => {
      const lowerName = iconName.toLowerCase();
      
      // Accessibility
      if (lowerName.includes('accessibility') || lowerName.includes('wheelchair') || lowerName.includes('eye') || lowerName.includes('ear')) {
        iconCategories.accessibility.icons.push(iconName);
      }
      // Arrows
      else if (lowerName.includes('arrow') || lowerName.includes('chevron') || lowerName.includes('direction') || 
               lowerName.includes('corner') || lowerName.includes('trending') || lowerName.includes('move')) {
        iconCategories.arrows.icons.push(iconName);
      }
      // Communication
      else if (lowerName.includes('message') || lowerName.includes('mail') || lowerName.includes('phone') || 
               lowerName.includes('bell') || lowerName.includes('chat') || lowerName.includes('send') || 
               lowerName.includes('reply') || lowerName.includes('forward') || lowerName.includes('contact')) {
        iconCategories.communication.icons.push(iconName);
      }
      // Files
      else if (lowerName.includes('file') || lowerName.includes('folder') || lowerName.includes('document') || 
               lowerName.includes('archive') || lowerName.includes('clipboard') || lowerName.includes('paper')) {
        iconCategories.files.icons.push(iconName);
      }
      // Interface
      else if (lowerName.includes('menu') || lowerName.includes('settings') || lowerName.includes('more') || 
               lowerName.includes('plus') || lowerName.includes('minus') || lowerName.includes('search') ||
               lowerName.includes('filter') || lowerName.includes('sort') || lowerName.includes('refresh') ||
               lowerName.includes('download') || lowerName.includes('upload') || lowerName.includes('edit') ||
               lowerName.includes('trash') || lowerName.includes('copy') || lowerName.includes('save') ||
               lowerName.includes('undo') || lowerName.includes('redo') || lowerName.includes('zoom') ||
               lowerName.includes('grid') || lowerName.includes('list') || lowerName.includes('layout') ||
               lowerName.includes('align') || lowerName.includes('bold') || lowerName.includes('italic')) {
        iconCategories.interface.icons.push(iconName);
      }
      // Media
      else if (lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('stop') || 
               lowerName.includes('volume') || lowerName.includes('music') || lowerName.includes('video') ||
               lowerName.includes('camera') || lowerName.includes('image') || lowerName.includes('photo') ||
               lowerName.includes('film') || lowerName.includes('mic') || lowerName.includes('speaker') ||
               lowerName.includes('headphone') || lowerName.includes('radio') || lowerName.includes('disc')) {
        iconCategories.media.icons.push(iconName);
      }
      // Navigation
      else if (lowerName.includes('map') || lowerName.includes('location') || lowerName.includes('navigation') || 
               lowerName.includes('compass') || lowerName.includes('route') || lowerName.includes('pin') ||
               lowerName.includes('marker') || lowerName.includes('globe') || lowerName.includes('world')) {
        iconCategories.navigation.icons.push(iconName);
      }
      // Business
      else if (lowerName.includes('dollar') || lowerName.includes('credit') || lowerName.includes('cart') || 
               lowerName.includes('bag') || lowerName.includes('receipt') || lowerName.includes('chart') ||
               lowerName.includes('activity') || lowerName.includes('target') || lowerName.includes('award') ||
               lowerName.includes('calculator') || lowerName.includes('coins') || lowerName.includes('wallet') ||
               lowerName.includes('building') || lowerName.includes('store') || lowerName.includes('briefcase')) {
        iconCategories.business.icons.push(iconName);
      }
      // Technology
      else if (lowerName.includes('computer') || lowerName.includes('laptop') || lowerName.includes('mobile') || 
               lowerName.includes('tablet') || lowerName.includes('smartphone') || lowerName.includes('monitor') ||
               lowerName.includes('keyboard') || lowerName.includes('mouse') || lowerName.includes('cpu') ||
               lowerName.includes('server') || lowerName.includes('database') || lowerName.includes('wifi') ||
               lowerName.includes('bluetooth') || lowerName.includes('usb') || lowerName.includes('battery')) {
        iconCategories.technology.icons.push(iconName);
      }
      // Design
      else if (lowerName.includes('brush') || lowerName.includes('palette') || lowerName.includes('pen') || 
               lowerName.includes('pencil') || lowerName.includes('ruler') || lowerName.includes('crop') ||
               lowerName.includes('layers') || lowerName.includes('shapes') || lowerName.includes('square') ||
               lowerName.includes('circle') || lowerName.includes('triangle') || lowerName.includes('diamond')) {
        iconCategories.design.icons.push(iconName);
      }
      // Nature
      else if (lowerName.includes('tree') || lowerName.includes('leaf') || lowerName.includes('flower') || 
               lowerName.includes('sun') || lowerName.includes('moon') || lowerName.includes('cloud') ||
               lowerName.includes('rain') || lowerName.includes('snow') || lowerName.includes('wind') ||
               lowerName.includes('weather') || lowerName.includes('plant') || lowerName.includes('seed')) {
        iconCategories.nature.icons.push(iconName);
      }
      // People
      else if (lowerName.includes('user') || lowerName.includes('users') || lowerName.includes('person') || 
               lowerName.includes('people') || lowerName.includes('profile') || lowerName.includes('account') ||
               lowerName.includes('avatar') || lowerName.includes('team') || lowerName.includes('group')) {
        iconCategories.people.icons.push(iconName);
      }
      // Time
      else if (lowerName.includes('clock') || lowerName.includes('time') || lowerName.includes('calendar') || 
               lowerName.includes('date') || lowerName.includes('schedule') || lowerName.includes('timer') ||
               lowerName.includes('alarm') || lowerName.includes('watch') || lowerName.includes('hourglass')) {
        iconCategories.time.icons.push(iconName);
      }
      // Transport
      else if (lowerName.includes('car') || lowerName.includes('bus') || lowerName.includes('train') || 
               lowerName.includes('plane') || lowerName.includes('bike') || lowerName.includes('ship') ||
               lowerName.includes('truck') || lowerName.includes('taxi') || lowerName.includes('metro') ||
               lowerName.includes('fuel') || lowerName.includes('parking') || lowerName.includes('traffic')) {
        iconCategories.transport.icons.push(iconName);
      }
      // Security
      else if (lowerName.includes('lock') || lowerName.includes('unlock') || lowerName.includes('key') || 
               lowerName.includes('shield') || lowerName.includes('security') || lowerName.includes('password') ||
               lowerName.includes('safe') || lowerName.includes('protection') || lowerName.includes('privacy')) {
        iconCategories.security.icons.push(iconName);
      }
      // Medical
      else if (lowerName.includes('heart') || lowerName.includes('medical') || lowerName.includes('health') || 
               lowerName.includes('hospital') || lowerName.includes('pill') || lowerName.includes('cross') ||
               lowerName.includes('stethoscope') || lowerName.includes('bandage') || lowerName.includes('syringe')) {
        iconCategories.medical.icons.push(iconName);
      }
      // Sports
      else if (lowerName.includes('sport') || lowerName.includes('game') || lowerName.includes('football') || 
               lowerName.includes('basketball') || lowerName.includes('tennis') || lowerName.includes('golf') ||
               lowerName.includes('trophy') || lowerName.includes('medal') || lowerName.includes('fitness') ||
               lowerName.includes('gym') || lowerName.includes('dumbbell') || lowerName.includes('run')) {
        iconCategories.sports.icons.push(iconName);
      }
      // Shopping
      else if (lowerName.includes('shop') || lowerName.includes('store') || lowerName.includes('market') || 
               lowerName.includes('basket') || lowerName.includes('package') || lowerName.includes('gift') ||
               lowerName.includes('tag') || lowerName.includes('price') || lowerName.includes('discount') ||
               lowerName.includes('coupon') || lowerName.includes('sale')) {
        iconCategories.shopping.icons.push(iconName);
      }
      // Social
      else if (lowerName.includes('share') || lowerName.includes('like') || lowerName.includes('heart') || 
               lowerName.includes('star') || lowerName.includes('thumbs') || lowerName.includes('bookmark') ||
               lowerName.includes('follow') || lowerName.includes('subscribe') || lowerName.includes('social')) {
        iconCategories.social.icons.push(iconName);
      }
      // Default to miscellaneous
      else {
        iconCategories.miscellaneous.icons.push(iconName);
      }
    });

    // Generate statistics
    const stats = Object.entries(iconCategories).map(([key, category]) => ({
      id: key,
      name: category.name,
      count: category.icons.length
    }));

    console.log('\n📊 Icons per category:');
    stats.forEach(stat => {
      console.log(`  ${stat.name}: ${stat.count} icons`);
    });

    // Create output directory
    const outputDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save the data
    const outputData = {
      metadata: {
        totalIcons: iconNames.length,
        totalCategories: Object.keys(iconCategories).length,
        generatedAt: new Date().toISOString(),
        lucideVersion: getLucideVersion()
      },
      categories: iconCategories,
      allIcons: iconNames.sort()
    };

    const outputPath = path.join(outputDir, 'lucide-icons.json');
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

    console.log(`\n✅ Successfully generated icon data:`);
    console.log(`   📁 File: ${outputPath}`);
    console.log(`   🎯 Total icons: ${iconNames.length}`);
    console.log(`   📂 Categories: ${Object.keys(iconCategories).length}`);
    
    return outputData;

  } catch (error) {
    console.error('❌ Error generating icons data:', error);
    process.exit(1);
  }
}

function getLucideVersion() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
    return packageJson.dependencies['lucide-react'] || 'unknown';
  } catch {
    return 'unknown';
  }
}

// Run the script
if (require.main === module) {
  generateIconsData();
}

module.exports = { generateIconsData };

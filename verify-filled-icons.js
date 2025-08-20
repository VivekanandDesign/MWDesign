// Test script to verify all new filled icons are properly exported
const fs = require('fs');

const newFilledIcons = [
  'ThumbsUpFilled',
  'ThumbsDownFilled', 
  'BellFilled',
  'BookmarkFilled',
  'MessageSquareFilled',
  'MessageCircleFilled',
  'UserFilled',
  'EyeFilled',
  'LockFilled',
  'ShieldFilled',
  'CircleFilled',
  'SquareFilled',
  'CheckCircleFilled',
  'PlayFilled',
  'PauseFilled',
  'VolumeFilled',
  'FolderFilled',
  'FileFilled',
  'AwardFilled',
  'TrophyFilled',
  'TargetFilled',
  'BuildingFilled'
];

console.log('🔍 Verifying filled icon exports...\n');

// Check if icons are defined in the index file
const indexContent = fs.readFileSync('src/components/icons/index.tsx', 'utf8');

const missingExports = [];
const foundExports = [];

newFilledIcons.forEach(iconName => {
  if (indexContent.includes(`export const ${iconName}`)) {
    foundExports.push(iconName);
  } else {
    missingExports.push(iconName);
  }
});

console.log(`✅ Successfully exported: ${foundExports.length}/${newFilledIcons.length}`);
foundExports.forEach(icon => console.log(`  ✓ ${icon}`));

if (missingExports.length > 0) {
  console.log(`\n❌ Missing exports: ${missingExports.length}`);
  missingExports.forEach(icon => console.log(`  ✗ ${icon}`));
} else {
  console.log('\n🎉 All filled icons successfully exported!');
}

// Check if icons are referenced in the page
const pageContent = fs.readFileSync('src/app/icons/page.tsx', 'utf8');

const iconsInPage = [];
const iconsNotInPage = [];

newFilledIcons.forEach(iconName => {
  if (pageContent.includes(`'${iconName}'`)) {
    iconsInPage.push(iconName);
  } else {
    iconsNotInPage.push(iconName);
  }
});

console.log(`\n📄 Icons referenced in page: ${iconsInPage.length}/${newFilledIcons.length}`);
iconsInPage.forEach(icon => console.log(`  ✓ ${icon}`));

if (iconsNotInPage.length > 0) {
  console.log(`\n⚠️  Icons not in page: ${iconsNotInPage.length}`);
  iconsNotInPage.forEach(icon => console.log(`  ⚠️  ${icon}`));
}

console.log('\n📊 Summary:');
console.log(`Total filled icons implemented: ${newFilledIcons.length}`);
console.log(`Successfully exported: ${foundExports.length}`);
console.log(`Added to icons page: ${iconsInPage.length}`);
console.log(`Implementation status: ${foundExports.length === newFilledIcons.length && iconsInPage.length === newFilledIcons.length ? '✅ COMPLETE' : '⚠️ NEEDS ATTENTION'}`);

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Component screenshot automation
async function takeComponentScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1200, height: 800 }
  });
  
  const page = await browser.newPage();
  
  // Ensure screenshots directory exists
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  try {
    console.log('📷 Starting component screenshots...');
    
    // Navigate to components page
    await page.goto('http://localhost:3000/components', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Wait for components to load
    await page.waitForTimeout(2000);
    
    // Take full page screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, 'components-full-page.png'),
      fullPage: true
    });
    
    console.log('✅ Full page screenshot taken');
    
    // Component-specific screenshots
    const components = [
      { name: 'buttons', selector: '[data-component="button"]' },
      { name: 'inputs', selector: '[data-component="input"]' },
      { name: 'cards', selector: '[data-component="card"]' },
      { name: 'badges', selector: '[data-component="badge"]' },
      { name: 'alerts', selector: '[data-component="alert"]' },
      { name: 'forms', selector: '[data-component="form"]' },
      { name: 'navigation', selector: '[data-component="navigation"]' },
      { name: 'tables', selector: '[data-component="table"]' }
    ];
    
    for (const component of components) {
      try {
        const element = await page.$(component.selector);
        if (element) {
          await element.screenshot({
            path: path.join(screenshotsDir, `${component.name}.png`)
          });
          console.log(`✅ ${component.name} screenshot taken`);
        } else {
          console.log(`⚠️  ${component.name} selector not found`);
        }
      } catch (error) {
        console.log(`❌ Error taking ${component.name} screenshot:`, error.message);
      }
    }
    
    // Take screenshots of different viewport sizes
    const viewports = [
      { name: 'desktop', width: 1200, height: 800 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 375, height: 667 }
    ];
    
    for (const viewport of viewports) {
      await page.setViewport(viewport);
      await page.screenshot({
        path: path.join(screenshotsDir, `components-${viewport.name}.png`),
        fullPage: true
      });
      console.log(`✅ ${viewport.name} viewport screenshot taken`);
    }
    
  } catch (error) {
    console.error('❌ Screenshot error:', error);
  } finally {
    await browser.close();
    console.log('🎯 Screenshot process completed');
  }
}

// Component state documentation
async function documentComponentStates() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000/components');
    
    // Extract component information
    const componentData = await page.evaluate(() => {
      const components = [];
      
      // Look for common component patterns
      const buttons = document.querySelectorAll('button, [role="button"]');
      const inputs = document.querySelectorAll('input, textarea, select');
      const cards = document.querySelectorAll('[class*="card"], [class*="panel"]');
      
      return {
        buttons: buttons.length,
        inputs: inputs.length,
        cards: cards.length,
        timestamp: new Date().toISOString()
      };
    });
    
    // Save component data
    fs.writeFileSync(
      path.join(__dirname, 'component-analysis.json'),
      JSON.stringify(componentData, null, 2)
    );
    
    console.log('📊 Component analysis saved');
    
  } catch (error) {
    console.error('❌ Analysis error:', error);
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (require.main === module) {
  console.log('🚀 Starting component documentation...');
  
  Promise.all([
    takeComponentScreenshots(),
    documentComponentStates()
  ]).then(() => {
    console.log('✅ All documentation tasks completed');
    process.exit(0);
  }).catch(error => {
    console.error('❌ Documentation failed:', error);
    process.exit(1);
  });
}

module.exports = {
  takeComponentScreenshots,
  documentComponentStates
};

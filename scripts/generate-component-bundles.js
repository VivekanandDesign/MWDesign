#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Component Bundle Generator for MovingWalls DS
 * Creates optimized component-specific bundles for tree-shaking
 */

const COMPONENTS_DIR = path.join(__dirname, '../src/components/ui');
const OUTPUT_DIR = path.join(__dirname, '../dist/components');

// Popular components that should get individual bundles
const PRIORITY_COMPONENTS = [
  'Button',
  'Card', 
  'Input',
  'Modal',
  'Table',
  'Form',
  'Alert',
  'Badge',
  'Avatar',
  'Checkbox',
  'Select',
  'Tabs',
  'Toast',
  'Dialog',
  'Tooltip'
];

// Component categories for bundle grouping
const COMPONENT_CATEGORIES = {
  'forms': ['Input', 'Checkbox', 'Select', 'Form', 'Textarea', 'Switch', 'Slider'],
  'navigation': ['Tabs', 'Breadcrumb', 'Menu', 'Pagination', 'Stepper'],
  'feedback': ['Alert', 'Toast', 'Notification', 'Progress', 'Spinner', 'Skeleton'],
  'layout': ['Card', 'Container', 'Panel', 'Sheet', 'Sidebar', 'Separator'],
  'data': ['Table', 'DataGrid', 'List', 'TreeView', 'Calendar'],
  'overlays': ['Modal', 'Dialog', 'Popover', 'Tooltip', 'Dropdown'],
  'interactive': ['Button', 'Badge', 'Avatar', 'Chip', 'ToggleGroup'],
  'advanced': ['RichTextEditor', 'DocumentEditor', 'FileUpload', 'DragDrop', 'Carousel']
};

function generateComponentBundles() {
  console.log('\n📦 MovingWalls DS - Component Bundle Generator\n');
  console.log('=' .repeat(60));
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Get all available components
  const allComponents = fs.readdirSync(COMPONENTS_DIR)
    .filter(file => file.endsWith('.tsx') && file !== 'index.ts')
    .map(file => path.basename(file, '.tsx'));
  
  console.log(`Found ${allComponents.length} components in ${COMPONENTS_DIR}`);
  
  // Generate individual component configs
  const individualConfigs = generateIndividualConfigs(allComponents);
  
  // Generate category bundles
  const categoryConfigs = generateCategoryConfigs();
  
  // Generate the complete Rollup configuration
  const rollupConfig = generateRollupConfig(individualConfigs, categoryConfigs);
  
  // Write Rollup configuration
  fs.writeFileSync(
    path.join(__dirname, '../rollup.config.components.js'),
    rollupConfig
  );
  
  // Generate component manifest
  const manifest = generateComponentManifest(allComponents);
  fs.writeFileSync(
    path.join(OUTPUT_DIR, '../component-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  // Generate HTML examples for each component
  generateComponentExamples(allComponents);
  
  console.log('\n✅ Component bundle generation completed!');
  console.log(`\n📄 Generated files:`);
  console.log(`   • rollup.config.components.js`);
  console.log(`   • dist/component-manifest.json`);
  console.log(`   • examples/components/ (${allComponents.length} files)`);
  console.log(`\n🚀 Next steps:`);
  console.log(`   1. Run: npm run build:components`);
  console.log(`   2. Test: Open examples/components/Button.html`);
  console.log(`   3. Deploy: Update CDN with new bundles`);
}

function generateIndividualConfigs(components) {
  const configs = [];
  
  console.log(`\n📦 Generating individual component bundles:`);
  
  components.forEach(component => {
    if (PRIORITY_COMPONENTS.includes(component)) {
      console.log(`   ✅ ${component} (Priority)`);
    } else {
      console.log(`   • ${component}`);
    }
    
    configs.push({
      name: component,
      input: `src/components/ui/${component}.tsx`,
      output: `components/${component.toLowerCase()}.js`,
      priority: PRIORITY_COMPONENTS.includes(component)
    });
  });
  
  return configs;
}

function generateCategoryConfigs() {
  const configs = [];
  
  console.log(`\n📂 Generating category bundles:`);
  
  Object.entries(COMPONENT_CATEGORIES).forEach(([category, components]) => {
    console.log(`   📁 ${category}: ${components.join(', ')}`);
    
    configs.push({
      name: category,
      components,
      output: `categories/${category}.js`
    });
  });
  
  return configs;
}

function generateRollupConfig(individualConfigs, categoryConfigs) {
  return `// Auto-generated Rollup configuration for component bundles
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

const external = ['react', 'react-dom'];
const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM'
};

const baseConfig = {
  external,
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs({
      include: /node_modules/
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false,
      rootDir: './src'
    }),
    postcss({
      extract: false,
      inject: true,
      minimize: true
    })
  ]
};

export default [
  // Individual component bundles
  ${individualConfigs.map(config => `
  {
    ...baseConfig,
    input: '${config.input}',
    output: [
      {
        file: 'dist/${config.output}',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/${config.output.replace('.js', '.umd.js')}',
        format: 'umd',
        name: 'MovingWalls${config.name}',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  }`).join(',\n')},
  
  // Category bundles
  ${categoryConfigs.map(config => `
  {
    ...baseConfig,
    input: {
      ${config.components.map(comp => `'${comp}': 'src/components/ui/${comp}.tsx'`).join(',\n      ')}
    },
    output: {
      dir: 'dist/${config.output.replace('.js', '')}',
      format: 'esm',
      entryFileNames: '[name].js',
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins,
      terser()
    ]
  }`).join(',\n')}
];`;
}

function generateComponentManifest(components) {
  const manifest = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    totalComponents: components.length,
    components: {},
    categories: COMPONENT_CATEGORIES,
    priorityComponents: PRIORITY_COMPONENTS,
    bundles: {
      individual: {},
      categories: {}
    }
  };
  
  // Individual component bundles
  components.forEach(component => {
    const size = fs.existsSync(path.join(COMPONENTS_DIR, `${component}.tsx`)) 
      ? fs.statSync(path.join(COMPONENTS_DIR, `${component}.tsx`)).size 
      : 0;
    
    manifest.components[component] = {
      source: `src/components/ui/${component}.tsx`,
      bundles: {
        esm: `components/${component.toLowerCase()}.js`,
        umd: `components/${component.toLowerCase()}.umd.js`
      },
      sourceSize: size,
      priority: PRIORITY_COMPONENTS.includes(component),
      category: Object.keys(COMPONENT_CATEGORIES).find(cat => 
        COMPONENT_CATEGORIES[cat].includes(component)
      ) || 'other'
    };
    
    manifest.bundles.individual[component] = {
      esm: `https://unpkg.com/movingwalls-ds@1.0.0/dist/components/${component.toLowerCase()}.js`,
      umd: `https://unpkg.com/movingwalls-ds@1.0.0/dist/components/${component.toLowerCase()}.umd.js`
    };
  });
  
  // Category bundles
  Object.keys(COMPONENT_CATEGORIES).forEach(category => {
    manifest.bundles.categories[category] = {
      esm: `https://unpkg.com/movingwalls-ds@1.0.0/dist/categories/${category}/`,
      components: COMPONENT_CATEGORIES[category]
    };
  });
  
  return manifest;
}

function generateComponentExamples(components) {
  const examplesDir = path.join(__dirname, '../examples/components');
  
  if (!fs.existsSync(examplesDir)) {
    fs.mkdirSync(examplesDir, { recursive: true });
  }
  
  console.log(`\n📄 Generating component examples:`);
  
  components.slice(0, 5).forEach(component => { // Generate examples for first 5 components
    console.log(`   📝 ${component}.html`);
    
    const exampleHTML = generateComponentExample(component);
    fs.writeFileSync(
      path.join(examplesDir, `${component}.html`),
      exampleHTML
    );
  });
  
  // Generate index page
  const indexHTML = generateExamplesIndex(components);
  fs.writeFileSync(
    path.join(examplesDir, 'index.html'),
    indexHTML
  );
}

function generateComponentExample(component) {
  const componentLower = component.toLowerCase();
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${component} Component - MovingWalls DS</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .demo-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin: 20px 0;
        }
        .code-snippet {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 4px;
            padding: 12px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            margin: 10px 0;
        }
        .status {
            padding: 8px 12px;
            border-radius: 4px;
            margin: 10px 0;
        }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
    </style>
</head>
<body>
    <h1>🎨 ${component} Component Demo</h1>
    
    <div class="demo-container">
        <h3>📦 Individual Component Loading</h3>
        <p>Testing optimized ${component} component bundle from CDN.</p>
        
        <div class="code-snippet">
import ${component} from 'https://unpkg.com/movingwalls-ds@1.0.0/dist/components/${componentLower}.js';
        </div>
        
        <div id="load-status" class="status">⏳ Loading ${component} component...</div>
        
        <div id="demo-area" style="display: none;">
            <h4>✅ Component Loaded Successfully!</h4>
            <div id="component-demo"></div>
        </div>
    </div>
    
    <div class="demo-container">
        <h3>📊 Bundle Information</h3>
        <div id="bundle-info">Loading bundle information...</div>
    </div>
    
    <div class="demo-container">
        <h3>🔗 CDN URLs</h3>
        <div class="code-snippet">
<!-- ESM Import -->
&lt;script type="module"&gt;
  import ${component} from 'https://unpkg.com/movingwalls-ds@1.0.0/dist/components/${componentLower}.js';
&lt;/script&gt;

<!-- UMD Script -->
&lt;script src="https://unpkg.com/movingwalls-ds@1.0.0/dist/components/${componentLower}.umd.js"&gt;&lt;/script&gt;
        </div>
    </div>
    
    <script type="module">
        const startTime = Date.now();
        
        try {
            // Load React first
            const React = await import('https://unpkg.com/react@18/index.js');
            const ReactDOM = await import('https://unpkg.com/react-dom@18/index.js');
            
            // Load the component
            const { default: ${component} } = await import(
                'https://unpkg.com/movingwalls-ds@1.0.0/dist/components/${componentLower}.js'
            );
            
            const loadTime = Date.now() - startTime;
            
            document.getElementById('load-status').innerHTML = 
                '✅ ${component} loaded in ' + loadTime + 'ms';
            document.getElementById('load-status').className = 'status success';
            
            document.getElementById('demo-area').style.display = 'block';
            
            // Show bundle info
            document.getElementById('bundle-info').innerHTML = \`
                <strong>Load Time:</strong> \${loadTime}ms<br>
                <strong>Bundle Type:</strong> ESM Module<br>
                <strong>CDN:</strong> unpkg.com<br>
                <strong>Component:</strong> ${component}<br>
                <strong>Status:</strong> ✅ Optimized individual bundle
            \`;
            
            console.log('${component} component loaded successfully:', ${component});
            
        } catch (error) {
            document.getElementById('load-status').innerHTML = 
                '❌ Failed to load ${component}: ' + error.message;
            document.getElementById('load-status').className = 'status error';
            
            document.getElementById('bundle-info').innerHTML = 
                '❌ Bundle loading failed: ' + error.message;
            
            console.error('Failed to load ${component}:', error);
        }
    </script>
</body>
</html>`;
}

function generateExamplesIndex(components) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Component Examples - MovingWalls DS</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .component-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .component-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-decoration: none;
            color: inherit;
            transition: transform 0.2s;
        }
        .component-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .priority-badge {
            background: #1d65af;
            color: white;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 10px;
            margin-left: 8px;
        }
    </style>
</head>
<body>
    <h1>🎨 MovingWalls DS - Component Examples</h1>
    <p>Individual component bundles for optimized loading and tree-shaking.</p>
    
    <div class="component-grid">
        ${components.map(component => `
        <a href="${component}.html" class="component-card">
            <h3>${component} ${PRIORITY_COMPONENTS.includes(component) ? '<span class="priority-badge">Priority</span>' : ''}</h3>
            <p>Test the ${component} component bundle</p>
            <small>📦 Individual bundle loading</small>
        </a>`).join('\n        ')}
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
        <h3>📊 Bundle Statistics</h3>
        <p><strong>Total Components:</strong> ${components.length}</p>
        <p><strong>Priority Components:</strong> ${PRIORITY_COMPONENTS.length}</p>
        <p><strong>Categories:</strong> ${Object.keys(COMPONENT_CATEGORIES).length}</p>
    </div>
</body>
</html>`;
}

if (require.main === module) {
  generateComponentBundles();
}

module.exports = { generateComponentBundles };

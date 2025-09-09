# 📦 MW Design System Package

A comprehensive React component library with design tokens, icons, and utilities.

## 🚀 Installation

### NPM/Yarn
```bash
# NPM
npm install @mw-design/system

# Yarn
yarn add @mw-design/system

# PNPM
pnpm add @mw-design/system
```

### CDN Usage
```html
<!-- UMD Bundle -->
<script src="https://unpkg.com/@mw-design/system@latest/dist/index.umd.js"></script>

<!-- Or via jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@mw-design/system@latest/dist/index.umd.js"></script>

<!-- CSS Styles -->
<link rel="stylesheet" href="https://unpkg.com/@mw-design/system@latest/dist/styles/index.css">
```

## 📖 Usage

### React Components
```jsx
import { Button, Card, Input, Badge } from '@mw-design/system';
import '@mw-design/system/styles';

function App() {
  return (
    <Card className="p-6">
      <h1>Welcome to MW Design System</h1>
      <Input placeholder="Enter your name" />
      <Button variant="primary">
        Get Started
        <Badge>New</Badge>
      </Button>
    </Card>
  );
}
```

### Tree Shaking (Import Individual Components)
```jsx
import Button from '@mw-design/system/components/Button';
import Card from '@mw-design/system/components/Card';
```

### Design Tokens
```jsx
import { tokens, colors, spacing } from '@mw-design/system/tokens';

// JavaScript
const primaryColor = colors.primary[500];
const spacing4 = spacing[4];

// CSS Custom Properties
.custom-component {
  color: var(--mw-primary-500);
  padding: var(--mw-space-4);
}
```

### Icons
```jsx
import { DynamicIcon } from '@mw-design/system';
import { ArrowRight, Check, Star } from '@mw-design/system/icons';

function IconExample() {
  return (
    <div>
      <DynamicIcon name="ArrowRight" size={24} />
      <ArrowRight size={20} />
      <Check className="text-green-500" />
      <Star size={16} fill="currentColor" />
    </div>
  );
}
```

## 🎨 Design Tokens

### Available Formats
- **JSON**: `@mw-design/system/tokens/tokens.json`
- **JavaScript/TypeScript**: `@mw-design/system/tokens`
- **CSS**: `@mw-design/system/tokens/tokens.css`
- **SCSS**: `@mw-design/system/tokens/tokens.scss`

### Token Categories
- **Colors**: Primary, gray scale, semantic colors
- **Spacing**: Consistent spacing scale (4px base)
- **Typography**: Font families, sizes, weights
- **Shadows**: Box shadow variations
- **Border Radius**: Rounded corner variations
- **Breakpoints**: Responsive design breakpoints
- **Z-Index**: Layer management

## 📱 Components

### Form Components
- `Button` - Primary, secondary, outline variants
- `Input` - Text, email, password, number inputs
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection
- `Checkbox` - Boolean selection
- `Switch` - Toggle control
- `Slider` - Range input
- `Rating` - Star rating component

### Layout Components
- `Card` - Container with elevation
- `Container` - Max-width container
- `Panel` - Flexible panel component
- `Separator` - Visual divider
- `ScrollArea` - Custom scrollable area

### Navigation Components
- `Breadcrumb` - Navigation breadcrumbs
- `Menu` - Dropdown menu
- `Tabs` - Tab navigation
- `Pagination` - Page navigation
- `Stepper` - Step-by-step navigation

### Feedback Components
- `Alert` - Contextual alerts
- `Badge` - Status indicators
- `Toast` - Temporary notifications
- `Spinner` - Loading indicator
- `Progress` - Progress bar
- `Skeleton` - Loading placeholders

### Overlay Components
- `Modal` - Dialog overlays
- `Tooltip` - Hover information
- `Popover` - Contextual popovers
- `Sheet` - Side panel
- `Dialog` - Confirmation dialogs

### Data Display
- `Table` - Data tables
- `DataGrid` - Advanced data grid
- `List` - Structured lists
- `Timeline` - Event timeline
- `Calendar` - Date picker
- `Avatar` - User profile images

## 🛠️ Customization

### CSS Custom Properties
```css
:root {
  --mw-primary-500: #3b82f6;
  --mw-space-4: 1rem;
  --mw-radius-md: 0.375rem;
}
```

### Tailwind CSS Integration
```js
// tailwind.config.js
const { tokens } = require('@mw-design/system/tokens');

module.exports = {
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.fontSize,
      boxShadow: tokens.shadows,
      borderRadius: tokens.borderRadius,
    }
  }
}
```

## 🌐 CDN Examples

### Basic HTML Example
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/@mw-design/system@latest/dist/styles/index.css">
</head>
<body>
  <div id="root"></div>
  
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@mw-design/system@latest/dist/index.umd.js"></script>
  
  <script>
    const { Button, Card, Input } = MWDesignSystem;
    
    function App() {
      return React.createElement(Card, { className: 'p-6' },
        React.createElement('h1', null, 'MW Design System'),
        React.createElement(Input, { placeholder: 'Enter text' }),
        React.createElement(Button, { variant: 'primary' }, 'Click me')
      );
    }
    
    ReactDOM.render(React.createElement(App), document.getElementById('root'));
  </script>
</body>
</html>
```

## 📊 Bundle Information

### Package Exports
- **Main**: `dist/index.js` (CommonJS)
- **Module**: `dist/index.esm.js` (ES Modules)
- **UMD**: `dist/index.umd.js` (Universal)
- **Types**: `dist/index.d.ts` (TypeScript)

### Individual Components
- Import path: `@mw-design/system/components/ComponentName`
- Reduces bundle size through tree shaking

### File Sizes (Gzipped)
- Full bundle: ~45KB
- Individual components: 2-8KB each
- Design tokens: ~3KB
- Icons: ~1KB each

## 🔄 Version Support

- **React**: 16.8+ (Hooks support required)
- **TypeScript**: 4.0+
- **Modern Browsers**: Chrome, Firefox, Safari, Edge

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

See our [contribution guidelines](https://github.com/VivekanandDesign/MWDesign/blob/main/CONTRIBUTING.md).

## 📚 Documentation

- **Storybook**: [mwdesignsystem.netlify.app](https://mwdesignsystem.netlify.app)
- **GitHub**: [github.com/VivekanandDesign/MWDesign](https://github.com/VivekanandDesign/MWDesign)
- **NPM**: [npmjs.com/package/@mw-design/system](https://npmjs.com/package/@mw-design/system)

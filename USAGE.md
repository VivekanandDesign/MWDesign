# MovingWalls Design System - Usage Guide

## 📦 Installation

### NPM/Yarn
```bash
npm install movingwalls-ds
# or
yarn add movingwalls-ds
```

### CDN
```html
<!-- UMD Bundle -->
<script src="https://unpkg.com/movingwalls-ds@1.0.0/dist/index.umd.js"></script>
<!-- or via jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/movingwalls-ds@1.0.0/dist/index.umd.js"></script>

<!-- Styles -->
<link rel="stylesheet" href="https://unpkg.com/movingwalls-ds@1.0.0/dist/styles/index.css">
```

## 🚀 Quick Start

### React/Next.js Project

```tsx
import React from 'react';
import { Button, Card, Badge } from 'movingwalls-ds';
import 'movingwalls-ds/dist/styles/index.css';

function App() {
  return (
    <div>
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          MovingWalls Design System
          <Badge variant="success" className="ml-2">v1.0.0</Badge>
        </h1>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </Card>
    </div>
  );
}

export default App;
```

### HTML + CDN

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://unpkg.com/movingwalls-ds@1.0.0/dist/styles/index.css">
</head>
<body>
    <div id="app"></div>
    
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/movingwalls-ds@1.0.0/dist/index.umd.js"></script>
    
    <script>
        const { Button, Card } = MovingWallsDS;
        
        ReactDOM.render(
            React.createElement(Card, { className: 'p-6' },
                React.createElement('h1', { className: 'text-2xl font-bold mb-4' }, 'Hello MovingWalls DS'),
                React.createElement(Button, { variant: 'primary' }, 'Click Me')
            ),
            document.getElementById('app')
        );
    </script>
</body>
</html>
```

## 📚 Available Components

### Core UI Components
- **Button** - Primary, secondary, outline, ghost variants
- **Card** - Flexible container with header, body, footer
- **Badge** - Status indicators and labels
- **Input** - Form inputs with validation states
- **Select** - Dropdown selections
- **Checkbox** - Toggle selections
- **Switch** - On/off controls

### Advanced Components
- **DataGrid** - Sortable, filterable data tables
- **Calendar** - Date selection and range pickers
- **Modal/Dialog** - Overlay containers
- **Accordion** - Collapsible content sections
- **Tabs** - Tabbed interfaces
- **Carousel** - Image/content sliders
- **Timeline** - Sequential event displays

### Form Components
- **Form** - Complete form management
- **FileUpload** - Drag & drop file handling
- **RichTextEditor** - WYSIWYG text editing
- **Rating** - Star rating inputs
- **Slider** - Range and value sliders

### Navigation
- **Menu** - Dropdown and context menus
- **Breadcrumb** - Navigation trails
- **Pagination** - Page navigation
- **Sidebar** - Collapsible side panels

### Feedback
- **Toast** - Temporary notifications
- **Snackbar** - Action-based alerts
- **Progress** - Loading indicators
- **Spinner** - Loading spinners
- **Alert** - Status messages

## 🎨 Design Tokens

### CSS Custom Properties
```css
/* Import design tokens */
@import 'movingwalls-ds/dist/tokens/tokens.css';

.my-component {
  color: var(--color-primary-500);
  font-size: var(--font-size-lg);
  spacing: var(--spacing-4);
}
```

### SCSS Variables
```scss
@import 'movingwalls-ds/dist/tokens/tokens.scss';

.my-component {
  color: $color-primary-500;
  font-size: $font-size-lg;
  margin: $spacing-4;
}
```

### JavaScript Tokens
```js
import tokens from 'movingwalls-ds/dist/tokens/tokens.json';

const primaryColor = tokens.colors.primary['500'];
const largeFontSize = tokens.fontSize.lg;
```

## 🔧 TypeScript Support

Full TypeScript definitions are included:

```tsx
import { ButtonProps, CardProps } from 'movingwalls-ds';

interface MyComponentProps {
  variant: ButtonProps['variant'];
  children: React.ReactNode;
}

const MyComponent: React.FC<MyComponentProps> = ({ variant, children }) => {
  return (
    <Card>
      <Button variant={variant}>{children}</Button>
    </Card>
  );
};
```

## 🎯 Icon System

The package includes 2000+ Lucide React icons:

```tsx
import { Icon } from 'movingwalls-ds';

// Usage
<Icon name="heart" size={24} />
<Icon name="star" size="lg" color="yellow" />
<Icon name="check-circle" className="text-green-500" />
```

## 🌐 CDN Files Available

- **Main Bundle**: `https://unpkg.com/movingwalls-ds@1.0.0/dist/index.umd.js`
- **ES Module**: `https://unpkg.com/movingwalls-ds@1.0.0/dist/index.esm.js`
- **CommonJS**: `https://unpkg.com/movingwalls-ds@1.0.0/dist/index.js`
- **Styles**: `https://unpkg.com/movingwalls-ds@1.0.0/dist/styles/index.css`
- **Tokens CSS**: `https://unpkg.com/movingwalls-ds@1.0.0/dist/tokens/tokens.css`
- **Tokens SCSS**: `https://unpkg.com/movingwalls-ds@1.0.0/dist/tokens/tokens.scss`
- **Tokens JSON**: `https://unpkg.com/movingwalls-ds@1.0.0/dist/tokens/tokens.json`

## 📖 Documentation

- **Live Demo**: https://mwdesignsystem.netlify.app
- **NPM Package**: https://www.npmjs.com/package/movingwalls-ds
- **GitHub Repository**: https://github.com/VivekanandDesign/MWDesign

## 🤝 Support

For issues, feature requests, or questions:
- GitHub Issues: https://github.com/VivekanandDesign/MWDesign/issues
- Email: your-email@example.com

---

**MovingWalls Design System v1.0.0** - Built with ❤️ for React developers

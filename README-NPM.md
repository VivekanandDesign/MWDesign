# 🎨 MW Design System

A comprehensive React component library and design system built with TypeScript, providing modern UI components, design tokens, and a complete icon system.

## 📦 Installation

```bash
npm install @mw-design/system
# or
yarn add @mw-design/system
# or
pnpm add @mw-design/system
```

## 🚀 Quick Start

```tsx
import { Button, Card, DynamicIcon } from '@mw-design/system'
import '@mw-design/system/dist/styles/globals.css'

function App() {
  return (
    <Card>
      <Button variant="primary">
        <DynamicIcon name="heart" size={16} />
        Get Started
      </Button>
    </Card>
  )
}
```

## 📖 Documentation

Visit our [live documentation](https://mwdesignsystem.netlify.app) for complete guides, examples, and API references.

## 🧩 Features

### ✨ **50+ React Components**
- **Buttons**: Primary, secondary, ghost, destructive variants
- **Forms**: Input, textarea, select, checkbox, switch, radio
- **Data Display**: Tables, cards, badges, avatars, tooltips
- **Navigation**: Tabs, breadcrumbs, pagination, steppers
- **Feedback**: Alerts, toasts, modals, progress indicators
- **Layout**: Containers, grids, panels, sidebars

### 🎯 **Icon System**
- **1000+ Lucide Icons**: Complete icon library with dynamic loading
- **DynamicIcon Component**: Smart icon loading with fallbacks
- **Multiple Formats**: SVG, React components, and sprite sheets

### 🎨 **Design Tokens**
- **CSS Custom Properties**: Dark/light theme support
- **SCSS Variables**: For Sass-based projects  
- **JavaScript Objects**: For dynamic styling
- **JSON Format**: For design tools integration

### 🔧 **Developer Experience**
- **TypeScript**: Full type safety and IntelliSense
- **Tree Shaking**: Import only what you need
- **SSR Ready**: Next.js, Remix, and other frameworks
- **Customizable**: CSS variables and component props

## 📱 Component Categories

### Core Components
```tsx
import { 
  Button, Card, Input, Modal, Badge, 
  Alert, Avatar, Checkbox, Switch 
} from '@mw-design/system'
```

### Advanced Components  
```tsx
import { 
  DataGrid, Calendar, FileUpload, 
  RichTextEditor, Carousel, TreeView 
} from '@mw-design/system'
```

### Layout & Navigation
```tsx
import { 
  Navigation, Sidebar, Tabs, Breadcrumb,
  Pagination, Stepper 
} from '@mw-design/system'
```

## 🎨 Design Tokens Usage

### CSS Custom Properties
```css
/* Automatically available when importing styles */
.my-component {
  background: var(--color-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}
```

### JavaScript/TypeScript
```tsx
import { tokens } from '@mw-design/system'

const styles = {
  background: tokens.colors.primary[500],
  padding: tokens.spacing[4]
}
```

### SCSS Variables
```scss
@import '@mw-design/system/dist/tokens/tokens.scss';

.button {
  background: $primary-500;
  padding: $spacing-4;
}
```

## 🎭 Theming

### Automatic Dark Mode
```tsx
// Dark mode activated via system preference or class
<html className="dark">
  <body>
    <App />
  </body>
</html>
```

### Custom Theme Variables
```css
:root {
  --color-primary: #your-brand-color;
  --color-secondary: #your-secondary-color;
}
```

## 📁 Bundle Formats

The package provides multiple formats for different use cases:

- **ESM**: `@mw-design/system` (recommended)
- **CommonJS**: `@mw-design/system/dist/index.js`
- **UMD**: `@mw-design/system/dist/index.umd.js`

## 🔗 CDN Usage

```html
<!-- Include via CDN -->
<link rel="stylesheet" href="https://unpkg.com/@mw-design/system/dist/styles/globals.css">
<script src="https://unpkg.com/@mw-design/system/dist/index.umd.js"></script>

<script>
  const { Button, Card } = MWDesignSystem;
</script>
```

## 🛠️ Build Integration

### Next.js
```tsx
// pages/_app.tsx
import '@mw-design/system/dist/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

### Vite/React
```tsx
// main.tsx
import '@mw-design/system/dist/styles/globals.css'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(<App />)
```

## 🔧 Advanced Usage

### Tree Shaking
```tsx
// Import only what you need
import { Button } from '@mw-design/system/dist/components/ui/Button'
import { Card } from '@mw-design/system/dist/components/ui/Card'
```

### Custom Icon Loading
```tsx
import { DynamicIcon } from '@mw-design/system'

// Icons are loaded dynamically based on name
<DynamicIcon name="shopping-cart" size={24} />
<DynamicIcon name="user-plus" size={16} />
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/your-repo/contributing) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [📚 Documentation](https://mwdesignsystem.netlify.app)
- [🎨 Design System](https://mwdesignsystem.netlify.app/design-process)
- [🧩 Components](https://mwdesignsystem.netlify.app/components)
- [🎯 Icons](https://mwdesignsystem.netlify.app/icons)
- [🎨 Tokens](https://mwdesignsystem.netlify.app/tokens)

---

Built with ❤️ for modern React applications

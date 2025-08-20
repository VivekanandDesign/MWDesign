# Moving Walls Global Design System

A comprehensive design system website built with Next.js, TypeScript, and Tailwind CSS. This project showcases the Moving Walls design system featuring a sophisticated blue color palette, Poppins typography, and a complete component library.

## 🌟 Features

- **Design Tokens**: Complete color palette, typography scale, spacing system, and elevation tokens
- **Component Library**: Atomic design components (Atoms, Molecules, Organisms, Templates)
- **Interactive Documentation**: Live component examples with code snippets
- **Accessibility First**: WCAG 2.1 AA compliant components with keyboard navigation
- **Dark Mode Support**: Seamless light/dark theme switching
- **Responsive Design**: Mobile-first approach with 4pt grid system
- **Performance Optimized**: Built with Next.js 15 and Turbopack

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone and navigate to the project:
```bash
cd mw-design-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── components/         # Components showcase page
│   │   ├── tokens/             # Design tokens page
│   │   ├── getting-started/    # Getting started guide
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   └── globals.css         # Global styles
│   └── components/             # React components
│       ├── ui/                 # Base UI components
│       │   ├── Button.tsx      # Button component
│       │   ├── Input.tsx       # Input component
│       │   └── Card.tsx        # Card component
│       ├── Navigation.tsx      # Main navigation
│       ├── Hero.tsx            # Hero section
│       ├── FeatureGrid.tsx     # Feature grid
│       ├── Footer.tsx          # Footer component
│       └── ThemeToggle.tsx     # Theme switcher
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── next.config.ts              # Next.js configuration
└── package.json               # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue-focused palette (MW Blue 50-950)
- **Neutral**: Gray scale (MW Gray 50-950)
- **Utility**: Success, Warning, Error, Info colors

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Scale**: From caption (12px) to display (60px)
- **Responsive**: Fluid typography scaling

### Spacing
- **Grid**: 4pt base grid system
- **Tokens**: 1 (4px) to 32 (128px)
- **Consistent**: Predictable spacing patterns

### Components
- **Atomic Design**: Atoms → Molecules → Organisms → Templates
- **Accessible**: WCAG 2.1 AA compliant
- **Interactive**: Hover, focus, active, disabled states
- **Responsive**: Mobile-first approach

## 📄 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Documentation**: MDX
- **Development**: Turbopack, ESLint

## 📖 Documentation Pages

- **Home**: Overview and introduction
- **Getting Started**: Implementation guides and quick start
- **Design Tokens**: Color palette, typography, spacing, shadows
- **Components**: Interactive component library with code examples
- **Icons**: Icon library (planned)
- **Patterns**: Layout patterns and templates (planned)
- **Resources**: Downloads and developer tools (planned)

## 🎯 Design Principles

1. **Consistency**: Unified visual language across all products
2. **Accessibility**: Inclusive design for all users
3. **Scalability**: Components that work at any scale
4. **Performance**: Optimized for speed and efficiency
5. **Innovation**: Modern design rooted in Moving Walls values

## 🚀 Deployment

The application is optimized for deployment on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any hosting platform supporting Node.js**

### Build for Production

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Follow the component patterns established in the codebase
2. Ensure accessibility compliance (WCAG 2.1 AA)
3. Test components across different screen sizes
4. Document new components with examples
5. Maintain consistency with the design tokens

## 📝 License

© 2025 Moving Walls. All rights reserved.

---

Built with ❤️ by the Moving Walls team using Next.js, TypeScript, and Tailwind CSS.

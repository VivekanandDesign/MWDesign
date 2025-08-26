# Moving Walls Design System → Figma Conversion Guide

## 🎯 Recommended Approach: Hybrid Method

### Phase 1: Design Tokens Setup (30 mins)
1. **Install Figma Tokens Plugin**
   - Open Figma → Plugins → Browse → Search "Figma Tokens"
   - Install the plugin

2. **Import Design Tokens**
   - Copy content from `design-tokens.json`
   - In Figma Tokens plugin: Import JSON
   - Apply tokens to create color/typography styles

### Phase 2: Component Recreation (2-3 hours)
1. **Screenshot Reference Method**
   ```bash
   # Take screenshots of all components
   npm run storybook  # if you have storybook
   # Or manually screenshot from localhost:3000/components
   ```

2. **Figma Component Creation**
   - Create new Figma file: "MW Design System"
   - Import reference screenshots
   - Recreate each component using:
     - Auto Layout for responsive behavior
     - Component variants for different states
     - Design tokens for consistent styling

### Phase 3: Component Mapping

#### Button Component Recreation:
- **Base Component**: Rectangle with auto-layout
- **Variants**: 
  - Property: Type (Primary, Secondary, Outline)
  - Property: Size (SM, MD, LG)
  - Property: State (Default, Hover, Disabled)
- **Styling**: Use imported color tokens

#### Card Component Recreation:
- **Base**: Rectangle with border-radius
- **Content**: Auto-layout container
- **Shadow**: Drop shadow effect
- **Variants**: Default, Elevated, Outlined

#### Form Components:
- **Input**: Rectangle + text + border states
- **Variants**: Default, Error, Success, Disabled

## 🔧 Tools You Can Use:

### 1. Figma Tokens Plugin ⭐
- **Purpose**: Sync design tokens
- **Import**: Your `design-tokens.json`
- **Sync**: Colors, typography, spacing

### 2. Figma to Code (Reverse workflow)
- **html.to.design plugin**: Converts HTML to Figma
- **Limitations**: Works better for simple layouts

### 3. Design Documentation Tools
- **Zeroheight**: Creates living style guide
- **Supernova**: Converts code to design specs
- **Specify**: Design token synchronization

## 📋 Step-by-Step Process:

### 1. Prepare Your Components (Already Done ✅)
- All components are in `/components/ui/`
- Design tokens in `tailwind.config.ts`
- Live examples at `localhost:3000/components`

### 2. Create Figma File Structure
```
📁 MW Design System
├── 🎨 Foundation
│   ├── Colors
│   ├── Typography  
│   ├── Spacing
│   └── Shadows
├── 🧩 Components
│   ├── Buttons
│   ├── Forms
│   ├── Cards
│   ├── Navigation
│   └── Data Display
└── 📱 Templates
    ├── Pages
    └── Layouts
```

### 3. Component Recreation Priority
1. **Foundation** (Colors, Typography) - 30 mins
2. **Basic Components** (Button, Input, Card) - 1 hour  
3. **Complex Components** (Navigation, Tables) - 1-2 hours
4. **Page Templates** - 1 hour

## 🎯 Expected Results:
- ✅ **Design Tokens**: Fully synced with code
- ✅ **Component Library**: 1:1 visual match
- ✅ **Variants**: All states and sizes covered
- ✅ **Documentation**: Design specs for developers
- ✅ **Handoff**: Smooth design-to-code workflow

## 💡 Pro Tips:
1. **Use Figma Variables** (new feature) for dynamic tokens
2. **Create Component Sets** for organized variants
3. **Document interactions** that code provides
4. **Use Figma Dev Mode** for better handoff
5. **Keep both systems in sync** with regular updates

## 🔄 Ongoing Sync Strategy:
- **Weekly sync**: Update Figma when code changes
- **Version control**: Tag Figma versions with code releases  
- **Documentation**: Maintain component change log
- **Team alignment**: Regular design-dev reviews

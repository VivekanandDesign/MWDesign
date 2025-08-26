# 🎨 Figma Setup Guide - Moving Walls Design System

## 📋 **Quick Start Checklist** (30 minutes)

### **Step 1: Figma Account & Team Setup** (5 minutes)
- [ ] Open [Figma](https://figma.com) and create/login to account
- [ ] Create new team: **"Moving Walls Design System"**
- [ ] Create new file: **"MW Design System - v1.0"**

### **Step 2: Install Required Plugins** (10 minutes)
Essential plugins for design system work:

1. **Figma Tokens** (Design token sync)
   - Search: "Figma Tokens" in plugins
   - Install by Jan Six

2. **Auto Layout** (Already built-in)
   - Essential for responsive components

3. **Component Sets** (Built-in)
   - For component variants

4. **Figma Variables** (Built-in - NEW)
   - Modern token management

### **Step 3: Import Design Tokens** (10 minutes)

#### Option A: Figma Tokens Plugin
1. Open **Figma Tokens** plugin
2. Click **"Import"** 
3. Upload: `/figma-export/figma-tokens.json`
4. Click **"Apply to Document"**
5. ✅ All colors, spacing, typography imported!

#### Option B: Manual Setup (if plugin doesn't work)
1. Create **Color Styles**:
   ```
   Primary/Blue/50 → #eff6ff
   Primary/Blue/100 → #dbeafe
   Primary/Blue/600 → #2563eb (main brand)
   Neutral/Gray/50 → #f9fafb
   Neutral/Gray/900 → #111827
   ```

2. Create **Text Styles**:
   ```
   Heading/H1 → Inter 36px Bold
   Heading/H2 → Inter 30px Bold
   Body/Large → Inter 18px Regular
   Body/Base → Inter 16px Regular
   Body/Small → Inter 14px Regular
   Caption → Inter 12px Medium
   ```

### **Step 4: File Structure Setup** (5 minutes)
Create pages in your Figma file:

```
📄 01 - Foundation
  ├── 🎨 Colors
  ├── 📝 Typography
  ├── 📏 Spacing & Layout
  └── 🔍 Icons

📄 02 - Components
  ├── 🔘 Buttons
  ├── 📝 Forms
  ├── 🃏 Cards
  ├── 🏷️ Badges & Tags
  ├── 🧭 Navigation
  └── 📊 Data Display

📄 03 - Templates
  ├── 📱 Mobile Layouts
  ├── 💻 Desktop Layouts
  └── 📋 Page Examples

📄 04 - Documentation
  ├── 📖 Usage Guidelines
  └── 🔗 Code References
```

## 🛠️ **Phase 1 Implementation** (This Week)

### **Day 1: Foundation Setup** ✅
*Today's tasks (30 minutes):*

1. **Complete Figma setup** (steps above)
2. **Import design tokens** 
3. **Create file structure**
4. **Take component screenshots**

### **Day 2: Color System** (30 minutes)
1. Create color palette page
2. Document color usage rules
3. Create semantic color styles (Primary, Secondary, Success, Warning, Error)

### **Day 3: Typography System** (30 minutes) 
1. Set up font styles (Inter font family)
2. Create heading hierarchy (H1-H6)
3. Define body text styles
4. Create utility text styles (captions, labels)

### **Day 4: Spacing & Layout** (30 minutes)
1. Document spacing scale (4px, 8px, 12px, 16px, etc.)
2. Create layout grids
3. Define component sizing rules

### **Day 5: Icon System** (30 minutes)
1. Set up icon component template
2. Document icon sizes (16px, 20px, 24px, 32px)
3. Create icon library structure

## 📸 **Component Screenshots** (Today)

### **Quick Manual Method** (15 minutes):
1. Open `http://localhost:3000/components`
2. Take screenshots of each section:
   - **Buttons**: All variants and states
   - **Forms**: Input types and states  
   - **Cards**: Different card layouts
   - **Navigation**: Menu components
   - **Tables**: Data display examples

3. Save to: `/figma-export/screenshots/`

### **Automated Method** (Install Puppeteer):
```bash
cd /Users/vivekanandchoudhari/Desktop/MWDV1
npm install puppeteer
node figma-export/screenshot-automation.js
```

## 🎯 **Success Criteria for Phase 1**

By end of this week, you should have:
- [ ] ✅ Figma file created with proper structure
- [ ] ✅ Design tokens imported (colors, typography, spacing)
- [ ] ✅ Component screenshots captured
- [ ] ✅ Foundation pages completed
- [ ] ✅ Ready to start component recreation

## 📱 **Component Priority for Week 2**

Start with these **5 essential components**:
1. **Button** (highest complexity - 16 variants)
2. **Input** (form foundation)
3. **Card** (layout foundation)
4. **Badge** (simple indicator)
5. **Avatar** (user representation)

## 💡 **Pro Tips**

### **Figma Best Practices:**
- Use **Component Sets** for variants (not individual components)
- Name components consistently: `Button/Primary/Large/Default`
- Use **Auto Layout** for responsive behavior
- Document interactions in component descriptions
- Create **shared libraries** for team access

### **Token Naming:**
- Follow atomic design: `color.primary.600`
- Use semantic names: `text.primary`, `surface.elevated`
- Keep it simple: avoid over-nesting

### **Component Variants:**
- **Properties**: Type, Size, State, Icon
- **Boolean variants**: Has Icon, Is Loading, Is Disabled
- **Text variants**: Label content

---

## 🚀 **Ready to Start?**

1. **Right now** (5 min): Create Figma account/file
2. **Next 10 min**: Install plugins & import tokens  
3. **Next 15 min**: Take component screenshots
4. **This week**: Complete foundation pages

**You'll have a solid foundation for component recreation next week!** 🎉

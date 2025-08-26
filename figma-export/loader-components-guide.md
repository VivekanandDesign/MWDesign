# 🔄 Loader Components - Figma Recreation Guide

## **Component Specifications**

### **1. Spinner Component**

#### **Figma Structure:**
```
Spinner [Component Set]
├── Size [Variant Property]
│   ├── Small (16px)
│   ├── Medium (24px) [Default]
│   ├── Large (32px)
│   └── Extra Large (48px)
└── Variant [Variant Property]
    ├── Default (Gray)
    ├── Primary (Blue)
    └── White
```

#### **Design Properties:**
- **Shape**: Circle with border
- **Border**: 2px solid
- **Animation**: 360° rotation, 1.5s duration, linear
- **Colors**:
  - Default: `#6B7280` (mw-gray-500)
  - Primary: `#2563EB` (mw-blue-600)
  - White: `#FFFFFF`

#### **CSS Properties:**
```css
border: 2px solid currentColor;
border-right-color: transparent;
border-radius: 50%;
animation: spin 1.5s linear infinite;
```

---

### **2. Loading Component**

#### **Figma Structure:**
```
Loading [Component Set]
├── Has Overlay [Boolean Property]
├── Size [Variant Property]
│   ├── Small
│   ├── Medium [Default]
│   ├── Large
│   └── Extra Large
└── Variant [Variant Property]
    ├── Default
    ├── Primary
    └── White
```

#### **Layout:**
- **Direction**: Vertical (column)
- **Spacing**: 8px between spinner and text
- **Alignment**: Center aligned
- **Overlay**: Semi-transparent background with backdrop blur

---

### **3. Skeleton Component**

#### **Figma Structure:**
```
Skeleton [Component Set]
├── Variant [Variant Property]
│   ├── Text
│   ├── Circular
│   └── Rectangular
├── Animation [Variant Property]
│   ├── Pulse [Default]
│   ├── Wave
│   └── None
└── Lines [Variant Property] (Text only)
    ├── Single [Default]
    ├── Double
    ├── Triple
    └── Multiple
```

#### **Design Properties:**
- **Base Color**: `#E5E7EB` (mw-gray-200) in light mode
- **Dark Color**: `#374151` (mw-gray-700) in dark mode
- **Border Radius**:
  - Text: 4px
  - Circular: 50%
  - Rectangular: 6px
- **Animation**: Pulse opacity 50%-100%

---

### **4. Progress Component**

#### **Figma Structure:**
```
Progress [Component Set]
├── Size [Variant Property]
│   ├── Small (4px height)
│   ├── Medium (8px height) [Default]
│   └── Large (12px height)
├── Variant [Variant Property]
│   ├── Default (Blue)
│   ├── Success (Green)
│   ├── Warning (Yellow)
│   └── Error (Red)
└── Has Label [Boolean Property]
```

#### **Design Properties:**
- **Track Color**: `#E5E7EB` (mw-gray-200)
- **Fill Colors**:
  - Default: `#2563EB` (mw-blue-600)
  - Success: `#059669` (emerald-600)
  - Warning: `#D97706` (amber-600)
  - Error: `#DC2626` (red-600)
- **Border Radius**: Full (9999px)

---

## **🎨 Figma Recreation Priority**

### **Week 2 Priority** (Essential Loaders):
1. **Spinner** - Most used loading indicator
2. **Progress** - User feedback for operations
3. **Skeleton** - Content loading placeholders

### **Week 3 Priority** (Advanced):
4. **Loading** - Complex overlay states
5. **Button Loading States** - Enhanced interactive feedback

---

## **📋 Implementation Notes**

### **Spinner Recreation:**
1. Create circle with stroke, no fill
2. Use Figma's rotation animation
3. Set up component variants for sizes/colors
4. Add invisible text for accessibility

### **Skeleton Recreation:**
1. Create base rectangle shapes
2. Use Figma's opacity animation
3. Create component sets for different layouts
4. Include text line variations

### **Progress Recreation:**
1. Create track (background bar)
2. Create fill (foreground bar) that scales
3. Use auto-layout for labels
4. Set up color variants

### **Best Practices:**
- Use **component instances** for consistent spacing
- Create **auto-layout** versions for text combinations
- Document **animation timing** (1.5s for spinners, 2s for skeletons)
- Include **dark mode variants** for all components

---

## **🔗 Code Integration**

### **Current Implementation:**
✅ **Spinner**: Complete with all variants  
✅ **Loading**: Full overlay support  
✅ **Skeleton**: Multi-line and shape support  
✅ **Progress**: Label and variant support  

### **Missing Features:**
❌ **Button Loading State**: No built-in spinner  
❌ **Table Loading**: No skeleton for data tables  
❌ **Image Loading**: No placeholder states  

### **Recommended Additions:**
- Enhanced Button with loading prop
- Table skeleton component
- Image placeholder component
- Global loading overlay

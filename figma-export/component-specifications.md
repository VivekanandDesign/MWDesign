# Component Specifications for Figma Recreation

## 🔘 **Button Component Specification**

### **Component Overview**
- **Type**: Interactive element
- **Base Element**: `<button>`
- **Total Variants**: 6 types × 3 sizes × 4 states = 72 variants

### **Figma Component Structure**
```
Button [Component Set]
├── Type [Variant Property]
│   ├── Primary
│   ├── Secondary  
│   ├── Flow
│   ├── Ghost
│   ├── Outline
│   └── Destructive
├── Size [Variant Property]
│   ├── Small (SM)
│   ├── Medium (MD) [Default]
│   └── Large (LG)
└── State [Variant Property]
    ├── Default
    ├── Hover
    ├── Active/Pressed
    └── Disabled
```

### **Design Specifications**

#### **Base Properties**
- **Border Radius**: 6px (md)
- **Font Family**: Inter
- **Font Weight**: 500 (Medium)
- **Transition**: All 300ms ease
- **Focus Ring**: 2px offset, 2px width

#### **Size Variants**
| Size | Padding | Font Size | Min Height |
|------|---------|-----------|------------|
| SM   | 12px 16px | 14px | 32px |
| MD   | 16px 20px | 14px | 40px |  
| LG   | 24px 32px | 16px | 48px |

#### **Type Variants - Colors**

**Primary**
- Background: `#2563EB` (mw-blue-600)
- Text: `#FFFFFF`
- Hover: `#1D4ED8` (mw-blue-700)
- Shadow: `0 10px 15px -3px rgba(37, 99, 235, 0.1)`

**Secondary** 
- Background: `#F3F4F6` (mw-gray-100)
- Text: `#374151` (mw-gray-700)
- Hover: `#E5E7EB` (mw-gray-200)
- Border: None

**Ghost**
- Background: `Transparent`
- Text: `#6B7280` (mw-gray-500)
- Hover: `#EFF6FF` (mw-blue-50)
- Hover Text: `#1D4ED8` (mw-blue-700)

**Outline**
- Background: `Transparent`
- Text: `#2563EB` (mw-blue-600)
- Border: `2px solid #93C5FD` (mw-blue-300)
- Hover Border: `#2563EB` (mw-blue-600)
- Hover Background: `#EFF6FF` (mw-blue-50)

**Flow**
- Background: `#059669` (emerald-600)
- Text: `#FFFFFF`
- Hover: `#047857` (emerald-700)

**Destructive**
- Background: `#DC2626` (red-600)
- Text: `#FFFFFF`
- Hover: `#B91C1C` (red-700)

#### **State Modifications**
- **Hover**: Slight elevation (`translateY(-2px)`)
- **Active**: Slightly darker background
- **Disabled**: 50% opacity, no hover effects
- **Focus**: Ring color matches button type

---

## 📝 **Input Component Specification**

### **Component Overview**
- **Type**: Form control
- **Base Element**: `<input>`
- **Variants**: 4 types × 3 sizes × 5 states = 60 variants

### **Design Specifications**

#### **Base Properties**
- **Border Radius**: 6px (md)
- **Border Width**: 1px
- **Font Family**: Inter
- **Transition**: All 200ms ease

#### **Size Variants**
| Size | Padding | Font Size | Height |
|------|---------|-----------|--------|
| SM   | 8px 12px | 14px | 32px |
| MD   | 10px 12px | 16px | 40px |
| LG   | 12px 16px | 16px | 48px |

#### **Type & State Colors**

**Default State**
- Background: `#FFFFFF`
- Border: `#D1D5DB` (mw-gray-300)
- Text: `#111827` (mw-gray-900)
- Placeholder: `#9CA3AF` (mw-gray-400)

**Focus State**
- Border: `#2563EB` (mw-blue-600)
- Ring: `2px #93C5FD` (mw-blue-300)
- Shadow: `0 0 0 3px rgba(37, 99, 235, 0.1)`

**Error State**
- Border: `#DC2626` (red-600)
- Background: `#FEF2F2` (red-50)
- Ring: `2px #FCA5A5` (red-300)

**Success State**
- Border: `#059669` (emerald-600)
- Background: `#ECFDF5` (emerald-50)
- Ring: `2px #6EE7B7` (emerald-300)

**Disabled State**
- Background: `#F9FAFB` (mw-gray-50)
- Border: `#E5E7EB` (mw-gray-200)
- Text: `#9CA3AF` (mw-gray-400)

---

## 🃏 **Card Component Specification**

### **Component Overview**
- **Type**: Container
- **Base Element**: `<div>`
- **Variants**: 3 elevations × 2 sizes = 6 variants

#### **Base Properties**
- **Border Radius**: 8px (lg)
- **Background**: `#FFFFFF`
- **Border**: `1px solid #E5E7EB` (mw-gray-200)

#### **Elevation Variants**

**Default**
- Shadow: `0 1px 3px 0 rgba(0, 0, 0, 0.1)`

**Elevated**
- Shadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`

**High**
- Shadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`

#### **Size Variants**
| Size | Padding |
|------|---------|
| MD   | 24px |
| LG   | 32px |

---

## 🏷️ **Badge Component Specification**

### **Component Overview**
- **Type**: Indicator
- **Base Element**: `<span>`
- **Variants**: 6 colors × 2 sizes = 12 variants

#### **Base Properties**
- **Border Radius**: 9999px (full)
- **Font Weight**: 500 (Medium)
- **Text Transform**: None

#### **Size Variants**
| Size | Padding | Font Size |
|------|---------|-----------|
| SM   | 4px 8px | 12px |
| MD   | 6px 12px | 14px |

#### **Color Variants**
- **Primary**: Blue background with white text
- **Secondary**: Gray background with dark text  
- **Success**: Green background with white text
- **Warning**: Yellow background with dark text
- **Error**: Red background with white text
- **Info**: Light blue background with dark text

---

## 👤 **Avatar Component Specification**

### **Component Overview**
- **Type**: User representation
- **Variants**: 4 sizes × 3 states = 12 variants

#### **Size Variants**
| Size | Dimensions |
|------|------------|
| SM   | 32px × 32px |
| MD   | 40px × 40px |
| LG   | 48px × 48px |
| XL   | 64px × 64px |

#### **State Variants**
- **Image**: User photo
- **Initials**: Text fallback
- **Icon**: Default user icon

#### **Properties**
- **Border Radius**: 9999px (full circle)
- **Background**: `#F3F4F6` (mw-gray-100) for fallbacks
- **Font Weight**: 600 (SemiBold) for initials

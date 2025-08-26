// Component Documentation for Figma Recreation
// Use this as a reference when recreating components in Figma

export const componentSpecs = {
  Button: {
    variants: ['primary', 'secondary', 'outline', 'ghost'],
    sizes: ['sm', 'md', 'lg'],
    states: ['default', 'hover', 'active', 'disabled'],
    properties: {
      borderRadius: '0.375rem', // 6px
      padding: {
        sm: '0.5rem 0.75rem', // 8px 12px
        md: '0.625rem 1rem',   // 10px 16px  
        lg: '0.75rem 1.5rem'   // 12px 24px
      },
      fontSize: {
        sm: '0.875rem',  // 14px
        md: '1rem',      // 16px
        lg: '1.125rem'   // 18px
      }
    }
  },
  
  Card: {
    variants: ['default', 'elevated', 'outlined'],
    properties: {
      borderRadius: '0.5rem', // 8px
      padding: '1.5rem',      // 24px
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }
  },

  Input: {
    variants: ['default', 'error', 'success'],
    sizes: ['sm', 'md', 'lg'],
    properties: {
      borderRadius: '0.375rem', // 6px
      border: '1px solid #d1d5db',
      padding: {
        sm: '0.5rem 0.75rem',
        md: '0.625rem 0.75rem', 
        lg: '0.75rem 1rem'
      }
    }
  },

  Badge: {
    variants: ['primary', 'secondary', 'success', 'warning', 'error'],
    sizes: ['sm', 'md'],
    properties: {
      borderRadius: '9999px', // full
      padding: {
        sm: '0.25rem 0.5rem',  // 4px 8px
        md: '0.375rem 0.75rem' // 6px 12px
      },
      fontSize: {
        sm: '0.75rem',   // 12px
        md: '0.875rem'   // 14px  
      }
    }
  }
}

// Color mappings for Figma
export const figmaColors = {
  'mw-blue-600': '#2563EB',
  'mw-blue-50': '#EFF6FF', 
  'mw-gray-900': '#111827',
  'mw-gray-100': '#F3F4F6',
  'mw-gray-200': '#E5E7EB',
  'mw-gray-300': '#D1D5DB'
}

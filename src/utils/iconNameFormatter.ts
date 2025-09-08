/**
 * Utility functions for formatting icon names for display
 */

/**
 * Formats an icon name for user-friendly display
 * Converts camelCase, kebab-case, and snake_case to Title Case
 * 
 * Examples:
 * - "AlarmClock" -> "Alarm Clock"
 * - "arrow-up-right" -> "Arrow Up Right"
 * - "home_icon" -> "Home Icon"
 * - "user" -> "User"
 */
export function formatIconName(iconName: string): string {
  if (!iconName) return '';

  // Handle camelCase: split on capital letters
  let formatted = iconName.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  // Handle kebab-case and snake_case: replace dashes and underscores with spaces
  formatted = formatted.replace(/[-_]/g, ' ');
  
  // Convert to title case
  formatted = formatted
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  return formatted;
}

/**
 * Formats an icon name for technical contexts (keeping original format)
 * Used in code snippets, file names, etc.
 */
export function formatTechnicalIconName(iconName: string): string {
  return iconName;
}

/**
 * Generates a short description for an icon based on its name
 */
export function getIconDescription(iconName: string): string {
  const formatted = formatIconName(iconName);
  
  // Common icon type mappings
  const typeMap: Record<string, string> = {
    'arrow': 'Navigation arrow',
    'chevron': 'Directional indicator',
    'user': 'User interface',
    'home': 'Home page',
    'search': 'Search functionality',
    'menu': 'Menu navigation',
    'close': 'Close action',
    'check': 'Confirmation',
    'plus': 'Add action',
    'minus': 'Remove action',
    'edit': 'Edit action',
    'delete': 'Delete action',
    'save': 'Save action',
    'settings': 'Settings',
    'help': 'Help information',
    'info': 'Information',
    'warning': 'Warning alert',
    'error': 'Error alert',
    'success': 'Success state'
  };

  // Find matching type
  const lowerName = iconName.toLowerCase();
  for (const [key, description] of Object.entries(typeMap)) {
    if (lowerName.includes(key)) {
      return description;
    }
  }

  return `${formatted} icon`;
}

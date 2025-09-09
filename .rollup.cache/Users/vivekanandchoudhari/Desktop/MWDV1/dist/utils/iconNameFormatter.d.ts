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
export declare function formatIconName(iconName: string): string;
/**
 * Formats an icon name for technical contexts (keeping original format)
 * Used in code snippets, file names, etc.
 */
export declare function formatTechnicalIconName(iconName: string): string;
/**
 * Generates a short description for an icon based on its name
 */
export declare function getIconDescription(iconName: string): string;

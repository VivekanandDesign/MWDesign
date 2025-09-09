// Type definitions for MW Design System
import { ComponentProps, ReactNode } from 'react';
import { LucideProps } from 'lucide-react';

// Base component props
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

// Button component types
export interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Card component types
export interface CardProps extends BaseProps {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
}

// Input component types
export interface InputProps extends BaseProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  onChange?: (value: string) => void;
}

// Icon component types
export interface IconProps extends LucideProps {
  name?: string;
}

// Modal component types
export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

// Badge component types
export interface BadgeProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

// Design Token types
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface DesignTokens {
  colors: {
    primary: ColorScale;
    gray: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
  };
  spacing: Record<string, string>;
  typography: {
    fontFamily: {
      sans: string[];
      mono: string[];
    };
    fontSize: Record<string, [string, { lineHeight: string }]>;
    fontWeight: Record<string, string>;
  };
  shadows: Record<string, string>;
  breakpoints: Record<string, string>;
  borderRadius: Record<string, string>;
  zIndex: Record<string, string>;
}

// Theme types
export interface ThemeContextValue {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resolvedTheme: 'light' | 'dark';
}

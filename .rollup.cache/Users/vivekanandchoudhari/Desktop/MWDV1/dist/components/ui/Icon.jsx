'use client';
import { __rest } from "tslib";
import React from 'react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
};
const iconVariants = {
    default: 'text-mw-gray-600 dark:text-mw-gray-400',
    primary: 'text-mw-blue-600 dark:text-mw-blue-400',
    secondary: 'text-mw-gray-500 dark:text-mw-gray-500',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400'
};
export function Icon(_a) {
    var { icon: IconComponent, size = 'md', variant = 'default', className, onClick } = _a, props = __rest(_a, ["icon", "size", "variant", "className", "onClick"]);
    return (<IconComponent className={cn(iconSizes[size], iconVariants[variant], onClick && 'cursor-pointer hover:opacity-75 transition-opacity', className)} onClick={onClick} {...props}/>);
}
// Commonly used icons with pre-configured variants
export function ChevronDownIcon(props) {
    const { ChevronDown } = require('lucide-react');
    return <Icon icon={ChevronDown} {...props}/>;
}
export function ChevronUpIcon(props) {
    const { ChevronUp } = require('lucide-react');
    return <Icon icon={ChevronUp} {...props}/>;
}
export function ChevronLeftIcon(props) {
    const { ChevronLeft } = require('lucide-react');
    return <Icon icon={ChevronLeft} {...props}/>;
}
export function ChevronRightIcon(props) {
    const { ChevronRight } = require('lucide-react');
    return <Icon icon={ChevronRight} {...props}/>;
}
export function SearchIcon(props) {
    const { Search } = require('lucide-react');
    return <Icon icon={Search} {...props}/>;
}
export function CloseIcon(props) {
    const { X } = require('lucide-react');
    return <Icon icon={X} {...props}/>;
}
export function CheckIcon(props) {
    const { Check } = require('lucide-react');
    return <Icon icon={Check} {...props}/>;
}
export function PlusIcon(props) {
    const { Plus } = require('lucide-react');
    return <Icon icon={Plus} {...props}/>;
}
export function MinusIcon(props) {
    const { Minus } = require('lucide-react');
    return <Icon icon={Minus} {...props}/>;
}
export function InfoIcon(props) {
    const { Info } = require('lucide-react');
    return <Icon icon={Info} {...props}/>;
}
export function AlertTriangleIcon(props) {
    const { AlertTriangle } = require('lucide-react');
    return <Icon icon={AlertTriangle} {...props}/>;
}
export function AlertCircleIcon(props) {
    const { AlertCircle } = require('lucide-react');
    return <Icon icon={AlertCircle} {...props}/>;
}
//# sourceMappingURL=Icon.jsx.map
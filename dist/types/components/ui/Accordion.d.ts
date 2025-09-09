import React from 'react';
export interface AccordionProps {
    type?: 'single' | 'multiple';
    defaultValue?: string | string[];
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    children: React.ReactNode;
    className?: string;
}
export interface AccordionItemProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}
export interface AccordionTriggerProps {
    children: React.ReactNode;
    className?: string;
}
export interface AccordionContentProps {
    children: React.ReactNode;
    className?: string;
}
export declare function Accordion({ type, defaultValue, value, onValueChange, children, className }: AccordionProps): import("react/jsx-runtime").JSX.Element;
export declare function AccordionItem({ value, children, className }: AccordionItemProps): import("react/jsx-runtime").JSX.Element;
export declare function AccordionTrigger({ children, className }: AccordionTriggerProps): import("react/jsx-runtime").JSX.Element;
export declare function AccordionContent({ children, className }: AccordionContentProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Accordion.d.ts.map
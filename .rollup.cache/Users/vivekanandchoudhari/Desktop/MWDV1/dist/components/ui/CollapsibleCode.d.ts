interface CollapsibleCodeProps {
    code: string;
    language?: string;
    title?: string;
    defaultExpanded?: boolean;
    className?: string;
}
export declare function CollapsibleCode({ code, language, title, defaultExpanded, className }: CollapsibleCodeProps): import("react").JSX.Element;
export {};

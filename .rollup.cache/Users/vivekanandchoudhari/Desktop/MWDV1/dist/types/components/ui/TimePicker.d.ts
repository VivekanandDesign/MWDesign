interface TimePickerProps {
    value?: string;
    onChange?: (time: string) => void;
    format?: '12h' | '24h';
    showSeconds?: boolean;
    disabled?: boolean;
    label?: string;
    error?: string;
    helpText?: string;
    placeholder?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    step?: number;
}
export declare function TimePicker({ value, onChange, format, showSeconds, disabled, label, error, helpText, placeholder, className, size, step }: TimePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TimePicker.d.ts.map
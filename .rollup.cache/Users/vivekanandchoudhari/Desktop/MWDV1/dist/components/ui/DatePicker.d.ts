export interface DatePickerProps {
    value?: Date;
    onChange?: (date: Date) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    label?: string;
    error?: string;
    minDate?: Date;
    maxDate?: Date;
}
export declare function DatePicker({ value, onChange, placeholder, disabled, className, label, error, minDate, maxDate }: DatePickerProps): import("react").JSX.Element;

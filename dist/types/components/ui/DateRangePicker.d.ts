interface DateRange {
    from: Date | null;
    to: Date | null;
}
interface DateRangePickerProps {
    value?: DateRange;
    onChange?: (range: DateRange) => void;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    clearable?: boolean;
    minDate?: Date;
    maxDate?: Date;
    selectsRange?: boolean;
    numberOfMonths?: 1 | 2;
    className?: string;
    format?: string;
    presets?: Array<{
        label: string;
        range: DateRange;
    }>;
}
export declare function DateRangePicker({ value, onChange, placeholder, disabled, required, clearable, minDate, maxDate, numberOfMonths, className, format, presets }: DateRangePickerProps): import("react/jsx-runtime").JSX.Element;
export default DateRangePicker;
//# sourceMappingURL=DateRangePicker.d.ts.map
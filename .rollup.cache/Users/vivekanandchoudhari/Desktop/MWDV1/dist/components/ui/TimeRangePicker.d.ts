import React from 'react';
interface TimeRange {
    from: string | null;
    to: string | null;
}
interface TimeRangePickerProps {
    value?: TimeRange;
    onChange?: (range: TimeRange) => void;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    clearable?: boolean;
    format?: '12' | '24';
    minuteStep?: number;
    minTime?: string;
    maxTime?: string;
    className?: string;
    presets?: Array<{
        label: string;
        range: TimeRange;
    }>;
}
export declare function TimeRangePicker({ value, onChange, placeholder, disabled, required, clearable, format, minuteStep, minTime, maxTime, className, presets }: TimeRangePickerProps): React.JSX.Element;
export default TimeRangePicker;

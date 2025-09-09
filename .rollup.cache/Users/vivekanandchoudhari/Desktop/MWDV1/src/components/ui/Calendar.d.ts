interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    color?: string;
    allDay?: boolean;
    startTime?: string;
    endTime?: string;
    description?: string;
    category?: string;
    attendees?: string[];
    location?: string;
}
interface CalendarProps {
    value?: Date;
    onChange?: (date: Date) => void;
    events?: CalendarEvent[];
    onEventClick?: (event: CalendarEvent) => void;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    showWeekNumbers?: boolean;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
    locale?: string;
    view?: 'month' | 'week' | 'day';
    onViewChange?: (view: 'month' | 'week' | 'day') => void;
    showToday?: boolean;
    showNavigation?: boolean;
    showViewModeButtons?: boolean;
    timeSlots?: string[];
    hourFormat?: 12 | 24;
}
export declare function Calendar({ value, onChange, events, onEventClick, minDate, maxDate, disabled, showWeekNumbers, weekStartsOn, className, locale, view, onViewChange, showToday, showNavigation, showViewModeButtons, timeSlots, hourFormat }: CalendarProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Calendar.d.ts.map
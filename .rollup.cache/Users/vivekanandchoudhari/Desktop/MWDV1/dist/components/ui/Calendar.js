'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Users } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
// Generate time slots for day/week view
function generateTimeSlots() {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            slots.push(timeString);
        }
    }
    return slots;
}
function CalendarDate({ date, currentMonth, selected = false, today = false, disabled = false, hasEvents = false, events = [], onClick, onEventClick }) {
    const isCurrentMonth = date.getMonth() === currentMonth;
    const dateNumber = date.getDate();
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick(date);
        }
    };
    const handleEventClick = (e, event) => {
        e.stopPropagation();
        onEventClick === null || onEventClick === void 0 ? void 0 : onEventClick(event);
    };
    return (_jsxs("div", { className: cn('relative min-h-[2.5rem] p-1 border border-mw-gray-200 dark:border-mw-gray-700 cursor-pointer transition-colors', !isCurrentMonth && 'bg-mw-gray-50 dark:bg-mw-gray-800/50 text-mw-gray-400', isCurrentMonth && 'hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800', selected && 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300', today && !selected && 'bg-mw-blue-50 dark:bg-mw-blue-900/10 text-mw-blue-600 dark:text-mw-blue-400', disabled && 'opacity-50 cursor-not-allowed'), onClick: handleClick, children: [_jsx("div", { className: cn('flex items-center justify-center w-6 h-6 text-sm font-medium rounded-full', today && 'bg-mw-blue-600 text-white'), children: dateNumber }), hasEvents && events.length > 0 && (_jsxs("div", { className: "mt-1 space-y-1", children: [events.slice(0, 3).map((event) => (_jsx("div", { className: cn('px-1 py-0.5 text-xs rounded truncate cursor-pointer', event.color === 'red' && 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300', event.color === 'blue' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300', event.color === 'green' && 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300', event.color === 'yellow' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300', !event.color && 'bg-mw-gray-100 text-mw-gray-700 dark:bg-mw-gray-700 dark:text-mw-gray-300'), onClick: (e) => handleEventClick(e, event), title: event.title, children: event.title }, event.id))), events.length > 3 && (_jsxs("div", { className: "text-xs text-mw-gray-500 dark:text-mw-gray-400", children: ["+", events.length - 3, " more"] }))] }))] }));
}
export function Calendar({ value, onChange, events = [], onEventClick, minDate, maxDate, disabled = false, showWeekNumbers = false, weekStartsOn = 0, className, locale = 'en-US', view = 'month', onViewChange, showToday = true, showNavigation = true, showViewModeButtons = true, timeSlots, hourFormat = 24 }) {
    const [currentDate, setCurrentDate] = useState(value || new Date());
    const [currentView, setCurrentView] = useState(view);
    const today = new Date();
    // Use default time slots if not provided
    const defaultTimeSlots = timeSlots || generateTimeSlots();
    const { year, month } = useMemo(() => ({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth()
    }), [currentDate]);
    // Handle view change
    const handleViewChange = (newView) => {
        setCurrentView(newView);
        onViewChange === null || onViewChange === void 0 ? void 0 : onViewChange(newView);
    };
    // Format time based on hour format
    const formatTime = (time) => {
        if (hourFormat === 12) {
            const [hours, minutes] = time.split(':').map(Number);
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        }
        return time;
    };
    // Get week dates for week view
    const getWeekDates = (date) => {
        const startOfWeek = new Date(date);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
        startOfWeek.setDate(diff);
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const weekDate = new Date(startOfWeek);
            weekDate.setDate(startOfWeek.getDate() + i);
            weekDates.push(weekDate);
        }
        return weekDates;
    };
    // Get events for a specific date
    const getEventsForDate = (date) => {
        return events.filter(event => event.date.toDateString() === date.toDateString());
    };
    // Get events for a specific time slot
    const getEventsForTimeSlot = (date, timeSlot) => {
        const dateEvents = getEventsForDate(date);
        return dateEvents.filter(event => {
            if (event.allDay)
                return false;
            if (!event.startTime)
                return false;
            const eventStart = event.startTime;
            const eventEnd = event.endTime || eventStart;
            return timeSlot >= eventStart && timeSlot < eventEnd;
        });
    };
    // Generate calendar days for month view
    const calendarDays = useMemo(() => {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const firstDayOfWeek = (firstDayOfMonth.getDay() - weekStartsOn + 7) % 7;
        const daysInMonth = lastDayOfMonth.getDate();
        const days = [];
        // Previous month days
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            days.push(new Date(year, month, -i));
        }
        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }
        // Next month days
        const remainingDays = 42 - days.length; // 6 weeks * 7 days
        for (let day = 1; day <= remainingDays; day++) {
            days.push(new Date(year, month + 1, day));
        }
        return days;
    }, [year, month, weekStartsOn]);
    // Group events by date
    const eventsByDate = useMemo(() => {
        const grouped = {};
        events.forEach(event => {
            const dateKey = event.date.toDateString();
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(event);
        });
        return grouped;
    }, [events]);
    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate);
        if (direction === 'prev') {
            newDate.setMonth(month - 1);
        }
        else {
            newDate.setMonth(month + 1);
        }
        setCurrentDate(newDate);
    };
    const navigateWeek = (direction) => {
        const newDate = new Date(currentDate);
        if (direction === 'prev') {
            newDate.setDate(currentDate.getDate() - 7);
        }
        else {
            newDate.setDate(currentDate.getDate() + 7);
        }
        setCurrentDate(newDate);
    };
    const navigateDay = (direction) => {
        const newDate = new Date(currentDate);
        if (direction === 'prev') {
            newDate.setDate(currentDate.getDate() - 1);
        }
        else {
            newDate.setDate(currentDate.getDate() + 1);
        }
        setCurrentDate(newDate);
    };
    const navigateToToday = () => {
        setCurrentDate(new Date());
    };
    const handleDateClick = (date) => {
        if (disabled)
            return;
        if (minDate && date < minDate)
            return;
        if (maxDate && date > maxDate)
            return;
        setCurrentDate(date);
        onChange === null || onChange === void 0 ? void 0 : onChange(date);
    };
    const isDateDisabled = (date) => {
        if (disabled)
            return true;
        if (minDate && date < minDate)
            return true;
        if (maxDate && date > maxDate)
            return true;
        return false;
    };
    const isToday = (date) => {
        return date.toDateString() === today.toDateString();
    };
    const isSelected = (date) => {
        return value ? date.toDateString() === value.toDateString() : false;
    };
    // Adjust day labels based on week start
    const dayLabels = useMemo(() => {
        const labels = [...DAYS_OF_WEEK];
        for (let i = 0; i < weekStartsOn; i++) {
            labels.push(labels.shift());
        }
        return labels;
    }, [weekStartsOn]);
    // Get navigation functions based on current view
    const getNavigationFunctions = () => {
        switch (currentView) {
            case 'week':
                return { navigate: navigateWeek, getTitle: () => {
                        const weekDates = getWeekDates(currentDate);
                        const startDate = weekDates[0];
                        const endDate = weekDates[6];
                        return `${startDate.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}`;
                    } };
            case 'day':
                return { navigate: navigateDay, getTitle: () => currentDate.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) };
            default:
                return { navigate: navigateMonth, getTitle: () => `${MONTHS[month]} ${year}` };
        }
    };
    const { navigate, getTitle } = getNavigationFunctions();
    return (_jsxs("div", { className: cn('bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg p-4', className), children: [showNavigation && (_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("h2", { className: "text-lg font-semibold text-mw-gray-900 dark:text-white", children: getTitle() }), showToday && (_jsx("button", { onClick: navigateToToday, className: "px-2 py-1 text-xs font-medium text-mw-blue-600 dark:text-mw-blue-400 hover:text-mw-blue-700 dark:hover:text-mw-blue-300 border border-mw-blue-200 dark:border-mw-blue-700 rounded", children: "Today" }))] }), _jsxs("div", { className: "flex items-center space-x-4", children: [showViewModeButtons && (_jsx("div", { className: "flex rounded-lg border border-mw-gray-200 dark:border-mw-gray-700", children: ['month', 'week', 'day'].map((viewMode) => (_jsx("button", { onClick: () => handleViewChange(viewMode), className: cn('px-3 py-1 text-sm capitalize transition-colors', currentView === viewMode
                                        ? 'bg-mw-blue-600 text-white'
                                        : 'text-mw-gray-600 dark:text-mw-gray-400 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800', viewMode === 'month' ? 'rounded-l-md' : viewMode === 'day' ? 'rounded-r-md' : ''), children: viewMode }, viewMode))) })), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => navigate('prev'), className: "p-1 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 text-mw-gray-600 dark:text-mw-gray-400", children: _jsx(ChevronLeft, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => navigate('next'), className: "p-1 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 text-mw-gray-600 dark:text-mw-gray-400", children: _jsx(ChevronRight, { className: "w-4 h-4" }) })] })] })] })), currentView === 'month' && (_jsxs("div", { className: "grid grid-cols-7 gap-0", children: [showWeekNumbers && (_jsx("div", { className: "text-xs font-medium text-mw-gray-500 dark:text-mw-gray-400 p-2", children: "Wk" })), dayLabels.map((day) => (_jsx("div", { className: "text-xs font-medium text-mw-gray-500 dark:text-mw-gray-400 p-2 text-center", children: day }, day))), calendarDays.map((date, index) => {
                        const dateKey = date.toDateString();
                        const dateEvents = eventsByDate[dateKey] || [];
                        // Week number for first day of each week
                        const showWeekNumber = showWeekNumbers && index % 7 === 0;
                        const weekNumber = getWeekNumber(date);
                        return (_jsxs(React.Fragment, { children: [showWeekNumber && (_jsx("div", { className: "text-xs text-mw-gray-500 dark:text-mw-gray-400 p-2 border border-mw-gray-200 dark:border-mw-gray-700 bg-mw-gray-50 dark:bg-mw-gray-800 flex items-center justify-center", children: weekNumber })), _jsx(CalendarDate, { date: date, currentMonth: month, selected: isSelected(date), today: isToday(date), disabled: isDateDisabled(date), hasEvents: dateEvents.length > 0, events: dateEvents, onClick: handleDateClick, onEventClick: onEventClick })] }, date.toISOString()));
                    })] })), currentView === 'week' && (_jsx(WeekView, { currentDate: currentDate, timeSlots: defaultTimeSlots, events: events, onDateClick: handleDateClick, onEventClick: onEventClick, isToday: isToday, isSelected: isSelected, formatTime: formatTime, getEventsForTimeSlot: getEventsForTimeSlot, getWeekDates: getWeekDates })), currentView === 'day' && (_jsx(DayView, { currentDate: currentDate, timeSlots: defaultTimeSlots, events: events, onEventClick: onEventClick, formatTime: formatTime, getEventsForTimeSlot: getEventsForTimeSlot }))] }));
}
// Utility function to get week number
function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}
function WeekView({ currentDate, timeSlots, events, onDateClick, onEventClick, isToday, isSelected, formatTime, getEventsForTimeSlot, getWeekDates }) {
    const weekDates = getWeekDates(currentDate);
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (_jsx("div", { className: "overflow-x-auto", children: _jsxs("div", { className: "min-w-[800px]", children: [_jsxs("div", { className: "grid grid-cols-8 gap-0 border-b border-mw-gray-200 dark:border-mw-gray-700", children: [_jsx("div", { className: "p-2 text-xs font-medium text-mw-gray-500 dark:text-mw-gray-400", children: "Time" }), weekDates.map((date, index) => (_jsxs("div", { className: cn('p-2 text-center cursor-pointer hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800', isToday(date) && 'bg-mw-blue-50 dark:bg-mw-blue-900/20', isSelected(date) && 'bg-mw-blue-100 dark:bg-mw-blue-900/30'), onClick: () => onDateClick(date), children: [_jsx("div", { className: "text-xs font-medium text-mw-gray-500 dark:text-mw-gray-400", children: dayLabels[index] }), _jsx("div", { className: cn('text-sm font-semibold mt-1', isToday(date) ? 'text-mw-blue-600 dark:text-mw-blue-400' : 'text-mw-gray-900 dark:text-white'), children: date.getDate() })] }, date.toISOString())))] }), _jsx("div", { className: "grid grid-cols-8 gap-0", children: timeSlots.filter((_, index) => index % 2 === 0).map((timeSlot) => (_jsxs(React.Fragment, { children: [_jsx("div", { className: "p-2 text-xs text-mw-gray-500 dark:text-mw-gray-400 border-r border-mw-gray-200 dark:border-mw-gray-700", children: formatTime(timeSlot) }), weekDates.map((date) => {
                                const slotEvents = getEventsForTimeSlot(date, timeSlot);
                                return (_jsx("div", { className: "min-h-[60px] border-r border-b border-mw-gray-200 dark:border-mw-gray-700 p-1", children: slotEvents.map((event) => (_jsx("div", { className: cn('p-1 mb-1 text-xs rounded cursor-pointer truncate', event.color === 'blue' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300', event.color === 'green' && 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300', event.color === 'red' && 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300', event.color === 'yellow' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300', !event.color && 'bg-mw-gray-100 text-mw-gray-700 dark:bg-mw-gray-700 dark:text-mw-gray-300'), onClick: () => onEventClick === null || onEventClick === void 0 ? void 0 : onEventClick(event), title: event.title, children: event.title }, event.id))) }, `${date.toISOString()}-${timeSlot}`));
                            })] }, timeSlot))) })] }) }));
}
function DayView({ currentDate, timeSlots, events, onEventClick, formatTime, getEventsForTimeSlot }) {
    const dayEvents = events.filter(event => event.date.toDateString() === currentDate.toDateString());
    const allDayEvents = dayEvents.filter(event => event.allDay);
    return (_jsxs("div", { className: "space-y-4", children: [allDayEvents.length > 0 && (_jsxs("div", { className: "p-4 bg-mw-gray-50 dark:bg-mw-gray-800 rounded-lg", children: [_jsx("h3", { className: "text-sm font-medium text-mw-gray-900 dark:text-white mb-2", children: "All Day Events" }), _jsx("div", { className: "space-y-2", children: allDayEvents.map((event) => (_jsxs("div", { className: cn('p-2 rounded cursor-pointer flex items-center space-x-2', event.color === 'blue' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300', event.color === 'green' && 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300', event.color === 'red' && 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300', event.color === 'yellow' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300', !event.color && 'bg-mw-gray-100 text-mw-gray-700 dark:bg-mw-gray-700 dark:text-mw-gray-300'), onClick: () => onEventClick === null || onEventClick === void 0 ? void 0 : onEventClick(event), children: [_jsx("div", { className: "font-medium", children: event.title }), event.location && (_jsxs("div", { className: "flex items-center space-x-1 text-xs opacity-75", children: [_jsx(MapPin, { className: "w-3 h-3" }), _jsx("span", { children: event.location })] }))] }, event.id))) })] })), _jsxs("div", { className: "grid grid-cols-12 gap-0", children: [_jsx("div", { className: "col-span-2 space-y-0", children: timeSlots.filter((_, index) => index % 2 === 0).map((timeSlot) => (_jsx("div", { className: "h-16 p-2 text-xs text-mw-gray-500 dark:text-mw-gray-400 border-b border-mw-gray-200 dark:border-mw-gray-700", children: formatTime(timeSlot) }, timeSlot))) }), _jsx("div", { className: "col-span-10 space-y-0", children: timeSlots.filter((_, index) => index % 2 === 0).map((timeSlot) => {
                            const slotEvents = getEventsForTimeSlot(currentDate, timeSlot);
                            return (_jsx("div", { className: "h-16 border-b border-mw-gray-200 dark:border-mw-gray-700 p-1 relative", children: slotEvents.map((event) => (_jsxs("div", { className: cn('absolute inset-1 p-2 rounded cursor-pointer flex flex-col justify-center', event.color === 'blue' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300', event.color === 'green' && 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300', event.color === 'red' && 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300', event.color === 'yellow' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300', !event.color && 'bg-mw-gray-100 text-mw-gray-700 dark:bg-mw-gray-700 dark:text-mw-gray-300'), onClick: () => onEventClick === null || onEventClick === void 0 ? void 0 : onEventClick(event), children: [_jsx("div", { className: "font-medium text-sm truncate", children: event.title }), _jsxs("div", { className: "flex items-center space-x-4 text-xs opacity-75", children: [event.startTime && event.endTime && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsxs("span", { children: [formatTime(event.startTime), " - ", formatTime(event.endTime)] })] })), event.location && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(MapPin, { className: "w-3 h-3" }), _jsx("span", { children: event.location })] })), event.attendees && event.attendees.length > 0 && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Users, { className: "w-3 h-3" }), _jsx("span", { children: event.attendees.length })] }))] })] }, event.id))) }, timeSlot));
                        }) })] })] }));
}
//# sourceMappingURL=Calendar.js.map
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const timeInputSizes = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg'
};
function TimeInput({ value, onChange, min, max, step = 1, disabled, className }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value.toString().padStart(2, '0'));
    const inputRef = useRef(null);
    useEffect(() => {
        if (!isEditing) {
            setInputValue(value.toString().padStart(2, '0'));
        }
    }, [value, isEditing]);
    const handleIncrement = () => {
        const newValue = Math.min(max, value + step);
        onChange(newValue);
    };
    const handleDecrement = () => {
        const newValue = Math.max(min, value - step);
        onChange(newValue);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputBlur = () => {
        setIsEditing(false);
        const numValue = parseInt(inputValue, 10);
        if (!isNaN(numValue) && numValue >= min && numValue <= max) {
            onChange(numValue);
        }
        else {
            setInputValue(value.toString().padStart(2, '0'));
        }
    };
    const handleInputFocus = () => {
        var _a;
        setIsEditing(true);
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.select();
    };
    const handleKeyDown = (e) => {
        var _a;
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            handleIncrement();
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            handleDecrement();
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        }
    };
    return (_jsxs("div", { className: cn('relative', className), children: [_jsx("input", { ref: inputRef, type: "text", value: inputValue, onChange: handleInputChange, onBlur: handleInputBlur, onFocus: handleInputFocus, onKeyDown: handleKeyDown, disabled: disabled, className: "w-12 text-center bg-transparent border-none outline-none text-mw-gray-900 dark:text-white disabled:opacity-50", maxLength: 2 }), _jsxs("div", { className: "absolute right-0 top-0 h-full flex flex-col", children: [_jsx("button", { type: "button", onClick: handleIncrement, disabled: disabled, className: "flex-1 px-1 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200 disabled:opacity-50", children: _jsx(ChevronUp, { className: "w-3 h-3" }) }), _jsx("button", { type: "button", onClick: handleDecrement, disabled: disabled, className: "flex-1 px-1 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200 disabled:opacity-50", children: _jsx(ChevronDown, { className: "w-3 h-3" }) })] })] }));
}
function parseTimeString(timeString) {
    const parts = timeString.split(':');
    return {
        hours: parseInt(parts[0] || '0', 10),
        minutes: parseInt(parts[1] || '0', 10),
        seconds: parseInt(parts[2] || '0', 10)
    };
}
function formatTime(hours, minutes, seconds, format, showSeconds) {
    if (format === '12h') {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const timeString = showSeconds
            ? `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`
            : `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        return timeString;
    }
    else {
        return showSeconds
            ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
}
export function TimePicker({ value = '', onChange, format = '24h', showSeconds = false, disabled = false, label, error, helpText, placeholder = 'Select time', className, size = 'md', step = 1 }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [ampm, setAmpm] = useState('AM');
    const dropdownRef = useRef(null);
    // Parse initial value
    useEffect(() => {
        if (value) {
            const parsed = parseTimeString(value);
            setHours(parsed.hours);
            setMinutes(parsed.minutes);
            setSeconds(parsed.seconds);
            setAmpm(parsed.hours >= 12 ? 'PM' : 'AM');
        }
    }, [value]);
    // Handle clicks outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleTimeChange = (newHours, newMinutes, newSeconds) => {
        const finalHours = format === '12h'
            ? (ampm === 'PM' && newHours !== 12 ? newHours + 12 : (ampm === 'AM' && newHours === 12 ? 0 : newHours))
            : newHours;
        const timeString = showSeconds
            ? `${finalHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`
            : `${finalHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
        onChange === null || onChange === void 0 ? void 0 : onChange(timeString);
    };
    const handleHoursChange = (newHours) => {
        setHours(newHours);
        handleTimeChange(newHours, minutes, seconds);
    };
    const handleMinutesChange = (newMinutes) => {
        setMinutes(newMinutes);
        handleTimeChange(hours, newMinutes, seconds);
    };
    const handleSecondsChange = (newSeconds) => {
        setSeconds(newSeconds);
        handleTimeChange(hours, minutes, newSeconds);
    };
    const handleAmpmChange = (newAmpm) => {
        setAmpm(newAmpm);
        handleTimeChange(hours, minutes, seconds);
    };
    const displayValue = value
        ? formatTime(hours, minutes, seconds, format, showSeconds)
        : '';
    const displayHours = format === '12h' ? (hours % 12 || 12) : hours;
    return (_jsxs("div", { className: className, children: [label && (_jsx("label", { className: "block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-1", children: label })), _jsxs("div", { className: "relative", ref: dropdownRef, children: [_jsxs("button", { type: "button", onClick: () => !disabled && setIsOpen(!isOpen), disabled: disabled, className: cn('relative w-full pl-3 pr-10 text-left border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed', timeInputSizes[size], error
                            ? 'border-red-300 dark:border-red-600'
                            : 'border-mw-gray-300 dark:border-mw-gray-600', 'bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white'), children: [_jsx("span", { className: cn(!displayValue && 'text-mw-gray-500 dark:text-mw-gray-400'), children: displayValue || placeholder }), _jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none", children: _jsx(Clock, { className: "w-4 h-4 text-mw-gray-400" }) })] }), isOpen && (_jsx("div", { className: "absolute z-50 w-full mt-1 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-md shadow-lg", children: _jsx("div", { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsx(TimeInput, { value: displayHours, onChange: handleHoursChange, min: format === '12h' ? 1 : 0, max: format === '12h' ? 12 : 23, disabled: disabled }), _jsx("span", { className: "text-mw-gray-500", children: ":" }), _jsx(TimeInput, { value: minutes, onChange: handleMinutesChange, min: 0, max: 59, step: step, disabled: disabled }), showSeconds && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-mw-gray-500", children: ":" }), _jsx(TimeInput, { value: seconds, onChange: handleSecondsChange, min: 0, max: 59, disabled: disabled })] })), format === '12h' && (_jsxs("div", { className: "ml-2 flex flex-col space-y-1", children: [_jsx("button", { type: "button", onClick: () => handleAmpmChange('AM'), disabled: disabled, className: cn('px-2 py-1 text-xs rounded', ampm === 'AM'
                                                    ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                                                    : 'text-mw-gray-600 dark:text-mw-gray-300 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700'), children: "AM" }), _jsx("button", { type: "button", onClick: () => handleAmpmChange('PM'), disabled: disabled, className: cn('px-2 py-1 text-xs rounded', ampm === 'PM'
                                                    ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                                                    : 'text-mw-gray-600 dark:text-mw-gray-300 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700'), children: "PM" })] }))] }) }) }))] }), helpText && !error && (_jsx("p", { className: "mt-1 text-xs text-mw-gray-500 dark:text-mw-gray-400", children: helpText })), error && (_jsxs("p", { className: "mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1", children: [_jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }), error] }))] }));
}
//# sourceMappingURL=TimePicker.js.map
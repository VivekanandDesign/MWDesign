'use client';
import { __rest } from "tslib";
import { useState } from 'react';
import { clsx } from 'clsx';
export function Slider(_a) {
    var { className, label, min = 0, max = 100, step = 1, value, defaultValue = min, onChange, showValue = false, formatValue = (val) => val.toString(), disabled } = _a, props = __rest(_a, ["className", "label", "min", "max", "step", "value", "defaultValue", "onChange", "showValue", "formatValue", "disabled"]);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = value !== undefined ? value : internalValue;
    const handleChange = (e) => {
        const newValue = Number(e.target.value);
        if (value === undefined) {
            setInternalValue(newValue);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    };
    const percentage = ((currentValue - min) / (max - min)) * 100;
    return (<div className="space-y-2">
      {(label || showValue) && (<div className="flex justify-between items-center">
          {label && (<label className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
              {label}
            </label>)}
          {showValue && (<span className="text-sm text-mw-gray-500 dark:text-mw-gray-400">
              {formatValue(currentValue)}
            </span>)}
        </div>)}
      <div className="relative">
        <input type="range" min={min} max={max} step={step} value={currentValue} onChange={handleChange} disabled={disabled} className={clsx('w-full h-2 bg-mw-gray-200 dark:bg-mw-gray-700 rounded-lg appearance-none cursor-pointer', 'focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:ring-offset-2', 'disabled:opacity-50 disabled:cursor-not-allowed', '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5', '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-mw-blue-600', '[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md', '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white', '[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full', '[&::-moz-range-thumb]:bg-mw-blue-600 [&::-moz-range-thumb]:cursor-pointer', '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white', '[&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-none', className)} style={{
            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
        }} {...props}/>
      </div>
    </div>);
}
//# sourceMappingURL=Slider.jsx.map
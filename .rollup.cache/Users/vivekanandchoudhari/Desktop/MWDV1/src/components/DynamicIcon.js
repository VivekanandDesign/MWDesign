import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import * as LucideIcons from 'lucide-react';
// Dynamic icon component that can render any Lucide icon by name
export const DynamicIcon = (_a) => {
    var { name, size = 24, className = '' } = _a, props = __rest(_a, ["name", "size", "className"]);
    // Get the icon component from Lucide
    const IconComponent = LucideIcons[name];
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in Lucide icons`);
        return (_jsx("div", { className: `inline-flex items-center justify-center bg-gray-200 text-gray-500 text-xs ${className}`, style: { width: size, height: size }, children: "?" }));
    }
    return (_jsx(IconComponent, Object.assign({ size: size, className: className }, props)));
};
//# sourceMappingURL=DynamicIcon.js.map
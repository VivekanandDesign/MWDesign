import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
export function Card(_a) {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsx("div", Object.assign({ className: clsx('rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 bg-white dark:bg-mw-gray-800 shadow-mw-sm', className) }, props, { children: children })));
}
export function CardHeader(_a) {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsx("div", Object.assign({ className: clsx('p-6 pb-0', className) }, props, { children: children })));
}
export function CardContent(_a) {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsx("div", Object.assign({ className: clsx('p-6', className) }, props, { children: children })));
}
export function CardFooter(_a) {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsx("div", Object.assign({ className: clsx('p-6 pt-0', className) }, props, { children: children })));
}
//# sourceMappingURL=Card.js.map
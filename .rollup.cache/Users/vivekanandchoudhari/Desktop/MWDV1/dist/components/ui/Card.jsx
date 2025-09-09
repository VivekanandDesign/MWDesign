import { __rest } from "tslib";
import { clsx } from 'clsx';
export function Card(_a) {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (<div className={clsx('rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 bg-white dark:bg-mw-gray-800 shadow-mw-sm', className)} {...props}>
      {children}
    </div>);
}
export function CardHeader(_a) {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (<div className={clsx('p-6 pb-0', className)} {...props}>
      {children}
    </div>);
}
export function CardContent(_a) {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (<div className={clsx('p-6', className)} {...props}>
      {children}
    </div>);
}
export function CardFooter(_a) {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (<div className={clsx('p-6 pt-0', className)} {...props}>
      {children}
    </div>);
}
//# sourceMappingURL=Card.jsx.map
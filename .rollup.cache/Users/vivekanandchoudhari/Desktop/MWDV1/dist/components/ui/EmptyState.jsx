'use client';
import { __rest } from "tslib";
import { clsx } from 'clsx';
import { FileX, Search, Package, Users, Database } from 'lucide-react';
import { Button } from './Button';
const emptyStateIcons = {
    noData: <Database className="w-12 h-12 text-mw-gray-400"/>,
    noResults: <Search className="w-12 h-12 text-mw-gray-400"/>,
    noFiles: <FileX className="w-12 h-12 text-mw-gray-400"/>,
    noUsers: <Users className="w-12 h-12 text-mw-gray-400"/>,
    empty: <Package className="w-12 h-12 text-mw-gray-400"/>
};
const emptySizes = {
    sm: {
        container: 'py-8',
        icon: 'w-8 h-8',
        title: 'text-sm font-medium',
        description: 'text-xs',
        spacing: 'space-y-2'
    },
    md: {
        container: 'py-12',
        icon: 'w-12 h-12',
        title: 'text-lg font-semibold',
        description: 'text-sm',
        spacing: 'space-y-4'
    },
    lg: {
        container: 'py-16',
        icon: 'w-16 h-16',
        title: 'text-xl font-semibold',
        description: 'text-base',
        spacing: 'space-y-6'
    }
};
export function EmptyState(_a) {
    var { icon, title, description, action, size = 'md', className } = _a, props = __rest(_a, ["icon", "title", "description", "action", "size", "className"]);
    const sizeConfig = emptySizes[size];
    return (<div className={clsx('flex flex-col items-center justify-center text-center', sizeConfig.container, sizeConfig.spacing, className)} {...props}>
      {/* Icon */}
      <div className={clsx('flex items-center justify-center', sizeConfig.icon)}>
        {icon || emptyStateIcons.empty}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className={clsx(sizeConfig.title, 'text-mw-gray-900 dark:text-white')}>
          {title}
        </h3>
        {description && (<p className={clsx(sizeConfig.description, 'text-mw-gray-600 dark:text-mw-gray-400 max-w-sm')}>
            {description}
          </p>)}
      </div>

      {/* Action */}
      {action && (<Button onClick={action.onClick} variant={action.variant || 'primary'} size={size === 'sm' ? 'sm' : 'md'}>
          {action.label}
        </Button>)}
    </div>);
}
// Predefined empty state variants
export function NoDataEmptyState(props) {
    return <EmptyState icon={emptyStateIcons.noData} {...props}/>;
}
export function NoResultsEmptyState(props) {
    return <EmptyState icon={emptyStateIcons.noResults} {...props}/>;
}
export function NoFilesEmptyState(props) {
    return <EmptyState icon={emptyStateIcons.noFiles} {...props}/>;
}
export function NoUsersEmptyState(props) {
    return <EmptyState icon={emptyStateIcons.noUsers} {...props}/>;
}
//# sourceMappingURL=EmptyState.jsx.map
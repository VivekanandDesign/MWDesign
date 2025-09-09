import { clsx } from 'clsx';
export const Breadcrumb = ({ children, className, separator = (<svg className="w-4 h-4 text-mw-gray-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
    </svg>) }) => {
    return (<nav className={clsx('flex', className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {children}
      </ol>
    </nav>);
};
export const BreadcrumbItem = ({ children, href, isLast = false, className }) => {
    const content = href ? (<a href={href} className={clsx('text-sm font-medium text-mw-gray-500 hover:text-mw-gray-700', 'dark:text-mw-gray-400 dark:hover:text-mw-gray-200', 'transition-colors duration-200', className)}>
      {children}
    </a>) : (<span className={clsx('text-sm font-medium', isLast
            ? 'text-mw-gray-900 dark:text-mw-gray-100'
            : 'text-mw-gray-500 dark:text-mw-gray-400', className)} aria-current={isLast ? 'page' : undefined}>
      {children}
    </span>);
    return (<li className="inline-flex items-center">
      {content}
    </li>);
};
export const BreadcrumbSeparator = ({ className, children = (<svg className="w-4 h-4 text-mw-gray-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
    </svg>) }) => {
    return (<li className={clsx('inline-flex items-center', className)}>
      {children}
    </li>);
};
//# sourceMappingURL=Breadcrumb.jsx.map
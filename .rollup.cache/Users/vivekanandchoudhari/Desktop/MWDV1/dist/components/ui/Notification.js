'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Bell, BellRing, MessageSquare, AlertTriangle, CheckCircle, Info } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
export function Notification({ notification, onClose, onMarkAsRead, onActionClick, compact = false, className }) {
    const [isVisible, setIsVisible] = useState(true);
    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose === null || onClose === void 0 ? void 0 : onClose(notification.id);
        }, 200);
    };
    const handleMarkAsRead = () => {
        if (notification.status === 'unread') {
            onMarkAsRead === null || onMarkAsRead === void 0 ? void 0 : onMarkAsRead(notification.id);
        }
    };
    const handleActionClick = (action) => {
        onActionClick === null || onActionClick === void 0 ? void 0 : onActionClick(action, notification);
        action.onClick(notification);
    };
    const getIcon = () => {
        switch (notification.type) {
            case 'success':
                return _jsx(CheckCircle, { className: "w-5 h-5 text-green-500" });
            case 'warning':
                return _jsx(AlertTriangle, { className: "w-5 h-5 text-yellow-500" });
            case 'error':
                return _jsx(AlertTriangle, { className: "w-5 h-5 text-red-500" });
            case 'message':
                return _jsx(MessageSquare, { className: "w-5 h-5 text-blue-500" });
            case 'info':
            default:
                return _jsx(Info, { className: "w-5 h-5 text-blue-500" });
        }
    };
    const getTypeClasses = () => {
        switch (notification.type) {
            case 'success':
                return 'border-l-green-500';
            case 'warning':
                return 'border-l-yellow-500';
            case 'error':
                return 'border-l-red-500';
            case 'message':
                return 'border-l-blue-500';
            case 'info':
            default:
                return 'border-l-mw-gray-300 dark:border-l-mw-gray-600';
        }
    };
    const formatTimestamp = (date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        if (minutes < 1)
            return 'just now';
        if (minutes < 60)
            return `${minutes}m ago`;
        if (hours < 24)
            return `${hours}h ago`;
        if (days < 7)
            return `${days}d ago`;
        return date.toLocaleDateString();
    };
    if (!isVisible)
        return null;
    return (_jsx("div", { className: cn('relative bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 border-l-4 rounded-lg p-4 shadow-sm transition-all duration-200', notification.status === 'unread' && 'bg-mw-blue-50 dark:bg-mw-blue-950/20', getTypeClasses(), compact && 'p-3', className), onClick: handleMarkAsRead, children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "flex-shrink-0", children: notification.avatar ? (_jsx("img", { src: notification.avatar, alt: "", className: "w-8 h-8 rounded-full object-cover" })) : (_jsx("div", { className: "p-1", children: getIcon() })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: cn('text-sm font-medium text-mw-gray-900 dark:text-white', notification.status === 'unread' && 'font-semibold'), children: notification.title }), !compact && (_jsx("p", { className: "mt-1 text-sm text-mw-gray-600 dark:text-mw-gray-400", children: notification.message })), _jsxs("div", { className: "mt-1 flex items-center space-x-2", children: [_jsx("span", { className: "text-xs text-mw-gray-500 dark:text-mw-gray-500", children: formatTimestamp(notification.timestamp) }), notification.status === 'unread' && (_jsx("span", { className: "w-2 h-2 bg-mw-blue-500 rounded-full" }))] })] }), _jsx("button", { onClick: (e) => {
                                        e.stopPropagation();
                                        handleClose();
                                    }, className: "flex-shrink-0 p-1 rounded-full hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-300", children: _jsx(X, { className: "w-4 h-4" }) })] }), notification.actions && notification.actions.length > 0 && (_jsx("div", { className: "mt-3 flex space-x-2", children: notification.actions.map((action, index) => (_jsx("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    handleActionClick(action);
                                }, className: cn('px-3 py-1 text-xs font-medium rounded transition-colors', action.variant === 'primary'
                                    ? 'bg-mw-blue-600 text-white hover:bg-mw-blue-700'
                                    : 'bg-mw-gray-100 dark:bg-mw-gray-800 text-mw-gray-700 dark:text-mw-gray-300 hover:bg-mw-gray-200 dark:hover:bg-mw-gray-700'), children: action.label }, index))) }))] })] }) }));
}
export function NotificationList({ notifications, onClose, onMarkAsRead, onMarkAllAsRead, onClearAll, maxHeight = '400px', emptyMessage = 'No notifications', className }) {
    const unreadCount = notifications.filter(n => n.status === 'unread').length;
    if (notifications.length === 0) {
        return (_jsxs("div", { className: cn('flex flex-col items-center justify-center py-8 text-center', className), children: [_jsx(Bell, { className: "w-12 h-12 text-mw-gray-300 dark:text-mw-gray-600 mb-3" }), _jsx("p", { className: "text-sm text-mw-gray-500 dark:text-mw-gray-400", children: emptyMessage })] }));
    }
    return (_jsxs("div", { className: cn('bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg', className), children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-mw-gray-200 dark:border-mw-gray-700", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h3", { className: "text-sm font-medium text-mw-gray-900 dark:text-white", children: "Notifications" }), unreadCount > 0 && (_jsx("span", { className: "px-2 py-1 text-xs font-medium bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300 rounded-full", children: unreadCount }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [unreadCount > 0 && (_jsx("button", { onClick: onMarkAllAsRead, className: "text-xs text-mw-blue-600 dark:text-mw-blue-400 hover:text-mw-blue-700 dark:hover:text-mw-blue-300", children: "Mark all read" })), _jsx("button", { onClick: onClearAll, className: "text-xs text-mw-gray-500 dark:text-mw-gray-400 hover:text-mw-gray-700 dark:hover:text-mw-gray-300", children: "Clear all" })] })] }), _jsx("div", { className: "overflow-y-auto", style: { maxHeight }, children: _jsx("div", { className: "divide-y divide-mw-gray-200 dark:divide-mw-gray-700", children: notifications.map((notification) => (_jsx("div", { className: "p-4", children: _jsx(Notification, { notification: notification, onClose: onClose, onMarkAsRead: onMarkAsRead, compact: true }) }, notification.id))) }) })] }));
}
export function NotificationBadge({ count, showDot = false, max = 99, className, children }) {
    const displayCount = count > max ? `${max}+` : count.toString();
    const hasNotifications = count > 0;
    return (_jsxs("div", { className: cn('relative inline-block', className), children: [children, hasNotifications && (_jsx(_Fragment, { children: showDot ? (_jsx("span", { className: "absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-mw-gray-900" })) : (_jsx("span", { className: "absolute -top-2 -right-2 min-w-[1.25rem] h-5 px-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center border-2 border-white dark:border-mw-gray-900", children: displayCount })) }))] }));
}
export function NotificationBell({ notifications, onNotificationClick, onMarkAsRead, onMarkAllAsRead, onClearAll, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const unreadCount = notifications.filter(n => n.status === 'unread').length;
    return (_jsxs("div", { className: cn('relative', className), children: [_jsx("button", { onClick: () => setIsOpen(!isOpen), className: "relative p-2 rounded-lg hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 text-mw-gray-600 dark:text-mw-gray-400", children: _jsx(NotificationBadge, { count: unreadCount, children: unreadCount > 0 ? (_jsx(BellRing, { className: "w-5 h-5" })) : (_jsx(Bell, { className: "w-5 h-5" })) }) }), isOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-40", onClick: () => setIsOpen(false) }), _jsx("div", { className: "absolute right-0 top-full mt-2 w-80 z-50", children: _jsx(NotificationList, { notifications: notifications, onClose: (id) => {
                                onNotificationClick === null || onNotificationClick === void 0 ? void 0 : onNotificationClick(notifications.find(n => n.id === id));
                            }, onMarkAsRead: onMarkAsRead, onMarkAllAsRead: onMarkAllAsRead, onClearAll: onClearAll }) })] }))] }));
}
//# sourceMappingURL=Notification.js.map
'use client';
import React, { useState } from 'react';
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
                return <CheckCircle className="w-5 h-5 text-green-500"/>;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500"/>;
            case 'error':
                return <AlertTriangle className="w-5 h-5 text-red-500"/>;
            case 'message':
                return <MessageSquare className="w-5 h-5 text-blue-500"/>;
            case 'info':
            default:
                return <Info className="w-5 h-5 text-blue-500"/>;
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
    return (<div className={cn('relative bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 border-l-4 rounded-lg p-4 shadow-sm transition-all duration-200', notification.status === 'unread' && 'bg-mw-blue-50 dark:bg-mw-blue-950/20', getTypeClasses(), compact && 'p-3', className)} onClick={handleMarkAsRead}>
      <div className="flex items-start space-x-3">
        {/* Avatar or Icon */}
        <div className="flex-shrink-0">
          {notification.avatar ? (<img src={notification.avatar} alt="" className="w-8 h-8 rounded-full object-cover"/>) : (<div className="p-1">
              {getIcon()}
            </div>)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className={cn('text-sm font-medium text-mw-gray-900 dark:text-white', notification.status === 'unread' && 'font-semibold')}>
                {notification.title}
              </h4>
              
              {!compact && (<p className="mt-1 text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  {notification.message}
                </p>)}
              
              <div className="mt-1 flex items-center space-x-2">
                <span className="text-xs text-mw-gray-500 dark:text-mw-gray-500">
                  {formatTimestamp(notification.timestamp)}
                </span>
                {notification.status === 'unread' && (<span className="w-2 h-2 bg-mw-blue-500 rounded-full"></span>)}
              </div>
            </div>

            {/* Close button */}
            <button onClick={(e) => {
            e.stopPropagation();
            handleClose();
        }} className="flex-shrink-0 p-1 rounded-full hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-300">
              <X className="w-4 h-4"/>
            </button>
          </div>

          {/* Actions */}
          {notification.actions && notification.actions.length > 0 && (<div className="mt-3 flex space-x-2">
              {notification.actions.map((action, index) => (<button key={index} onClick={(e) => {
                    e.stopPropagation();
                    handleActionClick(action);
                }} className={cn('px-3 py-1 text-xs font-medium rounded transition-colors', action.variant === 'primary'
                    ? 'bg-mw-blue-600 text-white hover:bg-mw-blue-700'
                    : 'bg-mw-gray-100 dark:bg-mw-gray-800 text-mw-gray-700 dark:text-mw-gray-300 hover:bg-mw-gray-200 dark:hover:bg-mw-gray-700')}>
                  {action.label}
                </button>))}
            </div>)}
        </div>
      </div>
    </div>);
}
export function NotificationList({ notifications, onClose, onMarkAsRead, onMarkAllAsRead, onClearAll, maxHeight = '400px', emptyMessage = 'No notifications', className }) {
    const unreadCount = notifications.filter(n => n.status === 'unread').length;
    if (notifications.length === 0) {
        return (<div className={cn('flex flex-col items-center justify-center py-8 text-center', className)}>
        <Bell className="w-12 h-12 text-mw-gray-300 dark:text-mw-gray-600 mb-3"/>
        <p className="text-sm text-mw-gray-500 dark:text-mw-gray-400">
          {emptyMessage}
        </p>
      </div>);
    }
    return (<div className={cn('bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-mw-gray-200 dark:border-mw-gray-700">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium text-mw-gray-900 dark:text-white">
            Notifications
          </h3>
          {unreadCount > 0 && (<span className="px-2 py-1 text-xs font-medium bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300 rounded-full">
              {unreadCount}
            </span>)}
        </div>
        
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (<button onClick={onMarkAllAsRead} className="text-xs text-mw-blue-600 dark:text-mw-blue-400 hover:text-mw-blue-700 dark:hover:text-mw-blue-300">
              Mark all read
            </button>)}
          <button onClick={onClearAll} className="text-xs text-mw-gray-500 dark:text-mw-gray-400 hover:text-mw-gray-700 dark:hover:text-mw-gray-300">
            Clear all
          </button>
        </div>
      </div>

      {/* Notification list */}
      <div className="overflow-y-auto" style={{ maxHeight }}>
        <div className="divide-y divide-mw-gray-200 dark:divide-mw-gray-700">
          {notifications.map((notification) => (<div key={notification.id} className="p-4">
              <Notification notification={notification} onClose={onClose} onMarkAsRead={onMarkAsRead} compact/>
            </div>))}
        </div>
      </div>
    </div>);
}
export function NotificationBadge({ count, showDot = false, max = 99, className, children }) {
    const displayCount = count > max ? `${max}+` : count.toString();
    const hasNotifications = count > 0;
    return (<div className={cn('relative inline-block', className)}>
      {children}
      
      {hasNotifications && (<>
          {showDot ? (<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-mw-gray-900"></span>) : (<span className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 px-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center border-2 border-white dark:border-mw-gray-900">
              {displayCount}
            </span>)}
        </>)}
    </div>);
}
export function NotificationBell({ notifications, onNotificationClick, onMarkAsRead, onMarkAllAsRead, onClearAll, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const unreadCount = notifications.filter(n => n.status === 'unread').length;
    return (<div className={cn('relative', className)}>
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 rounded-lg hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 text-mw-gray-600 dark:text-mw-gray-400">
        <NotificationBadge count={unreadCount}>
          {unreadCount > 0 ? (<BellRing className="w-5 h-5"/>) : (<Bell className="w-5 h-5"/>)}
        </NotificationBadge>
      </button>

      {isOpen && (<>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}/>
          <div className="absolute right-0 top-full mt-2 w-80 z-50">
            <NotificationList notifications={notifications} onClose={(id) => {
                onNotificationClick === null || onNotificationClick === void 0 ? void 0 : onNotificationClick(notifications.find(n => n.id === id));
            }} onMarkAsRead={onMarkAsRead} onMarkAllAsRead={onMarkAllAsRead} onClearAll={onClearAll}/>
          </div>
        </>)}
    </div>);
}
//# sourceMappingURL=Notification.jsx.map
import React from 'react';
export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'message';
export type NotificationStatus = 'unread' | 'read';
export interface NotificationData {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: Date;
    status?: NotificationStatus;
    avatar?: string;
    actions?: NotificationAction[];
    metadata?: Record<string, any>;
}
export interface NotificationAction {
    label: string;
    onClick: (notification: NotificationData) => void;
    variant?: 'primary' | 'secondary';
}
interface NotificationProps {
    notification: NotificationData;
    onClose?: (id: string) => void;
    onMarkAsRead?: (id: string) => void;
    onActionClick?: (action: NotificationAction, notification: NotificationData) => void;
    compact?: boolean;
    className?: string;
}
interface NotificationListProps {
    notifications: NotificationData[];
    onClose?: (id: string) => void;
    onMarkAsRead?: (id: string) => void;
    onMarkAllAsRead?: () => void;
    onClearAll?: () => void;
    maxHeight?: string;
    emptyMessage?: string;
    className?: string;
}
interface NotificationBadgeProps {
    count: number;
    showDot?: boolean;
    max?: number;
    className?: string;
    children?: React.ReactNode;
}
export declare function Notification({ notification, onClose, onMarkAsRead, onActionClick, compact, className }: NotificationProps): React.JSX.Element | null;
export declare function NotificationList({ notifications, onClose, onMarkAsRead, onMarkAllAsRead, onClearAll, maxHeight, emptyMessage, className }: NotificationListProps): React.JSX.Element;
export declare function NotificationBadge({ count, showDot, max, className, children }: NotificationBadgeProps): React.JSX.Element;
interface NotificationBellProps {
    notifications: NotificationData[];
    onNotificationClick?: (notification: NotificationData) => void;
    onMarkAsRead?: (id: string) => void;
    onMarkAllAsRead?: () => void;
    onClearAll?: () => void;
    className?: string;
}
export declare function NotificationBell({ notifications, onNotificationClick, onMarkAsRead, onMarkAllAsRead, onClearAll, className }: NotificationBellProps): React.JSX.Element;
export {};

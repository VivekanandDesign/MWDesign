import React from 'react';
type ThumbnailType = 'image' | 'video' | 'document' | 'audio' | 'file';
interface ThumbnailProps {
    src: string;
    alt?: string;
    type?: ThumbnailType;
    title?: string;
    subtitle?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    aspectRatio?: 'square' | 'video' | 'wide' | 'tall' | 'auto';
    hover?: boolean;
    clickable?: boolean;
    selected?: boolean;
    badge?: React.ReactNode;
    overlay?: React.ReactNode;
    actions?: Array<{
        icon: React.ReactNode;
        label: string;
        onClick: () => void;
    }>;
    showPreview?: boolean;
    className?: string;
    onSelect?: () => void;
    onClick?: () => void;
    onPreview?: () => void;
    onDownload?: () => void;
    onLoad?: () => void;
    onError?: () => void;
    loading?: boolean;
    error?: boolean;
    placeholder?: React.ReactNode;
}
interface VideoThumbnailProps extends ThumbnailProps {
    duration?: string;
    autoPlay?: boolean;
    muted?: boolean;
}
interface ImageThumbnailProps extends ThumbnailProps {
    lazy?: boolean;
    fallback?: string;
}
export declare function Thumbnail({ src, alt, type, title, subtitle, size, aspectRatio, hover, clickable, selected, badge, overlay, actions, showPreview, className, onSelect, onClick, onPreview, onDownload, onLoad, onError, loading, error, placeholder }: ThumbnailProps): React.JSX.Element;
export declare function VideoThumbnail({ duration, autoPlay, muted, ...props }: VideoThumbnailProps): React.JSX.Element;
export declare function ImageThumbnail({ lazy, fallback, ...props }: ImageThumbnailProps): React.JSX.Element;
interface ThumbnailGalleryProps {
    items: Array<ThumbnailProps & {
        id: string;
    }>;
    columns?: number;
    gap?: 'sm' | 'md' | 'lg';
    selectable?: boolean;
    selectedIds?: string[];
    onSelectionChange?: (selectedIds: string[]) => void;
    className?: string;
}
export declare function ThumbnailGallery({ items, columns, gap, selectable, selectedIds, onSelectionChange, className }: ThumbnailGalleryProps): React.JSX.Element;
export default Thumbnail;

'use client';
import { __rest } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Play, Pause, DownloadIcon, Eye, X } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const thumbnailSizes = {
    xs: 'w-16 h-16',
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
};
const aspectRatios = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[3/2]',
    tall: 'aspect-[2/3]',
    auto: ''
};
const typeIcons = {
    image: 'IMG',
    video: 'VID',
    document: 'DOC',
    audio: 'AUD',
    file: 'FILE'
};
export function Thumbnail({ src, alt = '', type = 'image', title, subtitle, size = 'md', aspectRatio = 'auto', hover = true, clickable = false, selected = false, badge, overlay, actions, showPreview = false, className, onSelect, onClick, onPreview, onDownload, onLoad, onError, loading = false, error = false, placeholder }) {
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const handleClick = () => {
        if (clickable && onClick) {
            onClick();
        }
        else if (onSelect) {
            onSelect();
        }
    };
    const handleImageError = () => {
        setImageError(true);
        if (onError) {
            onError();
        }
    };
    const handleImageLoad = () => {
        if (onLoad) {
            onLoad();
        }
    };
    const renderContent = () => {
        if (loading) {
            return (_jsx("div", { className: "w-full h-full bg-mw-gray-200 dark:bg-mw-gray-700 animate-pulse flex items-center justify-center", children: _jsx("div", { className: "w-8 h-8 border-2 border-mw-blue-500 border-t-transparent rounded-full animate-spin" }) }));
        }
        if (error || imageError) {
            return (_jsx("div", { className: "w-full h-full bg-mw-gray-100 dark:bg-mw-gray-800 flex flex-col items-center justify-center text-mw-gray-400 dark:text-mw-gray-500", children: placeholder || (_jsxs(_Fragment, { children: [_jsx(X, { className: "w-8 h-8 mb-2" }), _jsx("span", { className: "text-xs", children: "Failed to load" })] })) }));
        }
        switch (type) {
            case 'image':
                return (_jsx("img", { src: src, alt: alt, onError: handleImageError, onLoad: handleImageLoad, className: "w-full h-full object-cover" }));
            case 'video':
                return (_jsxs("div", { className: "relative w-full h-full", children: [_jsx("video", { src: src, className: "w-full h-full object-cover", muted: true, preload: "metadata" }), _jsx("div", { className: "absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center", children: _jsx("div", { className: "w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center", children: _jsx(Play, { className: "w-6 h-6 text-black ml-1" }) }) })] }));
            default:
                return (_jsxs("div", { className: "w-full h-full bg-mw-gray-100 dark:bg-mw-gray-800 flex flex-col items-center justify-center", children: [_jsx("div", { className: "text-2xl mb-2", children: typeIcons[type] }), _jsx("div", { className: "text-xs text-mw-gray-500 dark:text-mw-gray-400 uppercase tracking-wide", children: type })] }));
        }
    };
    const renderOverlay = () => {
        if (!hover || (!isHovered && !selected))
            return null;
        return (_jsx("div", { className: "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: _jsxs("div", { className: "flex gap-2", children: [showPreview && onPreview && (_jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            onPreview();
                        }, className: "p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-colors", title: "Preview", children: _jsx(Eye, { className: "w-4 h-4 text-black" }) })), onDownload && (_jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            onDownload();
                        }, className: "p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-colors", title: "Download", children: _jsx(DownloadIcon, { className: "w-4 h-4 text-black" }) })), actions === null || actions === void 0 ? void 0 : actions.map((action, index) => (_jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            action.onClick();
                        }, className: "p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-colors", title: action.label, children: action.icon }, index)))] }) }));
    };
    return (_jsxs("div", { className: cn('relative group cursor-pointer', aspectRatio !== 'auto' ? aspectRatios[aspectRatio] : thumbnailSizes[size], clickable && 'hover:shadow-lg transition-shadow duration-200', selected && 'ring-2 ring-mw-blue-500', className), onClick: handleClick, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsx("div", { className: "w-full h-full rounded-lg overflow-hidden bg-mw-gray-100 dark:bg-mw-gray-800", children: renderContent() }), badge && (_jsx("div", { className: "absolute top-2 right-2 z-10", children: badge })), selected && (_jsx("div", { className: "absolute top-2 left-2 z-10", children: _jsx("div", { className: "w-5 h-5 bg-mw-blue-500 rounded-full flex items-center justify-center", children: _jsx("div", { className: "w-2 h-2 bg-white rounded-full" }) }) })), renderOverlay(), overlay && (_jsx("div", { className: "absolute inset-0 z-20", children: overlay })), (title || subtitle) && (_jsxs("div", { className: "mt-2", children: [title && (_jsx("div", { className: "text-sm font-medium text-mw-gray-900 dark:text-white truncate", children: title })), subtitle && (_jsx("div", { className: "text-xs text-mw-gray-500 dark:text-mw-gray-400 truncate", children: subtitle }))] }))] }));
}
export function VideoThumbnail(_a) {
    var { duration, autoPlay = false, muted = true } = _a, props = __rest(_a, ["duration", "autoPlay", "muted"]);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const videoRef = useRef(null);
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            }
            else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    return (_jsx(Thumbnail, Object.assign({}, props, { type: "video", overlay: _jsxs("div", { className: "absolute inset-0", children: [duration && (_jsx("div", { className: "absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded", children: duration })), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsx("button", { onClick: togglePlay, className: "w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-75 transition-colors", children: isPlaying ? (_jsx(Pause, { className: "w-6 h-6 text-white" })) : (_jsx(Play, { className: "w-6 h-6 text-white ml-1" })) }) })] }) })));
}
export function ImageThumbnail(_a) {
    var { lazy = true, fallback } = _a, props = __rest(_a, ["lazy", "fallback"]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    return (_jsx(Thumbnail, Object.assign({}, props, { type: "image", loading: lazy && !loaded && !error, error: error, onLoad: () => setLoaded(true), onError: () => setError(true), placeholder: fallback ? (_jsx("img", { src: fallback, alt: "Fallback", className: "w-full h-full object-cover opacity-50" })) : undefined })));
}
const galleryGaps = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
};
export function ThumbnailGallery({ items, columns = 4, gap = 'md', selectable = false, selectedIds = [], onSelectionChange, className }) {
    const handleSelection = (id) => {
        if (!selectable || !onSelectionChange)
            return;
        const newSelection = selectedIds.includes(id)
            ? selectedIds.filter(selectedId => selectedId !== id)
            : [...selectedIds, id];
        onSelectionChange(newSelection);
    };
    return (_jsx("div", { className: cn('grid', `grid-cols-${columns}`, galleryGaps[gap], className), children: items.map((item) => (_jsx(Thumbnail, Object.assign({}, item, { selected: selectable && selectedIds.includes(item.id), onSelect: () => handleSelection(item.id) }), item.id))) }));
}
export default Thumbnail;
//# sourceMappingURL=Thumbnail.js.map
'use client';
import { __rest } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const aspectRatios = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    auto: ''
};
export function CarouselSlide({ children, className }) {
    return (_jsx("div", { className: cn('flex-shrink-0 w-full', className), children: children }));
}
function CarouselControls({ currentSlide, totalSlides, onPrevious, onNext, onSlideSelect, showDots = true, showArrows = true, isAutoplay = false, onToggleAutoplay }) {
    return (_jsxs(_Fragment, { children: [showArrows && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: onPrevious, className: "absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 dark:bg-mw-gray-800/80 text-mw-gray-700 dark:text-mw-gray-300 hover:bg-white dark:hover:bg-mw-gray-800 shadow-lg transition-all duration-200 backdrop-blur-sm", "aria-label": "Previous slide", children: _jsx(ChevronLeft, { className: "w-5 h-5" }) }), _jsx("button", { onClick: onNext, className: "absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 dark:bg-mw-gray-800/80 text-mw-gray-700 dark:text-mw-gray-300 hover:bg-white dark:hover:bg-mw-gray-800 shadow-lg transition-all duration-200 backdrop-blur-sm", "aria-label": "Next slide", children: _jsx(ChevronRight, { className: "w-5 h-5" }) })] })), showDots && totalSlides > 1 && (_jsxs("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-2", children: [Array.from({ length: totalSlides }, (_, index) => (_jsx("button", { onClick: () => onSlideSelect(index), className: cn('w-2 h-2 rounded-full transition-all duration-200', index === currentSlide
                            ? 'bg-white dark:bg-mw-gray-200 w-6'
                            : 'bg-white/50 dark:bg-mw-gray-200/50 hover:bg-white/75 dark:hover:bg-mw-gray-200/75'), "aria-label": `Go to slide ${index + 1}` }, index))), onToggleAutoplay && (_jsx("button", { onClick: onToggleAutoplay, className: "ml-4 p-1 rounded-full bg-white/80 dark:bg-mw-gray-800/80 text-mw-gray-700 dark:text-mw-gray-300 hover:bg-white dark:hover:bg-mw-gray-800 backdrop-blur-sm", "aria-label": isAutoplay ? 'Pause autoplay' : 'Start autoplay', children: isAutoplay ? (_jsx(Pause, { className: "w-3 h-3" })) : (_jsx(Play, { className: "w-3 h-3" })) }))] }))] }));
}
export function Carousel({ children, autoplay = false, autoplayInterval = 3000, showDots = true, showArrows = true, infinite = true, slidesToShow = 1, slidesToScroll = 1, className, aspectRatio = 'auto', gap = 0, onSlideChange }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(autoplay);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef(null);
    const autoplayRef = useRef();
    const slides = React.Children.toArray(children);
    const totalSlides = Math.ceil(slides.length / slidesToShow);
    const slideWidth = 100 / slidesToShow;
    const goToSlide = useCallback((index) => {
        let newIndex = index;
        if (infinite) {
            if (index < 0) {
                newIndex = totalSlides - 1;
            }
            else if (index >= totalSlides) {
                newIndex = 0;
            }
        }
        else {
            newIndex = Math.max(0, Math.min(index, totalSlides - 1));
        }
        setCurrentSlide(newIndex);
        onSlideChange === null || onSlideChange === void 0 ? void 0 : onSlideChange(newIndex);
    }, [totalSlides, infinite, onSlideChange]);
    const goToPrevious = useCallback(() => {
        goToSlide(currentSlide - slidesToScroll);
    }, [currentSlide, slidesToScroll, goToSlide]);
    const goToNext = useCallback(() => {
        goToSlide(currentSlide + slidesToScroll);
    }, [currentSlide, slidesToScroll, goToSlide]);
    const toggleAutoplay = () => {
        setIsAutoplay(!isAutoplay);
    };
    // Autoplay functionality
    useEffect(() => {
        if (isAutoplay && !isPaused && totalSlides > 1) {
            autoplayRef.current = setInterval(() => {
                goToNext();
            }, autoplayInterval);
        }
        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current);
            }
        };
    }, [isAutoplay, isPaused, goToNext, autoplayInterval, totalSlides]);
    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                goToPrevious();
            }
            else if (event.key === 'ArrowRight') {
                goToNext();
            }
            else if (event.key === ' ') {
                event.preventDefault();
                toggleAutoplay();
            }
        };
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('keydown', handleKeyDown);
            return () => carousel.removeEventListener('keydown', handleKeyDown);
        }
    }, [goToPrevious, goToNext]);
    // Touch/swipe support
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const handleTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };
    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd)
            return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;
        if (isLeftSwipe) {
            goToNext();
        }
        else if (isRightSwipe) {
            goToPrevious();
        }
    };
    const translateX = -(currentSlide * (100 / slidesToShow));
    return (_jsxs("div", { ref: carouselRef, className: cn('relative overflow-hidden rounded-lg focus:outline-none', aspectRatios[aspectRatio], className), tabIndex: 0, onMouseEnter: () => setIsPaused(true), onMouseLeave: () => setIsPaused(false), onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, children: [_jsx("div", { className: "flex transition-transform duration-300 ease-out h-full", style: {
                    transform: `translateX(${translateX}%)`,
                    gap: gap ? `${gap}px` : undefined
                }, children: slides.map((slide, index) => (_jsx("div", { className: "flex-shrink-0 h-full", style: { width: `${slideWidth}%` }, children: slide }, index))) }), _jsx(CarouselControls, { currentSlide: currentSlide, totalSlides: totalSlides, onPrevious: goToPrevious, onNext: goToNext, onSlideSelect: goToSlide, showDots: showDots, showArrows: showArrows, isAutoplay: isAutoplay, onToggleAutoplay: toggleAutoplay }), _jsxs("div", { className: "absolute top-4 right-4 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-sm", children: [currentSlide + 1, " / ", totalSlides] })] }));
}
export function ImageCarousel(_a) {
    var { images, objectFit = 'cover' } = _a, carouselProps = __rest(_a, ["images", "objectFit"]);
    return (_jsx(Carousel, Object.assign({}, carouselProps, { children: images.map((image, index) => (_jsx(CarouselSlide, { children: _jsxs("div", { className: "relative w-full h-full bg-mw-gray-100 dark:bg-mw-gray-800", children: [_jsx("img", { src: image.src, alt: image.alt, className: cn('w-full h-full', objectFit === 'cover' ? 'object-cover' : 'object-contain') }), image.caption && (_jsx("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4", children: _jsx("p", { className: "text-white text-sm font-medium", children: image.caption }) }))] }) }, index))) })));
}
//# sourceMappingURL=Carousel.js.map
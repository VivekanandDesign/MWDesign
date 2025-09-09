import React from 'react';
interface CarouselProps {
    children: React.ReactNode[];
    autoplay?: boolean;
    autoplayInterval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    infinite?: boolean;
    slidesToShow?: number;
    slidesToScroll?: number;
    className?: string;
    aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
    gap?: number;
    onSlideChange?: (index: number) => void;
}
interface CarouselSlideProps {
    children: React.ReactNode;
    className?: string;
}
export declare function CarouselSlide({ children, className }: CarouselSlideProps): import("react/jsx-runtime").JSX.Element;
export declare function Carousel({ children, autoplay, autoplayInterval, showDots, showArrows, infinite, slidesToShow, slidesToScroll, className, aspectRatio, gap, onSlideChange }: CarouselProps): import("react/jsx-runtime").JSX.Element;
interface ImageCarouselProps extends Omit<CarouselProps, 'children'> {
    images: Array<{
        src: string;
        alt: string;
        caption?: string;
    }>;
    objectFit?: 'cover' | 'contain';
}
export declare function ImageCarousel({ images, objectFit, ...carouselProps }: ImageCarouselProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Carousel.d.ts.map
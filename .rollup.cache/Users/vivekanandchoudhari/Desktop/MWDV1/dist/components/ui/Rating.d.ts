export interface RatingProps {
    value?: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    readonly?: boolean;
    allowHalf?: boolean;
    onChange?: (value: number) => void;
    className?: string;
}
export declare function Rating({ value, max, size, readonly, allowHalf, onChange, className }: RatingProps): import("react").JSX.Element;

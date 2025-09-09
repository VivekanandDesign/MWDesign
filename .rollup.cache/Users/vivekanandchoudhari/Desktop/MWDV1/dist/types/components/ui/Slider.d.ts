export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    showValue?: boolean;
    formatValue?: (value: number) => string;
}
export declare function Slider({ className, label, min, max, step, value, defaultValue, onChange, showValue, formatValue, disabled, ...props }: SliderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Slider.d.ts.map
import React from 'react';
interface StepperProps {
    steps: Array<{
        title: string;
        description?: string;
        completed?: boolean;
        current?: boolean;
    }>;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}
export declare function Stepper({ steps, orientation, className }: StepperProps): React.JSX.Element;
export {};

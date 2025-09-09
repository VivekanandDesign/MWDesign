import React from 'react';
interface AnimatedElementProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
    className?: string;
}
export declare const AnimatedElement: React.FC<AnimatedElementProps>;
interface ProcessFlowAnimationProps {
    steps: Array<{
        id: string;
        title: string;
        icon: React.ComponentType<any>;
        color: string;
    }>;
    activeStep: number;
    onStepClick: (index: number) => void;
}
export declare const ProcessFlowAnimation: React.FC<ProcessFlowAnimationProps>;
interface CounterAnimationProps {
    end: number;
    duration?: number;
    suffix?: string;
    className?: string;
}
export declare const CounterAnimation: React.FC<CounterAnimationProps>;
interface FloatingElementProps {
    children: React.ReactNode;
    delay?: number;
    amplitude?: number;
    duration?: number;
    className?: string;
}
export declare const FloatingElement: React.FC<FloatingElementProps>;
export {};

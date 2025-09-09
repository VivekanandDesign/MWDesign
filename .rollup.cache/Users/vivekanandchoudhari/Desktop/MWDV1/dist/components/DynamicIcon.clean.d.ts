import React from 'react';
import { LucideProps } from 'lucide-react';
export interface IconComponentProps extends LucideProps {
    name: string;
    size?: number;
    className?: string;
}
export declare const DynamicIcon: React.FC<IconComponentProps>;

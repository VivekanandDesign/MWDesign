export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}
export interface CommandItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    value?: string;
    onSelect?: (value: string) => void;
    disabled?: boolean;
}
export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    heading?: string;
}
export declare const Command: import("react").ForwardRefExoticComponent<CommandProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const CommandGroup: import("react").ForwardRefExoticComponent<CommandGroupProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const CommandItem: import("react").ForwardRefExoticComponent<CommandItemProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const CommandSeparator: import("react").ForwardRefExoticComponent<import("react").HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;

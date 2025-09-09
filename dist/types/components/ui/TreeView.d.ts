import React from 'react';
interface TreeNode {
    id: string;
    label: string;
    children?: TreeNode[];
    icon?: React.ReactNode;
    disabled?: boolean;
    selectable?: boolean;
    data?: any;
}
interface TreeViewProps {
    data: TreeNode[];
    selectedIds?: string[];
    expandedIds?: string[];
    onSelect?: (selectedIds: string[], node: TreeNode) => void;
    onExpand?: (expandedIds: string[]) => void;
    multiple?: boolean;
    defaultExpanded?: string[];
    defaultSelected?: string[];
    showIcons?: boolean;
    showLines?: boolean;
    className?: string;
}
export declare function TreeView({ data, selectedIds: controlledSelectedIds, expandedIds: controlledExpandedIds, onSelect, onExpand, multiple, defaultExpanded, defaultSelected, showIcons, showLines, className }: TreeViewProps): import("react/jsx-runtime").JSX.Element;
export declare function findTreeNode(data: TreeNode[], nodeId: string): TreeNode | null;
export declare function getAllNodeIds(data: TreeNode[]): string[];
export declare function getParentIds(data: TreeNode[], targetId: string): string[];
export {};
//# sourceMappingURL=TreeView.d.ts.map
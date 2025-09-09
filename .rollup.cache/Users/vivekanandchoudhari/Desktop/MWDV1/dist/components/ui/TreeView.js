'use client';
import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useCallback } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, File } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
function TreeItem({ node, level, isExpanded, isSelected, hasChildren, onToggle, onSelect, showIcons, showLines, isLast = false, parentLines = [] }) {
    const handleToggle = (e) => {
        e.stopPropagation();
        if (hasChildren) {
            onToggle(node.id);
        }
    };
    const handleSelect = () => {
        if (!node.disabled && node.selectable !== false) {
            onSelect(node.id, node);
        }
    };
    const getDefaultIcon = () => {
        if (hasChildren) {
            return isExpanded ? _jsx(FolderOpen, { className: "w-4 h-4" }) : _jsx(Folder, { className: "w-4 h-4" });
        }
        return _jsx(File, { className: "w-4 h-4" });
    };
    const currentLines = [...parentLines, !isLast];
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: cn('group flex items-center py-1 px-2 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 cursor-pointer transition-colors relative', isSelected && 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300', node.disabled && 'opacity-50 cursor-not-allowed', level > 0 && 'ml-4'), onClick: handleSelect, style: { paddingLeft: `${level * 20 + 8}px` }, children: [showLines && level > 0 && (_jsxs("div", { className: "absolute left-0 top-0 h-full pointer-events-none", children: [parentLines.map((hasLine, index) => (_jsx("div", { className: "absolute top-0 h-full w-px bg-mw-gray-300 dark:bg-mw-gray-600", style: { left: `${index * 20 + 10}px` }, children: hasLine && _jsx("div", { className: "w-full h-full bg-mw-gray-300 dark:bg-mw-gray-600" }) }, index))), _jsx("div", { className: "absolute top-0 h-1/2 w-px bg-mw-gray-300 dark:bg-mw-gray-600", style: { left: `${level * 20}px` } }), _jsx("div", { className: "absolute top-1/2 w-2 h-px bg-mw-gray-300 dark:bg-mw-gray-600", style: { left: `${level * 20}px` } }), !isLast && (_jsx("div", { className: "absolute top-1/2 bottom-0 w-px bg-mw-gray-300 dark:bg-mw-gray-600", style: { left: `${level * 20}px` } }))] })), _jsx("div", { className: "flex items-center justify-center w-4 h-4 mr-2", children: hasChildren ? (_jsx("button", { onClick: handleToggle, className: "text-mw-gray-500 hover:text-mw-gray-700 dark:hover:text-mw-gray-300", children: isExpanded ? (_jsx(ChevronDown, { className: "w-3 h-3" })) : (_jsx(ChevronRight, { className: "w-3 h-3" })) })) : (showLines && _jsx("div", { className: "w-3 h-3" })) }), showIcons && (_jsx("div", { className: "flex items-center justify-center w-4 h-4 mr-2 text-mw-gray-500", children: node.icon || getDefaultIcon() })), _jsx("span", { className: "text-sm font-medium text-mw-gray-900 dark:text-white select-none", children: node.label })] }), hasChildren && isExpanded && node.children && (_jsx("div", { children: node.children.map((child, index) => (_jsx(TreeItemContainer, { node: child, level: level + 1, onToggle: onToggle, onSelect: onSelect, showIcons: showIcons, showLines: showLines, isLast: index === node.children.length - 1, parentLines: currentLines }, child.id))) }))] }));
}
function TreeItemContainer(_a) {
    var { node } = _a, props = __rest(_a, ["node"]);
    // This would need to be connected to the parent component's state
    // For now, using internal state as an example
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const hasChildren = Boolean(node.children && node.children.length > 0);
    const handleToggle = (nodeId) => {
        if (nodeId === node.id) {
            setIsExpanded(!isExpanded);
        }
        props.onToggle(nodeId);
    };
    const handleSelect = (nodeId, selectedNode) => {
        if (nodeId === node.id) {
            setIsSelected(!isSelected);
        }
        props.onSelect(nodeId, selectedNode);
    };
    return (_jsx(TreeItem, Object.assign({}, props, { node: node, isExpanded: isExpanded, isSelected: isSelected, hasChildren: hasChildren, onToggle: handleToggle, onSelect: handleSelect })));
}
export function TreeView({ data, selectedIds: controlledSelectedIds, expandedIds: controlledExpandedIds, onSelect, onExpand, multiple = false, defaultExpanded = [], defaultSelected = [], showIcons = true, showLines = false, className }) {
    const [internalSelectedIds, setInternalSelectedIds] = useState(defaultSelected);
    const [internalExpandedIds, setInternalExpandedIds] = useState(defaultExpanded);
    const selectedIds = controlledSelectedIds !== undefined ? controlledSelectedIds : internalSelectedIds;
    const expandedIds = controlledExpandedIds !== undefined ? controlledExpandedIds : internalExpandedIds;
    const handleToggle = useCallback((nodeId) => {
        const newExpandedIds = expandedIds.includes(nodeId)
            ? expandedIds.filter(id => id !== nodeId)
            : [...expandedIds, nodeId];
        if (controlledExpandedIds === undefined) {
            setInternalExpandedIds(newExpandedIds);
        }
        onExpand === null || onExpand === void 0 ? void 0 : onExpand(newExpandedIds);
    }, [expandedIds, controlledExpandedIds, onExpand]);
    const handleSelect = useCallback((nodeId, node) => {
        let newSelectedIds;
        if (multiple) {
            newSelectedIds = selectedIds.includes(nodeId)
                ? selectedIds.filter(id => id !== nodeId)
                : [...selectedIds, nodeId];
        }
        else {
            newSelectedIds = selectedIds.includes(nodeId) ? [] : [nodeId];
        }
        if (controlledSelectedIds === undefined) {
            setInternalSelectedIds(newSelectedIds);
        }
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(newSelectedIds, node);
    }, [selectedIds, multiple, controlledSelectedIds, onSelect]);
    const renderTreeItem = (node, level, isLast, parentLines = []) => {
        const isExpanded = expandedIds.includes(node.id);
        const isSelected = selectedIds.includes(node.id);
        const hasChildren = Boolean(node.children && node.children.length > 0);
        const currentLines = [...parentLines, !isLast];
        return (_jsxs(React.Fragment, { children: [_jsx(TreeItem, { node: node, level: level, isExpanded: isExpanded, isSelected: isSelected, hasChildren: hasChildren, onToggle: handleToggle, onSelect: handleSelect, showIcons: showIcons, showLines: showLines, isLast: isLast, parentLines: parentLines }), hasChildren && isExpanded && node.children && (_jsx("div", { children: node.children.map((child, index) => renderTreeItem(child, level + 1, index === node.children.length - 1, currentLines)) }))] }, node.id));
    };
    return (_jsx("div", { className: cn('py-2', className), children: data.map((node, index) => renderTreeItem(node, 0, index === data.length - 1)) }));
}
// Utility function to find a node by ID
export function findTreeNode(data, nodeId) {
    for (const node of data) {
        if (node.id === nodeId) {
            return node;
        }
        if (node.children) {
            const found = findTreeNode(node.children, nodeId);
            if (found)
                return found;
        }
    }
    return null;
}
// Utility function to get all node IDs
export function getAllNodeIds(data) {
    const ids = [];
    function traverse(nodes) {
        for (const node of nodes) {
            ids.push(node.id);
            if (node.children) {
                traverse(node.children);
            }
        }
    }
    traverse(data);
    return ids;
}
// Utility function to get parent node IDs for expansion
export function getParentIds(data, targetId) {
    const parentIds = [];
    function findParents(nodes, parents = []) {
        for (const node of nodes) {
            if (node.id === targetId) {
                parentIds.push(...parents);
                return true;
            }
            if (node.children) {
                if (findParents(node.children, [...parents, node.id])) {
                    return true;
                }
            }
        }
        return false;
    }
    findParents(data);
    return parentIds;
}
//# sourceMappingURL=TreeView.js.map
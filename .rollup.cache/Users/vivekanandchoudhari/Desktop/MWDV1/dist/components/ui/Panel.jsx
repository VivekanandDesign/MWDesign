'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GripVertical, GripHorizontal, ChevronRight, ChevronDown } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const PanelGroupContext = React.createContext(null);
export function PanelGroup({ direction = 'horizontal', className, children }) {
    const [panels, setPanels] = useState(new Map());
    const registerPanel = useCallback((id, size, minSize, maxSize) => {
        setPanels(prev => new Map(prev.set(id, { size, minSize, maxSize })));
    }, []);
    const unregisterPanel = useCallback((id) => {
        setPanels(prev => {
            const newPanels = new Map(prev);
            newPanels.delete(id);
            return newPanels;
        });
    }, []);
    const updatePanelSize = useCallback((id, size) => {
        setPanels(prev => {
            const panel = prev.get(id);
            if (!panel)
                return prev;
            return new Map(prev.set(id, Object.assign(Object.assign({}, panel), { size })));
        });
    }, []);
    const getPanelSize = useCallback((id) => {
        var _a;
        return ((_a = panels.get(id)) === null || _a === void 0 ? void 0 : _a.size) || 50;
    }, [panels]);
    const contextValue = {
        direction,
        registerPanel,
        unregisterPanel,
        updatePanelSize,
        getPanelSize
    };
    return (<PanelGroupContext.Provider value={contextValue}>
      <div className={cn('flex w-full h-full', direction === 'horizontal' ? 'flex-row' : 'flex-col', className)}>
        {children}
      </div>
    </PanelGroupContext.Provider>);
}
export function Panel({ defaultSize = 50, minSize = 10, maxSize = 90, collapsible = false, collapsed = false, onCollapse, className, children }) {
    const context = React.useContext(PanelGroupContext);
    const panelId = useRef(`panel-${Math.random().toString(36).substr(2, 9)}`);
    const [size, setSize] = useState(defaultSize);
    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    useEffect(() => {
        if (context) {
            context.registerPanel(panelId.current, defaultSize, minSize, maxSize);
            return () => context.unregisterPanel(panelId.current);
        }
    }, [context, defaultSize, minSize, maxSize]);
    useEffect(() => {
        setIsCollapsed(collapsed);
    }, [collapsed]);
    const handleCollapse = () => {
        const newCollapsed = !isCollapsed;
        setIsCollapsed(newCollapsed);
        onCollapse === null || onCollapse === void 0 ? void 0 : onCollapse(newCollapsed);
    };
    const direction = (context === null || context === void 0 ? void 0 : context.direction) || 'horizontal';
    const isHorizontal = direction === 'horizontal';
    const sizeStyle = isCollapsed
        ? (isHorizontal ? { width: 'auto' } : { height: 'auto' })
        : (isHorizontal ? { width: `${size}%` } : { height: `${size}%` });
    return (<div className={cn('relative transition-all duration-200 ease-in-out', isCollapsed && 'flex-shrink-0', !isCollapsed && 'flex-1', className)} style={sizeStyle}>
      <div className="w-full h-full bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg overflow-hidden">
        {children}
      </div>
    </div>);
}
export function PanelResizer({ direction = 'horizontal', disabled = false, className }) {
    const [isDragging, setIsDragging] = useState(false);
    const resizerRef = useRef(null);
    const handleMouseDown = useCallback((e) => {
        if (disabled)
            return;
        e.preventDefault();
        setIsDragging(true);
        const startX = e.clientX;
        const startY = e.clientY;
        const handleMouseMove = (e) => {
            e.preventDefault();
            // Handle resize logic here
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            // This would need to be connected to the panel sizing logic
            console.log('Resizing:', direction === 'horizontal' ? deltaX : deltaY);
        };
        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [disabled, direction]);
    const isHorizontal = direction === 'horizontal';
    return (<div ref={resizerRef} className={cn('relative flex items-center justify-center bg-mw-gray-100 dark:bg-mw-gray-800 hover:bg-mw-gray-200 dark:hover:bg-mw-gray-700 transition-colors', isHorizontal ? 'w-2 h-full cursor-col-resize' : 'w-full h-2 cursor-row-resize', disabled && 'cursor-not-allowed opacity-50', isDragging && 'bg-mw-blue-200 dark:bg-mw-blue-800', className)} onMouseDown={handleMouseDown}>
      <div className={cn('text-mw-gray-400 dark:text-mw-gray-500', isHorizontal ? 'rotate-0' : 'rotate-90')}>
        {isHorizontal ? <GripVertical className="w-3 h-3"/> : <GripHorizontal className="w-3 h-3"/>}
      </div>
    </div>);
}
export function PanelHeader({ title, actions, collapsible = false, collapsed = false, onToggleCollapse, className, children }) {
    const getCollapseIcon = () => {
        if (collapsed) {
            return <ChevronRight className="w-4 h-4"/>;
        }
        return <ChevronDown className="w-4 h-4"/>;
    };
    return (<div className={cn('flex items-center justify-between px-4 py-3 bg-mw-gray-50 dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700', className)}>
      <div className="flex items-center space-x-2">
        {collapsible && (<button onClick={onToggleCollapse} className="p-1 rounded hover:bg-mw-gray-200 dark:hover:bg-mw-gray-700 text-mw-gray-600 dark:text-mw-gray-400">
            {getCollapseIcon()}
          </button>)}
        
        {title && (<h3 className="text-sm font-medium text-mw-gray-900 dark:text-white">
            {title}
          </h3>)}
        
        {children}
      </div>
      
      {actions && (<div className="flex items-center space-x-2">
          {actions}
        </div>)}
    </div>);
}
// Convenience components
export function SplitPanel({ leftPanel, rightPanel, defaultLeftSize = 30, minLeftSize = 20, maxLeftSize = 80, className }) {
    return (<PanelGroup direction="horizontal" className={className}>
      <Panel defaultSize={defaultLeftSize} minSize={minLeftSize} maxSize={maxLeftSize}>
        {leftPanel}
      </Panel>
      <PanelResizer />
      <Panel>
        {rightPanel}
      </Panel>
    </PanelGroup>);
}
export function StackPanel({ topPanel, bottomPanel, defaultTopSize = 50, minTopSize = 20, maxTopSize = 80, className }) {
    return (<PanelGroup direction="vertical" className={className}>
      <Panel defaultSize={defaultTopSize} minSize={minTopSize} maxSize={maxTopSize}>
        {topPanel}
      </Panel>
      <PanelResizer direction="vertical"/>
      <Panel>
        {bottomPanel}
      </Panel>
    </PanelGroup>);
}
// Collapsible sidebar panel
export function SidebarPanel({ children, collapsed = false, onToggle, title, width = 250, className }) {
    return (<div className={cn('relative transition-all duration-200 ease-in-out bg-white dark:bg-mw-gray-900 border-r border-mw-gray-200 dark:border-mw-gray-700', collapsed ? 'w-12' : `w-[${width}px]`, className)}>
      {title && !collapsed && (<PanelHeader title={title} collapsible collapsed={collapsed} onToggleCollapse={() => onToggle === null || onToggle === void 0 ? void 0 : onToggle(!collapsed)}/>)}
      
      {!collapsed && (<div className="p-4">
          {children}
        </div>)}
      
      {collapsed && (<div className="p-2">
          <button onClick={() => onToggle === null || onToggle === void 0 ? void 0 : onToggle(false)} className="w-full p-2 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 text-mw-gray-600 dark:text-mw-gray-400">
            <ChevronRight className="w-4 h-4"/>
          </button>
        </div>)}
    </div>);
}
//# sourceMappingURL=Panel.jsx.map
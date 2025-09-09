export interface IconDetailsModalState {
    isOpen: boolean;
    selectedIcon: string | null;
    activeTab: 'customize' | 'code';
    showCodeSnippets: boolean;
}
export declare function useIconDetailsModal(): {
    openModal: (iconName: string) => void;
    closeModal: () => void;
    setActiveTab: (tab: IconDetailsModalState["activeTab"]) => void;
    toggleCodeSnippets: () => void;
    navigateToIcon: (iconName: string) => void;
    isOpen: boolean;
    selectedIcon: string | null;
    activeTab: "customize" | "code";
    showCodeSnippets: boolean;
};
//# sourceMappingURL=useIconDetailsModal.d.ts.map
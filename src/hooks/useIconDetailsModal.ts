import { useState, useCallback, useEffect } from 'react';
import { useIconCustomization } from './useIconCustomization';

export interface IconDetailsModalState {
  isOpen: boolean;
  selectedIcon: string | null;
  activeTab: 'customize' | 'code';
  showCodeSnippets: boolean;
}

export function useIconDetailsModal() {
  const [state, setState] = useState<IconDetailsModalState>({
    isOpen: false,
    selectedIcon: null,
    activeTab: 'customize',
    showCodeSnippets: false
  });

  const openModal = useCallback((iconName: string) => {
    setState(prev => ({
      ...prev,
      isOpen: true,
      selectedIcon: iconName
    }));
  }, []);

  const closeModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false,
      selectedIcon: null
    }));
  }, []);

  const setActiveTab = useCallback((tab: IconDetailsModalState['activeTab']) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  }, []);

  const toggleCodeSnippets = useCallback(() => {
    setState(prev => ({ ...prev, showCodeSnippets: !prev.showCodeSnippets }));
  }, []);

  const navigateToIcon = useCallback((iconName: string) => {
    setState(prev => ({ ...prev, selectedIcon: iconName }));
  }, []);

  // Keyboard shortcuts for modal
  useEffect(() => {
    if (!state.isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          closeModal();
          break;
        case '1':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            setActiveTab('customize');
          }
          break;
        case '2':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            setActiveTab('code');
          }
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          // Navigate between related icons
          event.preventDefault();
          // TODO: Implement icon navigation
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen, closeModal, setActiveTab]);

  // Focus management
  useEffect(() => {
    if (state.isOpen) {
      // Disable background scrolling
      document.body.style.overflow = 'hidden';
      
      // Focus first interactive element in modal
      setTimeout(() => {
        const firstFocusable = document.querySelector('[data-modal-focus-first]') as HTMLElement;
        firstFocusable?.focus();
      }, 100);
    } else {
      // Re-enable background scrolling
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [state.isOpen]);

  return {
    ...state,
    openModal,
    closeModal,
    setActiveTab,
    toggleCodeSnippets,
    navigateToIcon
  };
}

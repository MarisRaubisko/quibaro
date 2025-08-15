'use client';

import { create } from 'zustand';

interface GridStore {
  isGridCompact: boolean;
  setIsGridCompact: (value: boolean) => void;
}

const useGridStore = create<GridStore>((set) => ({
  isGridCompact: true, 
  setIsGridCompact: (value: boolean) => set({ isGridCompact: value }),
}));

export function useGridSwitcher() {
  const { isGridCompact, setIsGridCompact } = useGridStore();
  
  return {
    isGridCompact,
    setIsGridCompact,
  };
}

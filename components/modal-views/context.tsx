'use client';

import { create } from 'zustand';

export type MODAL_VIEW =
  | 'TOPUP_VIEW'
  | 'DELETE_IMAGE_VIEW'
  | 'SHARE_IMAGE_VIEW'
  | 'UNSHARE_IMAGE_VIEW'
  | 'GALLERY_IMAGE_VIEW';

interface ModalState {
  isOpen: boolean; 
  view: MODAL_VIEW;
  data: any; 
  openModal: (view: MODAL_VIEW, data?: any) => void; 
  closeModal: () => void; 
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false, 
  view: 'TOPUP_VIEW', 
  data: null,
  openModal: (view: MODAL_VIEW, data: any = null) => set({ isOpen: true, view, data }),
  closeModal: () => set({ isOpen: false, data: null }), 
}));

export function useModal() {
  
  const { isOpen, view, data, openModal, closeModal } = useModalStore();

  return {
    isOpen,
    view,
    data,
    openModal,
    closeModal,
  };
}

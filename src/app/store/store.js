import { create } from 'zustand';

export const usePsyStore = create((set) => ({
  answer01: '',
  answer02: '',
  setAnswer01: (val) => set({ answer01: val }),
  setAnswer02: (val) => set({ answer02: val }),
}));

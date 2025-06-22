import { create } from 'zustand';

export const usePsyStore = create((set) => ({
  answer01: '',
  answer02: '',
  answer03: '',
  answer04: '',
  answer05: '',
  answer06: '',
  answer07: '',
  answer08: '',
  setAnswer01: (val) => set({ answer01: val }),
  setAnswer02: (val) => set({ answer02: val }),
  setAnswer03: (val) => set({ answer03: val }),
  setAnswer04: (val) => set({ answer04: val }),
  setAnswer05: (val) => set({ answer05: val }),
  setAnswer06: (val) => set({ answer06: val }),
  setAnswer07: (val) => set({ answer07: val }),
  setAnswer08: (val) => set({ answer08: val }),
}));

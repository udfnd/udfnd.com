import { create } from 'zustand';

export type Language = 'ko' | 'en' | 'zh' | 'ja';

interface AppState {
  theme: 'light' | 'dark';
  language: Language;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setLanguage: (language: Language) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  language: 'ko',
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setLanguage: (language) => set({ language }),
}));

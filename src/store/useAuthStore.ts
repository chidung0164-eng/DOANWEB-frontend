import { create } from 'zustand';
import api from '../api/axios';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/auth.php?action=me');
      if (response.data.success) {
        set({ user: response.data.data });
      } else {
        set({ user: null });
      }
    } catch (err) {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  login: (userData: User) => {
    set({ user: userData });
  },

  logout: async () => {
    try {
      await api.post('/auth.php?action=logout');
      set({ user: null });
    } catch (err) {
      console.error('Failed to logout');
    }
  },
}));

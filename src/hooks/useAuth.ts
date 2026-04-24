import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState } from '@/types';
import api from '@/utils/api';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<{ redirectUrl: string }>;
  register: (data: { email: string; password: string; firstName: string; lastName: string; phone: string }) => Promise<void>;
  logout: () => void;
  setUser: (user: User, token: string) => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post('/auth/login', { email, password });
          const { token, refreshToken, user, redirectUrl } = data.data;
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          set({ user, token, isAuthenticated: true, isLoading: false });
          return { redirectUrl };
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      register: async (formData) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post('/auth/register', formData);
          const { token, refreshToken, user } = data.data;
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        set({ user: null, token: null, isAuthenticated: false });
      },

      setUser: (user, token) => {
        set({ user, token, isAuthenticated: true });
      },
    }),
    {
      name: 'intellorium-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);

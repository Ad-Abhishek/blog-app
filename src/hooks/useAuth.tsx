import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '@/types';
import { authApi } from '@/lib/api';
import { toast } from 'sonner';

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const { token, user } = await authApi.login(email, password);
          set({ token, user, isAuthenticated: true });
          toast.success('Welcome back!');
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Login failed');
          throw error;
        }
      },

      register: async (email: string, password: string, name: string) => {
        try {
          const { token, user } = await authApi.register(email, password, name);
          set({ token, user, isAuthenticated: true });
          toast.success('Account created successfully!');
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Registration failed');
          throw error;
        }
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
        toast.info('Logged out successfully');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

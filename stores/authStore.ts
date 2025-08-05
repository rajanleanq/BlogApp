import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { User, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { authAPI } from '@/lib/api';

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasHydrated: boolean; 
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  setHasHydrated: (state: boolean) => void; 
}

export const useAuthStore = create<AuthStore>()(
  devtools(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      hasHydrated: false, 

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          const { user, token } = await authAPI.login(credentials);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true });
        try {
          const { user, token } = await authAPI.register(credentials);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      checkAuth: () => {
        const { token } = get();
        set({ isAuthenticated: !!token });
      },

      setHasHydrated: (state: boolean) => {
        set({ hasHydrated: state });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  ),
  { name: 'auth-store' }
  )
);
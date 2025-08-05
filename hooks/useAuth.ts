import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    token,
    isLoading,
    isAuthenticated,
    hasHydrated,
    login,
    register,
    logout,
    checkAuth,
  } = useAuthStore();

  useEffect(() => {
    if (hasHydrated) {
      checkAuth();
    }
  }, [checkAuth, hasHydrated]);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await login(credentials);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (credentials: {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    try {
      await register(credentials);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const requireAuth = () => {
    if (!hasHydrated || isLoading) {
      return true;
    }
    
    if (!isAuthenticated) {
      router.push('/auth/login');
      return false;
    }
    return true;
  };

  return {
    user,
    token,
    isLoading: isLoading || !hasHydrated,
    isAuthenticated,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    requireAuth,
  };
};
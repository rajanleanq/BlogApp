'use client';

import { useState, useCallback } from 'react';
import { ToastType } from '@/components/common/Toast';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = {
    success: (title: string, description?: string) =>
      addToast({ type: 'success', title, description }),
    error: (title: string, description?: string) =>
      addToast({ type: 'error', title, description }),
    info: (title: string, description?: string) =>
      addToast({ type: 'info', title, description }),
    warning: (title: string, description?: string) =>
      addToast({ type: 'warning', title, description }),
  };

  return {
    toasts,
    toast,
    removeToast,
  };
}
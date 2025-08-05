'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { PenTool, Home, LogOut, User } from 'lucide-react';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <PenTool className="h-8 w-8" />
              BlogApp
            </Link>
            
            {isAuthenticated && (
              <nav className="hidden md:flex space-x-6">
                <Link href="/dashboard" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link href="/posts/create" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  Write Post
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-700">
                  <User className="h-4 w-4" />
                  <span>Welcome, {user?.name}</span>
                </div>
                <Button variant="outline" onClick={logout} className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { PenTool, Zap } from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Share your stories</span>{" "}
                  <span className="block text-primary xl:inline">
                    with the world
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Create, edit, and share your blog posts with our beautiful and
                  intuitive platform. Join our community of writers and readers
                  today.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    {isAuthenticated ? (
                      <Link href="/dashboard">
                        <Button size="lg" className="w-full sm:w-auto">
                          Go to Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/auth/register">
                        <Button size="lg" className="w-full sm:w-auto">
                          Get Started
                        </Button>
                      </Link>
                    )}
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link href="/auth/login">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <PenTool className="h-32 w-32 text-white opacity-80" />
          </div>
        </div>
      </div>
      <div className="bg-primary">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start writing?</span>
            <span className="block">Join our community today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Create your account and start sharing your stories with the world.
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="mt-8">
              <Zap className="h-5 w-5 mr-2" />
              Get Started for Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

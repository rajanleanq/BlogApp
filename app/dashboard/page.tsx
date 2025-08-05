"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PostList } from "@/components/posts/PostList";
import { Button } from "@/components/ui/button";
import { PenTool, Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <PenTool className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Manage your blog posts</p>
              </div>
            </div>
            <Link href="/posts/create">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </Link>
          </div>
          <PostList />
        </div>
      </div>
    </ProtectedRoute>
  );
}

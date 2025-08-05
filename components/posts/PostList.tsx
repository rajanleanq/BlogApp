'use client';

import { useEffect } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { PostCard } from './PostCard';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export function PostList() {
  const { 
    filteredPosts, 
    isLoading, 
    error, 
    searchQuery, 
    setSearchQuery, 
    fetchPosts 
  } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleRefresh = () => {
    fetchPosts();
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error loading posts: {error}</p>
        <Button
          onClick={fetchPosts}
          variant="outline"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative max-w-md w-full sm:w-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isLoading}
          className="shrink-0"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchQuery ? 'No posts found matching your search.' : 'No posts yet.'}
          </p>
          {searchQuery && (
            <Button
              variant="ghost"
              onClick={() => setSearchQuery('')}
              className="mt-2"
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
      </div>
  );
}
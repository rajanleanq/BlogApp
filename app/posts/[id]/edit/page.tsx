'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PostForm } from '@/components/posts/PostForm';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';

export default function EditPost() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const { currentPost, updatePost, fetchPost, isLoading, clearCurrentPost } = usePosts();
  const { toast } = useToast();

  const postId = parseInt(params?.id as string);

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
    
    return () => {
      clearCurrentPost();
    };
  }, [postId, fetchPost]);

  const handleSubmit = async (data: { title: string; body: string }) => {
    if (!user || !currentPost) return;

    try {
      await updatePost({ ...data, id: currentPost.id }, user.id);
      toast.success('Post updated successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to update post:', error);
      toast.error('Failed to update post', 'Please try again later.');
    }
  };

  if (!currentPost && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The post you're looking for doesn't exist.</p>
          <Button
            onClick={() => router.push('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (currentPost && user && currentPost.userId !== user.id) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">You can only edit your own posts.</p>
          <Button
            onClick={() => router.push('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentPost ? (
            <PostForm
              initialData={{
                title: currentPost.title,
                body: currentPost.body,
              }}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              title="Edit Post"
              description="Update your blog post"
              submitText="Update Post"
            />
          ) : (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
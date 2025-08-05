'use client';

import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PostForm } from '@/components/posts/PostForm';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import { useToast } from '@/hooks/useToast';

export default function CreatePost() {
  const router = useRouter();
  const { user } = useAuth();
  const { createPost, isLoading } = usePosts();
  const { toast } = useToast();

  const handleSubmit = async (data: { title: string; body: string }) => {
    if (!user) return;

    try {
      await createPost(data, user.id);
      toast.success('Post created successfully!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to create post', 'Please try again later.');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PostForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            title="Create New Post"
            description="Share your thoughts and ideas with the world"
            submitText="Publish Post"
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
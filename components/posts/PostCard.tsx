'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Post } from '@/types/post';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, User, Calendar } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const { deletePost } = usePosts();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = user?.id === post.userId;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deletePost(post.id);
      toast.success('Post deleted successfully!');
    } catch (error) {
      console.error('Failed to delete post:', error);
      toast.error('Failed to delete post', 'Please try again later.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl font-bold line-clamp-2 mb-2">
              {post.title}
            </CardTitle>
            <CardDescription className="line-clamp-3 text-gray-600">
              {post.body}
            </CardDescription>
          </div>
          {isOwner && (
            <Badge variant="secondary" className="shrink-0">
              Your Post
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author || 'Unknown Author'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>

        {isOwner && (
          <div className="flex gap-2">
            <Link href={`/posts/${post.id}/edit`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your blog post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
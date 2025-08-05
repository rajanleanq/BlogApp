'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  body: z.string().min(10, 'Content must be at least 10 characters').max(5000, 'Content must be less than 5000 characters'),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
  initialData?: Partial<PostFormData>;
  onSubmit: (data: PostFormData) => Promise<void>;
  isLoading?: boolean;
  title: string;
  description: string;
  submitText: string;
}

export function PostForm({
  initialData,
  onSubmit,
  isLoading = false,
  title,
  description,
  submitText,
}: PostFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData,
  });

  const watchedTitle = watch('title', '');
  const watchedBody = watch('body', '');

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter your post title..."
                {...register('title')}
                className={errors.title ? 'border-red-500' : ''}
              />
              <div className="flex justify-between text-xs text-gray-500">
                {errors.title && (
                  <span className="text-red-600">{errors.title.message}</span>
                )}
                <span className="ml-auto">{watchedTitle.length}/100</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Content</Label>
              <Textarea
                id="body"
                placeholder="Write your post content here..."
                rows={12}
                {...register('body')}
                className={errors.body ? 'border-red-500' : ''}
              />
              <div className="flex justify-between text-xs text-gray-500">
                {errors.body && (
                  <span className="text-red-600">{errors.body.message}</span>
                )}
                <span className="ml-auto">{watchedBody.length}/5000</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Saving...' : submitText}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
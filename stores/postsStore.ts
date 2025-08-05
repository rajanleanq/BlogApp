import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Post, CreatePostData, UpdatePostData } from '@/types/post';
import { postsAPI } from '@/lib/api';

interface PostsStore {
  posts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  fetchPosts: () => Promise<void>;
  fetchPost: (id: number) => Promise<void>;
  createPost: (postData: CreatePostData, userId: number) => Promise<void>;
  updatePost: (postData: UpdatePostData, userId: number) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  setSearchQuery: (query: string) => void;
  clearError: () => void;
  getFilteredPosts: () => Post[];
  clearCurrentPost: () => void;
}

export const usePostsStore = create<PostsStore>()(
  devtools((set, get) => ({
  posts: [],
  currentPost: null,
  isLoading: false,
  error: null,
  searchQuery: '',

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const posts = await postsAPI.getPosts();
      set({ posts, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchPost: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const post = await postsAPI.getPost(id);
      set({ currentPost: post, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createPost: async (postData: CreatePostData, userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const newPost = await postsAPI.createPost({ ...postData, userId });
      set((state) => ({
        posts: [newPost, ...state.posts],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  updatePost: async (postData: UpdatePostData, userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedPost = await postsAPI.updatePost(postData.id, {
        title: postData.title,
        body: postData.body,
        userId,
      });
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postData.id ? updatedPost : post
        ),
        currentPost: updatedPost,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  deletePost: async (id: number) => {
    set({ error: null });
    try {
      await postsAPI.deletePost(id);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  clearError: () => {
    set({ error: null });
  },

  clearCurrentPost: () => {
    set({ currentPost: null });
  },

  getFilteredPosts: () => {
    const { posts, searchQuery } = get();
    if (!searchQuery) return posts;
    
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.author && post.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  },
}), { name: 'posts-store' }));
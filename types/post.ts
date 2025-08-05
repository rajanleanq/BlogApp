export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePostData {
  title: string;
  body: string;
}

export interface UpdatePostData {
  id: number;
  title: string;
  body: string;
}

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  currentPost: Post | null;
}
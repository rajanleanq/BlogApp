import { usePostsStore } from '@/stores/postsStore';

export const usePosts = () => {
  const {
    posts,
    currentPost,
    isLoading,
    error,
    searchQuery,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    setSearchQuery,
    clearError,
    getFilteredPosts,
    clearCurrentPost,
  } = usePostsStore();

  const handleCreatePost = async (
    postData: { title: string; body: string },
    userId: number
  ) => {
    try {
      await createPost(postData, userId);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdatePost = async (
    postData: { id: number; title: string; body: string },
    userId: number
  ) => {
    try {
      await updatePost(postData, userId);
    } catch (error) {
      throw error;
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id);
    } catch (error) {
      throw error;
    }
  };

  return {
    posts,
    currentPost,
    isLoading,
    error,
    searchQuery,
    filteredPosts: getFilteredPosts(),
    fetchPosts,
    fetchPost,
    createPost: handleCreatePost,
    updatePost: handleUpdatePost,
    deletePost: handleDeletePost,
    setSearchQuery,
    clearError,
    clearCurrentPost,
  };
};
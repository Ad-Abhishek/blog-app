import { create } from 'zustand';
import { PostsState, Post } from '@/types';
import { postsApi } from '@/lib/api';
import { toast } from 'sonner';

export const usePosts = create<PostsState>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const posts = await postsApi.getPosts();
      set({ posts, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch posts';
      set({ error: message, isLoading: false });
      toast.error(message);
    }
  },

  createPost: async (postData: Omit<Post, 'id' | 'userId'>) => {
    set({ isLoading: true, error: null });
    try {
      const newPost = await postsApi.createPost(postData);
      set((state) => ({
        posts: [newPost, ...state.posts],
        isLoading: false,
      }));
      toast.success('Post created successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create post';
      set({ error: message, isLoading: false });
      toast.error(message);
      throw error;
    }
  },

  updatePost: async (id: number, postData: Partial<Post>) => {
    set({ isLoading: true, error: null });
    try {
      const updatedPost = await postsApi.updatePost(id, postData);
      set((state) => ({
        posts: state.posts.map((post) => (post.id === id ? updatedPost : post)),
        isLoading: false,
      }));
      toast.success('Post updated successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update post';
      set({ error: message, isLoading: false });
      toast.error(message);
      throw error;
    }
  },

  deletePost: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await postsApi.deletePost(id);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
        isLoading: false,
      }));
      toast.success('Post deleted successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete post';
      set({ error: message, isLoading: false });
      toast.error(message);
      throw error;
    }
  },
}));

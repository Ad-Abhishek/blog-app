import { Post } from "@/types";

const API_BASE = "https://jsonplaceholder.typicode.com";

export const authApi = {
  login: async (email: string, password: string) => {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Returning mock token and user
    return {
      token: "mock-jwt-token-" + Date.now(),
      user: {
        id: 1,
        email,
        name: email.split("@")[0],
      },
    };
  },

  register: async (email: string, password: string, name: string) => {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    // Returning mock token and user
    return {
      token: "mock-jwt-token-" + Date.now(),
      user: {
        id: Date.now(),
        email,
        name,
      },
    };
  },
};

const POSTS_KEY = "blog_posts";

const getStoredPosts = (): Post[] => {
  const stored = localStorage.getItem(POSTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const savePostsToStorage = (posts: Post[]): void => {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

export const postsApi = {
  getPosts: async (): Promise<Post[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getStoredPosts();
  },

  getPost: async (id: number): Promise<Post> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const posts = getStoredPosts();
    const post = posts.find((p) => p.id === id);
    if (!post) throw new Error("Post not found");
    return post;
  },

  createPost: async (post: Omit<Post, "id" | "userId">): Promise<Post> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const posts = getStoredPosts();
    const newPost: Post = {
      ...post,
      id: Date.now(),
      userId: 1,
    };
    const updatedPosts = [newPost, ...posts];
    savePostsToStorage(updatedPosts);
    return newPost;
  },

  updatePost: async (id: number, postData: Partial<Post>): Promise<Post> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const posts = getStoredPosts();
    const postIndex = posts.findIndex((p) => p.id === id);
    if (postIndex === -1) throw new Error("Post not found");

    const updatedPost = { ...posts[postIndex], ...postData };
    posts[postIndex] = updatedPost;
    savePostsToStorage(posts);
    return updatedPost;
  },

  deletePost: async (id: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const posts = getStoredPosts();
    const filteredPosts = posts.filter((p) => p.id !== id);
    savePostsToStorage(filteredPosts);
  },
};

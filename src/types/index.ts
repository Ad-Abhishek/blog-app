export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  createPost: (post: Omit<Post, 'id' | 'userId'>) => Promise<void>;
  updatePost: (id: number, post: Partial<Post>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

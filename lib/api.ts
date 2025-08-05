const API_BASE = 'https://jsonplaceholder.typicode.com';

// Mock users for authentication
const MOCK_USERS = [
  { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com', password: 'password123' },
  { id: 2, name: 'Jane Smith', username: 'janesmith', email: 'jane@example.com', password: 'password123' },
];

let mockPosts: any[] = [];
let nextPostId = 101; 

const generateMockToken = (userId: number) => {
  return `mock_jwt_token_${userId}_${Date.now()}`;
};

const initializeMockPosts = async () => {
  if (mockPosts.length === 0) {
    try {
      const response = await fetch(`${API_BASE}/posts`);
      const posts = await response.json();
      mockPosts = posts.slice(0, 20).map((post: any) => ({
        ...post,
        author: MOCK_USERS.find(u => u.id === post.userId)?.name || 'Unknown Author',
        createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      nextPostId = Math.max(...mockPosts.map(p => p.id)) + 1;
    } catch (error) {
      console.error('Failed to initialize mock posts:', error);
    }
  }
};
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = MOCK_USERS.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const token = generateMockToken(user.id);
    const { password, ...userWithoutPassword } = user;
    
    return { user: userWithoutPassword, token };
  },

  register: async (credentials: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = MOCK_USERS.find(u => u.email === credentials.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: MOCK_USERS.length + 1,
      name: credentials.name,
      username: credentials.username,
      email: credentials.email,
    };
    
    MOCK_USERS.push({ ...newUser, password: credentials.password });
    
    const token = generateMockToken(newUser.id);
    
    return { user: newUser, token };
  },
};

export const postsAPI = {
  getPosts: async () => {
    await initializeMockPosts();
    await new Promise(resolve => setTimeout(resolve, 500)); 
    return [...mockPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getPost: async (id: number) => {
    await initializeMockPosts();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const post = mockPosts.find(p => p.id === id);
    if (!post) {
      throw new Error('Post not found');
    }
    
    return post;
  },

  createPost: async (postData: { title: string; body: string; userId: number }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newPost = {
      id: nextPostId++,
      title: postData.title,
      body: postData.body,
      userId: postData.userId,
      author: MOCK_USERS.find(u => u.id === postData.userId)?.name || 'Unknown Author',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockPosts.unshift(newPost);
    return newPost;
  },

  updatePost: async (id: number, postData: { title: string; body: string; userId: number }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const postIndex = mockPosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    
    const updatedPost = {
      ...mockPosts[postIndex],
      title: postData.title,
      body: postData.body,
      updatedAt: new Date().toISOString(),
    };
    
    mockPosts[postIndex] = updatedPost;
    return updatedPost;
  },

  deletePost: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const postIndex = mockPosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    
    mockPosts.splice(postIndex, 1);
    return { success: true };
  },
};
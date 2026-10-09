import { create } from 'zustand';

// Helper function to safely read user object from localStorage
const getSavedUser = () => {
  try {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error('Failed to parse saved user from localStorage:', error);
    return null;
  }
};

// Helper function to safely read JWT token from localStorage
const getSavedToken = () => {
  return localStorage.getItem('jwt_token') || localStorage.getItem('token') || null;
};

export const useAuthStore = create((set) => ({
  token: getSavedToken(),
  user: getSavedUser(),

  // Action: Set authentication token & user info in state + sync to localStorage
  setAuth: (token, user) => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('jwt_token', token);
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    set({ token, user });
  },

  // Action: Clear token & user info from state + remove from localStorage
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    set({ token: null, user: null });
  },

  // Action: Update user profile details without affecting token
  updateUser: (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  }
}));
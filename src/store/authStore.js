import { create } from 'zustand';
import { storage } from '../mock/data';

const loadAuthState = () => {
  try {
    const saved = storage.get('rpa-auth-storage');
    return saved || { user: null, role: null, isAuthenticated: false };
  } catch {
    return { user: null, role: null, isAuthenticated: false };
  }
};

export const useAuthStore = create((set) => ({
  ...loadAuthState(),
  
  login: (userData) => {
    const state = {
      user: userData,
      role: userData.role,
      isAuthenticated: true,
    };
    storage.set('rpa-auth-storage', state);
    set(state);
  },
  
  logout: () => {
    const state = {
      user: null,
      role: null,
      isAuthenticated: false,
    };
    storage.set('rpa-auth-storage', state);
    set(state);
  },
  
  setRole: (role) => {
    const currentState = loadAuthState();
    const state = { ...currentState, role };
    storage.set('rpa-auth-storage', state);
    set(state);
  },
}));


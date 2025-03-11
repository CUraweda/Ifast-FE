import {create} from 'zustand';
import { loginAPI, LoginCredentials, LoginResponse, User } from '@/restApi/authAPI';
import getErrorMessage from '@/restApi/apiHelper';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response: LoginResponse = await loginAPI(credentials);
      const { user, token } = response.data;
      set({
        user,
        token,
        isLoading: false,
      });
      localStorage.setItem('token', token);
    } catch (error: any) {
      set({
        error: getErrorMessage(error, 'failed. Please try again.'),
        isLoading: false,
      });
    }
  },

  logout: () => {
    set({ user: null, token: null, error: null, isLoading: false });
    localStorage.removeItem('token');
  },
}));

export default useAuthStore;

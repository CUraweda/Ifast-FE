import {create} from 'zustand';
import { loginAPI, LoginCredentials, LoginResponse, refreshTokenAPI, User } from '@/restApi/auth.api';
import getErrorMessage from '@/restApi/helper.api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<string | null>;
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
        token : token.access_token,
        isLoading: false,
      });
      sessionStorage.setItem('token', token.access_token)
      localStorage.setItem('refresh', token.refresh_token);
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

  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refresh') ?? ''
      const response: LoginResponse = await refreshTokenAPI(refreshToken);
      const { token } = response.data;
      set({ token: token.access_token });

      sessionStorage.setItem('token', token.access_token)
      localStorage.setItem('refresh', token.refresh_token);

      return token.access_token;

    } catch (error) {
      set({ user: null, token: null });
      sessionStorage.removeItem('token');
      return null;
    }
  },
}));

export default useAuthStore;

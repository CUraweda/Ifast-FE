// src/api/authAPI.ts
import apiClient from './base.api';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneWA: string;
  nik: number;
  signature: string | null;
  status: string | null;
  createdAt: string;
  divisionId: string;
  hirarkyId: string;
}

export interface LoginData {
  user: User;
  token: {
    access_token : string,
    refresh_token : string
  };
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: LoginData;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const loginAPI = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/api/v1/auth/login', credentials);
  return response.data;
};

export const refreshTokenAPI = async (refresh_token: string): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/api/v1/auth/refresh', {refresh_token} );
  return response.data;
};

// src/api/authAPI.ts
import apiClient from './apiClient';

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
  token: string;
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

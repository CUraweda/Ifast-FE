// src/api/authAPI.ts
import apiClient from './apiClient';
import { Role } from './utils/user';


export interface ListRoleData {
  total_items: number;
  page: number;
  limit: number;
  total_pages: number;
  items: Role[];
}

export interface rolesResponse {
  status: boolean;
  message: string;
  data: ListRoleData;
}

export const getRoles = async (): Promise<rolesResponse> => {
  const response = await apiClient.get<rolesResponse>('/api/v1/roles/show-all');
  return response.data;
};

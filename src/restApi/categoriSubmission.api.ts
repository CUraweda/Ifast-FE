// src/api/authAPI.ts
import apiClient from './base.api';
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

export interface RoleRes {
  name: string;
  code: string;
  description: string;
}

export const getCategorySubmission = async (payload?: string): Promise<rolesResponse> => {
  const response = await apiClient.get<rolesResponse>(`/api/v1/category-submission/show-all?${payload}`);
  return response.data;
};

export const createCatgeorySubmission = async (data: RoleRes): Promise<rolesResponse> => {
  const response = await apiClient.post<rolesResponse>(
    `/api/v1/category-submission/create`,
    data
  );
  return response.data;
};

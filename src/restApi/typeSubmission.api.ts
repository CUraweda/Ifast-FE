// src/api/authAPI.ts
import apiClient from './base.api';
import { Role } from './utils/user';

export interface ListTypeData {
  total_items: number;
  page: number;
  limit: number;
  total_pages: number;
  items: Role[];
}

export interface typeResponse {
  status: boolean;
  message: string;
  data: ListTypeData;
}

export interface typeRes {
  name: string;
  code: string;
  description: string;
}

export const getType = async (payload?: string): Promise<typeResponse> => {
  const response = await apiClient.get<typeResponse>(`/api/v1/type/show-all?${payload}`);
  return response.data;
};

export const createType = async (data: typeRes): Promise<typeResponse> => {
  const response = await apiClient.post<typeResponse>(
    `/api/v1/type/create`,
    data
  );
  return response.data;
};

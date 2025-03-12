// src/api/authAPI.ts
import apiClient from './apiClient';
import { Hirarky } from './utils/user';

export interface ListHirarkyData {
  total_items: number;
  page: number;
  limit: number;
  total_pages: number;
  items: Hirarky[];
}

export interface hirarkyResponse {
  status: boolean;
  message: string;
  data: ListHirarkyData;
}

export interface HirarkyReq {
  name: string;
  description: string;
  levels: HirarkyLevel[];
}

export interface HirarkyLevel {
  sequence: number;
  requiredRole: string;
  approverId: string;
}

export const getHirarky = async (payload?: string): Promise<hirarkyResponse> => {
  const response = await apiClient.get<hirarkyResponse>(
    `/api/v1/hirarky/show-all?${payload}`
  );
  return response.data;
};

export const createHirarky = async (data: HirarkyReq): Promise<hirarkyResponse> => {
  const response = await apiClient.post<hirarkyResponse>(
    '/api/v1/hirarky/create', data
  );
  return response.data;
};

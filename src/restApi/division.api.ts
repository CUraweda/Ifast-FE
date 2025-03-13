// src/api/authAPI.ts
import apiClient from './base.api';
import { Division } from './utils/user';


export interface ListdivisionData {
  total_items: number;
  page: number;
  limit: number;
  total_pages: number;
  items: Division[];
}

export interface Response {
  status: boolean;
  message: string;
  data: ListdivisionData;
}

export const getDivision = async (): Promise<Response> => {
  const response = await apiClient.get<Response>('/api/v1/division/show-all');
  return response.data;
};

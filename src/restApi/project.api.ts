// src/api/authAPI.ts
import apiClient from './base.api';
import { Role } from './utils/user';

export interface ListProjectData {
  total_items: number;
  page: number;
  limit: number;
  total_pages: number;
  items: Role[];
}

export interface ProjectResponse {
  status: boolean;
  message: string;
  data: ListProjectData;
}

export interface ProjectRes {
  name: string;
  code: string;
  description: string;
}

export const getProjectCode = async (payload?: string): Promise<ProjectResponse> => {
  const response = await apiClient.get<ProjectResponse>(`/api/v1/project/show-all?${payload}`);
  return response.data;
};

export const createProject = async (data: ProjectRes): Promise<ProjectResponse> => {
  const response = await apiClient.post<ProjectResponse>(
    `/api/v1/project/create`,
    data
  );
  return response.data;
};

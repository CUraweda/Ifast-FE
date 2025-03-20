
import apiClient from './base.api';
import { createSubmission, getOneSubmissionResponse, submissionResponse } from './utils/submission';

export const getAllSubmission = async (payload?: string): Promise<submissionResponse> => {
  const response = await apiClient.get<submissionResponse>(`/api/v1/submission/show-all?${payload}`);
  return response.data;
};

export const createSubmissions = async (data: createSubmission): Promise<any> => {
  const response = await apiClient.post<submissionResponse>(
    `/api/v1/submission/create`,
    data
  );
  return response.data;
};

export const getOneSubmissions = async (id: string): Promise<getOneSubmissionResponse> => {
  const response = await apiClient.get<getOneSubmissionResponse>(
    `/api/v1/submission/show-one/${id}`,
  );
  return response.data;
};

export const editSubmissions = async (id: string, data: any): Promise<getOneSubmissionResponse> => {
  const response = await apiClient.put<getOneSubmissionResponse>(
    `/api/v1/submission/update/${id}`, data
  );
  return response.data;
};

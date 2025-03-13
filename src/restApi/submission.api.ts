
import apiClient from './base.api';
import { createSubmission, submissionResponse } from './utils/submission';

export const getAllSubmission = async (payload?: string): Promise<submissionResponse> => {
  const response = await apiClient.get<submissionResponse>(`/api/v1/submission/show-all?${payload}`);
  return response.data;
};

export const createSubmissions = async (data: createSubmission): Promise<submissionResponse> => {
  const response = await apiClient.post<submissionResponse>(
    `/api/v1/submission/create`,
    data
  );
  return response.data;
};

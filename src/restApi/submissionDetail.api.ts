
import apiClient from './base.api';
import { submissionResponse } from './utils/submission';

export const createSubmissionsDetail = async (data: any): Promise<any> => {
  const response = await apiClient.post<submissionResponse>(
    `/api/v1/submission-detail/create`,
    data
  );
  return response.data;
};

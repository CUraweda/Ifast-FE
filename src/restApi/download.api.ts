import apiClient from './base.api';

export const downloadData = async (payload?: string): Promise<any> => {
  const response = await apiClient.get<any>(`/api/download?path=${payload}`);
  
  return response;
};

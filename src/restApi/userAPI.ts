import { addUser } from '@/type/user';
import apiClient from './apiClient';
import { HirarkyReq, ListUsersResponse, RoleReq, UserResponse } from './utils/user';

export const getDataUser = async (): Promise<UserResponse> => {
  const response = await apiClient.get<UserResponse>('/api/v1/user/show-me');
  return response.data;
};

export const getAllUsers = async (
  payload: string
): Promise<ListUsersResponse> => {
  const response = await apiClient.get<ListUsersResponse>(
    `/api/v1/user/show-all?${payload}`
  );
  return response.data;
};

export const createUsers = async (
  data: addUser
): Promise<ListUsersResponse> => {
  const response = await apiClient.post<ListUsersResponse>(
    `/api/v1/auth/register`,
    data
  );
  return response.data;
};

export const addRoleIntoUsers = async (
  id: string,
  data: RoleReq
): Promise<ListUsersResponse> => {
  const response = await apiClient.post<ListUsersResponse>(
    `/api/v1/user/add-roles/${id}`,
    data
  );
  return response.data;
};

export const removeRoleUsers = async (
  id: string,
  data: RoleReq
): Promise<ListUsersResponse> => {
  const response = await apiClient.delete<ListUsersResponse>(
    `/api/v1/user/remove-roles/${id}`,
    {data}
  );
  return response.data;
};

export const addHirarkyIntoUsers = async (
  id: string,
  data: HirarkyReq
): Promise<ListUsersResponse> => {
  const response = await apiClient.put<ListUsersResponse>(
    `/api/v1/user/update-hirarky/${id}`,
    data
  );
  return response.data;
};

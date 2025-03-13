import { create } from 'zustand';
import getErrorMessage from '@/restApi/helper.api';
import {
  getRoles,
  ListRoleData,
  RoleRes,
  rolesResponse,
  createRoles,
} from '@/restApi/roles.api';
import Swal from 'sweetalert2';

interface AuthState {
  roles: ListRoleData | null;
  isLoading: boolean;
  error: string | null;
  getAllRoles: (payload?: string) => Promise<void>;
  createRoles: (data: RoleRes) => Promise<void>;
}

const divisionStore = create<AuthState>((set) => ({
  roles: null,
  isLoading: false,
  error: null,

  getAllRoles: async (payload?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response: rolesResponse = await getRoles(payload);
      set({
        roles: response.data,
        isLoading: false,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getErrorMessage(error, 'failed. Please try again.'),
       
      });
      set({
        error: getErrorMessage(error, 'failed. Please try again.'),
        isLoading: false,
      });
    }
  },
  createRoles: async (data: RoleRes ) => {
    set({ isLoading: true, error: null });
    try {
      await createRoles(data);
      set({
        isLoading: false,
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'saved',
        text: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getErrorMessage(error, 'failed. Please try again.'),
       
      });
      set({
        error: getErrorMessage(error, 'failed. Please try again.'),
        isLoading: false,
      });
    }
  },
}));

export default divisionStore;

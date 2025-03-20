import { create } from 'zustand';
import getErrorMessage from '@/restApi/helper.api';

import Swal from 'sweetalert2';
import { createCatgeorySubmission, getCategorySubmission, ListRoleData, RoleRes, rolesResponse } from '@/restApi/categoriSubmission.api';

interface AuthState {
  category: ListRoleData | null;
  isLoading: boolean;
  error: string | null;
  getAllCategorySubmission: (payload?: string) => Promise<void>;
  createCategorySubmission: (data: RoleRes) => Promise<void>;
}

const divisionStore = create<AuthState>((set) => ({
  category: null,
  isLoading: false,
  error: null,

  getAllCategorySubmission: async (payload?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response: rolesResponse = await getCategorySubmission(payload);
      set({
        category: response.data,
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
  createCategorySubmission: async (data: RoleRes ) => {
    set({ isLoading: true, error: null });
    try {
      
      await createCatgeorySubmission(data);
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

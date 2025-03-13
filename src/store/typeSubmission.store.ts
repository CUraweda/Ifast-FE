import { create } from 'zustand';
import getErrorMessage from '@/restApi/helper.api';
import Swal from 'sweetalert2';
import {
  createType,
  getType,
  ListTypeData,
  typeRes,
  typeResponse,
} from '@/restApi/typeSubmission.api';

interface AuthState {
  typeSubmission: ListTypeData | null;
  isLoading: boolean;
  error: string | null;
  getAllType: (payload?: string) => Promise<void>;
  createType: (data: typeRes) => Promise<void>;
}

const typeSubmissionStore = create<AuthState>((set) => ({
  typeSubmission: null,
  isLoading: false,
  error: null,

  getAllType: async (payload?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response: typeResponse = await getType(payload);
      set({
        typeSubmission: response.data,
        isLoading: false,
      });
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: getErrorMessage(error, 'failed. Please try again.'),
      });
      set({
        error: getErrorMessage(error, 'failed. Please try again.'),
        isLoading: false,
      });
    }
  },
  createType: async (data: typeRes) => {
    set({ isLoading: true, error: null });
    try {
      await createType(data);
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
        icon: 'error',
        title: 'Oops...',
        text: getErrorMessage(error, 'failed. Please try again.'),
      });
      set({
        error: getErrorMessage(error, 'failed. Please try again.'),
        isLoading: false,
      });
    }
  },
}));

export default typeSubmissionStore;

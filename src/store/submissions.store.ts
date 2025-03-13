import { create } from 'zustand';
import getErrorMessage from '@/restApi/helper.api';
import {
  createSubmissions,
getAllSubmission
} from '@/restApi/submission.api';
import Swal from 'sweetalert2';
import { createSubmission, submissionList, submissionResponse } from '@/restApi/utils/submission';

interface AuthState {
  submissionList: submissionList | null;
  isLoading: boolean;
  error: string | null;
  getAllSubmission: (payload?: string) => Promise<void>;
  createSubmission: (data: createSubmission) => Promise<void>;
}

const submissionStore = create<AuthState>((set) => ({
  submissionList: null,
  isLoading: false,
  error: null,

  getAllSubmission: async (payload?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response: submissionResponse = await getAllSubmission(payload);
      set({
        submissionList: response.data,
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
  createSubmission: async (data: createSubmission ) => {
    set({ isLoading: true, error: null });
    try {
      await createSubmissions(data);
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

export default submissionStore;

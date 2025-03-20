import { create } from 'zustand';
import getErrorMessage from '@/restApi/helper.api';
import {
  createSubmissions,
  editSubmissions,
  getAllSubmission,
  getOneSubmissions,
} from '@/restApi/submission.api';
import Swal from 'sweetalert2';
import {
  createSubmission,
  submissionList,
  submissionResponse,
  submissionType,
} from '@/restApi/utils/submission';
import { listed } from '@/constant/listed';

interface AuthState {
  submissionList: submissionList | null;
  submissionData: submissionType | null;
  isLoading: boolean;
  error: string | null;
  getAllSubmission: (payload?: string) => Promise<void>;
  getOneSubmission: (id: string) => Promise<void>;
  updateSubmission: (id: string, data: any) => Promise<void>;
  createSubmission: (data: createSubmission) => Promise<void>;
}

const submissionStore = create<AuthState>((set) => ({
  submissionList: null,
  submissionData: null,
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
  getOneSubmission: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await getOneSubmissions(id);

      set({
        submissionData: data,
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
  updateSubmission: async (id: string, data: any) => {
    set({ isLoading: true, error: null });
    try {
      await editSubmissions(id, data);

      set({
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
  createSubmission: async (data: createSubmission) => {
    set({ isLoading: true, error: null });
    try {
      
      const response = await createSubmissions(data);
      const id = response.data.id;
      window.location.href = `${listed.submissionDetail}?id=${id}`;

      set({
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
}));

export default submissionStore;

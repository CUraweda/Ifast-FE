import { create } from 'zustand';
import getErrorMessage from '@/restApi/helper.api';

import Swal from 'sweetalert2';
import { submissionDetail } from '@/restApi/utils/submission';

import { createSubmissionsDetail } from '@/restApi/submissionDetail.api';

interface AuthState {
  error: string | null;
  createSubmissionDetail: (data: submissionDetail) => Promise<void>;
}

const submissionDetailStore = create<AuthState>((set) => ({
  error: null,

  createSubmissionDetail: async (data: submissionDetail) => {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      await createSubmissionsDetail(formData);
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: getErrorMessage(error, 'failed. Please try again.'),
      });
      set({
        error: getErrorMessage(error, 'failed. Please try again.'),
      });
    }
  },
}));

export default submissionDetailStore;

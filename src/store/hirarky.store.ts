import { create } from 'zustand';
import getErrorMessage from '@/restApi/helper.api';
import { createHirarky, getHirarky, HirarkyReq } from '@/restApi/hirarky.api';
import { hirarkyResponse, ListHirarkyData } from '@/restApi/hirarky.api';
import Swal from 'sweetalert2';

interface State {
  hirarkyList: ListHirarkyData | null;
  isLoading: boolean;
  error: string | null;
  getAllHirarky: (payload?: string) => Promise<void>;
  createHirarky: (data: HirarkyReq) => Promise<void>;
}

const divisionStore = create<State>((set) => ({
  hirarkyList: null,
  isLoading: false,
  error: null,

  getAllHirarky: async (payload?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response: hirarkyResponse = await getHirarky(payload);
      set({
        hirarkyList: response.data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: getErrorMessage(error, 'failed. Please try again.'),
        isLoading: false,
      });
    }
  },

  createHirarky: async (data: HirarkyReq) => {
    set({ isLoading: true, error: null });
    try {
      await createHirarky(data);

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

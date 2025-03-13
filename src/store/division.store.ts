import {create} from 'zustand';
import getErrorMessage from '@/restApi/helper.api';
import { getDivision, ListdivisionData, Response } from '@/restApi/division.api';

interface AuthState {
  division: ListdivisionData | null;
  isLoading: boolean;
  error: string | null;
  getAll: () => Promise<void>;
}

const divisionStore = create<AuthState>((set) => ({
  division: null,
  isLoading: false,
  error: null,

  getAll: async () => {
    set({ isLoading: true, error: null });
    try {
      const response: Response = await getDivision()
     
      set({
        division : response.data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: getErrorMessage(error, 'failed. Please try again.'),
        isLoading: false,
      });
    }
  },

}));

export default divisionStore;

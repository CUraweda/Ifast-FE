import {create} from 'zustand';
import getErrorMessage from '@/restApi/apiHelper';
import { getRoles, ListRoleData, rolesResponse } from '@/restApi/rolesAPI';

interface AuthState {
  roles: ListRoleData| null;
  isLoading: boolean;
  error: string | null;
  getAllRoles: () => Promise<void>;
}

const divisionStore = create<AuthState>((set) => ({
  roles: null,
  isLoading: false,
  error: null,

  getAllRoles: async () => {
    set({ isLoading: true, error: null });
    try {
      const response: rolesResponse = await getRoles()
      set({
        roles : response.data,
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

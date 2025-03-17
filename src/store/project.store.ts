import { create } from 'zustand';
import getErrorMessage from '@/restApi/helper.api';
import Swal from 'sweetalert2';
import { createProject, getProjectCode, ListProjectData, ProjectRes, ProjectResponse } from '@/restApi/project.api';

interface AuthState {
  projectList: ListProjectData | null;
  isLoading: boolean;
  error: string | null;
  getAllProject: (payload?: string) => Promise<void>;
  createProject: (data: ProjectRes) => Promise<void>;
}

const projectStore = create<AuthState>((set) => ({
  projectList: null,
  isLoading: false,
  error: null,

  getAllProject: async (payload?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response: ProjectResponse = await getProjectCode(payload);
      set({
        projectList: response.data,
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
  createProject: async (data: ProjectRes ) => {
    set({ isLoading: true, error: null });
    try {
      await createProject(data);
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

export default projectStore;

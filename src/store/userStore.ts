import { create } from 'zustand';
import getErrorMessage from '@/restApi/apiHelper';
import { addHirarkyIntoUsers, addRoleIntoUsers, createUsers, getAllUsers, getDataUser, removeRoleUsers } from '@/restApi/userAPI';
import {
  HirarkyReq,
  ListUsersData,
  ListUsersResponse,
  RoleReq,
  User,
  UserResponse,
} from '@/restApi/utils/user';
import { addUser } from '@/type/user';
import Swal from 'sweetalert2';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  userList: ListUsersData | null;
  dataUser: () => Promise<void>;
  allUser: (payload: string) => Promise<void>;
  createUser: (data: addUser) => Promise<void>;
  addRoleUser: (id: string, data: RoleReq) => Promise<void>;
  addHirarkyUser: (id: string, data: HirarkyReq) => Promise<void>;
  removeRoleUser: (id: string, data: RoleReq) => Promise<void>;
}

const userStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  userList: null,

  dataUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response: UserResponse = await getDataUser();
      const { data } = response;

      set({
        user: data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: getErrorMessage(error, 'failed. Please try again.'),
        isLoading: false,
      });
    }
  },

  allUser: async (payload: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data }: ListUsersResponse = await getAllUsers(payload);

      set({
        userList: data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: getErrorMessage(error, 'failed. Please try again.'),
        isLoading: false,
      });
    }
  },

  createUser: async (data: addUser) => {
    set({ isLoading: true, error: null });
    try {
      await createUsers(data);
      set({
        isLoading: false,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "saved",
        text: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
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

  addRoleUser: async (id:string, data: RoleReq) => {
    set({ isLoading: true, error: null });
    try {
      await addRoleIntoUsers(id, data);
      set({
        isLoading: false,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "saved",
        text: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
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
  addHirarkyUser: async (id:string, data: HirarkyReq) => {
    set({ isLoading: true, error: null });
    try {
      await addHirarkyIntoUsers(id, data);
      set({
        isLoading: false,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "saved",
        text: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
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
  removeRoleUser: async (id:string, data: RoleReq) => {
    set({ isLoading: true, error: null });
    try {
      await removeRoleUsers(id, data);
      set({
        isLoading: false,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "saved",
        text: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
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

export default userStore;

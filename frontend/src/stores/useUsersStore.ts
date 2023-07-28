import { create } from "zustand";

const API_URL = "http://localhost:8080/api/user";

interface User {
  id: number;
  username: string;
  name: string;
  photo: string;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string;
  fetchUsers: () => Promise<void>;
  addUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

const useUsersStore = create<UsersState>((set) => ({
  users: [],
  loading: false,
  error: "",
  fetchUsers: async () => {
    set((state) => ({ ...state, loading: true }))
    try {
      const res = await fetch(`${API_URL}/all`)
      const users = await res.json()
      console.log('hey',users)
      set((state) => ({ ...state, error: "", users }))
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }))
    } finally {
      set((state) => ({
        ...state,
        loading: false,
      }))
    }
  },
  addUser: async (user: User) => {

  },
  updateUser: async (user: User) => {

  },
  deleteUser: async (id: number) => {

  },
}));

export default useUsersStore;
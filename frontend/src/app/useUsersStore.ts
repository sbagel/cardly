import { create, StoreApi } from "zustand";

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

const initialState: UsersState = {
  users: [],
  loading: false,
  error: "",
  fetchUsers: async () => {},
  addUser: async (user: User) => {},
  updateUser: async (user: User) => {},
  deleteUser: async (id: number) => {},
};

export const useUsersStore = create<UsersState>((set: StoreApi<UsersState>['setState']) => ({
  ...initialState,

  fetchUsers: async () => {
    set((state) => ({ ...state, loading: true }));
    try {
      const res = await fetch(`${API_URL}/all`);
      const users = await res.json();
      set((state) => ({ ...state, error: "", users }));
    } catch (e) {
      set((state) => ({
        ...state,
        error: e.message,
      }));
    } finally {
      set((state) => ({
        ...state,
        loading: false,
      }));
    }
  },

  addUser: async (user: User) => {
    // Implement the logic to add a new user
  },

  updateUser: async (user: User) => {
    // Implement the logic to update a user
  },

  deleteUser: async (id: number) => {
    // Implement the logic to delete a user
  },
}));

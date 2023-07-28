import { create } from "zustand";

const API_URL = "http://localhost:8080/api/user";

interface User {
  id: number;
  username: string;
  name: string;
  photo: string;
}

export interface UsersState {
  user: User;
  loading: boolean;
  error: string;
  fetchUsers: (id: number) => Promise<void>;
  addUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

const useUsersStore = create<UsersState>((set) => ({
  user: {
    id: 0,
    username: '',
    name: '',
    photo: ''
  },
  loading: false,
  error: "",
  fetchUsers: async (id: number) => {
    set((state) => ({ ...state, loading: true }))
    try {
      const res = await fetch(`${API_URL}/${id}`)
      const user = await res.json()
      set((state) => ({ ...state, error: "", user }))
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
    set((state) => ({ ...state, loading: true, error: "" }));
    try {
      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const newUser = await res.json();
      set((state) => ({ ...state, error: "", user: newUser }));
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    } finally {
      set((state) => ({
        ...state,
        loading: false,
      }));
    }
  },
  updateUser: async (user: User) => {
    set((state) => ({ ...state, loading: true, error: "" }));
    try {
      const res = await fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const updatedUser = await res.json();
      set((state) => ({
        ...state,
        error: "",
        users: state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
      }));
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    } finally {
      set((state) => ({
        ...state,
        loading: false,
      }));
    }
  },
  deleteUser: async (id: number) => {
    set((state) => ({ ...state, loading: true, error: "" }));
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        ...state,
        error: "",
        users: state.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    } finally {
      set((state) => ({
        ...state,
        loading: false,
      }));
    }
  },
}));

export default useUsersStore;
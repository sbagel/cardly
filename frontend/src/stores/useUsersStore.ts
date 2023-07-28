import { create } from "zustand";
import { User, UsersState } from "../types/UserTypes"

const API_URL = "http://localhost:8080/api/user";

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
        users: state.user.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
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
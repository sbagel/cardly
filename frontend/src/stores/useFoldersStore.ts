import { create } from "zustand";
import { Folder, FolderDeck, FoldersState } from "../types/FolderTypes";

const API_URL = "http://localhost:8080/api/folder";

const useFoldersStore = create<FoldersState>((set) => ({
  folders: [],
  loading: false,
  error: "",
  fetchFolders: async (userId: number) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const res = await fetch(`${API_URL}/all?userId=${userId}`);
      const folders = await res.json();
      set((state) => ({ ...state, error: "", folders }));
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
  addFolder: async (folder: Folder) => {
    set((state) => ({ ...state, loading: true, error: "" }));
    try {
      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(folder),
      });
      const newFolder = await res.json();
      set((state) => ({ ...state, error: "", folders: [newFolder, ...state.folders] }));
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
  addDeckToFolder: async (folderDeck: FolderDeck) => {
    set((state) => ({ ...state, loading: true, error: "" }));
    try {
      const res = await fetch(`${API_URL}/addDeck`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(folderDeck),
      });

      if (!res.ok) {
        throw new Error("Failed to add deck to folder.");
      }
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
  updateFolder: async (folder: Folder) => {
    set((state) => ({ ...state, loading: true, error: "" }));
    try {
      const res = await fetch(`${API_URL}/${folder.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(folder),
      });
      if (res.ok) {
        set((state) => ({
          ...state,
          error: "",
          folders: state.folders.map((f) => (f.id === folder.id ? folder : f)),
        }));
      } else {
        throw new Error("Update failed.");
      }
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
  deleteFolder: async (id: number) => {
    set((state) => ({ ...state, loading: true, error: "" }));
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        set((state) => ({
          ...state,
          error: "",
          folders: state.folders.filter((f) => f.id !== id),
        }));
      } else {
        throw new Error("Deletion failed.");
      }
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

export default useFoldersStore;

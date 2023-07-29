import { create } from "zustand";
import { Deck, DecksState } from "../types/DeckTypes";

const API_URL = "http://localhost:8080/api/deck";

const useDeckStore = create<DecksState>((set) => ({
  decks: [],
  currentDeck: {
    id: 0,
    userId: 0,
    title: '',
    visible: false,
  },
  loading: false,
  error: "",
  fetchDecks: async (userId: number) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const res = await fetch(`${API_URL}/all?userId=${userId}`);
      const decks = await res.json();
      set((state) => ({ ...state, error: "", decks }));
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
  addDeck: async (deck: Deck) => {
    set((state) => ({ ...state, loading: true, error: "" }));
    try {
      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deck),
      });
      const newDeck = await res.json();
      set((state) => ({ ...state, error: "", decks: [newDeck, ...state.decks] }));
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
  updateDeck: async (deck: Deck) => {
    set((state) => ({ ...state, loading: true, error: "" }));
    try {
      const res = await fetch(`${API_URL}/${deck.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deck),
      });
      if (res.ok) {
        set((state) => ({
          ...state,
          error: "",
          decks: state.decks.map((d) => (d.id === deck.id ? deck : d)),
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
  deleteDeck: async (id: number) => {
    set((state) => ({ ...state, loading: true, error: "" }));
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        set((state) => ({
          ...state,
          error: "",
          decks: state.decks.filter((d) => d.id !== id),
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
  selectDeck: async (id: number) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const res = await fetch(`${API_URL}/${id}`);
      const currentDeck = await res.json();
      set((state) => ({ ...state, error: "", currentDeck }));
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
  }
}));

export default useDeckStore;

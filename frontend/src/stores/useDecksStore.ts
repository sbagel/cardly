import { create } from "zustand";
import { Deck, DecksState } from "../types/DeckTypes";

const API_URL = "http://localhost:8080/api/deck";

const useDeckStore = create<DecksState>((set) => ({
  decks: [],
  titles: [],
  currentDeck: {
    id: 0,
    userID: 0,
    title: '',
    description: '',
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
  fetchDeckTitles: async (userId: number) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const res = await fetch(`${API_URL}/all/titles?userId=${userId}`);
      const titles = await res.json();
      set((state) => ({ ...state, error: "", titles }));
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
      set((state) => ({ ...state, error: "", currentDeck: newDeck, decks: [newDeck, ...state.decks] }));
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
  deleteDeck: async (id: number, title: string) => {
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
          titles: state.titles.filter((d) => d !== title),
          currentDeck: state.decks[0].title == title ? state.decks[1] : state.decks[0],
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
  selectDeck: async (deck: Deck) => {
    set((state) => ({ ...state,  currentDeck: deck }));
  }
}));

export default useDeckStore;

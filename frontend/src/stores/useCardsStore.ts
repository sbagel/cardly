import { create } from "zustand";
import { Card, CardsState } from "../types/CardTypes";

const API_URL = "http://localhost:8080/api/card";

const useCardsStore = create<CardsState>((set) => ({
  cards: [],
  loading: false,
  error: "",
  fetchCards: async (deckId: number) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const res = await fetch(`${API_URL}/all?deckId=${deckId}`);
      const cards = await res.json();
      set((state) => ({ ...state, error: "", cards }));
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
  addCard: async (card: Card) => {
    set((state) => ({ ...state, loading: true, error: "" }));
    try {
      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card),
      });
      const newCard = await res.json();
      set((state) => ({ ...state, error: "", cards: [...state.cards, newCard] }));
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
  updateCard: async (card: Card) => {
    set((state) => ({ ...state, loading: true, error: "" }));
    try {
      const res = await fetch(`${API_URL}/${card.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card),
      });
      if (res.ok) {
        set((state) => ({
          ...state,
          error: "",
          cards: state.cards.map((c) => (c.id === card.id ? card : c)),
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
  deleteCard: async (id: number) => {
    set((state) => ({ ...state, loading: true, error: "" }));
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        set((state) => ({
          ...state,
          error: "",
          cards: state.cards.filter((c) => c.id !== id),
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

export default useCardsStore;

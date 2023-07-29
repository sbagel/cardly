export interface Deck {
  id: number;
  userId: number;
  title: string;
  visible: boolean;
}

export interface DecksState {
  decks: Deck[];
  loading: boolean;
  error: string;
  fetchDecks: (userId: number) => Promise<void>;
  addDeck: (deck: Deck) => Promise<void>;
  updateDeck: (deck: Deck) => Promise<void>;
  deleteDeck: (id: number) => Promise<void>;
}
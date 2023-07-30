export interface Deck {
  id: number;
  userID: number;
  title: string;
  description: string;
  visible: boolean;
}

export interface DecksState {
  decks: Deck[];
  currentDeck: Deck;
  loading: boolean;
  error: string;
  fetchDecks: (userId: number) => Promise<void>;
  addDeck: (deck: Deck) => Promise<void>;
  updateDeck: (deck: Deck) => Promise<void>;
  deleteDeck: (id: number) => Promise<void>;
  selectDeck: (deck: Deck) => Promise<void>;
}
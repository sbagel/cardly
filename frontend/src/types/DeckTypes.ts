export interface Deck {
  id: number;
  userID: number;
  title: string;
  description: string;
  visible: boolean;
}

export interface DecksState {
  decks: Deck[];
  titles: string[];
  currentDeck: Deck;
  loading: boolean;
  error: string;
  fetchDecks: (userId: number) => Promise<void>;
  fetchDeckTitles: (userId: number) => Promise<void>;
  addDeck: (deck: Deck) => Promise<void>;
  updateDeck: (deck: Deck) => Promise<void>;
  deleteDeck: (id: number, title: string) => Promise<void>;
  selectDeck: (deck: Deck) => Promise<void>;
}
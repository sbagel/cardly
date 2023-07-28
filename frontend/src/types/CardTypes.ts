export interface Card {
  id: number;
  deckId: number;
  front: string;
  back: string;
  favorited: boolean;
}

export interface CardsState {
  cards: Card[];
  loading: boolean;
  error: string;
  fetchCards: (deckId: number) => Promise<void>;
  addCard: (card: Card) => Promise<void>;
  updateCard: (card: Card) => Promise<void>;
  deleteCard: (id: number) => Promise<void>;
}
import useDeckStore from '../../stores/useDecksStore';
import { shallow } from "zustand/shallow";

const useDecksFacade = () => {
  const { decks, loading, error, fetchDecks, addDeck, updateDeck, deleteDeck } =
    useDeckStore(
      (state) => ({
        decks: state.decks,
        loading: state.loading,
        error: state.error,
        fetchDecks: state.fetchDecks,
        addDeck: state.addDeck,
        updateDeck: state.updateDeck,
        deleteDeck: state.deleteDeck,
      }),
      shallow
    );

  return { decks, loading, error, fetchDecks, addDeck, updateDeck, deleteDeck };
};

export default useDecksFacade;

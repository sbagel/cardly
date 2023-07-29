import useDeckStore from '../../stores/useDecksStore';
import { shallow } from "zustand/shallow";

const useDecksFacade = () => {
  const { decks, currentDeck, loading, error, fetchDecks, addDeck, updateDeck, deleteDeck, selectDeck } =
    useDeckStore(
      (state) => ({
        decks: state.decks,
        currentDeck: state.currentDeck,
        loading: state.loading,
        error: state.error,
        fetchDecks: state.fetchDecks,
        addDeck: state.addDeck,
        updateDeck: state.updateDeck,
        deleteDeck: state.deleteDeck,
        selectDeck: state.selectDeck,
      }),
      shallow
    );

  return { decks, currentDeck, loading, error, fetchDecks, addDeck, updateDeck, deleteDeck, selectDeck };
};

export default useDecksFacade;

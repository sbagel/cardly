import useDeckStore from '../../stores/useDecksStore';
import { shallow } from "zustand/shallow";

const useDecksFacade = () => {
  const { decks, titles, currentDeck, loading, error, fetchDecks, fetchDeckTitles, addDeck, updateDeck, deleteDeck, selectDeck } =
    useDeckStore(
      (state) => ({
        decks: state.decks,
        titles: state.titles,
        currentDeck: state.currentDeck,
        loading: state.loading,
        error: state.error,
        fetchDecks: state.fetchDecks,
        fetchDeckTitles: state.fetchDeckTitles,
        addDeck: state.addDeck,
        updateDeck: state.updateDeck,
        deleteDeck: state.deleteDeck,
        selectDeck: state.selectDeck,
      }),
      shallow
    );

  return { decks, titles, currentDeck, loading, error, fetchDecks, fetchDeckTitles, addDeck, updateDeck, deleteDeck, selectDeck };
};

export default useDecksFacade;

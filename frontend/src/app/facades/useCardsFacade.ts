import useCardsStore from "../../stores/useCardsStore";
import { shallow } from "zustand/shallow";

const useCardsFacade = () => {
  const { cards, loading, error, fetchCards, addCard, updateCard, deleteCard } =
    useCardsStore(
      (state) => ({
        cards: state.cards,
        loading: state.loading,
        error: state.error,
        fetchCards: state.fetchCards,
        addCard: state.addCard,
        updateCard: state.updateCard,
        deleteCard: state.deleteCard,
      }),
      shallow
    );

  return { cards, loading, error, fetchCards, addCard, updateCard, deleteCard };
};

export default useCardsFacade;

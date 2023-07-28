import { useEffect } from "react";
import useCardsStore from "../../stores/useCardsStore";
import { CardsState } from "../../types/CardTypes";
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

  useEffect(() => {
    const unsubscribe = useCardsStore.subscribe((newState: CardsState) => {
      console.log("New cards:", newState.cards);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { cards, loading, error, fetchCards, addCard, updateCard, deleteCard };
};

export default useCardsFacade;

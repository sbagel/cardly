import { useEffect } from "react";
import { createStyles, Container, Text, rem } from '@mantine/core';
import useCardsFacade from '../../facades/useCardsFacade.ts';
import Card from './Card.tsx';
import { Deck } from "../../../types/DeckTypes.ts"

const useStyles = createStyles(() => ({
  inner: {
    width: '100%',
  },
}));

interface RecentlyAddedCardsProps {
  deck: Deck
}

export default function RecentlyAddedCards({deck}: RecentlyAddedCardsProps ) {
  const { cards, loading, error, fetchCards } = useCardsFacade();
  const { classes } = useStyles();

  useEffect(() => {
    fetchCards(deck.id)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[deck])

  return (
    <Container className={classes.inner} mb={60}>
      <Text fw={700} fz={rem(20)}>Recently added cards</Text>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {cards?.length > 0 && (
        cards.map((card) => (
          <Card card={card} key={`cardkey-${card.id}`} />
        ))
      )}
    </Container>
  );
}
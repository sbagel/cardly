import { useEffect } from "react";
import { createStyles, Container, Text, rem } from '@mantine/core';
import useDecksFacade from "../../facades/useDecksFacade.ts";
import useCardsFacade from '../../facades/useCardsFacade.ts';
import Card from './Card.tsx';

const useStyles = createStyles(() => ({
  inner: {
    width: '100%',
  },
}));

export default function RecentlyAddedCards() {
  const { currentDeck } = useDecksFacade();
  const { cards, loading, error, fetchCards } = useCardsFacade();
  const { classes } = useStyles();

  useEffect(() => {
    fetchCards(currentDeck.id ? currentDeck.id : 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDeck]);

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
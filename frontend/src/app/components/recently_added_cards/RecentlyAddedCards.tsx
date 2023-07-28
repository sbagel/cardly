import { useEffect } from "react";
import { createStyles, Container, Text, rem } from '@mantine/core';
import useCardsFacade from '../../facades/useCardsFacade';
import Card from './Card.tsx';

const useStyles = createStyles(() => ({
  inner: {
    width: '100%',
  },
}));

export default function RecentlyAddedCards() {
  const { cards, loading, error, fetchCards } = useCardsFacade();

  const { classes } = useStyles();

  useEffect(() => {
    fetchCards(2);
  }, []);

  return (
    <Container className={classes.inner}>
      <Text fw={700} fz={rem(20)}>Recently added cards</Text>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {cards?.length > 0 && (
        cards.map((card, index: number) => (
          <Card card={card} key={`key-${index}`} />
        ))
      )}
    </Container>
  );
}

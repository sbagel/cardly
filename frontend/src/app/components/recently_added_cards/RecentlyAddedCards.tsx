import { SetStateAction } from "react";
import { createStyles, Container, Text, rem } from '@mantine/core';
import Card from './Card.tsx';
import { CardsState, Card as CardT } from '../../../types/CardTypes.ts'

const useStyles = createStyles(() => ({
  inner: {
    width: '100%',
  },
}));

interface RecentlyAddedProps {
  cards: CardT[],
  state: CardsState,
  toggle: (value?: SetStateAction<boolean> | undefined) => void
}

export default function RecentlyAddedCards({cards, state, toggle}:RecentlyAddedProps) {
  const { classes } = useStyles();

  return (
    <Container className={classes.inner}>
      <Text fw={700} fz={rem(20)}>Recently added cards</Text>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>{state.error}</p>}
      {cards?.length > 0 && (
        cards.map((card, index: number) => (
          <Card card={card} key={`key-${index}`} toggle={toggle} />
        ))
      )}
    </Container>
  );
}

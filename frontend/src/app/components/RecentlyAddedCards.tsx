
import { useEffect } from "react";
import { createStyles, Container, Text, rem, Divider } from '@mantine/core';
import useCardsFacade from '../facades/useCardsFacade';

const useStyles = createStyles((theme) => ({
  inner: {
    width: '100%',
  },
  card: {
    width: '100%',
    fontSize: rem(18),
    fontWeight: 500,
    padding: rem(20),
    border: `${rem(3)} solid black`,
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: rem(30)
  },
  value: {
    width: '100%',
    padding: `0${rem(20)}`,
    fontWeight: 600
  }
}));

export default function RecentlyAddedCards() {
  const { cards, loading, error, fetchCards } =
    useCardsFacade();

  const { classes } = useStyles();

  useEffect(() => {
    fetchCards(2);
  }, []);

  console.log('cards',cards)

  const cardItems = cards.map((card, index) => (
    <div className={classes.card}>
      <div className={classes.value}>{card.front}</div>
        <Divider style={{width:'96%'}} color="gray.2" my="xs" />
      <div className={classes.value}>{card.back}</div>
    </div>
  ));

  return (
    <Container className={classes.inner}>
      <Text fw={700} fz={rem(20)}>Recently added cards</Text>
      {cardItems}
    </Container>
  )
}
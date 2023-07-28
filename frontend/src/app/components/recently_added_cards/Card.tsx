import { createStyles, Container, Text, rem, Divider } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { Card as CardType } from "../../../types/CardTypes";

const useStyles = createStyles(() => ({
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

interface CardProps {
  card: CardType;
}

export default function Card({ card }: CardProps) {

  const { classes } = useStyles();

  const [termValue, setTermValue] = useInputState(card.front);
  const [definitionValue, setDefinitionValue] = useInputState(card.back);

  return (
    <div className={classes.card}>
      <div className={classes.value}>{termValue}</div>
        <Divider style={{width:'96%'}} color="gray.2" my="xs" />
      <div className={classes.value}>{definitionValue}</div>
    </div>
  )
}
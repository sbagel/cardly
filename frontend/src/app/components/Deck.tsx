import { Deck } from "../../types/DeckTypes";
import DeathStarPattern from "./DeathStarPattern";
import { createStyles, rem} from '@mantine/core';

interface DeckProps {
  deck: Deck,
  index: number
}

const useStyles = createStyles((theme) => ({
  deck: {
    display: 'flex',
    flexDirection: 'column',
    border: `${rem(3)} solid black`,
    height: rem(180),
    width: rem(250),
    borderRadius: rem(15),
    overflow: 'hidden',
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'row',
      width: '100%',
      height: rem(90),
      alignItems: 'center'
    }
  },
  deckHeaderImg:{
    width: '100%',
    height: rem(80),
    overflow: 'hidden',
    [theme.fn.smallerThan('sm')]: {
      width: '10%',
      marginRight: rem(10)
    }
  },
  deckName: {
    padding: theme.spacing.md,
    fontSize: rem(20),
    fontWeight: 600
  }
}));

export default function Deck({deck, index}: DeckProps) {
  const { classes } = useStyles();

  const colors = ['#e8e7fc', '#e7f8fc'];

  const color = deck.title === 'Loading....' ? 'lightgray' : colors[index%2]

  return (
    <div className={classes.deck} >
      <div className={classes.deckHeaderImg}>
        <DeathStarPattern width={120} height={160} fill={color} />
        <DeathStarPattern width={120} height={160} fill={color} />
      </div>
      <div className={classes.deckName}>{deck.title}</div>
    </div>
  )
}

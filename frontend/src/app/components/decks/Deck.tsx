import { Deck } from "../../../types/DeckTypes";
import DeathStarPattern from "../DeathStarPattern.tsx";
import { createStyles, rem, NavLink} from '@mantine/core';
import { useHover, useDisclosure } from '@mantine/hooks';
import { FaEllipsis, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import DeleteDeckModal from "./DeleteDeckModal.tsx";

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
    // overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
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
  },
  ellipsisContainer:{
    // padding: rem(20),
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
  },
  ellipsisIcon:{
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent'
    },
  },
  editCardLabel:{
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    backgroundColor: theme.colorScheme === 'dark' ? theme.black : theme.white,
    fontSize: rem(20)
  },
}));

export default function Deck({deck, index}: DeckProps) {
  const { classes } = useStyles();

  const { hovered, ref } = useHover();

  const [opened, { open, close }] = useDisclosure(false);

  const colors = ['#e8e7fc', '#e7f8fc'];

  const color = deck.title === 'Loading....' ? 'lightgray' : colors[index%2]

  return (
    <div className={classes.deck} ref={ref} >
      <DeleteDeckModal deckId={deck.id} opened={opened} close={close}/>
      {hovered &&
      <div className={classes.ellipsisContainer}>
        <NavLink component="div" className={classes.ellipsisIcon} childrenOffset={0} rightSection={<FaEllipsis size={20}/>}>
          <NavLink component="div" className={classes.editCardLabel} icon={<FaPenToSquare size={15}/>} label="Rename deck" styles={{root: {backgroundColor: 'white'}}}/>
          <NavLink component="div" onClick={open} className={classes.editCardLabel} icon={<FaTrashCan size={15}/>} label="Delete deck"styles={{root: {backgroundColor: 'white', zIndex: 20}}}/>
        </NavLink>
      </div>}

      <div className={classes.deckHeaderImg}>
        <DeathStarPattern width={120} height={160} fill={color} />
        <DeathStarPattern width={120} height={160} fill={color} />
      </div>
      <div className={classes.deckName}>{deck.title}</div>
    </div>
  )
}

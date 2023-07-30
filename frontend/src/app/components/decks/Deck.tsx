import { Deck } from "../../../types/DeckTypes";
import DeathStarPattern from "../DeathStarPattern.tsx";
import { createStyles, rem, NavLink} from '@mantine/core';
import { useHover, useDisclosure } from '@mantine/hooks';
import { FaEllipsis, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import DeleteDeckModal from "./DeleteDeckModal.tsx";
import EditDeckModal from "./EditDeckModal.tsx";

interface DeckProps {
  deck: Deck,
  index: number
}

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    flexDirection: 'column',
    height: rem(180),
    width: rem(280),
    cursor: 'pointer',
    position: 'relative',
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'row',
      width: '100%',
      height: rem(90),
      alignItems: 'center'
    }
  },
  deck: {
    display: 'flex',
    flexDirection: 'column',
    border: `${rem(3)} solid black`,
    height: '100%',
    width: '100%',
    borderRadius: rem(15),
    cursor: 'pointer',
    [theme.fn.smallerThan('md')]: {
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
    [theme.fn.smallerThan('md')]: {
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
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
    zIndex: 20,
  },
  ellipsisIcon:{
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    zIndex: 20,
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
  const navigate = useNavigate();

  const { classes } = useStyles();

  const { hovered, ref } = useHover();

  const [openedDeleteModal, deleteHandler] = useDisclosure(false);
  const [openedEditModal, editHandler] = useDisclosure(false);


  const colors = ['#e8e7fc', '#e7f8fc'];

  const color = deck.title === 'Loading....' ? 'lightgray' : colors[index%2]

  return (
    <div className={classes.inner} ref={ref}>
      <DeleteDeckModal deckId={deck.id} title={deck.title} opened={openedDeleteModal} close={deleteHandler.close}/>
      <EditDeckModal deck={deck} opened={openedEditModal} close={editHandler.close}/>
      {hovered &&
      <div className={classes.ellipsisContainer}>
        <NavLink component="div" className={classes.ellipsisIcon} childrenOffset={0} rightSection={<FaEllipsis size={20}/>}>
          <NavLink component="div" onClick={editHandler.open} className={classes.editCardLabel} icon={<FaPenToSquare size={15}/>} label="Rename deck" styles={{root: {backgroundColor: 'white'}}}/>
          <NavLink component="div" onClick={deleteHandler.open} className={classes.editCardLabel} icon={<FaTrashCan size={15}/>} label="Delete deck"styles={{root: {backgroundColor: 'white', zIndex: 20}}}/>
        </NavLink>
      </div>}
      <div
        className={classes.deck}
        onClick={() => navigate(`/decks/${deck.id}?deckName=${deck.title}`,{state: {deck: deck, return: '/decks'}})}>
        <div className={classes.deckHeaderImg}>
          <div style={{'zoom': '1.12', 'width': '100%'}}>
            <DeathStarPattern width={120} height={160} fill={color} />
            <DeathStarPattern width={120} height={160} fill={color} />
          </div>
        </div>
        <div className={classes.deckName}>{deck.title}</div>
      </div>

    </div>
  )
}

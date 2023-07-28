import { createStyles, NavLink, rem, Divider } from '@mantine/core';
import { useInputState, useDisclosure, useHover } from '@mantine/hooks';
import { Card as CardType } from "../../../types/CardTypes";
import useCardsFacade from '../../facades/useCardsFacade';
import { FaEllipsis, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { SetStateAction } from 'react';

const useStyles = createStyles((theme) => ({
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
    marginTop: rem(30),
    position: 'relative',
  },
  value: {
    width: '100%',
    padding: rem(20),
    fontWeight: 600,
  },
  ellipsisContainer:{
    padding: rem(20),
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
  }
}));

interface CardProps {
  card: CardType;
  toggle: (value?: SetStateAction<boolean> | undefined) => void;
}

export default function Card({ card, toggle }: CardProps) {
  const { deleteCard } = useCardsFacade();

  const { classes } = useStyles();

  const { hovered, ref } = useHover();

  const [termValue, setTermValue] = useInputState(card.front);
  const [definitionValue, setDefinitionValue] = useInputState(card.back);

  const handleDeleteCard = (id: number) => {
    deleteCard(id);
    toggle();
  };

  return (
      <div className={classes.card} ref={ref}>
        {hovered &&
         <div className={classes.ellipsisContainer}>
          <NavLink component="div" className={classes.ellipsisIcon} childrenOffset={28} rightSection={<FaEllipsis/>}>
            <NavLink component="div" className={classes.editCardLabel} icon={<FaPenToSquare size={15}/>} label="Edit card" />
            <NavLink component="div" onClick={() => handleDeleteCard(card.id)} className={classes.editCardLabel} icon={<FaTrashCan size={15}/>} label="Delete card" />
          </NavLink>
        </div>}
        <div className={classes.value}>{termValue}</div>
          <Divider style={{width:'96%'}} color="gray.2" my="xs" />
        <div className={classes.value}>{definitionValue}</div>
      </div>
  )
}
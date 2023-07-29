import { useRef, useState } from 'react';
import { useForm } from '@mantine/form';
import { createStyles, Textarea, NavLink, rem, Divider, Button } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { Card as CardType } from "../../../types/CardTypes";
import useCardsFacade from '../../facades/useCardsFacade';
import { FaEllipsis, FaPenToSquare, FaTrashCan } from "react-icons/fa6";

const useStyles = createStyles((theme) => ({
  card: {
    width: '100%',
    fontSize: rem(18),
    fontWeight: 500,
    padding: rem(20),
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: rem(30),
    position: 'relative',
  },
  value: {
    width: '98%',
    padding: rem(20),
    fontWeight: 500,
    borderRadius: '20px',
    margin: 'auto',
    fontSize: rem(20)
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
  },
  btn: {
    position: 'absolute',
    visibility: 'hidden',
    height:0,
  }
}));

interface CardProps {
  card: CardType;
}

export default function Card({ card }: CardProps) {
  const { deleteCard, updateCard } = useCardsFacade();

  const { classes } = useStyles();

  const [edit, setEdit] = useState(false);
  const { hovered, ref } = useHover();

  const form = useForm({
    initialValues: { id: card.id, deckId: card.deckId, front: card.front, back: card.back, favorited: card.favorited},

    validate: {
      front: (value) => (value.trim().length < 1 || value.split(" ").length < 2 ? 'Card term must have at least 2 words' : null),
      back: (value) => (value.trim().length < 1 ? 'Card defintion is empty' : null),
    },
  });

  const btnRef = useRef<HTMLButtonElement>(null);

  const handleEnter = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      btnRef.current?.click();
      exitEdit();
    }
  };

  const exitEdit = () => {
    if (form.isValid('front') && form.isValid('back')) {
      setEdit(false);
    }
  }

  return (
    <div className={classes.card} ref={ref} style={{border: edit ? `${rem(6)} solid #d6e7fe` : `${rem(3)} solid black`,}}>

    {hovered &&
     <div className={classes.ellipsisContainer}>
      <NavLink component="div" className={classes.ellipsisIcon} childrenOffset={28} rightSection={<FaEllipsis/>}>
        <NavLink component="div" onClick={() => setEdit(true)} className={classes.editCardLabel} icon={<FaPenToSquare size={15}/>} label="Edit card" />
        <NavLink component="div" onClick={() => deleteCard(card.id)} className={classes.editCardLabel} icon={<FaTrashCan size={15}/>} label="Delete card" />
      </NavLink>
    </div>}

      <div style={{width: '100%', pointerEvents: edit ? 'auto' : 'none'}}>
        {!edit && <>
          <div className={classes.value}>{card.front}</div>
          <Divider style={{width:'96%', margin: 'auto'}} color="gray.2" my="xs" />
        <div className={classes.value}>{card.back}</div></>}

        {edit &&
          <form onSubmit={form.onSubmit(updateCard)} onKeyUp={handleEnter} onKeyDown={event => {if (event.key === "Enter" && !event.shiftKey) event.preventDefault()}}>
          <Textarea
            autosize
            className={classes.value}
            variant='unstyled'
            sx={(theme) => ({backgroundColor: edit ? theme.colors.gray[0] : 'inherit', marginBottom: edit ? '20px' : 'auto'})}
            styles={{input: {fontSize: rem(20)}}}
            minRows={1}
            {...form.getInputProps('front')}
          />

            <Divider style={{width:'96%', margin: 'auto'}} color="gray.2" my="xs" />

          <Textarea
            autosize
            className={classes.value}
            variant='unstyled'
            sx={(theme) => ({backgroundColor: edit ? theme.colors.gray[0] : 'inherit', marginTop: edit ? '20px' : 'auto'})}
            styles={{input: {fontSize: rem(20)}}}
            minRows={1}
            {...form.getInputProps('back')}
          />

          <Button ref={btnRef} type="submit" mt="sm" className={classes.btn}></Button>
        </form>
        }
      </div>
    </div>
  )
}
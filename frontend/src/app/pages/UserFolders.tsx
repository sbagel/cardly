
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { createStyles, Container, NavLink, TextInput, rem, Group, Button} from '@mantine/core';

import useUsersFacade from '../facades/useUsersFacade';
import useDecksFacade from '../facades/useDecksFacade';

import { useInputState, useDisclosure } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  inner: {
    height: 'fit',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.fn.smallerThan('md')]: {
      display: 'block',
      marginLeft: rem(-15),
      width: '105%',
    }
  },
  deckOrderContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.fn.smallerThan('md')]: {
      display: 'block',
      marginTop: rem(-30)
    }
  },
  itemBox: {
    width: '50%',
    height: rem(80),
    display: 'flex',
    [theme.fn.smallerThan('md')]: {
      width: '100%',
      height: rem(60),
    }
  },
  sortContainer: {
    width: rem(150),
    marginRight: rem(10),
    height: rem(80),
    [theme.fn.smallerThan('md')]: {
      width: '100%',
      height: rem(20),
      zIndex: 10
    }
  },
  sortBtn: {
    borderRadius: rem(15),
    border: `${rem(3)} solid black`
  },
  searchTextInput: {
    width: '100%',
    height: rem(42),
    border: `${rem(3)} solid black`,
    borderRadius: rem(15),
    fontSize: rem(20),
    '&::placeholder': {
      color: 'blue'
    },
  },
  wideContainer: {
    width: '100%',
  },
  addBtn: {
    [theme.fn.smallerThan('md')]: {
      display: 'none'
    }
  }
}));

export default function UserFolders() {
  const navigate = useNavigate();

  const { classes } = useStyles();
  const { user, checkStorage } = useUsersFacade();
  const { decks, loading, error, fetchDecks } = useDecksFacade();

  const [opened, { open, close }] = useDisclosure(false);

  const [query, setQuery] = useInputState('');

  useEffect(() => {
    checkStorage();

    !user && navigate('/');

    user && fetchDecks(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      hi
    </div>
  )
}
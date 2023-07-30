import { useEffect } from 'react';
import { createStyles, Container, NavLink, TextInput, rem, Group, Button} from '@mantine/core';
import { FaSearch } from 'react-icons/fa';
import { useInputState, useDisclosure } from '@mantine/hooks';
import useDecksFacade from '../facades/useDecksFacade';
import Deck from '../components/decks/Deck';
import { HiChevronRight } from "react-icons/hi";
import { FaPlus } from 'react-icons/fa';
import AddDeckModal from '../components/decks/AddDeckModal';

const useStyles = createStyles((theme) => ({
  inner: {
    height: 'fit',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.fn.smallerThan('sm')]: {
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
    [theme.fn.smallerThan('sm')]: {
      display: 'block',
      marginTop: rem(-30)
    }
  },
  itemBox: {
    width: '50%',
    height: rem(80),
    display: 'flex',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
      height: rem(60),
    }
  },
  sortContainer: {
    width: rem(150),
    marginRight: rem(10),
    height: rem(80),
    [theme.fn.smallerThan('sm')]: {
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
}));

export default function UserDecks() {
  const { classes } = useStyles();

  const { decks, loading, error, fetchDecks } = useDecksFacade();

  const [opened, { open, close }] = useDisclosure(false);

  const [query, setQuery] = useInputState('');

  useEffect(() => {
    fetchDecks(1);
  }, [fetchDecks]);

  const loadingDeck = {
    id: 0,
    userId: 0,
    title: "Loading....",
    visible: false,
  }

  return (
    <Container className={classes.inner} mb={60}>
      <AddDeckModal opened={opened} close={close}/>
      <Container className={classes.deckOrderContainer}>
        {/* sort by recent/created or folder */}
        <div className={classes.itemBox}>
          <div className={classes.sortContainer}>
            <NavLink component="button" label="Recent" childrenOffset={0} className={classes.sortBtn} styles={{label: {fontWeight: 700, fontSize: rem(16)}}} rightSection={<HiChevronRight/>}>
              <NavLink component="div"  label="Created" styles={{root: {backgroundColor: 'white'}, label: {fontWeight: 700, fontSize: rem(16)}}} />
            </NavLink>
          </div>
          <div className={classes.sortContainer}>
            <NavLink component="button" label="No Folder" childrenOffset={0} className={classes.sortBtn} styles={{label: {fontWeight: 700, fontSize: rem(16)}}} rightSection={<HiChevronRight/>} />
          </div>
        </div>
        {/* search bar */}
        <div className={classes.itemBox}>
          <TextInput
                placeholder="Search your decks"
                icon={<FaSearch size={16} />}
                value={query}
                variant="unstyled"
                onChange={setQuery}
                radius="md"
                className={classes.searchTextInput}
                styles = {{
                  input: {
                    fontSize:rem(16)
                  }
                }}
              />
        </div>
      </Container>
      {/* add deck */}
      <Container className={classes.wideContainer} mb={20}>
        <Button color="dark" radius="xl" size="md" leftIcon={<FaPlus />} onClick={open}>
          Add
        </Button>
      </Container>
      {/* display decks */}
      <Container className={classes.wideContainer}>
        {loading &&
          <Deck deck={loadingDeck} index={0}/>
        }
        {error && <p>{error}</p>}
        <Group>
        {
          decks?.length > 0 && (
            decks.map((deck, index) => (
              <Deck deck={deck} index={index} key={`deckkey-${deck.id}`}/>
            ))
          )
        }
        </Group>
      </Container>
    </Container>
  )
}
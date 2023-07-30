import { useEffect } from 'react';
import { createStyles, rem, TextInput, Modal, NavLink} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { FaSearch } from 'react-icons/fa';
import useDecksFacade from '../../facades/useDecksFacade';

const useStyles = createStyles(() => ({
  content: {
    padding: rem(20),
  },
  title: {
    fontSize: rem(28),
    fontWeight: 800
  },
}));

interface DeckModalProps {
  opened: boolean;
  close: () => void;
}

export default function DeckModal({opened, close}: DeckModalProps) {
  const { classes } = useStyles();

  const { currentDeck, decks, selectDeck } = useDecksFacade();

  const [query, setQuery] = useInputState('');

  useEffect(() => {
    console.log('changed current', currentDeck)
  }, [currentDeck])

  return (
      <Modal.Root opened={opened} onClose={close} size='xl'>
        <Modal.Overlay />
        <Modal.Content className={classes.content}>
          <Modal.Header>
            <Modal.Title className={classes.title}>Choose a deck</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <TextInput
                  placeholder="Search for or create a deck"
                  icon={<FaSearch size={16} />}
                  value={query}
                  onChange={setQuery}
                  radius="md"
                  size="xl"
                  mb={10}
                />

              {decks?.length > 0 && (
                decks
                  .filter((deck) => {
                    if (query.trim() === '') {
                      return true;
                    }
                    return deck.title.toLowerCase().includes(query.toLowerCase())
                  })
                  .map((deck) => (
                    <NavLink NavLink onClick={() => {selectDeck(deck); close()}} label={deck.title} styles={{label: {fontWeight: 500, fontSize: rem(18)}}}></NavLink>
                  ))
              )}
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
  )
}

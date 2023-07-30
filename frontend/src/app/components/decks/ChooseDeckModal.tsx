import { createStyles, rem, TextInput, Modal, NavLink} from '@mantine/core';
import { useForm } from '@mantine/form';
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
  boldText: {
    fontWeight: 800
  }
}));

interface DeckModalProps {
  opened: boolean;
  close: () => void;
}

export default function DeckModal({opened, close}: DeckModalProps) {
  const { classes } = useStyles();

  const { decks, titles, selectDeck, addDeck } = useDecksFacade();

  const form = useForm({
    initialValues: { id: 0, userID: 1, title: '', description: '', visible: false},

    validate: {
      title: (value) => (value.trim().length < 1 ? 'Deck name is empty' : titles.includes(value) ? 'You have already a deck with this title' : null),
    },
  });

  const filteredDeck = decks.filter((deck) => {
    if ((form.values.title).trim() === '') {
      return true;
    }
    return deck.title.toLowerCase().includes((form.values.title).toLowerCase())
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.isValid('title')) {
      addDeck(form.values);
      close();
    }
  };

  return (
      <Modal.Root opened={opened} onClose={close} size='xl'>
        <Modal.Overlay />
        <Modal.Content className={classes.content}>
          <Modal.Header>
            <Modal.Title className={classes.title}>Choose a deck</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={handleSubmit}>
            <TextInput
                  placeholder="Search for or create a deck"
                  icon={<FaSearch size={16} />}
                  {...form.getInputProps('title')}
                  radius="md"
                  size="xl"
                  mb={10}
                />
                </form>

              {decks?.length > 0 && (
                filteredDeck
                  .map((deck) => (
                    <NavLink key={`deckTitle-display-key-${deck.id}`} onClick={() => {selectDeck(deck); close()}} label={deck.title} styles={{label: {fontWeight: 500, fontSize: rem(18)}}}></NavLink>
                  ))
              )}

              {
                decks?.length > 0 && filteredDeck.length == 0 && (
                  <div>Press <span className={classes.boldText}>Enter</span> to create deck <span className={classes.boldText}>"{form.values.title}"</span></div>
                )
              }
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
  )
}

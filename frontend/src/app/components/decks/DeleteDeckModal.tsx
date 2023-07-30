import { createStyles, rem, Modal, Button, Box} from '@mantine/core';
import useDecksFacade from '../../facades/useDecksFacade';

const useStyles = createStyles(() => ({
  content: {
    padding: rem(10),
    textAlign: 'center'
  },
  title: {
    padding: rem(20),
    fontSize: rem(28),
    fontWeight: 800,
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rem(20)
  }
}));

interface DeckModalProps {
  deckId: number;
  title: string;
  opened: boolean;
  close: () => void;
}

export default function DeleteDeckModal({deckId, title, opened, close}: DeckModalProps) {
  const { deleteDeck } = useDecksFacade()
  const { classes } = useStyles();

  return (
    <Modal.Root opened={opened} onClose={close} size='xl' centered>
    <Modal.Overlay />
    <Modal.Content className={classes.content}>
      <Modal.Header >
        <Modal.Title className={classes.title}>This action will also delete all cards in the deck, are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <div className={classes.btnContainer}>
          <Box w={180} mr={20}>
            <Button onClick={() => deleteDeck(deckId, title)} color="dark" radius="xl" size="lg" fullWidth>
              Confirm
            </Button>
          </Box>
          <Box w={180}>
            <Button onClick={close} color="gray" radius="xl" size="lg" fullWidth>
              Cancel
            </Button>
          </Box>
        </div>
      </Modal.Body>
    </Modal.Content>
  </Modal.Root>
  )
}

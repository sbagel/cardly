import { useEffect } from 'react';
import { createStyles, rem, TextInput, Modal, Button, Box} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Deck } from '../../../types/DeckTypes';
import useDecksFacade from '../../facades/useDecksFacade';

const useStyles = createStyles(() => ({
  content: {
    padding: rem(20),
  },
  title: {
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
  deck: Deck;
  opened: boolean;
  close: () => void;
}

export default function EditDeckModal({deck, opened, close}: DeckModalProps) {
  const originalTitle = deck.title;
  const [debounced] = useDebouncedValue(opened, 200);
  const [debouncedDeck] = useDebouncedValue(deck, 200);
  const { updateDeck } = useDecksFacade()
  const { classes } = useStyles();

  const form = useForm({
    initialValues: { id: deck.id, userID: deck.userID, title: deck.title, description: deck.description, visible: deck.visible},

    validate: {
      title: (value) => (value.trim().length < 1 ? 'Deck name is empty' : null),
    },
  });

  useEffect(()=>{
    form.setFieldValue('title', deck.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  useEffect(() => {
    if (deck !== debouncedDeck) close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck])

  return (
    <Modal.Root opened={opened} onClose={close} size='xl'>
    <Modal.Overlay />
    <Modal.Content className={classes.content}>
      <Modal.Header>
        <Modal.Title className={classes.title}>Edit deck name</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={form.onSubmit(updateDeck)}>
        <TextInput
            radius="md"
            size="xl"
            {...form.getInputProps('title')}
            styles={{
              root: {marginTop: rem(20)},
              label: {marginBottom: rem(10), fontWeight: 600},
              input: {fontSize: rem(22), fontWeight: 600}
            }}
          />
        <div className={classes.btnContainer}>
          <Box w={200} h={70}>
            {
              form.values.title !== originalTitle &&  form.values.title !== '' &&(
                <Button type='submit' color="dark" radius="xl" size="xl" fullWidth>
                  Submit
                </Button>
              )
            }
          </Box>
        </div>
        </form>
      </Modal.Body>
    </Modal.Content>
  </Modal.Root>
  )
}

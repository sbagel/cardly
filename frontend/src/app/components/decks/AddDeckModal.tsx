import { useEffect } from 'react';
import { createStyles, rem, TextInput, Modal, Button, Box} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import useDecksFacade from '../../facades/useDecksFacade';
import { User } from "../../../types/UserTypes";

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
  opened: boolean;
  close: () => void;
  user: User;
}

export default function AddDeckModal({opened, close, user}: DeckModalProps) {
  const [ debounced ] = useDebouncedValue(opened, 200);
  const { titles, currentDeck, addDeck } = useDecksFacade();
  const [ debouncedCurrent ] = useDebouncedValue(currentDeck, 200);
  const { classes } = useStyles();

  const form = useForm({
    initialValues: { id: 0, userID: user.id, title: '', description: '', visible: false},

    validate: {
      title: (value) => (value.trim().length < 1 ? 'Deck name is empty' : titles.includes(value) ? 'You have already a deck with this title' : null),
    },
  });

  useEffect(()=>{
    form.setFieldValue('title', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  useEffect(() => {
    if (currentDeck !== debouncedCurrent) close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDeck])

  const handleSubmit = () => {
    addDeck({
      id: 0,
      userID: user.id,
      title: form.values.title,
      description: '',
      visible: false
    })
  }


  return (
    <Modal.Root opened={opened} onClose={close} size='xl'>
    <Modal.Overlay />
    <Modal.Content className={classes.content}>
      <Modal.Header>
        <Modal.Title className={classes.title}>Add a deck</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
            label="New deck name"
            placeholder="Type deck name"
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
          <Box w={200}>
            <Button type='submit' color="dark" radius="xl" size="xl" fullWidth>
              Submit
            </Button>
          </Box>
        </div>
        </form>
      </Modal.Body>
    </Modal.Content>
  </Modal.Root>
  )
}

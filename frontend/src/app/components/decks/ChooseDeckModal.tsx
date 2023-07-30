import { useEffect } from 'react';
import { createStyles, rem, TextInput, Modal} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { FaSearch } from 'react-icons/fa';

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

  const [query, setQuery] = useInputState('');

  useEffect(() => {

  })

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
                />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
  )
}

import { useEffect } from 'react';
import { createStyles, rem, TextInput, Modal} from '@mantine/core';
import { useInputState, UseDisclosureState, useDebouncedValue } from '@mantine/hooks';
import { FaSearch } from 'react-icons/fa';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(20),
    fontWeight: 800
  },
}));

interface DeckModalProps {
  opened: UseDisclosureState['opened'];
  close: UseDisclosureState['close'];
}

export default function DeckModal({opened, close}: DeckModalProps) {
  const { classes } = useStyles();

  const [query, setQuery] = useInputState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {

  })

  return (
      <Modal.Root opened={opened} onClose={close} size='xl'>
        <Modal.Overlay />
        <Modal.Content>
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

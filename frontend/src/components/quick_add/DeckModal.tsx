import { createStyles, Container, rem , Modal} from '@mantine/core';
import { UseDisclosureState } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(20),
    fontWeight: 800
  }
}));

interface DeckModalProps {
  opened: UseDisclosureState['opened'];
  close: UseDisclosureState['close'];
}

export default function DeckModal({opened, close}: DeckModalProps) {
  const { classes } = useStyles();

  return (
      <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title className={classes.title}>Choose a deck</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>Modal content</Modal.Body>
        </Modal.Content>
      </Modal.Root>
  )
}
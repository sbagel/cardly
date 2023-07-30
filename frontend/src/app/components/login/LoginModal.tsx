import { createStyles, rem, TextInput, Modal, NavLink} from '@mantine/core';

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

interface LoginModalProps {
  opened: boolean;
  close: () => void;
}

export default function LoginModal({opened, close}: LoginModalProps) {
  const { classes } = useStyles();

  return (
    <Modal.Root opened={opened} onClose={close} size='xl'>
    <Modal.Overlay />
    <Modal.Content className={classes.content}>
      <Modal.Header>
        <Modal.Title className={classes.title}>Login</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>
       hi
      </Modal.Body>
    </Modal.Content>
  </Modal.Root>
  )
}

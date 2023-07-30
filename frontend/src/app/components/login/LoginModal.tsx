import { createStyles, rem, Modal, Group} from '@mantine/core';
import { GrClose } from "react-icons/gr";
import LoginForm from './LoginForm';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    position: 'relative'
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: rem(20),
    cursor: 'pointer'
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    padding: rem(300),
    [theme.fn.smallerThan('md')]: {
      width: '100%',
      padding: theme.spacing.xl,
    },
  },
  toggleContentContainer: {
    display: 'flex',
    fontSize: rem(32),
    fontWeight: 600,
    marginBottom: rem(40),
  }
}));

interface LoginModalProps {
  opened: boolean;
  close: () => void;
}

export default function LoginModal({opened, close}: LoginModalProps) {
  const { classes } = useStyles();

  return (
    <Modal.Root
      opened={opened}
      onClose={close}
      fullScreen
      padding={0}
      transitionProps={{ transition: 'slide-down', duration: 200 }}
      >
    <Modal.Content style={{'padding': '0'}}>
      <Modal.Body>
       <div className={classes.inner}>
        {/* close button */}
        <div className={classes.closeBtn} onClick={close}>
          <GrClose size={30}/>
        </div>
        {/* content container */}
        <div className={classes.contentContainer}>
          {/* toggle between sign up or log in */}
          <div className={classes.toggleContentContainer}>
            <Group spacing={rem(40)}>
              <div>Sign up</div>
              <div>Log in</div>
            </Group>
          </div>
          {/* log in form */}
          <LoginForm/>
          {/* sign up form */}
        </div>
       </div>
      </Modal.Body>
    </Modal.Content>
  </Modal.Root>
  )
}

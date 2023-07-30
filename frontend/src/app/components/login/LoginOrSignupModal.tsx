import { useState } from 'react';
import { createStyles, rem, Modal, Group} from '@mantine/core';
import { GrClose } from "react-icons/gr";
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

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
  },
  toggleLink: {
    cursor: 'pointer',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[9],
    borderBottom: `${rem(3)} solid transparent`,
    transition: 'border-color 100ms ease, color 100ms ease',

    '&:hover': {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      textDecoration: 'none',
    },
  },
  toggleLinkActive: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 800,
    borderBottomColor: theme.colors.gray[theme.colorScheme === 'dark' ? 0 : 9],
  },
}));

interface LoginOrSignupModalProps {
  opened: boolean;
  close: () => void;
}

export default function LoginOrSignupModal({opened, close}: LoginOrSignupModalProps) {
  const { classes, cx } = useStyles();
  const [ activeLink, setActiveLink ] = useState('login');

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
              <div onClick={()=>setActiveLink('signup')} className={cx(classes.toggleLink, { [classes.toggleLinkActive]: activeLink === 'signup' })}>Sign up</div>
              <div onClick={()=>setActiveLink('login')} className={cx(classes.toggleLink, { [classes.toggleLinkActive]: activeLink === 'login' })}>Log in</div>
            </Group>
          </div>
          {/* log in or signup form */}
          {activeLink === 'login' ? <LoginForm/> : <SignUpForm/>}
        </div>
       </div>
      </Modal.Body>
    </Modal.Content>
  </Modal.Root>
  )
}

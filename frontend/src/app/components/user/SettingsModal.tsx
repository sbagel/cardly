import { useEffect } from 'react';
import { createStyles, rem, Modal, Text, PasswordInput, TextInput, Box, Button} from '@mantine/core';
import { GrClose } from "react-icons/gr";
import { useForm } from '@mantine/form';
import useUsersFacade from '../../facades/useUsersFacade';

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
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rem(40)
  }
}));

interface SettingModalProps {
  opened: boolean;
  close: () => void;
}

export default function SettingModal({opened, close }: SettingModalProps) {
  const { classes } = useStyles();
  const { checkStorage, user, updateUser, login } = useUsersFacade();

  useEffect(()=>{
    checkStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const form = useForm({
    initialValues: { id: user?.id, username: user?.username, name: user?.name, photo: user?.photo, password: '1234'},

    validate: {
      name: (value) => (
        value.trim().length < 1 ? 'Name cannot be empty' :
        value.length > 50 ? 'Name cannot be greater than 50 characters'
        : null),
      username: (value) => (
        value.trim().length < 1 ? 'Username cannot be empty' :
        value.length > 50 ? 'Username cannot be greater than 50 characters' :
        value.split(" ").length > 1 ? 'Username must be one word':
        !/^[A-Za-z0-9_-]+$/.test(value) ? 'Username can only contain letters, numbers, "-" and "_"':
        null),
    },
  });

  const handleSubmit = () => {
    const updatedUser= {
      id: user?.id,
      username: form.values.username,
      name: form.values.name,
      photo: user?.photo
    }

    updateUser(updatedUser)
      .then(() => {
        login(updatedUser);
        close();
      })
      .catch((error) => {
        console.log('update user error', error)
      })
  }

  return (
    <Modal.Root
      opened={opened}
      onClose={close}
      fullScreen
      padding={0}
      transitionProps={{ transition: 'slide-up', duration: 200 }}
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
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Text fz={rem(40)} fw={700}>Change account information</Text>
              {/* name */}
              <TextInput
                label="Name"
                required
                placeholder="Type your name"
                radius="md"
                size="xl"
                {...form.getInputProps('name')}
                styles={{
                  root: {marginTop: rem(20)},
                  label: {marginBottom: rem(10), fontWeight: 600},
                }}
              />
            {/* username */}
            <TextInput
                label="Username"
                required
                placeholder="Type your username"
                radius="md"
                size="xl"
                {...form.getInputProps('username')}
                styles={{
                  root: {marginTop: rem(20)},
                  label: {marginBottom: rem(10), fontWeight: 600},
                }}
              />
              {/* password */}
              <PasswordInput
                label="Password"
                required
                placeholder="Type your password"
                radius="md"
                size="xl"
                {...form.getInputProps('password')}
                styles={{
                  root: {marginTop: rem(20)},
                  label: {marginBottom: rem(10), fontWeight: 600},
                  input: {fontSize: rem(22), fontWeight: 800, color: 'blue'}
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
        </div>
       </div>
      </Modal.Body>
    </Modal.Content>
  </Modal.Root>
  )
}

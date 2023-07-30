import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { createStyles, Box, rem, TextInput, Button, PasswordInput} from '@mantine/core';
import useUsersFacade from '../../facades/useUsersFacade';
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
    marginTop: rem(40)
  }
}));

export default function LoginForm() {
  const { fetchUser } = useUsersFacade();
  const { classes } = useStyles();

  const form = useForm({
    initialValues: { id: 0, username: '', name: '', photo: ''},

    validate: {
      username: (value) => (value.trim().length < 1 ? 'Username cannot be empty' : null),
    },
  });

  const handleSubmit = () => {
    fetchUser(form.values.username)
      .catch((error) => console.log('error logging in', error))
  }


  return (
    <div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {/* username */}
           <TextInput
              label="Username"
              placeholder="Type your username"
              radius="md"
              size="xl"
              {...form.getInputProps('username')}
              styles={{
                root: {marginTop: rem(20)},
                label: {marginBottom: rem(10), fontWeight: 600},
                // input: {fontSize: rem(22), fontWeight: 600}
              }}
            />
            {/* password */}
            <PasswordInput
              label="Password"
              placeholder="Type your password"
              radius="md"
              size="xl"
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
  )
}


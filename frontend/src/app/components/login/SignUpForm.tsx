import { useForm } from '@mantine/form';
import { createStyles, Box, rem, TextInput, Button, PasswordInput} from '@mantine/core';
import useUsersFacade from '../../facades/useUsersFacade';

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

export default function SignUpForm() {
  const { classes } = useStyles();
  const { addUser } = useUsersFacade();

  const form = useForm({
    initialValues: { id: 0, username: '', name: '', photo: ''},

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
    addUser(form.values)
      .then(() => {
        console.log('added user')
      })
      .catch((error) => {
        console.log('added user error', error)
      })
  }

  return (
    <div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
                // input: {fontSize: rem(22), fontWeight: 600}
              }}
            />
            {/* password */}
            <PasswordInput
              label="Password"
              required
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


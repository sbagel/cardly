import { useEffect } from 'react';
import { createStyles, rem, TextInput, Modal, Button, Box} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { User } from "../../../types/UserTypes";
import useFoldersFacade from '../../facades/useFoldersFacade';

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

interface AddFolderModalProps {
  opened: boolean;
  close: () => void;
  user: User;
}

export default function AddFolderModal ({opened, close, user}: AddFolderModalProps) {
  const [ debounced ] = useDebouncedValue(opened, 200);
  const { folders, addFolder } = useFoldersFacade();
  const [ debouncedCurrent ] = useDebouncedValue(folders, 200);
  const { classes } = useStyles();

  const form = useForm({
    initialValues: { id: 0, userID: user.id, folderName: '', bookmarked: false},

    validate: {
      folderName: (value) => (value.trim().length < 1 ? 'Folder name is empty' : null),
    },
  });

  useEffect(()=>{
    form.setFieldValue('folderName', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  useEffect(() => {
    if (folders !== debouncedCurrent) close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folders])

  const handleSubmit = () => {
    addFolder({
      id: 0,
      userID: user.id,
      folderName: form.values.folderName,
      bookmarked: false
    })
  }


  return (
    <Modal.Root opened={opened} onClose={close} size='xl'>
    <Modal.Overlay />
    <Modal.Content className={classes.content}>
      <Modal.Header>
        <Modal.Title className={classes.title}>Add a folder</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
            label="New folder name"
            placeholder="Type folder name"
            radius="md"
            size="xl"
            {...form.getInputProps('folderName')}
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

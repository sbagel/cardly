import { useEffect } from 'react';
import { createStyles, rem, TextInput, Modal, Button, Box} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Folder } from '../../../types/FolderTypes';
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

interface EditFolderModal {
  folder: Folder;
  opened: boolean;
  close: () => void;
}

export default function EditFolderModal({folder, opened, close}: EditFolderModal) {
  const originalTitle = folder.folderName;
  const [debounced] = useDebouncedValue(opened, 200);
  const [debouncedFolder] = useDebouncedValue(folder, 200);
  const { updateFolder } = useFoldersFacade()
  const { classes } = useStyles();

  const form = useForm({
    initialValues: { id: folder.id, userID: folder.userID, folderName: folder.folderName, bookmarked: folder.bookmarked},

    validate: {
      folderName: (value) => (value.trim().length < 1 ? 'Folder name is empty' : null),
    },
  });

  useEffect(()=>{
    form.setFieldValue('folderName', folder.folderName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  useEffect(() => {
    if (folder !== debouncedFolder) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder])

  return (
    <Modal.Root opened={opened} onClose={close} size='xl'>
    <Modal.Overlay />
    <Modal.Content className={classes.content}>
      <Modal.Header>
        <Modal.Title className={classes.title}>Edit folder name</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={form.onSubmit(updateFolder)}>
        <TextInput
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
          <Box w={200} h={70}>
            {
              form.values.folderName !== originalTitle &&  form.values.folderName !== '' &&(
                <Button type='submit' color="dark" radius="xl" size="xl" fullWidth>
                  Submit
                </Button>
              )
            }
          </Box>
        </div>
        </form>
      </Modal.Body>
    </Modal.Content>
  </Modal.Root>
  )
}

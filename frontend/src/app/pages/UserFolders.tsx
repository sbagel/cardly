
import { useEffect } from 'react';
import { useInputState, useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

import { createStyles, Container, NavLink, TextInput, rem, Group, Button} from '@mantine/core';

import useUsersFacade from '../facades/useUsersFacade';
import useFoldersFacade from '../facades/useFoldersFacade';

import { FaSearch, FaPlus } from 'react-icons/fa';

import Folder from '../components/folders/Folder';
import AddFolderModal from '../components/folders/AddFolderModal';

const useStyles = createStyles((theme) => ({
  inner: {
    height: 'fit',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.fn.smallerThan('md')]: {
      display: 'block',
      marginLeft: rem(-15),
      width: '105%',
    }
  },
  deckOrderContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.fn.smallerThan('md')]: {
      display: 'block',
      marginTop: rem(-30)
    }
  },
  itemBox: {
    width: '80%',
    height: rem(80),
    display: 'flex',
    [theme.fn.smallerThan('md')]: {
      width: '100%',
      height: rem(60),
    }
  },
  sortBtn: {
    borderRadius: rem(15),
    border: `${rem(3)} solid black`
  },
  searchTextInput: {
    width: '100%',
    height: rem(42),
    border: `${rem(3)} solid black`,
    borderRadius: rem(15),
    fontSize: rem(20),
    '&::placeholder': {
      color: 'blue'
    },
  },
  wideContainer: {
    width: '100%',
  },
  addBtn: {
    width: '20%',
    height: rem(80),
    display: 'flex',
    [theme.fn.smallerThan('md')]: {
      display: 'none'
    }
  }
}));

export default function UserFolders() {
  const navigate = useNavigate();

  const { classes } = useStyles();
  const { user, checkStorage } = useUsersFacade();
  const { folders, loading, error, fetchFolders } = useFoldersFacade();

  const [opened, { open, close }] = useDisclosure(false);

  const [query, setQuery] = useInputState('');

  useEffect(() => {
    checkStorage();

    !user && navigate('/');

    user && fetchFolders(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className={classes.inner} mb={60}>
      <AddFolderModal
        opened={opened}
        close={close}
        user={user || {id: 0, username: '', name: '', photo: ''}}/>
      {/* search bar */}
      <Container className={classes.wideContainer}>
        <div className={classes.deckOrderContainer}>
          <div className={classes.addBtn}>
            <Button color="dark" radius="xl" size="md" leftIcon={<FaPlus />} onClick={open}>
              Add
            </Button>
          </div>
          <div className={classes.itemBox}>
              <TextInput
                    placeholder="Search your folders"
                    icon={<FaSearch size={16} />}
                    value={query}
                    variant="unstyled"
                    onChange={setQuery}
                    radius="md"
                    className={classes.searchTextInput}
                    styles = {{
                      input: {
                        fontSize:rem(16)
                      }
                    }}
                  />
            </div>
        </div>
      </Container>
      {/* display folders */}
      <Container className={classes.wideContainer}>
        {
          folders?.length > 0 && (
            folders
            .filter((folder) => {
              if (query.trim() === '') {
                return true;
              }
              return folder.folderName.toLowerCase().includes(query.toLowerCase())
            })
            .map((folder) => (
              <Folder folder={folder} key={`folder-display-key-${folder.id}`}/>
            ))
          )
        }
      </Container>
    </Container>
  )
}
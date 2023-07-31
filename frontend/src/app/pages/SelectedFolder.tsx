import { useEffect, useState } from 'react';
import axios from 'axios';
import { createStyles, Container, Group, Box, TextInput, rem, Text } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

import { useInputState } from '@mantine/hooks';

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSearch, FaPlus, FaRegFolder } from 'react-icons/fa';

import { Deck } from '../../types/DeckTypes';
import DeckByFolder from '../components/decks/DeckByFolder';

const useStyles = createStyles(() => ({
  inner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    marginBottom: rem(20)
  },
  arrowContainer: {
    position: 'absolute',
    top: 5,
    left: rem(-50),
    cursor: 'pointer',
    marginRight: rem(20)
  },
  searchTextInput: {
    width: '100%',
    height: rem(42),
    borderBottom: `${rem(3)} solid black`,
    fontSize: rem(20),
    '&::placeholder': {
      color: 'blue'
    },
  }
}))

export default function SelectedFolder() {
  const { classes } = useStyles();
  const [ folderDecks, setFolderDecks ] = useState<Deck[]>([])

  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useInputState('');

  const folder = location.state.folder;

  useEffect(()=> {
    if (folder.id) {
      axios.get(`http://localhost:8080/api/deck/all/byFolder?folderId=${folder.id}`)
      .then((res) => {
        setFolderDecks(res.data)
      })
    }
  }, [folder])

  return (
    <Container mt={rem(60)} className={classes.inner}>
      <div className={classes.nav}>
        <div onClick={()=> navigate(-1)} className={classes.arrowContainer}>
          <FaArrowLeftLong size={30}/>
        </div>
        <Box w={'100%'}>
          <TextInput
                placeholder="Search your decks"
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
        </Box>
      </div>
      <Text fz={rem(50)} mb={rem(40)} fw={700} sx={{textTransform: 'capitalize', display: 'flex', alignItems: 'center'}}>
        <FaRegFolder style={{marginRight: rem(20)}}/>
        {folder.folderName}
      </Text>

      <Group>
        {
          folderDecks?.length > 0 && (
            folderDecks.map((d) => (
              <Box w='30%' key={`deck-folder-key-${d.id}`}>
                <DeckByFolder deck={d}/>
              </Box>
            ))
          )
        }
      </Group>
    </Container>
  )
}
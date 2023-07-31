import axios from 'axios';
import { useEffect, useState } from 'react';
import { Deck } from '../../../types/DeckTypes';

import { createStyles, rem, NavLink, Modal, Button, Box} from '@mantine/core';

import useFoldersFacade from '../../facades/useFoldersFacade';

import { Folder } from '../../../types/FolderTypes';

import { FaCheckCircle } from 'react-icons/fa'

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

interface MoveDeckModalProps {
  deck: Deck;
  opened: boolean;
  close: () => void;
}

export default function MoveDeckModal({deck, opened, close}: MoveDeckModalProps) {
  const { classes } = useStyles();
  const [ activeIdArray, setActiveIdArray ] = useState<number[]>([]);

  const { folders, addDeckToFolder } = useFoldersFacade();

  useEffect(()=> {
    if (deck.id) {
      axios.get(`http://localhost:8080/api/folder/all/byDeck?deckID=${deck.id}`)
      .then((res) => {
        (res.data).forEach((f: Folder) => setActiveIdArray((prev) => ([ ...prev, f.id ])))
      })
    }
  }, [deck])

  const handleMove = () => {
    if (activeIdArray.length > 0) {
      activeIdArray.forEach((f) => {
        addDeckToFolder({
          deckID: deck.id,
          folderID: f,
        })
      })
    } else {
      addDeckToFolder({
        deckID: deck.id,
        folderID: 0,
      })
    }
    close()
  }

  return (
    <Modal.Root opened={opened} onClose={close} size='xl'>
    <Modal.Overlay />
    <Modal.Content className={classes.content}>
      <Modal.Header>
        <Modal.Title className={classes.title}>Move deck to</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>
        <Box w='100%'>
          <NavLink
            label="Select a folder"
            childrenOffset={0}
            sx={{
              border: `${rem(3)} solid black`,
              borderRadius: rem(20)
            }}>
              {
                folders?.length > 0 && (
                  folders.map((folder) => (
                    <NavLink
                      active={activeIdArray.includes(folder.id)}
                      icon={activeIdArray.includes(folder.id) && <FaCheckCircle/>}
                      onClick={() => {
                        if (!activeIdArray.includes(folder.id)) {
                          setActiveIdArray((prev) => ([ ...prev, folder.id ]))
                        } else {
                          setActiveIdArray(activeIdArray.filter((i) => i !== folder.id))
                        }
                      }}
                      label={folder.folderName}
                      key={`folder-move-key-${folder.id}`}/>
                  ))
                )
              }
          </NavLink>
          <Box w='100%' mt={20} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Button w={'20%'} mr={rem(20)} onClick={handleMove} color="dark" radius="xl" size="lg" fullWidth>
              Move
            </Button>
            <Button w={'20%'} onClick={close} color="gray" radius="xl" size="lg" fullWidth>
              Cancel
            </Button>
          </Box>
        </Box>

      </Modal.Body>
    </Modal.Content>
  </Modal.Root>
  )
}
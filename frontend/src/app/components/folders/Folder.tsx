import { createStyles, rem, NavLink, Paper, Box} from '@mantine/core';
import { useHover, useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

import { FaEllipsis, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";

import { Folder } from "../../../types/FolderTypes";

import EditFolderModal from './EditFolderModal';
import DeleteFolderModal from './DeleteFolderModal';

const useStyles = createStyles((theme) => ({
  ellipsisContainer:{
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
    zIndex: 20,
  },
  ellipsisIcon:{
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    zIndex: 20,
    '&:hover': {
      backgroundColor: 'transparent'
    },
  },
  editCardLabel:{
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    backgroundColor: theme.colorScheme === 'dark' ? theme.black : theme.white,
    fontSize: rem(20)
  },
}));

interface FolderProps {
  folder: Folder
}

export default function Folder({folder}:FolderProps) {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const folderIconHover = useHover();
  const folderEditHover = useHover();

  const [openedDeleteModal, deleteHandler] = useDisclosure(false);
  const [openedEditModal, editHandler] = useDisclosure(false);

  return (
    <Paper
      onClick={() => navigate(`${folder.id}?folderName=${folder.folderName.replace(/\s+/g, "_")}`)}
      shadow="xs"
      mb={10}
      sx={{ width: '100%', position: 'relative' }}
      radius="lg"
      ref={folderEditHover.ref}>
      <DeleteFolderModal folderId={folder.id} opened={openedDeleteModal} close={deleteHandler.close}/>
      <EditFolderModal folder={folder} opened={openedEditModal} close={editHandler.close}/>

      {folderEditHover.hovered &&
      <div className={classes.ellipsisContainer}>
        <NavLink component="div" className={classes.ellipsisIcon} childrenOffset={0} rightSection={<FaEllipsis size={20}/>}>
          <NavLink component="div" onClick={editHandler.open} className={classes.editCardLabel} icon={<FaPenToSquare size={15}/>} label="Rename folder" styles={{root: {backgroundColor: 'white'}}}/>
          <NavLink component="div" onClick={deleteHandler.open} className={classes.editCardLabel} icon={<FaTrashCan size={15}/>} label="Delete folder" styles={{root: {backgroundColor: 'white', zIndex: 20}}}/>
        </NavLink>
      </div>
      }

      <Box ref={folderIconHover.ref}>
        <NavLink
          icon={folderIconHover.hovered ? <FcOpenedFolder/> : <FcFolder/>}
          label={folder.folderName}
          styles={{
            root: {
              fontSize: rem(20),
              padding: rem(20),
              borderRadius: rem(20)
            },
            label: {
              fontSize: rem(20),
              textTransform: 'capitalize'
            }
          }}
        />
      </Box>
    </Paper>
  )
}
import { createStyles, Container, Box, TextInput, rem, Text } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

import { useInputState } from '@mantine/hooks';

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSearch, FaPlus, FaRegFolder } from 'react-icons/fa';

const useStyles = createStyles((theme) => ({
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

  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useInputState('');

  const folder = location.state.folder;
  const url = location.state.return;

  return (
    <Container mt={rem(60)} className={classes.inner}>
      <div className={classes.nav}>
        <div onClick={()=> navigate(url)} className={classes.arrowContainer}>
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
      <Text fz={rem(50)} fw={700} sx={{textTransform: 'capitalize', display: 'flex', alignItems: 'center'}}>
        <FaRegFolder style={{marginRight: rem(20)}}/>
        {folder.folderName}
      </Text>

    </Container>
  )
}
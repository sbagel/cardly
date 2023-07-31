import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useInputState, useHover } from '@mantine/hooks';
import { createStyles, Container, Group, Box, rem, TextInput, Text } from '@mantine/core';

import ReactFlipCard from 'reactjs-flip-card'

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSearch, FaPlus } from 'react-icons/fa';

import useCardsFacade from '../facades/useCardsFacade.ts';

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

export default function SelectedDeck() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cards, fetchCards } = useCardsFacade();

  const flipCardHover = useHover();

  const { classes } = useStyles();

  const deck = location.state.deck;
  const url = location.state.return;

  const [query, setQuery] = useInputState('');

  useEffect(()=>{
    fetchCards(deck.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const styles = {
    containerStyle: {
      borderRadius: 20,
      width: rem(280),
      height: rem(200),
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      overflowY: 'auto',
    },
    front: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: rem(20),
      borderBottom: `${rem(6)} solid #f8cf70`,
      borderRadius: 20,
    },
    back: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f7fb',
      padding: rem(20),
      borderBottom: `${rem(6)} solid #45a6fb`,
      borderRadius: 20,
    }
}

  return (
    <Container mt={rem(60)} className={classes.inner}>
      <div className={classes.nav}>
        <div onClick={()=> navigate(url)} className={classes.arrowContainer}>
          <FaArrowLeftLong size={30}/>
        </div>
        <Box w={'100%'}>
          <TextInput
                    placeholder="Search your cards"
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
      <Text fz={rem(40)} fw={700} sx={{textTransform: 'capitalize'}}>{deck.title}</Text>
      <Group mt={rem(20)} spacing={rem(30)}>
      {
        cards?.length > 0 && (
          cards
            .filter((card) => {
              if (query.trim() === '') {
                return true;
              }
              return card.front.toLowerCase().includes(query.toLowerCase()) || card.back.toLowerCase().includes(query.toLowerCase())
            })
            .map((card) => (
              <ReactFlipCard
                flipTrigger='onClick'
                containerStyle={styles.containerStyle}
                frontStyle={styles.front}
                backStyle={styles.back}
                frontComponent={<div>{card.front}</div>}
                backComponent={<div>{card.back}</div>}
              />
            ))
        )
      }
      </Group>
    </Container>
  )
}


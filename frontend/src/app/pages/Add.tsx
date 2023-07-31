import { useEffect } from 'react';
import { useShallowEffect } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import QuickAdd from '../components/cards/quick_add/QuickAdd.tsx';
import RecentlyAddedCards from '../components/cards/RecentlyAddedCards.tsx';
import useUsersFacade from '../facades/useUsersFacade.ts';
import useDecksFacade from '../facades/useDecksFacade.ts';
import useCardsFacade from '../facades/useCardsFacade.ts';

export default function Add() {
  const navigate = useNavigate();
  const { user, checkStorage } = useUsersFacade();
  const { currentDeck, decks, fetchDecks } = useDecksFacade();
  const { fetchCards } = useCardsFacade();

  useEffect(()=>{

    checkStorage();

    !user && navigate('/');

    user && fetchDecks(user.id);

    currentDeck.id && fetchCards(currentDeck.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <QuickAdd/>
      <RecentlyAddedCards deck={currentDeck}/>
    </>
  )
}


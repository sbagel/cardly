import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuickAdd from '../components/cards/quick_add/QuickAdd.tsx';
import RecentlyAddedCards from '../components/cards/RecentlyAddedCards.tsx';
import useUsersFacade from '../facades/useUsersFacade.ts';
import useDecksFacade from '../facades/useDecksFacade.ts';

export default function Add() {
  const navigate = useNavigate();
  const { user, checkStorage } = useUsersFacade();
  const { fetchDecks } = useDecksFacade();

  useEffect(()=>{
    checkStorage();

    !user && navigate('/');

    user && fetchDecks(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <QuickAdd/>
      <RecentlyAddedCards/>
    </>
  )
}


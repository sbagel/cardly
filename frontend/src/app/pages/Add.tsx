// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import QuickAdd from '../components/cards/quick_add/QuickAdd.tsx';
import RecentlyAddedCards from '../components/cards/RecentlyAddedCards.tsx';
// import useUsersFacade from '../facades/useUsersFacade.ts';

export default function Add() {
  // const navigate = useNavigate();
  // const { user } = useUsersFacade();

  // useEffect(() =>{
  //   !user && navigate('/');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user])

  return (
    <>
      <QuickAdd/>
      <RecentlyAddedCards/>
    </>
  )
}


import { useEffect, useState } from 'react';
import { useToggle } from '@mantine/hooks';
import Header from '../components/Header.tsx';
import ToggleHeader from '../components/ToggleHeader.tsx';
import QuickAdd from '../components/quick_add/QuickAdd.tsx';
import RecentlyAddedCards from '../components/recently_added_cards/RecentlyAddedCards.tsx';
import useCardsFacade from '../facades/useCardsFacade.ts';

export default function Add() {
  const state = useCardsFacade();
  const [cards, setCards] = useState([]);
  const [update, toggle] = useToggle([true, false]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/card/all?deckId=2`);
        const cardArr = await res.json();
        setCards(cardArr);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    fetchData();
  }, [update]);

  return (
    <>
      <Header/>
      <ToggleHeader/>
      <QuickAdd toggle={toggle}/>
      <RecentlyAddedCards cards={cards} state={state} toggle={toggle}/>
    </>
  )
}
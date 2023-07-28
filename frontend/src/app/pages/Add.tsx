import Header from '../components/Header.tsx';
import ToggleHeader from '../components/ToggleHeader.tsx';
import QuickAdd from '../components/quick_add/QuickAdd.tsx';
import RecentlyAddedCards from '../components/recently_added_cards/RecentlyAddedCards.tsx';

export default function Add() {

  const toggleLinks = [
    {
      "link": "#",
      "label": "New Deck"
    },
    {
      "link": "#",
      "label": "My Decks"
    },
    {
      "link": "#",
      "label": "Public Decks"
    },
  ]

  return (
    <>
      <Header/>
      <ToggleHeader toggleLinks={toggleLinks}/>
      <QuickAdd/>
      <RecentlyAddedCards/>
    </>
  )
}
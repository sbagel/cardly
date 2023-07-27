import Header from '../components/Header';
import ToggleHeader from '../components/ToggleHeader';
import QuickAdd from '../components/QuickAdd';

export default function Test2() {

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
    <div className="Test2">
      <Header/>
      <ToggleHeader toggleLinks={toggleLinks}/>
      <QuickAdd/>
    </div>
  )
}
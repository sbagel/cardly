import { Text, Button } from '@mantine/core';
import Header from '../components/Header';
import ToggleHeader from '../components/ToggleHeader';

function Test2() {

  const mainLinks = [
    {
      "link": "#",
      "label": "<FaBeer/>"
    },
    {
      "link": "#",
      "label": "Documentation"
    },
    {
      "link": "#",
      "label": "Community"
    },
    {
      "link": "#",
      "label": "Academy"
    }
  ]

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
      <Header mainLinks={mainLinks}/>
      <ToggleHeader toggleLinks={toggleLinks}/>
    </div>
  )
}

export default Test2
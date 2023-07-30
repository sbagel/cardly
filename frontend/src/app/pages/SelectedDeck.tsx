import { useLocation, useNavigate } from 'react-router-dom';
import { createStyles, Container, rem } from '@mantine/core';
import { FaArrowLeftLong } from "react-icons/fa6";

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    alignItems: 'center',
  },
  arrowContainer: {
    cursor: 'pointer'
  }
}))

export default function SelectedDeck() {
  const navigate = useNavigate();
  const location = useLocation();
  const { classes } = useStyles();
  const deck = location.state.deck;
  const url = location.state.return;

  return (
    <Container className={classes.inner}>
      <div onClick={()=> navigate(url)} className={classes.arrowContainer}>
        <FaArrowLeftLong size={30}/>
      </div>

      {deck.title}
    </Container>
  )
}


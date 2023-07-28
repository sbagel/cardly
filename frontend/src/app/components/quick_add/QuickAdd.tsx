import { createStyles, Container, rem} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FaAngleDown } from 'react-icons/fa';
import DeckModal from "./DeckModal";
import CardForm from "./CardForm";
import { SetStateAction } from 'react';

const useStyles = createStyles((theme) => ({
  inner: {
    height: 'fit',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  folder: {
    height: '100%',
    width: '100%',
  },
  folderTop: {
    display: 'flex',
    fontSize: rem(20),
    fontWeight: 700,
  },
  folderLabel: {
    padding: `${rem(7)} ${theme.spacing.sm}`,
    border: `${rem(3)} dashed black`,
    borderBottom: 0,
    borderRadius: '12px 12px 0 0',
    cursor: 'pointer'
  },
  deckLabel: {
    padding: `${rem(7)} ${theme.spacing.sm}`,
    border: `${rem(3)} solid black`,
    borderBottom: 0,
    borderRadius: '12px 12px 0 0',
    zIndex: 10,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='105' viewBox='0 0 80 105'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='death-star' fill='%23e8e7fc' fill-opacity='0.9'%3E%3Cpath d='M20 10a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V10zm15 35a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zM20 75a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V75zm30-65a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V10zm0 65a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V75zM35 10a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10zM5 45a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zm0-35a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10zm60 35a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zm0-35a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundOrigin: 'border-box',
    backgroundSize: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }
}));

interface QuickAddProps {
  toggle: (value?: SetStateAction<boolean> | undefined) => void
}

export default function QuickAdd({toggle}:QuickAddProps) {

  const { classes } = useStyles();

  const [opened, { open, close }] = useDisclosure(false);

  const deckName = 'My First Deck';

  return (
    <Container className={classes.inner} mb={60}>
      <DeckModal opened={opened} close={close}/>
      <div className={classes.folder}>
        <div className={classes.folderTop}>
          {/* <div className={classes.folderLabel}>
            x
          </div> */}
          <div className={classes.deckLabel} onClick={open}>
            {deckName}&nbsp;<FaAngleDown/>
          </div>
        </div>
        <CardForm toggle={toggle}/>
        {/* <div>
          <button>enter</button>
        </div> */}
      </div>
    </Container>
  )
}
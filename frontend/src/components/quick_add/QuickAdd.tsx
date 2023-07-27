import { useRef } from "react";
import { createStyles, Divider, Container, rem , Modal} from '@mantine/core';
import { useInputState, useDisclosure } from '@mantine/hooks';
import useAutosizeTextArea from "../../hooks/useAutosizeTextArea";
import { FaAngleDown } from 'react-icons/fa';
import DeckModal from "./DeckModal";

const CONTAINER_HEIGHT = rem(814);

const useStyles = createStyles((theme) => ({
  inner: {
    height: CONTAINER_HEIGHT,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  folder: {
    height: '100%',
    width: '80%',

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    }
  },
  folderTop: {
    display: 'flex',
    fontSize: rem(20),
    fontWeight: 700,
  },
  folderBottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    border: `${rem(2)} solid black`,
    borderRadius: '0 20px 0 20px',
    padding: `${rem(20)} ${theme.spacing.sm}`,
  },
  inputBox: {
    width: '90%',
    height: `${rem(102)}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    padding: `${rem(20)} ${theme.spacing.sm}`,
    margin: '5px',
    border: '0',
    borderRadius: '20px',
    overflowWrap: 'break-word',
    resize: 'vertical',

    '&:focus': {
      outlineColor: theme.colors.gray[2]
    }
  },
  folderLabel: {
    padding: `${rem(7)} ${theme.spacing.sm}`,
    border: `${rem(2)} dashed black`,
    borderBottom: 0,
    borderRadius: '12px 12px 0 0',
    cursor: 'pointer'
  },
  deckLabel: {
    padding: `${rem(7)} ${theme.spacing.sm}`,
    border: `${rem(2)} solid black`,
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

export default function QuickAdd() {
  const { classes } = useStyles();

  const [opened, { open, close }] = useDisclosure(false);

  const [deckName, setDeckName] = useInputState('My First Deck');
  const [termValue, setTermValue] = useInputState('Enter term');
  const [definitionValue, setDefinitionValue] = useInputState('Enter definition');

  const termAreaRef = useRef<HTMLTextAreaElement>(null);
  const definitionAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(termAreaRef.current, termValue);
  useAutosizeTextArea(definitionAreaRef.current, definitionValue);

  return (
    <Container className={classes.inner}>
      <DeckModal opened={opened} close={close}/>
      <div className={classes.folder}>
        <div className={classes.folderTop}>
          <div className={classes.folderLabel}>
            x
          </div>
          <div className={classes.deckLabel} onClick={open}>
            {deckName}&nbsp;<FaAngleDown/>
          </div>
        </div>
        <div className={classes.folderBottom}>
          <textarea ref={termAreaRef} placeholder={termValue} onChange={setTermValue} className={classes.inputBox}></textarea>
            <Divider style={{width:'90%'}} color="gray.2" my="xs" />
          <textarea ref={definitionAreaRef} placeholder={definitionValue} onChange={setDefinitionValue} className={classes.inputBox}></textarea>
        </div>
      </div>
    </Container>
  )
}
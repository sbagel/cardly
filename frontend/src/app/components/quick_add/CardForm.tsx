import { SetStateAction, useRef } from "react";
import { createStyles, Divider, rem} from '@mantine/core';
import { useInputState, } from '@mantine/hooks';
import useCardsFacade from '../../facades/useCardsFacade';
import useAutosizeTextArea from "../../../hooks/useAutosizeTextArea";

const useStyles = createStyles((theme) => ({
  folderBottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    border: `${rem(3)} solid black`,
    borderRadius: '0 20px 0 20px',
    padding: `${rem(20)} ${theme.spacing.sm}`,
  },
  inputBox: {
    width: '96%',
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
    },

    '&::placeholder': {
      fontSize: rem(20),
      fontWeight: 500,
    }
  },
}));

interface CardFormProps {
  toggle: (value?: SetStateAction<boolean> | undefined) => void
}

export default function CardForm({toggle}:CardFormProps) {
  const { addCard } = useCardsFacade();

  const { classes } = useStyles();


  const [termValue, setTermValue] = useInputState('Enter term');
  const [definitionValue, setDefinitionValue] = useInputState('Enter definition');

  const termAreaRef = useRef<HTMLTextAreaElement>(null);
  const definitionAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(termAreaRef.current, termValue);
  useAutosizeTextArea(definitionAreaRef.current, definitionValue);

  const handleSubmitCard: React.FormEventHandler<HTMLFormElement> = () => {
    const newCard = {
      id: 0,
      deckId: 2,
      front: termValue,
      back: definitionValue,
      favorited: false
    }

    addCard(newCard)
      .then(() => {
        console.log('card added', newCard)
        toggle()
      })
      .catch((error) => {
        console.log('error adding card', error)
      })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmitCard(event);
    }
  };

  return (
    <form onSubmit={handleSubmitCard} onKeyDown={handleKeyDown} className={classes.folderBottom}>
      <textarea ref={termAreaRef} placeholder={termValue} onChange={setTermValue} className={classes.inputBox}></textarea>
        <Divider style={{width:'96%'}} color="gray.2" my="xs" />
      <textarea ref={definitionAreaRef} placeholder={definitionValue} onChange={setDefinitionValue} className={classes.inputBox}></textarea>
    </form>
  )
}
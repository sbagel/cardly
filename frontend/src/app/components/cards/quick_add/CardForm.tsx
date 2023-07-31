import { useRef } from "react";
import { useForm } from '@mantine/form';
import { Button, createStyles, Divider, rem, Textarea } from '@mantine/core';
import useAutosizeTextArea from "../../../../hooks/useAutosizeTextArea";
import useCardsFacade from "../../../facades/useCardsFacade";
import useDecksFacade from "../../../facades/useDecksFacade";

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
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    padding: `${rem(20)} ${theme.spacing.sm}`,
    margin: '5px',
    border: '0',
    borderRadius: '20px',
    overflowWrap: 'break-word',
    resize: 'vertical',
  },
  btn: {
    visibility: 'hidden',
    height:0,
  }
}));


export default function CardForm() {
  const { addCard } = useCardsFacade();
  const { currentDeck } = useDecksFacade();

  const { classes } = useStyles();

  const form = useForm({
    initialValues: { id: 0, deckId: currentDeck.id, front: '', back: '', favorited: false},

    validate: {
      front: (value) => (value.trim().length < 1 || value.split(" ").length < 2 ? 'Card term must have at least 2 words' : null),
      back: (value) => (value.trim().length < 1 ? 'Card defintion is empty' : null),
    },
  });

  const btnRef = useRef<HTMLButtonElement>(null);
  const termAreaRef = useRef<HTMLTextAreaElement>(null);
  const definitionAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(termAreaRef.current, form.values.front);
  useAutosizeTextArea(definitionAreaRef.current, form.values.back);

  const handleEnter = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      btnRef.current?.click();
      clearForm();
    }
  };

  const clearForm = () => {
    if (form.isValid('front') && form.isValid('back')) {
      form.setFieldValue('front', '');
      form.setFieldValue('back', '');
    }
  }

  const handleSubmit = () => {
    addCard({
      id: 0,
      deckId: currentDeck.id,
      front: form.values.front,
      back: form.values.back,
      favorited: false
    });
  }


  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className={classes.folderBottom} onKeyUp={handleEnter}>
      <Textarea
        autoFocus
        ref={termAreaRef}
        placeholder="Enter Term"
        className={classes.inputBox}
        variant="unstyled"
        {...form.getInputProps('front')}
        styles={{ error: { color: 'black', }, input: {fontSize: rem(20)}}}/>

        <Divider style={{width:'96%'}} color="gray.2" my="xs" />

      <Textarea
        ref={definitionAreaRef}
        placeholder="Enter Definition"
        className={classes.inputBox}
        variant="unstyled"
        {...form.getInputProps('back')}
        styles={{ error: { color: 'black', }, input: {fontSize: rem(20)}}}/>

      <Button ref={btnRef} type="submit" mt="sm" className={classes.btn}></Button>
    </form>
  );
}

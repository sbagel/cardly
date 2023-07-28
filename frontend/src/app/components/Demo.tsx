import { useRef } from "react";
import { useForm } from '@mantine/form';
import { TextInput, Button, createStyles, Divider, rem } from '@mantine/core';
import useAutosizeTextArea from "../../hooks/useAutosizeTextArea";
import useCardsFacade from "../facades/useCardsFacade";

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
    },

    '&:error': {
      color: 'black'
    },
  },
  btn: {
    visibility: 'hidden',
    height:0,
  }
}));


export default function Demo() {
  const { addCard } = useCardsFacade();

  const { classes } = useStyles();

  const form = useForm({
    initialValues: { id: 0, deckId: 2, front: '', back: '', favorited: false},

    validate: {
      front: (value) => (value.split(" ").length < 2 ? 'Card term must have at least 2 words' : null),
      back: (value) => (value.length < 1 ? 'Card defintion is empty' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit(addCard)} className={classes.folderBottom}>
      <TextInput mb="sm" placeholder="Enter Term" {...form.getInputProps('front')} variant="unstyled" className={classes.inputBox} styles={{ error: { color: 'black'}, input: {fontSize: rem(18)}}}/>

        <Divider style={{width:'96%'}} color="gray.2" my="xs" />

      <TextInput mt="sm" placeholder="Enter Definition" {...form.getInputProps('back')} variant="unstyled" className={classes.inputBox} styles={{ error: { color: 'black', }, input: {fontSize: rem(20)}}}/>

      <Button type="submit" mt="sm" className={classes.btn}></Button>
    </form>
  );
}

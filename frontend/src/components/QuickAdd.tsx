import { useRef } from "react";
import { createStyles, Divider, Container, Anchor, Group, Burger, rem } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";

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
    display: 'flex'
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
}));

export default function QuickAdd() {
  const { classes } = useStyles();
  const [termValue, setTermValue] = useInputState('Enter term');
  const [definitionValue, setDefinitionValue] = useInputState('Enter definition');
  const termAreaRef = useRef<HTMLTextAreaElement>(null);
  const definitionAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(termAreaRef.current, termValue);
  useAutosizeTextArea(definitionAreaRef.current, definitionValue);

  return (
    <Container className={classes.inner}>
      <div className={classes.folder}>
        <div className={classes.folderTop}>
          hi
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
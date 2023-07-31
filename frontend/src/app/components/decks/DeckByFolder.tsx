import { createStyles, Paper, Text, rem } from '@mantine/core';
import { Deck } from '../../../types/DeckTypes';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'transform 150ms ease, box-shadow 100ms ease',
    padding: theme.spacing.xl,
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,

    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.02)',
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: rem(6),
      backgroundImage: theme.fn.linearGradient(0, theme.colors.yellow[6], theme.colors.yellow[6]),
    },
  },
}));

interface DeckByFolderProps {
  deck: Deck;
}

export default function DeckByFolder({ deck }: DeckByFolderProps) {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Paper
      withBorder
      radius="md"
      className={classes.card}
      onClick={() => navigate(`/decks/${deck.id}?deckName=${deck.title.replace(/\s+/g, "_")}`,{state: {deck: deck, return: 'folders/4?folderName=Test_folder'}})}>
      <Text size="xl" weight={500} mt="md">
        {deck.title}
      </Text>
      <Text size="sm" mt="sm" color="dimmed">
        {deck.description}
      </Text>
    </Paper>
  );
}
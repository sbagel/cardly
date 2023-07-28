import { useState } from 'react';
import { createStyles, Container, Anchor, Group, rem } from '@mantine/core';

const HEADER_HEIGHT = rem(100);

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
  },

  links: {
    paddingTop: theme.spacing.lg,
    height: HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  toggleLinks: {
    marginRight: `calc(${theme.spacing.sm} * -1)`,
  },

  toggleLink: {
    fontSize: rem(20),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[9],
    margin: '0 5% 0 0',
    fontWeight: 500,
    borderBottom: `${rem(3)} solid transparent`,
    transition: 'border-color 100ms ease, color 100ms ease',

    '&:hover': {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      textDecoration: 'none',
    },
  },

  toggleLinkActive: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 800,
    borderBottomColor: theme.colors.gray[theme.colorScheme === 'dark' ? 0 : 9],
  },
}));

export default function ToggleHeader() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(0);

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

  const toggleItems = toggleLinks.map((item, index) => (
    <Anchor<'a'>
      href={item.link}
      key={item.label}
      className={cx(classes.toggleLink, { [classes.toggleLinkActive]: index === active })}
      onClick={() => {
        setActive(index);
      }}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <Container className={classes.inner} mb={40}>
      <div className={classes.links}>
        <Group spacing={0} className={classes.toggleLinks}>
          {toggleItems}
        </Group>
      </div>
    </Container>
  );
}
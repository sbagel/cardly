import { useState, useEffect } from 'react';
import { createStyles, Container, Group, rem } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(location.pathname == '/add' ? 0 : location.pathname == '/decks' ? 1 : location.pathname == '/decks/public' ? 2 : 0);

  useEffect(() => {
    setActive(location.pathname == '/add' ? 0 : location.pathname == '/decks' ? 1 : location.pathname == '/folders' ? 2 : 0)
  }, [location.pathname])

  const toggleLinks = [
    {
      "link": "/add",
      "label": "New Deck"
    },
    {
      "link": "/decks",
      "label": "My Decks"
    },
    {
      "link": "/folders",
      "label": "My folders"
    },
  ]

  const toggleItems = toggleLinks.map((item, index) => (
    <Link to={item.link}
      key={item.label}
      className={cx(classes.toggleLink, { [classes.toggleLinkActive]: index === active })}
      onClick={() => {
        setActive(index);
      }}
    >
      {item.label}
    </Link>
  ));

  return (
    <>
    <Container className={classes.inner} mb={40}>
      <div className={classes.links}>
        <Group spacing={0} className={classes.toggleLinks}>
          {toggleItems}
        </Group>
      </div>
    </Container>
    </>
  );
}
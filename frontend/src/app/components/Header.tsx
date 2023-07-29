import { ReactNode } from 'react';
import { createStyles, keyframes, Header, Container, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FaPlus, FaLightbulb, FaBell, FaUser } from 'react-icons/fa';
import { Outlet, Link } from 'react-router-dom';
import ToggleHeader from './ToggleHeader';

const HEADER_HEIGHT = rem(84);

const tilt = keyframes({
  '0%': { transform: 'rotate(0deg) scale(1)' },
  '25%': { transform: 'rotate(-8deg) scale(1.1)' },
  '75%': { transform: 'rotate(8deg) scale(1.1)' },
  '100%': { transform: 'rotate(0deg) scale(1.1)' },
});

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    fontWeight: 700,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  links: {
    paddingTop: theme.spacing.lg,
    height: HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  mainLinks: {
    marginRight: `calc(${theme.spacing.sm} * -1)`,
  },

  mainLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: '1/1',
    fontSize: rem(20),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[9],
    padding: `${rem(7)} ${theme.spacing.sm}`,
    marginRight: 30,
    fontWeight: 700,
    borderRadius: 1000,
    border: `${rem(3)} solid black`,
    transition: 'animation 100ms ease;',

    '&:hover': {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      animation: `${tilt} 1s linear`,
      transform: 'scale(1.1)'
    },
  },

}));

interface LinkProps {
  icon: ReactNode;
  url: string;
  label: string;
}

function ItemTemplate({ icon, url, label }: LinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Link to={url}
      key={label}
      className={cx(classes.mainLink)}
    >
      {icon}
    </Link>
  )
}

export default function DoubleHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <>
    <Header height={HEADER_HEIGHT} mb={20}>
      <Container className={classes.inner}>
        <Link to="/"><h1 className={classes.logo}>Cardly</h1></Link>
        <div className={classes.links}>
          <Group spacing={0} position="right" className={classes.mainLinks}>
            <ItemTemplate icon={<FaPlus/>} url="/add" label="add"/>
            <ItemTemplate icon={<FaLightbulb/>} url="/session" label="session"/>
            <ItemTemplate icon={<FaBell/>} url="/notifications" label="notifications"/>
            <ItemTemplate icon={<FaUser/>} url="/user" label="user"/>
          </Group>
        </div>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
      </Container>
    </Header>
    <ToggleHeader/>
    <Outlet/>
    </>
  );
}
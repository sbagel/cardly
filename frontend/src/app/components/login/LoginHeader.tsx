import { createStyles, Header, Container, Group, rem } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import {  Link } from 'react-router-dom';

const HEADER_HEIGHT = rem(84);

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

  links: {
    paddingTop: theme.spacing.lg,
    height: HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  mainLinks: {
    marginRight: `calc(${theme.spacing.sm} * -1)`,
  },

  unknownUser: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[9],
    fontSize: rem(20),
    fontWeight: 700,
    padding: `${rem(7)} ${theme.spacing.sm}`,
    marginRight: 30,
  },

  unknownUserLink: {
    borderBottom: `${rem(3)} solid transparent`,
    transition: 'border-color 100ms ease, color 100ms ease',

    '&:hover': {
      borderBottomColor: theme.colors.gray[theme.colorScheme === 'dark' ? 0 : 9],
    },
  }

}));

export default function LoginHeader() {
  const { classes } = useStyles();
  const { hovered, ref } = useHover();

  return (
    <Header height={HEADER_HEIGHT} mb={20}>
      <Container className={classes.inner}>
          <Link to="/"><h1 className={classes.logo}>Cardly</h1></Link>
          <div className={classes.links}>
            <Group spacing={0} position="right" className={classes.mainLinks}>
                <Link to="/login" className={classes.unknownUser}><span className={classes.unknownUserLink}>Log in</span></Link>
                <div ref={ref} className={classes.unknownUser} style={{'backgroundColor': hovered? '#e9e930' : '#F0F073', 'border': `${rem(3)} solid black`, 'transform': hovered? 'scale(1.01)' : 'scale(1)', 'transition': 'background-color 100ms ease, transform 100ms ease'}}>
                  <Link to="/" style={{'color':'black'}}>Get started </Link>
                </div>
              </Group>
          </div>
      </Container>
    </Header>
  )
}

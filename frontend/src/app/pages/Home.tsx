import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebouncedValue } from '@mantine/hooks';
import LoginHeader from '../components/login/LoginHeader';
import HeroContent from '../components/login/HeroContent';
import useUsersFacade from "../facades/useUsersFacade";
import useDecksFacade from '../facades/useDecksFacade';

export default function Home() {
  const navigate = useNavigate();
  const { user, login, checkStorage } = useUsersFacade();
  const [debounced] = useDebouncedValue(user, 200);
  const { fetchDecks } = useDecksFacade();

  useEffect(()=>{
    checkStorage();

    if (user !== debounced && user) {
      login(user);
      fetchDecks(user.id);

      navigate('/add');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    !user &&
    <div>
      <LoginHeader/>
      <HeroContent/>
    </div>
  )
}

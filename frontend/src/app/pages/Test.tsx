import { useEffect } from "react";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import useUsersFacade from "../facades/useUsersFacade";

function Test() {
  const navigate = useNavigate();
  const { user, loading, error, fetchUser, login, logout } = useUsersFacade();

  useEffect(() => {
    user && navigate('/add');
    console.log('user', user)
  }, [user])

  const handleLogin = () => {
    login({
      id: 1,
      username: 'hi',
      name: 'there',
      photo: 'url'
    })
  };

  const handleLogout = () => {
    logout()
  };


  return (
    <>

    <br></br>
    <br></br>
    <br></br>
    <br></br>
      <Button onClick={handleLogin}>login</Button>
      <Button onClick={handleLogout}>logout</Button>
      <div className="Test">
        Test! <Link to="/add">add</Link>
      </div>
      <div>
        Go back:  <Link to="/">back</Link>
      </div>
      <Outlet/>
    </>
  )
}

export default Test
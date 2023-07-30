import { useEffect } from "react";
import { Outlet, Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useAuth } from "../../hooks/useAuth";
import useUsersFacade from "../facades/useUsersFacade";

function Test() {
  const { user, login, logout } = useAuth();
  // const { user, loading, error, fetchUsers } = useUsersFacade();

  // useEffect(() => {
  //   fetchUsers(1);
  // }, []);

  useEffect(() => {
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
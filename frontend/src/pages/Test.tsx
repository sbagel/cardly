import { useEffect } from "react";
import { Outlet, Link } from 'react-router-dom';
import useUsersFacade from '../app/useUsersFacade';


function Test() {

  const { users, loading, error, fetchUsers } = useUsersFacade();

  // useEffect(() => fetchUsers(), []);

  console.log('hi',users)

  return (
    <>
      <div className="Test">
        Test! <Link to="/test2">test2</Link>
      </div>
      <div>
        Go back:  <Link to="/">back</Link>
      </div>
      <Outlet/>
    </>
  )
}

export default Test
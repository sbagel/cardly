import { useEffect } from "react";
import { Outlet, Link } from 'react-router-dom';
import useUsersFacade from "../facades/useUsersFacade";

function Test() {

  const { user, loading, error, fetchUsers } = useUsersFacade();

  useEffect(() => {
    fetchUsers(1);
  }, []);

  console.log("User ID:", user.id);


  return (
    <>
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
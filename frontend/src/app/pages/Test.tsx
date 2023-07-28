import { useEffect } from "react";
import { Outlet, Link } from 'react-router-dom';
import useUsersFacade from '../facades/useUsersFacade';

function Test() {

  const { users, loading, error, fetchUsers } = useUsersFacade();

  useEffect(() => {
    fetchUsers()
  }, []);

  console.log('hi', users)

  return (
    <>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {users?.length > 0 && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        )}
      </div>
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
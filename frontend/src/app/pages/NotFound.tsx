import { Outlet, Link } from 'react-router-dom';

export default function NotFound() {

  return (
    <>
      <div>
        Error! Go back: <Link to="/">back</Link>
      </div>
      <Outlet/>
    </>
  )
}


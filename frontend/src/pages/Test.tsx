import { Outlet, Link } from 'react-router-dom';

function Test() {

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
import { Link } from 'react-router';

function Navbar({ user, setUser }) {
  function logOut() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <nav>
      {/* Routes seen by everyone */}
      <Link className="nav-logo" to="/">
        <img src="/logo.png" alt="973Bites Logo" />      </Link>
      <Link to="/restaurants">
        Restaurants
      </Link>

      {user ? (
        // Links for protected routes only for logged in users
        <>
        <Link to='/restaurants/new'>Add Restaurant</Link>
        <Link to='/my-restaurants'>My Restaurants</Link>
        <span >{user.username}</span>
       
        <button onClick={logOut}>Log Out</button>


        </>
      ) : (
        // Links for not logged in users
        <>
          <Link to="/sign-up">
            Sign up
          </Link>
          <Link to="/sign-in">
            Sign in
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
import { Link } from 'react-router';

function Navbar({ user, setUser }) {
  function logOut() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <nav className="style-header">
      {/* Routes seen by everyone */}
      <Link className="style-header__item" to="/">
        973Bites
      </Link>
      <Link className="style-header__item" to="/restaurants">
        Restaurants
      </Link>

      {user ? (
        // Links for protected routes only for logged in users
        <>
          <Link className="style-header__item" to="/restaurants/new">
            Add Restaurant
          </Link>
          <span className="style-header__user">{user.username}</span>

          <button className="style-header__button" onClick={logOut}>
            Log Out
          </button>
        </>
      ) : (
        // Links for not logged in users
        <>
          <Link className="style-header__item" to="/sign-up">
            Sign up
          </Link>
          <Link className="style-header__item" to="/sign-in">
            Sign in
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
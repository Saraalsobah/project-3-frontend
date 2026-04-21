import { Link } from 'react-router'

function Navbar({ user, setUser }) {


  function logOut(){
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <nav>
      {/* Routes seen by everyone */}
      <Link className='nav-item' to='/'>973Bites</Link>
      <Link className='nav-item' to='/restaurants'>Restaurants</Link>

      {user ? (
        // Links for protected routes only for logged in users
        <>
        <Link className='nav-item' to='/restaurants/new'>Add Restaurant</Link>
        <Link className='nav-item' to='/my-restaurants'>My Restaurants</Link>
        <span className='nav-item'>{user.username}</span>
       
        <button className='nav-item' onClick={logOut}>Log Out</button>


        </>
      ) :
      (
        // links for not logged in users
        <>
        <Link className='nav-item' to='/sign-up'>Sign up</Link>
        <Link className='nav-item' to='/sign-in'>Sign in</Link>

        </>
      )
      }
    </nav>
  )
}

export default Navbar
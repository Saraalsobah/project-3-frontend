import { useNavigate } from "react-router"

function HomePage({ user }) {
  const navigate = useNavigate()

  return (
    <div>
      <h1>973Bites</h1>

      <p>Find the best restaurants, explore their menus, and enjoy great food 🍔</p>

      <button onClick={() => navigate("/restaurants")}>Browse Restaurants</button>

      {!user && (
        <div>
          <button onClick={() => navigate("/sign-in")}> Sign In </button>
          <button onClick={() => navigate("/sign-up")}> Sign Up </button>
        </div>
      )}
    </div>
  )
}

export default HomePage
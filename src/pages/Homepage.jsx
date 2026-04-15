import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

function HomePage({ user }) {
  const [restaurants, setRestaurants] = useState([])
  const navigate = useNavigate()

  async function getAllRestaurants() {
    try {
      const getRestaurants = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurants`)
      setRestaurants(getRestaurants.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllRestaurants()
  }, [])

  function handleRandom() {
    if (restaurants.length === 0) return

    const randomIndex = Math.floor(Math.random() * restaurants.length)
    const randomRestaurant = restaurants[randomIndex]

    navigate(`/restaurants/${randomRestaurant._id}`)
    
  }

  return (
    <div>
      <h1>973Bites</h1>

      <p>Find the best restaurants, explore their menus, and enjoy great food 🍔</p>

      <button onClick={() => navigate("/restaurants")}>Browse Restaurants</button>

      <button onClick={handleRandom}> Random Restaurant </button>

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
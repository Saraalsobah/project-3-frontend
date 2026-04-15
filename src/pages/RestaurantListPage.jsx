import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router"
import { useNavigate } from "react-router"


function RestaurantListPage({ user }) {
  const [restaurants, setRestaurants] = useState([])
  const navigate = useNavigate()

  async function getAllRestaurants() {
    try {
      const getAllRestaurants = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurants`)
      setRestaurants(getAllRestaurants.data)
    } 
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllRestaurants()
  }, [])

  return (
    <div>
      <h1>All Restaurants</h1>

      <div>
        {restaurants.map((restaurant) => (
          <div key={restaurant._id}>
            <img src={restaurant.image} alt={restaurant.name}/>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.cuisine}</p>
            <p>{restaurant.area}</p>
            <Link to={`/restaurants/${restaurant._id}`}> See Details </Link>
          </div>
        ))}
      </div>
      {user && (
        <button onClick={() => navigate("/restaurants/new")}> Add a Restaurant </button>
      )}
    </div>
  )
}

export default RestaurantListPage
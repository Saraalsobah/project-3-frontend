import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import RestaurantCard from "../components/RestaurantCard"


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
          <RestaurantCard key={restaurant._id}
          restaurant={restaurant}
          />
        ))}
      </div>
      {user && (
        <button onClick={() => navigate("/restaurants/new")}> Add a Restaurant </button>
      )}
    </div>
  )
}

export default RestaurantListPage
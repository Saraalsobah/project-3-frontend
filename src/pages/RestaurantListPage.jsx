import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import RestaurantCard from "../components/RestaurantCard"


function RestaurantListPage({ user }) {
  const [restaurants, setRestaurants] = useState([])
  const [search, setSearch] = useState("")
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

   const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="restaurant-list-page">
      <h1>All Restaurants</h1>

      <input
        type="text"
        placeholder="973Bites"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
/>

      <div className="restaurant-list">
        {filteredRestaurants.length === 0 ? (
          <p>No restaurants found</p>
          ) : (
          filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))
        )}
      </div>
      {user && (
        <button onClick={() => navigate("/restaurants/new")}> Add a Restaurant </button>
      )}
    </div>
  )
}

export default RestaurantListPage
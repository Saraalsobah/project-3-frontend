import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import RestaurantCard from "../components/RestaurantCard"


function RestaurantListPage({ user }) {
  const [selectedCuisine, setSelectedCuisine] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [restaurants, setRestaurants] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  async function getAllRestaurants() {
    try {
      setLoading(true)
      const getAllRestaurants = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurants`)
      setRestaurants(getAllRestaurants.data)
    } 
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllRestaurants()
  }, [])

  const filteredRestaurants = restaurants.filter((r) => {
  const matchesName = r.name.toLowerCase().includes(search.toLowerCase())
  const matchesCuisine = selectedCuisine ? r.cuisine === selectedCuisine : true
  const matchesLocation = selectedLocation ? r.location === selectedLocation : true

  return matchesName && matchesCuisine && matchesLocation
})

  return (
    <div className="restaurant-list-page">
      <h1>All Restaurants</h1>
      <br />

    <div className="restaurant-list-filters">
      <input
        type="text"
        placeholder="973Bites"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
/>
      <select value={selectedCuisine} onChange={(e) => setSelectedCuisine(e.target.value)}>
        <option value="">All Cuisines</option>
        <option value="Italian">Italian</option>
        <option value="Indian">Indian</option>
        <option value="Arabic">Arabic</option>
        <option value="Mexican">Mexican</option>
        <option value="American">American</option>
        <option value="French">French</option>
        <option value="Chinese">Chinese</option>
        <option value="Japanese">Japanese</option>
      </select>

      <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
        <option value="">All Locations</option>
        <option value="Manama">Manama</option>
        <option value="Sitra">Sitra</option>
        <option value="Riffa">Riffa</option>
        <option value="Juffair">Juffair</option>
        <option value="Amwaj Islands">Amwaj Islands</option>
        <option value="Saar">Saar</option>
        <option value="Seef">Seef</option>
        <option value="Muharraq">Muharraq</option>
        <option value="Isa Town">Isa Town</option>
        <option value="Budaiya">Budaiya</option>
        <option value="Hidd">Hidd</option>
        <option value="Sanad">Sanad</option>
        <option value="Tubli">Tubli</option>
        <option value="Adliya">Adliya</option>
        <option value="Galali">Galali</option>
        <option value="Arad">Arad</option>
        <option value="Busaiteen">Busaiteen</option>
      </select>
    </div>

    {loading ? (
        <p>Loading...</p>
      ) : (
      <div className="restaurant-grid">
        {filteredRestaurants.length === 0 ? (
          <p>No restaurants found</p>
          ) : (
          filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))
        )}
      </div>
      )}
      {user && (
        <div className="restaurant-list-page .add-btn-wrapper">
          <button className="btn" onClick={() => navigate("/restaurants/new")}> Add a Restaurant </button>
        </div>
        
      )}
    </div>
  )
}

export default RestaurantListPage
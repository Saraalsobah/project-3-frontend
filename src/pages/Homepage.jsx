import { useState } from 'react'
import { useNavigate } from "react-router"
import axios from 'axios'

function HomePage({ user }) {
  const navigate = useNavigate()

  async function handleRandom(){
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurants`)
    const restaurants = res.data
    const randomRestaurant = Math.floor(Math.random() * restaurants.length)
    navigate(`/restaurants/${restaurants[randomRestaurant]._id}`)
  }

  return (
    <div>
      <h1>973Bites</h1>
      <h5>Find the best restaurants, explore their menus, and enjoy great food!</h5>

      <p>A restaurant discovery platform specifically for Bahrain. Restaurant owners can create listings and manage their digital menus, while food lovers can browse a variety of local dining options, and explore their menus. Whether you know exactly what you're craving or need a little inspiration, 973Bites makes finding your next meal easy.</p>

      <button onClick={() => navigate("/restaurants")}>Browse Restaurants</button>
      <button onClick={handleRandom}>Random Restaurant</button>
    </div>
  )
}

export default HomePage
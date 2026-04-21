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

      <h3>Feeling Indecisive?</h3>
      <p>Can't decide where to eat today? Let us choose a local favorite for you!</p>
      <button onClick={handleRandom}>Pick a Random Restaurant</button>

      {!user && (
        <>
          <p>Own a restaurant in Bahrain? Join our community.</p>
          <button onClick={() => navigate("/sign-up")}>Register Your Business</button>
        </>
      )}
    </div>
  )
}

export default HomePage
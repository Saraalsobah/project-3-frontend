import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router"
import MenuItemList from "../components/MenuItemList"

function RestaurantDetailsPage({ user }) {
  const { restaurantId } = useParams()
  const navigate = useNavigate()

  const [restaurant, setRestaurant] = useState(null)

  async function getRestaurant() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurants/${restaurantId}`)
      setRestaurant(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRestaurant()
  }, [])

  async function handleDelete() {
    try {
      const token = localStorage.getItem("token")

      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/restaurants/${restaurantId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      navigate("/restaurants")
    }
    catch (err) {
      console.log(err)
    }
  }

  if (!restaurant) return <h2>Loading...</h2>

  const isOwner = user && restaurant.author?._id === user._id

  return (
    <div className="restaurant-details-page">
      <img src={restaurant.logourl} alt={restaurant.name} />
      <h1>{restaurant.name}</h1>
      <p>{restaurant.cuisine}</p>
      <p>{restaurant.location}</p>

      {isOwner && (
        <>
          <button onClick={() => navigate(`/restaurants/${restaurantId}/edit`)}>
            Edit
          </button>

          <button onClick={handleDelete}>Delete</button>
        </>
      )}

      <MenuItemList
        menuItems={restaurant.menuItems}
        isOwner={isOwner}
        restaurantId={restaurantId}
        refresh={getRestaurant}
      />
    </div>
  )
}

export default RestaurantDetailsPage
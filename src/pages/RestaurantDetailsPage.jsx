import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router"
import MenuItemList from "../components/MenuItemList"

function RestaurantDetailsPage({ user }) {
  const { restaurantId } = useParams()
  const navigate = useNavigate()

  const [restaurant, setRestaurant] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

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
      setShowConfirm(false)
      navigate("/restaurants")
    }
    catch (err) {
      console.log(err)
    }
  }

  if (!restaurant) return <h2>Loading...</h2>

  const isOwner = user && restaurant.author?._id === user._id

  return (
    <div>
      <img src={restaurant.logourl} alt={restaurant.name} />
      <h1>{restaurant.name}</h1>
      <p>{restaurant.cuisine}</p>
      <p>{restaurant.location}</p>

      {isOwner && (
        <>
          <button onClick={() => navigate(`/restaurants/${restaurantId}/edit`)}>
            Edit
          </button>

          <button onClick={() => setShowConfirm(true)}>Delete</button>
          {showConfirm && (
            <div>
              <p>Are you sure you want to delete?</p>

              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          )}
          <button onClick={() => navigate(`/restaurants/${restaurantId}/menu-items`)}>
            Add Menu Item
          </button>
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
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
    <div className="restaurant-details-page">
      <div className="restaurant-details-header">
        <img src={restaurant.logourl} alt={restaurant.name} />
      </div>
      <div className="restaurant-details-info">
        <h1>{restaurant.name}</h1>
        <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
        <p><strong>Location:</strong> {restaurant.location}</p>
      </div>
      

      {isOwner && (
        <div className="restaurant-details-actions">
          <button className="btn-secondary" onClick={() => navigate(`/restaurants/${restaurantId}/edit`)}>
            Edit Restaurant
          </button>

          {!showConfirm ? (
            <button className="btn-danger" onClick={() => setShowConfirm(true)}>Delete Restaurant</button>
          ) : (
            <div className="confirm-delete">
              <p>Are you sure you want to delete?</p>
              <button className="btn-danger" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          )}
        </div>
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
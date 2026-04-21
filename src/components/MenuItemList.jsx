import axios from "axios"
import { useNavigate } from "react-router"

function MenuItemList({ menuItems, isOwner, restaurantId, refresh }) {
  const navigate = useNavigate()

  async function handleDelete(menuItemId) {
    try {
      const token = localStorage.getItem("token")

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/restaurants/${restaurantId}/menu-items/${menuItemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      refresh()
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {isOwner && (
        <button
          style={{ marginBottom: '1rem' }}
          onClick={() => navigate(`/restaurants/${restaurantId}/menu-items/new`)}>
          Add Menu Item
        </button>
      )}
      <h2>Menu</h2>

      {menuItems.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>{item.price} BHD</p>
          <p>{item.category}</p>

          {isOwner && (
            <>
              <button onClick={() => navigate(`/restaurants/${restaurantId}/menu-items/${item._id}`)}>
                Edit
              </button>

              <button onClick={() => handleDelete(item._id)}> Delete </button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default MenuItemList
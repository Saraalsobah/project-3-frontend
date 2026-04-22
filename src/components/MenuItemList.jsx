import axios from "axios"
import { useNavigate } from "react-router"

function MenuItemList({ menuItems, isOwner, restaurantId, refresh }) {
  const navigate = useNavigate()
  const categories = ['Appetizer', 'Main', 'Dessert', 'Drink', 'Side']

  async function handleDelete(menuItemId) {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/restaurants/${restaurantId}/menu-items/${menuItemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      refresh()
    }
    catch (err) {}
  }

  return (
    <div className="menu-section">
      {isOwner && (
        <button className="btn" onClick={() => navigate(`/restaurants/${restaurantId}/menu-items/new`)}>
          Add Menu Item
        </button>
      )}

      <h2>Menu</h2>

      {menuItems.length === 0 ? (
        <p>No menu items yet.</p>
      ) : (
        categories.map(function(category) {
          const itemsInCategory = menuItems.filter(function(item) {
            return item.category === category
          })
          if (itemsInCategory.length === 0) return null
          return (
            <div key={category} className="menu-category">
              <h3>{category}</h3>
              {itemsInCategory.map(function(item) {
                return (
                  <div key={item._id} className="menu-item">
                    {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
                    <div className="menu-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.price} BHD</p>
                    </div>
                    {isOwner && (
                      <div className="menu-item-actions">
                        <button className="btn-secondary" onClick={() => navigate(`/restaurants/${restaurantId}/menu-items/${item._id}/edit`)}>
                          Edit
                        </button>
                        <button className="btn-danger" onClick={() => handleDelete(item._id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })
      )}
    </div>
  )
}

export default MenuItemList
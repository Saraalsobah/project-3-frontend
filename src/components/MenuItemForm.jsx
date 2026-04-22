import { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'

function MenuItemForm() {

  const { restaurantId, menuItemId } = useParams() 
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    price: '',
    category: ''
  })

   async function getMenuItemDetails() {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurants/${restaurantId}`)
    const menuItem = res.data.menuItems.find(function(item) {return item._id == menuItemId})
    setFormData(menuItem || { name: '', price: '', category: '' })
  }

  useEffect(() => {
    if (menuItemId) {
      getMenuItemDetails()
    }
  }, [])
  
  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if (menuItemId) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/restaurants/${restaurantId}/menu-items/${menuItemId}`, formData, { headers: { Authorization: `Bearer ${token}` } })
      }
      else{
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/restaurants/${restaurantId}/menu-items`, formData, { headers: { Authorization: `Bearer ${token}`} })
      }
      navigate(`/restaurants/${restaurantId}`)
    }

    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="form-page">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>{menuItemId ? 'Edit Dish' : 'Add New Dish'}</h1>

        <div className="form-group">
          <label htmlFor="name">Dish Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Dish Name" />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Dish Image URL:</label>
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (BHD):</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select a category</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main">Main</option>
            <option value="Dessert">Dessert</option>
            <option value="Drink">Drink</option>
            <option value="Side">Side</option>
          </select>
        </div>
      
        <div className="form-actions">
          <button type="submit" className="btn">{menuItemId ? 'Save Changes' : 'Add to Menu'}</button>
          <button type="button" className="btn-secondary" onClick={() => navigate(`/restaurants/${restaurantId}`)}>Cancel</button>
        </div>
        
      </form>
    </div>
  )
}

export default MenuItemForm
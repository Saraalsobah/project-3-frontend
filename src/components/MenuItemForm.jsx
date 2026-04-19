import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'

function MenuItemForm() {

  const { restaurantId } = useParams() 
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: ''
  })

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/restaurants/${restaurantId}/menu-items`, formData, { headers: { Authorization: `Bearer ${token}`} })
      navigate(`/restaurants/${restaurantId}`)
    }

    catch(err){
      console.log(err)
    }
  }

  return (

    <div>
      <h1>Add New Dish</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Dish Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} />

        <label htmlFor="price">Price (BHD):</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} />

        <label htmlFor="category">Category:</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select a category</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Main">Main</option>
          <option value="Dessert">Dessert</option>
          <option value="Drink">Drink</option>
          <option value="Side">Side</option>
        </select>
        
        <button type="submit">Add to Menu</button>
        <button type="button" onClick={() => navigate(`/restaurants/${restaurantId}`)}>Cancel</button>
      </form>
    </div>
  )
}

export default MenuItemForm
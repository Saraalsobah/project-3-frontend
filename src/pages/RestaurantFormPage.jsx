import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'


function RestaurantFormPage() {

  const { restaurantId } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    location: '',
    logourl: '',
  })

  const fetchRestaurant = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurants/${restaurantId}`)
    setFormData(res.data)
  } catch (err) {
    console.log(err)
  }
}

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurant()
    }
    else{
      setFormData({
      name: '',
      cuisine: '',
      location: '',
      logourl: '',
    })
    }
  }, [restaurantId])



    function handleChange(event){
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    async function handleSubmit(event){
    event.preventDefault()

    try {
      const token = localStorage.getItem('token')

      if (restaurantId) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/restaurants/${restaurantId}`,formData,{ headers: { Authorization: `Bearer ${token}`} })
      } 
      else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/restaurants`, formData, { headers: { Authorization: `Bearer ${token}`} })
      }

      navigate('/restaurants')
    } 
    catch(err){
      console.log(err)
    }
  }     
    

  return (
    <div className="form-page">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>{restaurantId ? 'Edit Restaurant' : 'Add a Restaurant'}</h1>

        <div className="form-group">
          <label htmlFor="name">Restaurant Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Restaurant Name"/>
        </div>

        <div className="form-group">
          <label htmlFor="cuisine">Cuisine:</label>
          <input name="cuisine" value={formData.cuisine} onChange={handleChange} placeholder="Cuisine" />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>     
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Location"/>
        </div>

        <div className="form-group">
          <label htmlFor="logourl">Logo URL:</label> 
          <input name="logourl" value={formData.logourl} onChange={handleChange} placeholder="Logo URL"/>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn">{restaurantId ? 'Save Changes' : 'Create Restaurant'}</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/restaurants')}>Cancel</button>
        </div>
      
      </form>
    </div>
  )
}

export default RestaurantFormPage
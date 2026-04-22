import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import RestaurantCard from '../components/RestaurantCard'

function MyRestaurantsPage({ user }) {
    const [restaurants, setRestaurants] = useState([])
    const navigate = useNavigate()

    async function getMyRestaurants(){
        try{
            const token = localStorage.getItem('token')
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurants`, {headers: { Authorization: `Bearer ${token}` }})
            const allRestaurants = res.data
            const myRestaurants = allRestaurants.filter(function(restaurant) {
                return restaurant.author._id === user._id   
            })
            setRestaurants(myRestaurants)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getMyRestaurants()
    }, [])


  return (
   <div className="my-restaurants-page">
      <h1>My Restaurants</h1>
      <button className="btn" onClick={() => navigate('/restaurants/new')}>Add a Restaurant</button>
      {restaurants.length === 0
        ? <p>You haven't added any restaurants yet.</p>
        : <div className="restaurant-grid">
            {restaurants.map(function(restaurant) {
              return <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            })}
          </div>
      }
    </div>
  )
}

export default MyRestaurantsPage
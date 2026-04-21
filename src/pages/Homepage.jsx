import { useState } from 'react'
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
    <div className="homepage-container card" style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '2.5rem', marginBottom: '0.5rem' }}>973Bites</h1>
      <h5 style={{ color: 'var(--color-accent-dark)', fontWeight: 600, marginBottom: '1.5rem' }}>Find the best restaurants, explore their menus, and enjoy great food!</h5>

      <p className="homepage-description" style={{ color: 'var(--color-muted)', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '2.5rem', background: 'var(--color-bg)', borderRadius: '1rem', padding: '1.2rem 1.5rem', boxShadow: '0 1px 6px rgba(138,154,91,0.04)' }}>
        A restaurant discovery platform specifically for Bahrain. Restaurant owners can create listings and manage their digital menus, while food lovers can browse a variety of local dining options, and explore their menus. Whether you know exactly what you're craving or need a little inspiration, 973Bites makes finding your next meal easy.
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button className="btn" onClick={() => navigate("/restaurants")}>Browse Restaurants</button>
        <button className="btn" onClick={handleRandom}>Random Restaurant</button>
      </div>
    </div>
  )
}

export default HomePage
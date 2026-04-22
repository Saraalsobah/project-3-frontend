import { Link } from "react-router"

function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <img src={restaurant.logourl} alt={restaurant.name} />
      <div className="restaurant-card-body">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.cuisine}</p>
        <p>{restaurant.location}</p>
        <Link to={`/restaurants/${restaurant._id}`}>See Details</Link>
      </div>
    </div>
  )
}

export default RestaurantCard
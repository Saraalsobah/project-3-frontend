import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Homepage from './pages/Homepage';
import SignUp from './pages/Signup';
import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';
import RestaurantListPage from './pages/RestaurantListPage'
import RestaurantDetailsPage from './pages/RestaurantDetailsPage'
import RestaurantFormPage from './pages/RestaurantFormPage'

function App() {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userInfo = JSON.parse(atob(token.split('.')[1])).payload;
        setUser(userInfo);
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={!user ? <SignUp /> : <Navigate to="/restaurants" />} />
        <Route path="/sign-in" element={!user ? <SignIn setUser={setUser} /> : <Navigate to="/restaurants" />} />
        <Route path="/restaurants" element={<RestaurantListPage />} />
        <Route path="/restaurants/:restaurantId" element={<RestaurantDetailsPage user={user} />} />
        <Route path="/restaurants/new" element={user ? <RestaurantFormPage /> : <Navigate to="/sign-in" />}/>
        <Route path="/restaurants/:restaurantId/edit" element={user ? <RestaurantFormPage user={user} /> : <Navigate to="/sign-in" />}/>
      </Routes>
    </div>
  );
}

export default App;
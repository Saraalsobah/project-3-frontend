import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link} from 'react-router';

function SignIn({ setUser }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-in`, formData);
      const token = response.data.token;

      const userInfo = JSON.parse(atob(token.split('.')[1])).payload;
      setUser(userInfo);
      localStorage.setItem('token', token);

      navigate('/restaurants');
    } catch (err) {
      setErrorMessage(err.response?.data?.err || 'An error occurred during sign in');
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn">Sign In</button>
          </div>
        </form>
        {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}
        <p className="form-link">Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default SignIn;
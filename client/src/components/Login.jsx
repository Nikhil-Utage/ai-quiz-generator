import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      console.log(import.meta.env.VITE_BACKEND_URL)
      const response = await fetch(imoprt.meta.env.VITE_BACKEND_URL + '/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Invalid login credentials!');
      }

      // On successful login
      localStorage.setItem('token', data.token);  // Store JWT in localStorage
      setSuccess('Login successful!');
      setFormData({ email: '', password: '' });  // Reset form

      // You might want to redirect the user after login
      history.push('/');

    } catch (err) {
      setError(err.message);
    }

    // Perform login action (you can replace this with actual authentication logic)
    console.log('Email:', email);
    console.log('Password:', password);
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {/* Error message */}
          {error && <p className="error">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

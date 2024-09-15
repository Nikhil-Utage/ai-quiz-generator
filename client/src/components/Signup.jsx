import React, { useState } from 'react';
import "./login.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    console.log(name, email, password)

    // Basic validation checks
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data, response.ok)
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      // On successful registration
      setSuccess('Signup successful! Please login.');
      setFormData({ name: '', email: '', password: '' }); // Reset form

    } catch (err) {
      setError(err.message);
      console.log(err)
    }

    // You can replace this with a call to your API for signing up the user
    console.log('Signup form data:', formData);
  };

  return (
    <div className='login-container'>
      <div className='login-box'>

      <h2>Signup</h2>
      {submitted ? (
        <p>Signup successful! Welcome.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className='input-group'>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              />
          </div>

          {/* Email Input */}
          <div className='input-group'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              />
          </div>

          {/* Password Input */}
          <div className='input-group'>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* Signup Button */}
          <button className='login-btn' type="submit">Signup</button>
        </form>
      )}
      </div>
    </div>
  );
};

export default Signup;

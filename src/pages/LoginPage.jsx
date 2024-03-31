import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../helpers/strings';

export function LoginPage()
{
    const navigate = useNavigate();
  // State for input fields
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State for submission status and error messages
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      if (response.ok) {
        // Login was successful
        localStorage.setItem('token', data.token);
        navigate("/dashboard");
      } else {
        // Handle server-side validation errors (e.g., wrong credentials)
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input 
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" disabled={isSubmitting}>Login</button>
      </form>
    </div>
  );
}

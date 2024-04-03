import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../helpers/strings';
import { useSetRecoilState } from 'recoil';
import { authState } from '../state/atoms';
import { fetchUserDetails } from '../helpers/methods';

export function SignupPage() {
  // State for input fields
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNo: ''
  });

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const setAuth = useSetRecoilState(authState)
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
    if (!formData.name || !formData.email || !formData.password || !formData.mobileNo) {
      setErrorMessage('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        const userDetails = await fetchUserDetails(data.token);
        if (userDetails) {
          setAuth({ isLoggedIn: true, token: data.token, userDetails }); // Update Recoil auth state
          navigate('/dashboard');
        } else {
          setErrorMessage('Failed to load user details.');
        }
      } else {
        setErrorMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
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
        <input
          type="text"
          name="mobileNo"
          placeholder="Mobile Number"
          value={formData.mobileNo}
          onChange={handleChange}
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" disabled={isSubmitting}>Signup</button>
      </form>
    </div>
  );
}

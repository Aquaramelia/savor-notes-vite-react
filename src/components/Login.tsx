import React, { useState, ChangeEvent, FormEvent } from 'react';
import api from '../utils/api';

// Define the structure of the credentials object
interface Credentials {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  // Define state type as Credentials
  const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' });

  // Handle input change with proper types
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Handle form submit with proper type
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    api.post('/login', credentials)
      .then(response => {
        console.log('Logged in:', response.data);
        // Save token or user ID if needed (you can add type to `response` if necessary)
      })
      .catch(error => console.error('Error logging in:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="Email"
        type="email" // Optional: adds basic email validation in the browser
      />
      <input
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

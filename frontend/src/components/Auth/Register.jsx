import React, { useState, } from 'react';
import API from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const navigate= useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/register', formData);
      alert('Registration successful!');
      navigate('/login');
      
    } catch (err) {
      setError(err.response.data.error || 'Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        style={styles.input}
      />
      <select name="role" onChange={handleChange} style={styles.input}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" style={styles.button}>Register</button>
      <p>Already have a account? <Link to="/login">Login</Link></p>
      <p>Go to <Link to="/">Home page</Link></p>
    </form>
  );
};

const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

export default Register;

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Assignment Manager</h1>
      <div style={styles.buttonContainer}>
        <Link to="/register" style={styles.button}>
          Register
        </Link>
        <Link to="/login" style={styles.button}>
          Login
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    display: 'inline-block',
    margin: '10px',
    padding: '15px 25px',
    fontSize: '16px',
    color: '#fff',
    textDecoration: 'none',
    backgroundColor: '#007BFF',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Home;

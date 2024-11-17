import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import {Link } from 'react-router-dom';

const UploadAssignment = () => {
  const [task, setTask] = useState('');
  const [admin, setAdmin] = useState('');
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch the list of admins on component mount
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('users/admins', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach JWT token
          },
        });
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error.response?.data?.error || error.message);
      }
    };

    fetchAdmins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'upload',
        {
          task,
          adminId: admin, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Assignment uploaded successfully!');
      setTask('');
      setAdmin('');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error uploading assignment');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Upload Assignment</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Task:
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={styles.input}
            required
          />
        </label>
        <label>
          Admin:
          <select
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
            style={styles.input}
            required
          >
            <option value="" disabled>
              Select an admin
            </option>
            {admins.map((admin) => (
              <option key={admin._id} value={admin._id}>
                {admin.username}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
      <p>Go to <Link to="/">Home page</Link></p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
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

export default UploadAssignment;

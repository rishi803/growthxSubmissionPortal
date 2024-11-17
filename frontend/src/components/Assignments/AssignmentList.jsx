import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import API from '../../services/api';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await API.get('/assignments');
        setAssignments(response.data);
      } catch (err) {
        console.error(err.response.data.error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div>
      <h2>Assignments</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment._id}>
            {assignment.task} - {assignment.status}
          </li>
        ))}
      </ul>
      <p>Go to <Link to="/">Home page</Link></p>
    </div>
  );
};

export default AssignmentList;

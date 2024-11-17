import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../services/api";

const Dashboard = () => {
  const [userRole, setUserRole] = useState("");
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        navigate("/login"); // Redirect to login if token is invalid
      }
    };
    fetchUserData();
  }, [navigate]);

  // Fetch assignments (for admins)
  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/assignments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    if (userRole === "admin") {
      fetchAssignments();
    }
  }, [userRole]);

  // Handle assignment status updates (for admins)
  const updateAssignmentStatus = async (assignmentId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `assignments/${assignmentId}/${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAssignments(); // Refresh assignments list
      
      alert(`Assignment ${status}`);
    } catch (error) {
      console.error("Error updating assignment status:", error);
    }
  };

  // Render different views based on role
  if (userRole === "user") {
    return (
      <div style={styles.container}>
        <h1>User Dashboard</h1>
        <button style={styles.button} onClick={() => navigate("/upload")}>
          Upload Assignment
        </button>
        <p>
          Go to <Link to="/">Home page</Link>
        </p>
      </div>
    );
  }

  if (userRole === "admin") {
    return (
      <div style={styles.container}>
        <h1>Admin Dashboard</h1>
        <h2>Assignments</h2>
        {assignments.length > 0 ? (
          <ul style={styles.assignmentList}>
            {assignments.map((assignment) => (
              <li key={assignment._id} style={styles.assignmentItem}>
                <p>Task: {assignment.task}</p>
                <p>User: {assignment.userId?.username || "Unknown"}</p>
                <p>Status: {assignment.status}</p>
                <div style={styles.buttonGroup}>
                  <button
                    style={styles.acceptButton}
                    onClick={() =>
                      updateAssignmentStatus(assignment._id, "accepted")
                    }
                  >
                    Accept
                  </button>
                  <button
                    style={styles.rejectButton}
                    onClick={() =>
                      updateAssignmentStatus(assignment._id, "rejected")
                    }
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No assignments tagged to you yet.</p>
        )}

        <p>
          Go to <Link to="/">Home page</Link>
        </p>
      </div>
    );
  }

  return <p>Loading...</p>;
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    textAlign: "center",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    margin: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  assignmentList: {
    listStyle: "none",
    padding: 0,
  },
  assignmentItem: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  acceptButton: {
    padding: "5px 10px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  rejectButton: {
    padding: "5px 10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Dashboard;

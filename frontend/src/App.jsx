import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AssignmentList from './components/Assignments/AssignmentList';
import Home from './pages/Home'
import UploadAssignment from './components/Assignments/UploadAssignment';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadAssignment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allAssignments" element={<AssignmentList />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

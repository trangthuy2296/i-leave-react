<<<<<<< HEAD
=======
import React from 'react';
import logo from './logo.svg';
>>>>>>> 1afa0f0 (Fix App.js error)
import './App.css';
import React from 'react';
import logo from './logo.svg';
import Login from './Login';
import Dashboard from './Dashboard';
import { ProtectedRoute } from './Component/ProtectedRoutes';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}  />
      </Routes>
    </Router>
  );
}
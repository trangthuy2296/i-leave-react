import React from 'react';
import './App.css';
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
//test branch
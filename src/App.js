import React from 'react';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedLayout } from './Component/ProtectedLayout';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Dashboard" element={<ProtectedLayout><Dashboard/></ProtectedLayout>}  />
      </Routes>
    </Router>
  );
}
//test branch
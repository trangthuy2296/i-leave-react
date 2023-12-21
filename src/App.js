//css
import './App.css';
//package
import React from 'react';
import {   Route, createBrowserRouter, createRoutesFromElements,defer } from "react-router-dom";
//page
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
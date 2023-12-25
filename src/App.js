import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import Login from './Login';
import { ProtectedLayout } from "./components/ProtectedLayout";
import { AuthLayout } from "./components/AuthLayout";
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import {
  Route,
  Router, Routes,
  createBrowserRouter,
  createRoutesFromElements,
  defer
} from "react-router-dom";

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
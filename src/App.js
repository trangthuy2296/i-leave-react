import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import Login from './Login';
import { ProtectedLayout } from "./components/ProtectedLayout";
import { AuthLayout } from "./components/AuthLayout";
import { HomeLayout } from "./components/HomeLayout";
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import { Route, createBrowserRouter, createRoutesFromElements,defer  } from "react-router-dom";

const getUserData = () =>{

};
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
     <Route element={<HomeLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
       
      </Route>
    </Route>
  )
);
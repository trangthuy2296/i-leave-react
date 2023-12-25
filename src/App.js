import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import Login from './Login';
import { ProtectedLayout } from "./components/ProtectedLayout";
import { AuthLayout } from "./components/AuthLayout";
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import { Route, createBrowserRouter, createRoutesFromElements,defer  } from "react-router-dom";

const getUserData = () =>
{}
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
        <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/login" element={<LoginPage />} />
    </Route>
  )
);
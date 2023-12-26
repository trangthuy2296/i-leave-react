import React from 'react';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from './Settings';
import { ProtectedLayout } from './Component/ProtectedLayout';
import { AuthLayout } from './Component/AuthLayout';

const getUserData = () =>
{}
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
        <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />

        <Route path="/settings" element={<ProtectedLayout><Settings /></ProtectedLayout>} />
        <Route path="/login" element={<Login />} />
    </Route>
  )
);


//test branch
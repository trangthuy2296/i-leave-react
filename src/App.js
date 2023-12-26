//css
import './App.css';
//package
import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, defer } from "react-router-dom";
//page
import Login from './Login';
import Dashboard from './Dashboard';
import Settings from './Settings';
import { ProtectedLayout } from './Component/ProtectedLayout';
import { AuthLayout } from './Component/AuthLayout';

const getUserData = () =>
  new Promise((resolve) => {
    const accessToken = window.localStorage.getItem("accessToken");
    resolve(accessToken);
  }
  );


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
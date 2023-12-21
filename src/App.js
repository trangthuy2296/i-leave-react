//css
import './App.css';
//package
import React from 'react';
import {   Route, createBrowserRouter, createRoutesFromElements,defer } from "react-router-dom";
//page
import Login from './Login';
import Dashboard from './Dashboard';
import { ProtectedLayout } from './Component/ProtectedLayout';
import { AuthLayout } from './Component/AuthLayout';

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      resolve(user);
    }, 3000)
  );

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >

        <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/Login" element={<Login />} />
    </Route>
  )
);


//test branch
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
{}
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >

        <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/login" element={<Login />} />
    </Route>
  )
);


//test branch
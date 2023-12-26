//css
import './App.css';
//package
import React from 'react';
import { Route, Routes, createBrowserRouter, createRoutesFromElements, defer } from "react-router-dom";
//page
import Login from './Component/Login/Login';
import Dashboard from './Dashboard';
import Settings from './Settings';
import { ProtectedLayout } from './Layout/ProtectedLayout';
import { AuthLayout } from './Layout/AuthLayout';
import { HomeLayout } from './Layout/HomeLayout';
import Home from './Component/Home/Home';

const getUserData = () => { }
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route element={<HomeLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
      <Route path="/settings" element={<ProtectedLayout><Settings /></ProtectedLayout>} /> */}
    </Route>
  )
);


//test branch
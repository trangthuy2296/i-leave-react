//css
import './App.css';
//package
import React from 'react';
import { Route, Routes, createBrowserRouter, createRoutesFromElements, defer } from "react-router-dom";
//page
import Login from './Component/Login/Login';
import Dashboard from './Component/Home/Dashboard';
import Settings from './Component/Home/Settings';
import { ProtectedLayout } from './Layout/ProtectedLayout';
import { AuthLayout } from './Layout/AuthLayout';
import { HomeLayout } from './Layout/HomeLayout';

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

      <Route element={<HomeLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>

    </Route>
  )
);


//test branch
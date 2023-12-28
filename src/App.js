import React from 'react';
import logo from './Images/logo.svg';
import './App.css';
import { Button } from 'antd';
import Login from './Login';
import { ProtectedLayout } from "./Layout/ProtectedLayout";
import { AuthLayout } from "./Layout/AuthLayout";
import { HomeLayout } from "./Layout/HomeLayout";
import LoginPage from './components/Login/LoginPage';
import Requests from './components/Home/Requests';
import Settings from './components/Home/Settings';
import { Route, Routes, createBrowserRouter, createRoutesFromElements, defer } from "react-router-dom";

const getUserData = () => {
  new Promise((resolve) => {
    const accessToken = window.localStorage.getItem("accessToken");
    resolve(accessToken);
  }
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route element={<HomeLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Requests />} />
        <Route path="settings" element={<Settings />} />
      </Route>

    </Route>
  )
);
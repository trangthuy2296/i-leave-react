import {React, StrictMode} from 'react';
import {ReactDOM, createRoot} from 'react-dom/client';
import './index.css';
import { router } from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

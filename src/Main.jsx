import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ContextProvider } from './context/ContextProvider';
import { RouterProvider } from 'react-router-dom';
import router from "./router.jsx";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
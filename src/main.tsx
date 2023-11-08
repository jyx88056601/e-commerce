import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import router from './routers/router';
import axios from 'axios';

// fetch data from backend
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

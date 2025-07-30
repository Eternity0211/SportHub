import { createBrowserRouter, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';
import ActivityManage from './pages/ActivityManage';
import OrderManage from './pages/OrderManage';
import Login from './pages/Login';
import Register from './pages/Register';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // 匹配 /，显示 Home
      { path: 'detail/:id', element: <Detail /> }, // 匹配 /detail/:id
      { path: '', element: <Home /> },
      { path: 'manage', element: <ActivityManage /> }, // 匹配 /manage
      { path: 'orders', element: <OrderManage /> }, // 匹配 /orders
      { path: 'login', element: <Login /> }, // 匹配 /login
      { path: 'register', element: <Register /> }, // 匹配 /register
    ],
  },
]);

export default router;
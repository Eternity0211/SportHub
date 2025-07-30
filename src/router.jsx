// router.jsx（仅保留前端组件路由）
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';
import ActivityManage from './pages/ActivityManage';
import OrderManage from './pages/OrderManage';
import Login from './pages/Login';
import Register from './pages/Register';

// 新建前端用户组件（如 UserProfile、UserSettings）
import UserProfile from './pages/UserProfile'; 
import UserSettings from './pages/UserSettings'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, 
      { path: 'detail/:id', element: <Detail /> }, 
      { path: 'manage', element: <ActivityManage /> }, 
      { path: 'orders', element: <OrderManage /> }, 
      // 替换为前端用户组件
      { path: 'profile', element: <UserProfile /> }, 
      { path: 'settings', element: <UserSettings /> }, 
    ],
  },
  { path: '/login', element: <Login /> }, 
  { path: '/register', element: <Register /> }, 
  // 替换为前端组件（或删除，若不需要）
  { path: '/forgot-password', element: <ForgotPassword /> }, 
  { path: '/reset-password/:token', element: <ResetPassword /> }, 
]);

export default router;
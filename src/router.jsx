import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';
import ActivityManage from './pages/ActivityManage';
import OrderManage from './pages/OrderManage';
import Login from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // 活动列表查看
      { path: 'detail/:id', element: <Detail /> }, // 活动详情查看
      { path: 'manage', element: <ActivityManage /> }, // 活动管理
      { path: 'orders', element: <OrderManage /> }, // 活动订单管理
    ],
  },
  { path: '/login', element: <Login /> }, // 多用户登录
  { path: '/register', element: <Register /> }, // 多用户注册
]);

export default router;
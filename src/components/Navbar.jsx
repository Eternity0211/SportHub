import React from 'react';
import { Link } from 'react-router-dom'; // 路由跳转用，根据实际路由库调整

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-xl font-bold">SportHub</div>
        <div className="space-x-4">
          <Link to="/home" style={{ marginRight: '1rem' }}>活动列表</Link>
          <Link to="/activity-list" className="hover:underline">活动列表</Link>
          <Link to="/activity-manage" className="hover:underline">活动管理</Link>
          <Link to="/order-manage" className="hover:underline">订单管理</Link>
          <Link to="/login" className="hover:underline">登录</Link>
          <Link to="/register" className="hover:underline">注册</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
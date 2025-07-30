import { Link, Outlet } from 'react-router-dom';
import React from 'react';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="text-xl font-bold">SportHub</Link>
          <div className="space-x-4">
            {/* 匹配路由中的 path: 'detail/:id' 等，确保 to 属性正确 */}
            <Link to="/" className="hover:underline">活动列表</Link>
            <Link to="/manage" className="hover:underline">活动管理</Link>
            <Link to="/orders" className="hover:underline">订单管理</Link>
            <Link to="/login" className="hover:underline">登录</Link>
            <Link to="/register" className="hover:underline">注册</Link> {/* 补充注册链接 */}
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; 2025 SportHub
      </footer>
    </div>
  );
}
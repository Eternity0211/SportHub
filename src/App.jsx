import { Outlet } from 'react-router-dom';
import React from 'react';

export default function App() {
  return (
    <div>
      <Outlet /> {/* 用 Outlet 渲染子路由，不再用 Router */}
    </div>
  );
}
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // 路由跳转用
import request from '../utils/axios';

const BASE_URL = 'http://127.0.0.1:7001';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // 发起登录请求
      const res = await request.post('/user/login', {
        username,
        password,
      });

      // 处理成功响应
      if (res.data.success) {
        alert('登录成功！'); 
        // 存 Token、跳转页面
        localStorage.setItem('token', res.data.data.token);
        navigate('/home'); 
      } else {
        alert('登录失败：' + res.data.message); 
      }
    } catch (error) {
      // 处理网络错误或 500 错误
      const errorMsg = error.response?.data?.message || error.message;
      alert('登录出错：' + errorMsg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">登录</h2>
        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          onClick={handleLogin}
        >
          登录
        </button>
        {/* 新增注册引导 */}
        <div className="mt-4 text-center">
          还没有账号？ <Link to="/register" className="text-blue-500 hover:underline">去注册</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = 'http://127.0.0.1:7001'; 

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // 添加 loading 状态
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    setLoading(true); 
    try {
      const res = await axios.post(`${BASE_URL}/user/register`, { 
        username: formData.username,
        password: formData.password
      });
      // 1. 区分注册成功/失败的响应格式
      if (res.data.success === true) {
        alert('注册成功！即将跳转到登录页');
        navigate('/login');
      } else {
        // 2. 失败时显示后端返回的 message
        alert('注册失败：' + res.data.message);
      }
    } catch (error) {
      // 3. 处理网络错误或非 200 响应
      const errorMsg = error.response?.data?.message 
        || error.message 
        || '服务器内部错误';
      alert('注册出错：' + errorMsg);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">注册</h2>
        <input
          type="text"
          name="username"
          placeholder="用户名"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="密码"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
          onClick={handleRegister}
          disabled={loading} // 加载时禁用按钮
        >
          {loading ? '注册中...' : '注册'}
        </button>
        <div className="mt-4 text-center">
          已有账号？ <Link to="/login" className="text-blue-500 hover:underline">去登录</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
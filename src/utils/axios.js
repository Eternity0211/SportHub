// src/utils/axios.ts
import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:7001/api', // 后端API前缀
});

export default request;
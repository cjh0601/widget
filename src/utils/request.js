import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const request = axios.create({
  baseURL,
  timeout: 50000,
});

// 响应拦截器：直接返回 response.data
request.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;

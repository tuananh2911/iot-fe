// src/components/Login.js
import React from 'react';
import { Link } from 'react-router-dom'; // Đảm bảo bạn đã import Link từ react-router-dom
import useLogin from '../hooks/useLogin';

function Login() {
    const { email, setEmail, password, setPassword, handleSubmit } = useLogin();
  return (
    <div className="flex justify-center items-center h-screen bg-agriculture-gif bg-cover bg-no-repeat bg-center">
    <div className="max-w-md w-full bg-slate-50 rounded-lg shadow-md p-6 bg-opacity-50">
      <h2 className="text-2xl font-mono text-center text-zinc-900 mb-4">Đăng Nhập</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
          <input 
            type="password" 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Ghi nhớ đăng nhập</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-green-600 hover:text-green-500">Quên mật khẩu?</a>
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Đăng Nhập</button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            Chưa có tài khoản? 
            <Link to="/register" className="font-medium text-green-600 hover:text-green-500"> Đăng Ký</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

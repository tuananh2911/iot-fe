// src/components/Register.js
import React, { useState } from "react";
import { registerUser } from "../apiService";
import { useNavigate } from "react-router-dom";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Các hàm xử lý khác...
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRegister = async (e) => {
    console.log('email',email,password)
    e.preventDefault();
    try {
      const result = await registerUser(email, password);
      console.log('result', result);
      if (result.status === "success") {
        navigate("/");
      }
      // Xử lý kết quả
    } catch (error) {
      // Xử lý lỗi
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-agriculture-gif bg-cover bg-no-repeat bg-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 bg-opacity-50">
        <h2 className="text-2xl font-mono text-center  text-zinc-900 mb-4">
          Đăng Ký
        </h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Đăng Ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

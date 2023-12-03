// src/hooks/useLogin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../apiService";
const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await loginUser(email, password);
        if (response.access_token) {
          // Đăng nhập thành công
          sessionStorage.setItem("accessToken", response.access_token);
          navigate("/plant");
        } else {
          // Xử lý trường hợp đăng nhập không thành công
          alert(
            "Đăng nhập không thành công! Vui lòng nhập lại tài khoản và mật khẩu"
          );
        }
      } catch (error) {
        // Xử lý lỗi
        console.log(error);
        alert("Có lỗi xảy ra khi đăng nhập!");
      }
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
};

export default useLogin;

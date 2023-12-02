// src/hooks/useLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    console.log('email', email)
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Xử lý đăng nhập ở đây
      navigate('/plant');
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
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

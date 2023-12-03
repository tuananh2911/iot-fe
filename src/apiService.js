// api.js
const BASE_URL = "http://103.77.246.226:5001";
const registerUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.ok) {
      // Xử lý khi đăng ký thành công
      return response.json();
    } else {
      // Xử lý lỗi
      throw new Error("Đăng ký không thành công");
    }
  } catch (error) {
    console.error("Đã có lỗi xảy ra:", error);
    throw error;
  }
};
// api.js hoặc một file tương tự
const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:email, password:password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    // Xử lý lỗi kết nối hoặc lỗi khác
    throw error;
  }
};

export { loginUser, registerUser };

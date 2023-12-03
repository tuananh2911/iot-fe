import React from 'react';

function Header() {
  return (
    <div className="fixed top-0 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white p-1 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo ở góc trái */}
        <img src="/logo.png" alt="Logo" className="h-12 w-12" />

        {/* Tên trang "Dashboard" ở giữa */}
        <h1 className="text-2xl font-semibold flex-grow text-center">Plant Monitoring Dashboard</h1>

        {/* Phần này trống để giữ layout */}
        <div className="h-8 w-8"></div>
      </div>
    </div>
  );
}

export default Header;

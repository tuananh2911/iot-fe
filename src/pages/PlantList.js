import React from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import PlantCard from '../Component/PlantCard';

function PlantList() {
  const plants = [
    { id: 1, name: 'Cây Lúa', imageUrl: '/potato.jpg' },
    { id: 2, name: 'Cây Ngô', imageUrl: '/potato.jpg' },
    { id: 3, name: 'Cây Khoai', imageUrl: '/potato.jpg' },
    { id: 4, name: 'Cây Sắn', imageUrl: '/potato.jpg' },
    { id: 5, name: 'Cây Cà Chua', imageUrl: '/potato.jpg' },
    { id: 6, name: 'Cây Dưa Hấu', imageUrl: '/potato.jpg' },
    // thêm các cây trồng khác tại đây
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-16">
        <h2 className="text-2xl font-bold text-center mb-6">Các Giống Cây Trồng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plants.map(plant => (
            <PlantCard id={plant.id} name={plant.name} imageUrl={plant.imageUrl} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PlantList;

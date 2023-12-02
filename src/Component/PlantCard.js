import React from 'react';
import { Link } from 'react-router-dom';

function PlantCard({ id, name, imageUrl }) {
    console.log(`/plant/${id}`);
  return (
    <Link to={`/plant/${id}`} className="relative rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform ease-in-out duration-300">
      <img src={imageUrl} alt={name} className="w-full h-full object-cover opacity-70" />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <h3 className="text-xl font-bold text-white">{name}</h3>
      </div>
    </Link>
  );
}

export default PlantCard;

import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ArrowProps {
  onClick?: () => void;
}

export const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10 text-gray-200 opacity-55 hover:opacity-100
      hover:text-white cursor-pointer transition-opacity duration-300"
    onClick={onClick}
  >
    <FaChevronRight className="text-5xl" />
  </div>
);

export const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute top-1/2 transform -translate-y-1/2 left-4 z-10 text-gray-200 opacity-55 hover:opacity-100
      hover:text-white cursor-pointer transition-opacity duration-300"
    onClick={onClick}
  >
    <FaChevronLeft className="text-5xl" />
  </div>
);

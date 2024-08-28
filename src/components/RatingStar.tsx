import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const clampedRating = Math.max(0, Math.min(10, rating));
  const fullStars = Math.floor(clampedRating / 2);
  const hasHalfStar = clampedRating % 2 >= 1;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }).map((_, index) => (
        <FaStar key={`full-${index}`} className="text-yellow-500" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <FaRegStar key={`empty-${index}`} className="text-gray-400" />
      ))}
      <span className="text-white ml-2 text-lg font-semibold">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default RatingStars;

import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Genre {
  id: number;
  name: string;
}

interface GenreFilterProps {
  genres: Genre[];
  currentGenreIndex: number;
  genresPerPage: number;
  selectedGenre: number | null;
  onGenreClick: (genreId: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  currentGenreIndex,
  genresPerPage,
  selectedGenre,
  onGenreClick,
  onNext,
  onPrev,
}) => {
  return (
    <div className="flex items-center mb-6 overflow-x-auto justify-center">
      <FaArrowLeft
        size={26}
        onClick={onPrev}
        className={`mx-2 cursor-pointer text-white hover:text-orange-600 transition-transform duration-300
          ${currentGenreIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
      />
      {genres.slice(currentGenreIndex, currentGenreIndex + genresPerPage).map((genre) => (
        <button
          key={genre.id}
          onClick={() => onGenreClick(genre.id)}
          className={`w-40 px-4 py-2 mx-2 rounded-full transition-colors duration-300
            ${selectedGenre === genre.id ? "bg-orange-500 text-white" : "bg-orange-700 text-white hover:bg-orange-500"}`}
        >
          {genre.name}
        </button>
      ))}
      <FaArrowRight
        size={26}
        onClick={onNext}
        className={`cursor-pointer mx-2 text-white hover:text-orange-600 transition-transform duration-300
          ${currentGenreIndex + genresPerPage >= genres.length ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
      />
    </div>
  );
};

export default GenreFilter;

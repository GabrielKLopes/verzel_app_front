import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useFavorites } from "../context/FavoitesContex";

interface FavoriteButtonProps {
  movieId: number;
  onFavoriteChange?: (movieId: number, isFavorite: boolean) => void; // Função de callback
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId, onFavoriteChange }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite(movieId));

  useEffect(() => {
    setLocalIsFavorite(isFavorite(movieId));
  }, [isFavorite, movieId]);

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");

      if (localIsFavorite) {
        await axios.delete(`http://localhost:4000/movies/favorite/${movieId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        removeFavorite(movieId);
      } else {
        await axios.post(
          "http://localhost:4000/movies/favorite",
          { movie_id: movieId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        addFavorite(movieId);
      }
      setLocalIsFavorite(!localIsFavorite);

      // Chamar a função de callback, se fornecida
      if (onFavoriteChange) {
        onFavoriteChange(movieId, !localIsFavorite);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div>
      {localIsFavorite ? (
        <FaBookmark
          size={32}
          onClick={handleClick}
          className="text-yellow-500 cursor-pointer"
        />
      ) : (
        <FaRegBookmark
          size={32}
          onClick={handleClick}
          className="text-gray-400 cursor-pointer"
        />
      )}
    </div>
  );
};

export default FavoriteButton;

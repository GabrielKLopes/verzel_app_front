import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Movie } from '../interface/interfaces';
import Loading from '../components/Loading';
import RatingStars from '../components/RatingStar';

const SharedFavorites: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSharedFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/movie/share/${userId}`);
        setMovies(response.data);
      } catch (error) {
        console.error('Erro ao buscar filmes compartilhados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSharedFavorites();
  }, [userId]);

  return (
    <div className="w-full min-h-screen bg-customGray p-4">
      <div className="mt-20">
        <h1 className="text-4xl font-bold ml-5 text-orange-600">Filmes Favoritos</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {isLoading ? (
          <Loading />
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="relative p-4 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <div className="relative w-full h-auto">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 p-1 rounded-md">
                  <RatingStars rating={movie.vote_average} />
                </div>
              </div>
              <h3 className="font-bold text-white mt-2">{movie.title}</h3>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">Nenhum filme encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default SharedFavorites;

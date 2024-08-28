import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Movie } from "../interface/interfaces";
import FavoriteButton from "../components/FavoriteButton";
import RatingStars from "../components/RatingStar";
import Loading from "../components/Loading";

const Favorites: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [page, setPage] = useState(1);

  const fetchFavorites = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:4000/movie/favorite?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const favoritesData: Movie[] = response.data;
      if (Array.isArray(favoritesData) && favoritesData.length > 0) {
        if (page === 1) {
          setMovies(favoritesData);
        } else {
          setMovies((prevMovies) => {
            const newMovies = favoritesData.filter(movie => !prevMovies.some(prevMovie => prevMovie.id === movie.id));
            return [...prevMovies, ...newMovies];
          });
        }
        setHasMoreMovies(favoritesData.length > 0);
      } else {
        setHasMoreMovies(false);
      }
    } catch (error) {
      console.error("Erro ao buscar filmes favoritos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreFavorites = () => {
    if (hasMoreMovies && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const bottom = document.documentElement.offsetHeight;
    if (scrollPosition + 200 >= bottom) {
      loadMoreFavorites();
    }
  }, [hasMoreMovies, isLoading]);

  useEffect(() => {
    fetchFavorites(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="w-full h-auto p-4">
      <h1 className="text-4xl font-bold ml-5 text-orange-600">Meus Favoritos</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.length > 0 ? (
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
                <div className="absolute top-2 right-2">
                  <FavoriteButton movieId={movie.id} />
                </div>
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 p-2 rounded-md">
                  <RatingStars rating={movie.vote_average} />
                </div>
              </div>
              <div className="flex gap-3 items-center text-center mt-4">
                <h3 className="font-bold text-white">{movie.title}</h3>
              </div>
              <a
                href={`/movie/${movie.id}`}
                className="text-orange-500 font-semibold hover:text-orange-600 transition duration-200"
              >
                Detalhar
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">Nenhum filme encontrado.</p>
        )}
      </div>
      {isLoading && <Loading />} 
    </div>
  );
};

export default Favorites;

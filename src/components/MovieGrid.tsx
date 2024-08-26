import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
}

const genresList: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const MovieGrid: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  const fetchMovies = async (genreId: number | null = null, page: number = 1) => {
    try {
      const url = genreId
        ? `http://localhost:4000/movies/genre/${genreId}?page=${page}`
        : `http://localhost:4000/movies/?page=${page}`;
      const response = await axios.get(url);
      const moviesData = response.data.results || [];
      setMovies((prevMovies) => [...prevMovies, ...moviesData]); // Adiciona novos filmes à lista existente
    } catch (error) {
      console.error("Erro ao buscar os filmes:", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies(selectedGenre, page); // Carrega filmes com base na página atual
  }, [selectedGenre, page]);

  const toggleFavorite = (movieId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(movieId)
        ? prevFavorites.filter((id) => id !== movieId)
        : [...prevFavorites, movieId]
    );
  };

  const isFavorite = (movieId: number) => favorites.includes(movieId);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="w-full h-auto bg-red-400 p-4">
      <h2 className="text-2xl font-bold mb-4">Filmes</h2>
      <div className="flex gap-4 mb-6 overflow-x-auto">
        <button
          onClick={() => {
            setSelectedGenre(null);
            setPage(1); // Reinicia a página ao mudar de gênero
            setMovies([]); // Limpa os filmes ao mudar de gênero
          }}
          className={`px-4 py-2 rounded-full ${
            !selectedGenre ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Todos
        </button>
        {genresList.map((genre) => (
          <button
            key={genre.id}
            onClick={() => {
              setSelectedGenre(genre.id);
              setPage(1); // Reinicia a página ao mudar de gênero
              setMovies([]); // Limpa os filmes ao mudar de gênero
            }}
            className={`px-4 py-2 rounded-full ${
              selectedGenre === genre.id ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover rounded-lg mb-4"
              />
              <div className="flex flex-col items-center text-center">
                <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
                <button
                  onClick={() => toggleFavorite(movie.id)}
                  className={`text-xl ${
                    isFavorite(movie.id) ? "text-orange-600" : "text-white"
                  } transition-colors duration-300`}
                >
                  {isFavorite(movie.id) ? <FaBookmark /> : <FaRegBookmark />}
                </button>
                <p className="text-sm mt-2">{movie.overview}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">Nenhum filme encontrado.</p>
        )}
      </div>
      <button
        onClick={loadMoreMovies}
        className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg"
      >
        Carregar mais
      </button>
    </div>
  );
};

export default MovieGrid;

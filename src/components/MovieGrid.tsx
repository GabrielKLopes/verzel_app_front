import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import RatingStars from "./RatingStar";
import FavoriteButton from "./FavoriteButton";
import GenreFilter from "./GenreFilter";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import { Movie } from "../interface/interfaces";
import { genresList } from "../constants/constants";


const MovieGrid: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [currentGenreIndex, setCurrentGenreIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [hasMoreMovies, setHasMoreMovies] = useState(true);

  const genresPerPage = 10;

  const fetchMovies = async (genreId: number | null = null, page: number = 1, searchQuery: string = "") => {
    setIsLoading(true);
    try {
      let url = `http://localhost:4000/movies/?page=${page}`;
      if (genreId && genreId !== 0) {
        url = `http://localhost:4000/movies/genre/${genreId}?page=${page}`;
      } else if (searchQuery) {
        url = `http://localhost:4000/movie/search?query=${searchQuery}`;
      }
      const response = await axios.get(url);
      const moviesData = response.data.results || [];
      if (page === 1) {
        setMovies(moviesData);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...moviesData]);
      }
      setHasMoreMovies(moviesData.length > 0);
    } catch (error) {
      console.error("Erro ao buscar os filmes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreMovies = () => {
    if (hasMoreMovies && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const bottom = document.documentElement.offsetHeight;
    if (scrollPosition + 200 >= bottom) {
      loadMoreMovies();
    }
  }, [hasMoreMovies, isLoading]);

  useEffect(() => {
    fetchMovies(selectedGenre, page, searchTerm);
  }, [selectedGenre, page, searchTerm]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const nextGenres = () => {
    if (currentGenreIndex + genresPerPage < genresList.length) {
      setCurrentGenreIndex((prevIndex) => prevIndex + genresPerPage);
    }
  };

  const prevGenres = () => {
    if (currentGenreIndex > 0) {
      setCurrentGenreIndex((prevIndex) => prevIndex - genresPerPage);
    }
  };

  const handleGenreClick = (genreId: number) => {
    setSearchTerm(""); 
    if (selectedGenre === genreId) {
      setSelectedGenre(0); 
      setPage(1);
      setMovies([]);
    } else {
      setSelectedGenre(genreId);
      setPage(1);
      setMovies([]);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); 
  };

  return (
    <div className="w-full h-auto p-4">
      <h1 className="text-4xl font-bold ml-5  text-orange-600">Filmes</h1>
      <div className="flex justify-end  mr-5 ">
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>
      <GenreFilter
        genres={genresList}
        currentGenreIndex={currentGenreIndex}
        genresPerPage={genresPerPage}
        selectedGenre={selectedGenre}
        onGenreClick={handleGenreClick}
        onNext={nextGenres}
        onPrev={prevGenres}
      />
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

export default MovieGrid;

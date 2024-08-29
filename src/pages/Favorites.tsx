import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Movie } from "../interface/interfaces";
import FavoriteButton from "../components/FavoriteButton";
import RatingStars from "../components/RatingStar";
import Loading from "../components/Loading";
import Navbar from "../components/NavBar";
import GenreFilter from "../components/GenreFilter";
import SearchBar from "../components/SearchBar";
import { genresList } from "../constants/constants";
import { FaCopy } from "react-icons/fa";
import SharedFilm from "../components/SharedFilm";
import CopyNotification from "../components/CopyNotification";


const Favorites: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [currentGenreIndex, setCurrentGenreIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const genresPerPage = 10;

  const fetchFavorites = async (
    genreId: number | null = null,
    page: number = 1,
    searchQuery: string = ""
  ) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      let url = `http://localhost:4000/movie/favorite?page=${page}`;

      if (genreId && genreId !== 0) {
        url = `http://localhost:4000/movie/favorite/genre/${genreId}?page=${page}`;
      }
      if (searchQuery) {
        url = `http://localhost:4000/movie/favorite/search?query=${searchQuery}&page=${page}`;
      }

      const response = await axios.get(url, {
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
            const newMovies = favoritesData.filter(
              (movie) => !prevMovies.some((prevMovie) => prevMovie.id === movie.id)
            );
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

  const generateShareLink = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:4000/movie/share`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const link = response.data.shareLink; 
      setShareLink(link);
    } catch (error) {
      
    }
  };

  const copyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 3000); 
    }
  };

  useEffect(() => {
    generateShareLink(); 
  }, []);

  const loadMoreFavorites = () => {
    if (hasMoreMovies && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleFavoriteChange = (movieId: number, isFavorite: boolean) => {
    if (!isFavorite) {
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
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
    fetchFavorites(selectedGenre, page, searchTerm);
  }, [selectedGenre, page, searchTerm]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <div className="w-full min-h-screen bg-customGray p-4">
      <Navbar isScrolled={true} />
      <CopyNotification visible={notificationVisible} />

      <div className="mt-24">
        <h1 className="text-4xl font-bold ml-5 text-orange-600">Meus Favoritos</h1>
      </div>
      <div className="flex items-center justify-between mt-4 mb-4">
        <div className="flex w-full justify-end gap-5 ml-10">
        <SharedFilm shareLink={shareLink} onCopy={copyToClipboard} />
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        </div>
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
                  <FavoriteButton movieId={movie.id} onFavoriteChange={handleFavoriteChange} />
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

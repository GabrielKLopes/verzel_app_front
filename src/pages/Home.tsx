import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight, FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaRegHeart, FaFilm, FaBookmark, FaRegBookmark } from "react-icons/fa";
import MovieGrid from "../components/MovieGrid";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]); // Array to store favorite movie IDs

  const movieIds = [533535, 1022789, 519182, 718821];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const requests = movieIds.map((id) =>
          axios.get(`http://localhost:4000/movies/${id}`)
        );
        const responses = await axios.all(requests);
        const moviesData = responses.map((response) => response.data);
        setMovies(moviesData);
      } catch (error) {
        console.error("Erro ao buscar os filmes:", error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, []);

  const toggleFavorite = (movieId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(movieId)
        ? prevFavorites.filter((id) => id !== movieId)
        : [...prevFavorites, movieId]
    );
  };

  const isFavorite = (movieId: number) => favorites.includes(movieId);

  if (movies.length === 0) {
    return <div>Carregando...</div>;
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1">
        {Array(fullStars).fill(<FaStar className="text-yellow-500" />)}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {Array(emptyStars).fill(<FaRegStar className="text-gray-400" />)}
        <span className="ml-2 text-white font-semibold">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="w-full bg-customInput shadow-lg overflow-hidden">
      <nav
        className={`fixed top-0 w-full z-10 transition-all duration-300 ${
          isScrolled ? "bg-customGray" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <FaFilm className="text-white" size={40} />
          </div>
          <div className="space-x-4">
            <a href="#" className="hover:underline">
              Filmes
            </a>
            <a href="#" className="hover:underline">
              Meus favoritos
            </a>
            <a href="#" className="hover:underline">
              Sair
            </a>
          </div>
        </div>
      </nav>
      <div className="relative">
         <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className="relative w-full h-screen">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1/4 left-28 p-6 text-white w-1/3">
                <div className="flex items-center jus mb-2">
                  <h1 className="text-4xl font-bold">{movie.title}</h1>
                  <button
                    onClick={() => toggleFavorite(movie.id)}
                    className={`ml-4 ${isFavorite(movie.id) ? "text-orange-600" : "text-white"} transition-colors duration-300`}
                  >
                    {isFavorite(movie.id) ? <FaBookmark size={32} /> : <FaRegBookmark size={32} />}
                  </button>
                </div>
                <div className="text-lg mb-2 flex items-center space-x-4">
                  {renderStars(movie.vote_average)}
                </div>
                <h3 className="text-base font-semibold mb-2">{movie.overview}</h3>
                <h3 className="text-lg font-semibold text-orange-600">
                  {movie.genres.map((genre: any) => genre.name).join(" , ")}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
     
        <div className="w-full h-full">
          <MovieGrid/>
         
       
      </div>
    </div>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10 text-gray-200 opacity-55 hover:opacity-100
    hover:text-white cursor-pointer transition-opacity duration-300"
      onClick={onClick}>
      <FaChevronRight className="text-5xl" />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 transform -translate-y-1/2 left-4 z-10 text-gray-200 opacity-55 hover:opacity-100
    hover:text-white cursor-pointer transition-opacity duration-300"
      onClick={onClick}>
      <FaChevronLeft className="text-5xl" />
    </div>
  );
};

export default Home;



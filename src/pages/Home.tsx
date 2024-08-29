import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../components/NavBar';
import RatingStars from '../components/RatingStar';
import { NextArrow, PrevArrow } from '../components/SliderArrows';
import FavoriteButton from '../components/FavoriteButton';
import MovieGrid from '../components/MovieGrid';
import { useFavorites } from '../context/FavoitesContex';
import Loading from '../components/Loading';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useFavorites();

  const movieIds = [533535, 1022789, 519182, 718821];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const requests = movieIds.map(id => axios.get(`http://localhost:4000/movies/${id}`));
        const responses = await axios.all(requests);
        const moviesData = responses.map(response => response.data);
        setMovies(moviesData);
      } catch (error) {
        console.error('Erro ao buscar os filmes:', error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-customGray flex items-center justify-center">
        <Loading />
      </div>
    );
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

  return (
    <div className="w-full bg-customInput shadow-lg overflow-hidden">
      <Navbar isScrolled={isScrolled} />
      <div className="relative">
        <Slider {...settings}>
          {movies.map(movie => (
            <div key={movie.id} className="relative w-full h-screen">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1/4 left-28 p-6 text-white w-1/3">
                <div className="flex items-center mb-2 gap-5">
                  <h1 className="text-4xl font-bold">{movie.title}</h1>
                  <FavoriteButton movieId={movie.id} />
                </div>
                <div className="text-lg mb-2 flex items-center space-x-4">
                  <RatingStars rating={movie.vote_average} />
                </div>
                <h3 className="text-base font-semibold mb-2">
                  {movie.overview}
                </h3>
                <h3 className="text-lg font-semibold text-orange-600">
                  {movie.genres.map((genre: any) => genre.name).join(' , ')}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-full h-full">
        <MovieGrid />
      </div>
    </div>
  );
};

export default Home;

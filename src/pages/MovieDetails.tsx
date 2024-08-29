import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import RatingStars from "../components/RatingStar";
import FavoriteButton from "../components/FavoriteButton";
import Loading from "../components/Loading"; // Importa o componente de Loading

import { useNavigate, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { MoviesDetails } from "../interface/interfaces";
import { useFavorites } from "../context/FavoitesContex";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MoviesDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Adicionado para controle de carregamento
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true); // Inicia o carregamento
        const response = await axios.get(`http://localhost:4000/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false); // Finaliza o carregamento
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    // Exibe o componente de carregamento enquanto está carregando
    return (
      <div className="w-full min-h-screen bg-customGray flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  const mainCast = movie.cast.slice(0, 5);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <Navbar isScrolled={true} />
      <div className="bg-black bg-opacity-70 p-8  flex flex-col md:flex-row items-center w-screen h-screen">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-1/4 rounded-lg mb-4 md:mb-0 md:mr-8"
        />
        <div className="text-white w-full">
          <div className="flex justify-start ">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
          </div>

          <div className="flex mt-5 gap-3">
            <RatingStars rating={movie.vote_average} />
            <FavoriteButton movieId={movie.id} />
          </div>
          <h3 className="mt-4 font-semibold">{movie.overview}</h3>
          <h3 className="mt-4 font-semibold">
            Orçamento: ${movie.budget.toLocaleString()}
          </h3>
          <h3 className="mt-6 text-2xl font-bold">Gêneros</h3>
          <h3 className="mt-2 font-semibold">
            {movie.genres.map((genre) => genre.name).join(", ")}
          </h3>
          <h3 className="mt-6 text-2xl font-bold">Elenco</h3>
          <ul className="mt-4 flex space-x-20">
            {mainCast.map((actor) => (
              <li
                key={actor.id}
                className="flex flex-col items-center w-24 mb-4"
              >
                {actor.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}
                <h3 className="text-gray-300 font-semibold mt-2 text-center truncate">
                  {actor.name}
                </h3>
              </li>
            ))}
          </ul>
          {movie.trailer && (
            <div className="">
              <h3 className="text-2xl font-bold">Trailer</h3>

              <div className="mt-5">
                <button
                  onClick={() => window.open(movie.trailer, "_blank")}
                  className="bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
                >
                  Assistir Trailer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

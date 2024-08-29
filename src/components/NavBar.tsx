import React from "react";
import { FaFilm, FaSignOutAlt } from "react-icons/fa"; 
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AuthService } from "../services/Auth.service";

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMovieDetailsPage = location.pathname.startsWith("/movie/");

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate('/'); 
    } catch (error) {
      console.error("Erro ao sair", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-20 transition-colors duration-300 ${
        isMovieDetailsPage
          ? "bg-transparent"
          : isScrolled
          ? "bg-customGray bg-opacity-85"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-4">
         <Link to="/home">
             <FaFilm className="text-white hover:text-orange-600" size={40} />
         </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/home" className="hover:text-orange-600">
            Filmes
          </Link>
          <Link to="/favorites" className="hover:text-orange-600">
            Meus favoritos
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:text-orange-600"
          >
            <FaSignOutAlt size={20} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

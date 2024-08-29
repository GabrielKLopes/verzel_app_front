import React, { useState } from "react";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import { FaFilm } from "react-icons/fa";
import Button from "../components/Button";
import { AuthService } from "../services/Auth.service";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoitesContex";
import Notification from "../components/Notification";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();
  const { setFavorites } = useFavorites();

  const handleLogin = async () => {
    setIsLoading(true);
    setNotificationVisible(false);
    try {
      const user = await AuthService.login({ email, password }, setFavorites);
      console.log("Login successful!", user);
      setNotificationMessage("Login bem-sucedido!");
      setNotificationType("success");
      setNotificationVisible(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Login failed!", error);
      setNotificationMessage("Falha no login! Verifique suas credenciais.");
      setNotificationType("error");
      setNotificationVisible(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col justify-between w-screen h-screen bg-customInput">
      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="flex justify-between items-center p-4 relative z-20">
        <FaFilm className="text-orange-600" size={60} />
        <a
          href="/register"
          className="text-orange-600 font-bold text-lg hover:text-orange-500"
        >
          Cadastre-se
        </a>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div
          className="relative w-1/3 h-auto flex flex-col justify-center items-center p-8 bg-customColor4 bg-opacity-5 rounded-lg z-10"
          onKeyDown={handleKeyPress} 
        >
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-orange-600 font-medium">
              Entrar
            </h1>
            <p className="mt-2 text-gray-400">
              Digite o endereço de e-mail e a senha.
            </p>
          </div>
          <div className="w-full">
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              label="Email"
            />
            <PasswordInput
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex flex-col justify-start items-start">
              <Button
                className="mt-6 text-lg font-semibold text-center bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-1">
                    <span className="animate-bounce text-2xl">•</span>
                    <span className="animate-bounce text-2xl">•</span>
                    <span className="animate-bounce text-2xl">•</span>
                  </span>
                ) : (
                  "Entrar"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Notification
        visible={notificationVisible}
        message={notificationMessage}
        type={notificationType}
      />
    </div>
  );
};

export default Login;

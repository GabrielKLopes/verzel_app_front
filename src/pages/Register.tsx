import React, { useState } from "react";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import { FaFilm } from "react-icons/fa";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../services/register.service";
import Notification from "../components/Notification";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] = useState<"success" | "error">("success");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,16}$/;

  const validatePassword = (password: string) => {
    setPasswordValidations({
      length: password.length >= 8 && password.length <= 16,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    });
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    validatePassword(password);
    setPasswordsMatch(password === confirmPassword);
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    setPasswordsMatch(password === confirmPassword);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setNotificationVisible(false);
    try {
      if (!email || !password || !confirmPassword) {
        setNotificationMessage("Preencha todos os campos.");
        setNotificationType("error");
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000);
        return;
      }

      if (!emailRegex.test(email)) {
        setNotificationMessage("Formato de e-mail inválido.");
        setNotificationType("error");
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000);
        return;
      }

      if (!Object.values(passwordValidations).every(Boolean)) {
        setNotificationMessage("A senha não atende todos os requisitos.");
        setNotificationType("error");
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000);
        return;
      }

      if (!passwordsMatch) {
        setNotificationMessage("Senhas diferentes.");
        setNotificationType("error");
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000);
        return;
      }

      const registerData = { email, password };
      await RegisterUser.register(registerData);
      setNotificationMessage("Cadastro bem-sucedido! Redirecionando...");
      setNotificationType("success");
      setNotificationVisible(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setNotificationMessage("E-mail já cadastrado. Tente outro endereço de e-mail.");
      setNotificationType("error");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="flex flex-col justify-between w-full min-h-screen bg-customInput relative">
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      <div className="flex justify-between items-center p-4 relative z-20">
        <FaFilm className="text-orange-600" size={60} />
        <a href="/" className="text-orange-600 font-bold text-lg hover:text-orange-500">
          Entrar
        </a>
      </div>

      <div className="flex-grow flex items-center justify-center relative z-10 p-4">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col justify-center items-center p-8 bg-customColor4 bg-opacity-5 rounded-lg">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-orange-600 font-medium">Criar Conta</h1>
            <p className="mt-2 text-gray-400">Preencha os campos para criar uma conta.</p>
          </div>
          <div className="w-full" onKeyDown={handleKeyPress}>
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
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <div className="mt-2">
              <ul className="text-sm text-gray-500">
                <li className={passwordValidations.length ? "text-green-500" : ""}>
                  {passwordValidations.length ? "✔" : "✘"} 8 a 16 caracteres
                </li>
                <li className={passwordValidations.uppercase ? "text-green-500" : ""}>
                  {passwordValidations.uppercase ? "✔" : "✘"} Uma letra maiúscula
                </li>
                <li className={passwordValidations.lowercase ? "text-green-500" : ""}>
                  {passwordValidations.lowercase ? "✔" : "✘"} Uma letra minúscula
                </li>
                <li className={passwordValidations.number ? "text-green-500" : ""}>
                  {passwordValidations.number ? "✔" : "✘"} Um número
                </li>
                <li className={passwordValidations.specialChar ? "text-green-500" : ""}>
                  {passwordValidations.specialChar ? "✔" : "✘"} Um caractere especial (@$!%*?&)
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <PasswordInput
                label="Confirmar senha"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              />
              {!passwordsMatch && (
                <p className="text-red-500 text-sm mt-1">As senhas não coincidem.</p>
              )}
            </div>
            <div className="flex flex-col justify-start items-start mt-6">
              <Button
                className="mt-6 text-lg font-semibold text-center bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                onClick={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-1">
                    <span className="animate-bounce text-2xl">•</span>
                    <span className="animate-bounce text-2xl">•</span>
                    <span className="animate-bounce text-2xl">•</span>
                  </span>
                ) : (
                  "Criar Conta"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Notification visible={notificationVisible} message={notificationMessage} type={notificationType} />
    </div>
  );
};

export default Register;

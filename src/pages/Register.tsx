import React, { useState } from "react";
import PandImage from '../assets/images/panda.jpg';
import { FaFilm } from "react-icons/fa";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    setError(null); 
  };

  return (
    <div className="w-screen h-screen bg-customInput flex items-center justify-between">
      <div className="relative w-1/2 h-full">
        <img
          src={PandImage}
          alt="panda"
          className="object-cover w-full h-full rounded-sm shadow-lg"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <FaFilm className="text-customButton" size={40} />
        <div className="card w-1/2">
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
          <PasswordInput
            label="Confirmar senha"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <p className="text-red-500 mt-2">{error}</p>
          )}
          <div className="flex flex-col justify-center items-center">
            <Button className="mt-4" onClick={handleRegister}>
              Criar Conta
            </Button>
            <div className="flex mt-5 gap-2">
              <h1 className="text-gray-400">Já tem conta?</h1>
              <a
                href="/"
                className="text-customButton hover:text-red-500"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

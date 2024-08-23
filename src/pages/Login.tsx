import React, { useState } from "react";
import EmailInput from "../components/EmailInput";
import cineImage from "../assets/images/cine.jpg";
import PasswordInput from "../components/PasswordInput";
import { FaFilm } from "react-icons/fa";
import Button from "../components/Button";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="w-screen h-screen bg-customInput flex items-center justify-between">
      <div className="relative w-1/2 h-full">
        <img
          src={cineImage}
          alt="cine"
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
          <div className="flex flex-col justify-center items-center">
            <Button className="mt-4">Entrar</Button>
            <div className="flex mt-5 gap-2">
              <h1 className="text-gray-400">Não tem conta?</h1>
              <a
                href="/register"
                className="text-customButton hover:text-red-500"
              >
                Cadastre-se
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

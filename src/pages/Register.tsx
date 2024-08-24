import React, { useState } from "react";
import PandImage from '../assets/images/panda.jpg';
import { FaFilm } from "react-icons/fa";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../services/register.service";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () =>{
    try{
      if (!email || !password || !confirmPassword) {
        setRegisterError('Preencha todos os campos.');
        setTimeout(() => {
            setRegisterError('');
          }, 2500);
        return;
      }
      if (password !== confirmPassword) {
        setRegisterError('senhas diferentes.');
        setTimeout(() => {
            setRegisterError('');
          }, 2500);
        return;
      }
      const registerData = {email, password};
        await RegisterUser.register(registerData);
        setRegisterSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
    }catch(error){
      console.log(error);
      setRegisterError('E-mail já cadastrado. Tente outro endereço de e-mail.');
      setTimeout(() => {
        setRegisterError('');
      }, 2500);
    }
  }

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
          {registerError && (
            <p className="text-red-500 mt-2">{registerError}</p>
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

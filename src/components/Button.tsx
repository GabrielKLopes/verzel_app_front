import React from "react";

interface ButtonProps{
    onClick?: () => void;
    children: React.ReactNode;
    className?:string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '' }) => {
    return (
      <button
        onClick={onClick}
        className={`bg-customButton text-white py-2 px-5 rounded-lg shadow-lg hover:bg-red-600 transition ${className}`}
      >
        {children}
      </button>
    );
};

export default Button;
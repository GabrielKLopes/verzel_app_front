import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-white">Carregando...</p>
    </div>
  );
};

export default Loading;

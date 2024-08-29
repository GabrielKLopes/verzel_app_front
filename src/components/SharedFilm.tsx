import React from "react";
import { FaCopy } from "react-icons/fa";

interface SharedFilmProps {
  shareLink: string | null;
  onCopy: () => void;
}

const SharedFilm: React.FC<SharedFilmProps> = ({ shareLink, onCopy }) => {
  return (
    <div className="mb-8 flex items-center gap-1">
      <div className="flex items-center gap-3">
        <label className="font-semibold text-white">
          Compartilhar Favoritos
        </label>
        <input
          type="text"
          value={shareLink || "Gerando link..."}
          readOnly
          className="shadow appearance-none border border-orange-600 rounded-l py-2 px-3 bg-customGray text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500"
          style={{ width: "300px" }}
        />
      </div>
      <button
        type="button"
        onClick={onCopy}
        className="bg-orange-500 text-white py-2 px-3 flex items-center rounded-r focus:outline-none hover:bg-orange-600"
        style={{ marginLeft: "-1px" }}
      >
        <FaCopy size={20} />
      </button>
    </div>
  );
};

export default SharedFilm;

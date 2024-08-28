import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  setFavorites: (favorites: number[]) => void; 
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavoritesState] = useState<number[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const isFavorite = (id: number) => favorites.includes(id);

  const addFavorite = (id: number) => {
    const newFavorites = [...favorites, id];
    setFavoritesState(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFavorite = (id: number) => {
    const newFavorites = favorites.filter(favId => favId !== id);
    setFavoritesState(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const setFavorites = (newFavorites: number[]) => {
    setFavoritesState(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

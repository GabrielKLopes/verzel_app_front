import { api } from './api.service';


export const AuthService = {
  login: async (
    credentials: { email: string; password: string }, 
    setFavorites: (favorites: number[]) => void  
  ) => {
    try {
      const response = await api.post('/session/authentication', credentials);
      const token = response.data.token;
      const expirationTime = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem('token', token);
      localStorage.setItem('token_expiration', expirationTime.toString());

      const user = await getUserInfo();
      const favorites = await loadFavorites();

      setFavorites(favorites);

      return user.permission_id;
    } catch (error) {
      throw new Error('Falha no login');
    }
  },

  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');
  },

  getToken: () => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('token_expiration');
    if (!token || !expirationTime) return null;

    const currentTime = new Date().getTime();

    if (currentTime > parseInt(expirationTime)) {
      AuthService.logout();
      window.location.href = '/';
      return null;
    }

    return token;
  }
};

const getUserInfo = async () => {
  try {
    const token = AuthService.getToken();
    if (!token) throw new Error('Token não encontrado');

    const response = await api.get('session/user', { headers: { Authorization: `Bearer ${token}` } });

    return response.data;
  } catch (error) {
    throw new Error('Erro ao obter informações do usuário');
  }
};

const loadFavorites = async () => {
  try {
    const token = AuthService.getToken();
    if (!token) throw new Error('Token não encontrado');

    const response = await api.get('/movie/favorite', { headers: { Authorization: `Bearer ${token}` } });

    return response.data.map((movie: { id: number }) => movie.id);
  } catch (error) {
    throw new Error('Erro ao carregar filmes favoritos');
  }
};

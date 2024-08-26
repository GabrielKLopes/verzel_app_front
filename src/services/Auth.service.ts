import { api } from './api.service';

export const AuthService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/session/authentication', credentials);
      localStorage.setItem('token', response.data.token);
      const user = await getUserInfo(); 
     
      return user.permission_id; 
    } catch (error) {
      throw new Error('Falha no login');
    }
  },

  logout: async () => {
    localStorage.removeItem('token');
  },

  getToken: () => localStorage.getItem('token')
};

const getUserInfo = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token não encontrado');
    const response = await api.get('session/user', { headers: { Authorization: `Bearer ${token}` } });
 
    return response.data; 
  } catch (error) {
    throw new Error('Erro ao obter informações do usuário');
  }
};

import Cookies from 'js-cookie';
import { api } from './api.service';

interface RegisterUserInteface{
    email:string, 
    password:string,
}

export const RegisterUser = {
    register: async (registerUser: RegisterUserInteface) =>{
        try{
            const response = await api.post('/session/user/register', registerUser);
            return response.data;
        }catch(error){
            throw new Error('Register failed');
        }
    }
}
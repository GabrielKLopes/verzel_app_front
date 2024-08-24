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
            if(response.data && response.data.token){
                Cookies.set('token', response.data.token, {expires : 7});
            }

            return response.data;
        }catch(error){
            throw new Error('Register failed');
        }
    }
}
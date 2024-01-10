import axios from "axios";
import User from "../Models/User";
import appConfig from "../Utils/AppConfig";
import { authStore, login, logout } from "../Redux/AuthStore";


class AuthService{

    public async login(user:User){
        //important : when sending an enum object it will send it as the number value to send it as a string we say return the enum[in this index] instead as shown below
        // const response = await axios.post<string>
        // (appConfig.url+"/auth/login"
        // ,null /* this is request body */
        // ,{params: {"email":email, "password":password, "clientType":ClientType[clientType]}}); //sending as params
        console.log(user);
        
        const response = await axios.post<string>(appConfig.url+"/auth/login"
        ,user);//"email":user.email, "password":user.password, "clientType":ClientType[user.role]
         //sending it as an object with these params inside
        authStore.dispatch(login(response.data))
        return response.data;
    }

    public async logout(){
        const response = await axios.post<string>(appConfig.url+"/auth/logout");
        authStore.dispatch(logout());
        return response.data;
    }
}

const authService = new AuthService;
export default authService;
import axios from "axios";
import User from "../Models/User";
import appConfig from "../Utils/AppConfig";
import { authStore, login, logout } from "../Redux/AuthStore";
import { toast, useToast } from "react-toastify";


class AuthService{

    public async login(user:User){
        
        const responseData = (await axios.post<string>(appConfig.url+"/auth/login",user)).data;
        authStore.dispatch(login(responseData))

        return responseData;
    }

    public async logout(){
        const response = await axios.post<string>(appConfig.url+"/auth/logout");
        authStore.dispatch(logout());
        toast.success(response.status.toString());
    }
}

const authService = new AuthService;
export default authService;
import axios from "axios";
import User from "../Models/User";
import appConfig from "../Utils/AppConfig";
import { authStore, login, logout } from "../Redux/AuthStore";
import { toast, useToast } from "react-toastify";
import errorHandler from "./ErrorHandler";
import { South } from "@mui/icons-material";


class AuthService{

    public async login(user:User){
        
        const responseData = (await axios.post<string>(appConfig.url+"/auth/login",user)).data;        
        authStore.dispatch(login(responseData))
        return responseData;
    }

    public async logout(){
        axios.post<string>(appConfig.url+"/auth/logout")
        .then((response) => {
            if (authStore.getState().user !== (undefined || null)) {
                authStore.dispatch(logout());
                console.log("User logged out successfully!");
                
            }
            toast.success(response.data);
        })
        .catch((err) => errorHandler.showError(err));
    }
}

const authService = new AuthService;
export default authService;
import axios from "axios";
import { authStore } from "../Redux/AuthStore";

// before sending request it will do these methods before sending (adding ,removing, checking)
class ClientInterceptor{
    public tokenInterceptor(){
        axios.interceptors.request.use( request => {
            if (authStore.getState().token.length > 0) {

                request.headers["Authorization"] = "Bearer " + authStore.getState().token;
            }
            return request;

        });
    }
}

const clientInterceptor = new ClientInterceptor();
export default clientInterceptor;
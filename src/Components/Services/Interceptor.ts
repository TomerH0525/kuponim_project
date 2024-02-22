import axios from "axios";
import { authStore, logout } from "../Redux/AuthStore";

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

    public responseInterceptor(){
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
              if (error.response && error.response.status === 401) {
                // Redirect to the login page or handle token expiration
                console.log("lsadsad");
                
                // navigate('/login'); // Replace with your login route
                authStore.dispatch(logout())
              } else {
                // Log other errors
                console.error('Error:', error);
              }
              return Promise.reject(error);
            }
          );
    }

    
}

const clientInterceptor = new ClientInterceptor();
export default clientInterceptor;
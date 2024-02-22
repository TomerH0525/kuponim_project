import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authStore, logout } from '../Redux/AuthStore';


class ErrorHandler{
   
    public showError(err: any){
        if(typeof(err) == 'string'){
            toast.error(err);
        }else if(err.response){
            if (err.response.status == 403) {
                toast.error(err.response.data);
                authStore.dispatch(logout());
                return 403
            }
            toast.error(err.response.data);
        }else if(err.message){
            toast.error(err.message);
        } else {
            console.log(err);
            toast.error("Oops! Something went wrong...");
        }
    }
}

const errorHandler = new ErrorHandler();
export default errorHandler;
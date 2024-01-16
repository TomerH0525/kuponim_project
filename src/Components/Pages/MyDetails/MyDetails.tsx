import { useEffect, useState } from "react";
import User from "../../Models/User";
import "./MyDetails.css";
import { authStore } from "../../Redux/AuthStore";
import CompanyDetails from "../CompanyArea/CompanyDetails/CompanyDetails";
import ClientType from "../../Models/ClientType";
import AdminDetails from "../AdminArea/AdminDetails/AdminDetails";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




function MyDetails(): JSX.Element {

    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState<User>(null);
    
    useEffect(() => {
      setLoggedUser(authStore.getState().user);
    }, []);
    
    console.log(authStore.getState().user);
    console.log(loggedUser);
    
    if (loggedUser === null) {
      toast.warning("You must login to access this page!");
      navigate("/login");
    }
    
    const returnComponent:any = (() =>{
        if(loggedUser !== null ) {
            switch (loggedUser.clientType) {
                case ClientType.Administrator:
                    return <AdminDetails/>
    
                case ClientType.Company:
                    return <CompanyDetails/>
    
                case ClientType.Customer:
                    return <CompanyDetails/>
    
                default:
                    
                    return <span>Please login to access this page!</span>}
        }
    })
    
    
    return (
    
            <div className="MyDetails">
            {returnComponent()}
        </div>
    
    );
}

export default MyDetails;

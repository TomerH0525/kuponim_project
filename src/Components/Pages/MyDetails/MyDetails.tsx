import { useEffect, useState } from "react";
import User from "../../Models/User";
import "./MyDetails.css";
import { authStore } from "../../Redux/AuthStore";
import CompanyDetails from "../CompanyArea/CompanyDetails/CompanyDetails";
import ClientType from "../../Models/ClientType";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomerDetails from "../CustomerArea/CustomerDetails/CustomerDetails";




function MyDetails(): JSX.Element {

    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState<User>(authStore.getState().user);

    
    
    useEffect(() => {

      if (loggedUser === null || loggedUser === undefined) {
        toast.warning("You must login to access this page!");
        navigate("/login");
      }

      authStore.subscribe(() => {
        setLoggedUser(authStore.getState().user)
      })

    }, [loggedUser]);    
    
 
    
    const returnComponent:any = (() =>{
        if(loggedUser !== null && loggedUser !== undefined ) {
            switch (loggedUser.clientType) {

                case ClientType.Company:
                    return <CompanyDetails/>
    
                case ClientType.Customer:
                    return <CustomerDetails/>
    
                default:
                    
                    return setLoggedUser(null)}
        }
    })
    
    
    return (
    
            <div className="MyDetails">
            {returnComponent()}
        </div>
    
    );
}

export default MyDetails;

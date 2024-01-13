import { useEffect, useState } from "react";
import User from "../../Models/User";
import "./MyDetails.css";
import { authStore } from "../../Redux/AuthStore";
import CompanyDetails from "../CompanyArea/CompanyDetails";
import ClientType from "../../Models/ClientType";
import CustomerDetails from "../CustomerArea/CustomerDetails/CustomerDetails";
import AdminDetails from "../AdminArea/AdminDetails/AdminDetails";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";





function MyDetails(): JSX.Element {

    const navigate = useNavigate();

    const [loggedUser, setLoggedUser] = useState<User>(null);

useEffect(() => {
    setLoggedUser(authStore.getState().user);
    console.log(loggedUser);
    

    authStore.subscribe(() =>{
        setLoggedUser(authStore.getState().user);
    })
},[])

    return (
        <div className="MyDetails">
        {loggedUser !== null ? (
            <>
                {(() => {
                    switch (loggedUser.clientType) {
                        case ClientType.Company:
                            return <CompanyDetails />;
                        
                        case ClientType.Customer:
                            return <CustomerDetails/>;

                        case ClientType.Administrator:
                            return <AdminDetails/>

                        default:
                             return (toast.warning("You must login to access this page!"),navigate("/login"))
                    }
                })()}
            </>
        ) : null}
    </div>
    );
}

export default MyDetails;

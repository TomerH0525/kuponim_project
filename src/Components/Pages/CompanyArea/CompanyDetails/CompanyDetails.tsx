import { useEffect } from "react";
import AddCoupon from "../AddCoupon/AddCoupon";
import "./CompanyDetails.css";
import { authStore } from "../../../Redux/AuthStore";
import { useNavigate } from "react-router-dom";



function CompanyDetails(): JSX.Element {

  const navigate = useNavigate();

  useEffect(()=> {
    if(authStore.getState().user === null){
      navigate("login")

    }
  })
  
    return (
      <div className="CompanyDetails">
        <AddCoupon/>
      </div>
    );
  }



export default CompanyDetails;

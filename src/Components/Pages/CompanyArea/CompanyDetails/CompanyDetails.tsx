import { useEffect, useState } from "react";
import "./CompanyDetails.css";
import Company from "../../../Models/Company";
import companyService from "../../../Services/CompanyService";


function CompanyDetails(): JSX.Element {

    const [company, setCompany] = useState<Company>();

    useEffect(() =>  {
        companyService.getCompanyDetails()
        .then( comp => setCompany(comp))
        .catch()
    })

    return (
        <div className="CompanyDetails">
            Im Company!
			{company &&
             
                <><h1>{company.name}</h1><h2>{company.email}</h2><h3>{company.id}</h3></>
            }
        </div>
    );
}

export default CompanyDetails;

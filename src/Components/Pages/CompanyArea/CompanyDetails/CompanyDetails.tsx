import { useEffect, useState } from "react";
import "./CompanyDetails.css";
import Company from "../../../Models/Company";
import companyService from "../../../Services/CompanyService";
import { Typography } from '@mui/material';
import { Tab } from '@mui/material';
import { Box } from '@mui/material';
import { Tabs } from '@mui/material';
import LeftPanel from "../../MyDetails/LeftPannel/LeftPannel";


function CompanyDetails(): JSX.Element {

    const [company, setCompany] = useState();

    useEffect(() => {
        companyService.getCompanyDetails()
            .then(comp => {
                setCompany(comp); console.log(comp);
            })
            .catch()
    }, [])

    return (
        <>
            <LeftPanel />
        </>

    );
}



export default CompanyDetails;

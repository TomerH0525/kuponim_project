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

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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
            <span>blah</span>
        </>

    );
}



export default CompanyDetails;

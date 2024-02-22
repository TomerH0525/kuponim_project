import { Box } from "@mui/material";
import "./About.css";

function About(): JSX.Element {
    return (
        <Box display={"flex"} sx={{alignItems:"center",justifyContent:"center", height:"50vh"}}>
			<Box textAlign={"center"} sx={{}}>
                <h1>Hello and welcome to my Peel&Reveal (Coupon Site)</h1>
                <h3>visitors can only look at coupons but not buy them</h3>
                <h3>only registered customers can buy coupons</h3>
                <h3>coupons are created by registered companies</h3>
                <h3>the only one who can create customer/company accounts is the Admin!</h3>

                <h4>Add to cart feature still not implemented</h4>
            </Box>
        </Box>
    );
}

export default About;

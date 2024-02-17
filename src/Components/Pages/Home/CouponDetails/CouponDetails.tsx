import { Box, Button, Paper, Typography, styled } from "@mui/material";
import "./CouponDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import publicSerivce from "../../../Services/PublicService";
import { useEffect, useState } from "react";
import errorHandler from "../../../Services/ErrorHandler";
import Coupon from "../../../Models/Coupon";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import WarehouseIcon from '@mui/icons-material/WarehouseOutlined';

const CustomButton = styled(Button)({
    backgroundColor: "rgba(255, 179, 0 ,1)",
    fontSize: "2.3ex",
    color: "black",
    "&:focus": {
        backgroundColor: "rgba(255, 145, 0, 1)",
        color: "black",
    }
    , "&:hover": {
        backgroundColor: "rgba(255, 145, 0, 1)",
    },
    fontWeight: 700,
    width: "20%",
    minWidth: "150px",
    maxWidth: "200px",
})

function CouponDetails(): JSX.Element {

    const [coupon, setCoupon] = useState<Coupon>(null);

    const { couponId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        console.log(couponId);
        publicSerivce.getCouponDetails(couponId)
            .then((coupon) => setCoupon(coupon))
            .catch((err) => {
                if (errorHandler.showError(err) == 403) {
                    navigate("/login")
                }
            })
    }, [])


    return (
        <Box display={"flex"} sx={{ alignItems: "center", justifyContent: "center"
         ,height: { md: "100%", xs: "100%" }, paddingTop: { md: 7, xs: 3 } }}>

            <Paper sx={{ height: "100%", width: { md: "80%", xs: "90%", borderRadius: 15 }, backgroundColor: "rgba(238, 238, 238,0.3)" }}>
                <Box sx={{ display: "flex", flexDirection: "column", p: 5, gap: 3, height: "100%" }} >
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "start", gap: { xs: 2, md: 0 } }}>

                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <div className="picture">
                                <img src={coupon?.image as string}></img>
                                <Typography>Category : {coupon?.category} </Typography>
                            </div>
                        </Box>

                        <div className="underImage">
                            <Box>
                                <Typography sx={{ fontWeight: 600, textAlign: "start" }} variant="h4"> {coupon?.title} </Typography>
                                <Typography textAlign={"center"} sx={{ fontSize: "2ex" }}>Coupon id : {coupon?.couponID}</Typography>
                            </Box>

                            <Box>
                                <Box display={"flex"} sx={{ justifyContent: { xs: "space-around", md: "center" }
                                 ,gap: { md: 5, xs: 5 }, width: "100%", marginTop: { xs: 3 }}}>

                                    <Box display={"flex"} sx={{ gap: 1 }}>

                                        <Box>
                                            <Typography sx={{ fontSize: { md: "3.5ex", xs: "3ex" } }}> Price: </Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={{ color: "#00c853", fontSize: { md: "4ex", xs: "3ex" } }}>{coupon?.price}$</Typography>
                                        </Box>

                                    </Box>

                                    <Box display={"flex"} sx={{ gap: 1 }}>

                                        <Box>
                                            <Typography sx={{ fontSize: { md: "3.5ex", xs: "3ex" } }}>Quantity:</Typography>
                                        </Box>
                                        <Box display={"flex"} sx={{ gap: 1 }}>
                                            <Typography sx={{ fontSize: { md: "3.5ex", xs: "3ex" } }}>{coupon?.amount} </Typography>
                                        </Box>

                                    </Box>

                                </Box>

                                <Box display={"flex"} sx={{ justifyContent: "center", gap: 4, flexDirection: "row", width: "100%" }}>
                                    <CustomButton >  Buy Now  </CustomButton>
                                    <CustomButton >  <AddShoppingCartIcon fontSize="large" />  </CustomButton>
                                </Box>
                            </Box>
                        </div>
                    </Box>

                    <div className="description">
                        <Typography variant="h6" overflow={"auto"} textAlign={"center"}
                            sx={{ width: { xs: "100%", md: "60%" }, maxHeight: { xs: "100%", md: "200px" } }}>
                            {coupon?.description}
                        </Typography>
                    </div>
                </Box>
            </Paper>

        </Box>
    );
}

export default CouponDetails;

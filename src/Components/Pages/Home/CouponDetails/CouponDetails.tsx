import { Box, Button, Paper, Typography, styled } from "@mui/material";
import "./CouponDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import publicSerivce from "../../../Services/PublicService";
import { useEffect, useState } from "react";
import errorHandler from "../../../Services/ErrorHandler";
import Coupon from "../../../Models/Coupon";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { authStore } from "../../../Redux/AuthStore";
import ClientType from "../../../Models/ClientType";
import customerService from "../../../Services/CustomerService";
import { toast } from "react-toastify";
import { customerStore } from "../../../Redux/CustomerStore";

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

    let isCustomer: boolean = false;
    let isCompany: boolean = false;
    let isAdmin: boolean = false;
  
  
    switch (authStore.getState().user?.clientType) {
      case ClientType.Customer:
        isCustomer = true;
        break;
  
      case ClientType.Company:
        isCompany = true;
        break;
  
      case ClientType.Administrator:
        isAdmin = true;
        break;
  
      default:
        isCustomer = false;
        isCompany = false;
        isAdmin = false;
        break;
    }

    const [coupon, setCoupon] = useState<Coupon>(null);
    const [isPurchased, setIsPurchased] = useState<boolean>(!isCustomer);

    const { couponId } = useParams();
    const navigate = useNavigate();

    const purchaseCoupon = (coupon: Coupon) => {
        if (isCustomer) {
          customerService.purchaseCoupon(coupon)
            .then((msg) =>  {toast.success(msg); navigate("/myDetails")})
            .catch((err) => errorHandler.showError(err))
        }
      }


    useEffect(() => {        
        if (coupon === null) {
            publicSerivce.getCouponDetails(couponId)
            .then((coupon) => setCoupon(coupon))
            .catch((err) => errorHandler.showError(err))
        }
        if (customerStore.getState().customer?.coupons?.findIndex((myCoupon) => myCoupon?.couponID === parseInt(couponId)) !== -1){
            setIsPurchased(true);
        }

        customerStore.subscribe(() =>{
            if (customerStore.getState().customer?.coupons?.findIndex((myCoupon) => myCoupon?.couponID === parseInt(couponId)) !== -1){
                setIsPurchased(true);
            }
        })

    }, [isPurchased])

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
                                    <CustomButton onClick={() => purchaseCoupon(coupon)} disabled={isPurchased} sx={{ "&.Mui-disabled":{color: isCustomer ? "green" : null}}} > {isPurchased ? isCustomer ? "Owned" : "Buy Now" : "Buy Now"} </CustomButton>
                                    <CustomButton disabled={isPurchased}>  <AddShoppingCartIcon fontSize="large" />  </CustomButton>
                                </Box>
                                {isCustomer || isAdmin || isCompany ? null : <Typography color="red" fontWeight={700} textAlign="center" marginTop={2} >Please sign in to purchase</Typography>}
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

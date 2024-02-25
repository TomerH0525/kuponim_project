import "./CouponCards.css";
import Coupon from "../../../Models/Coupon";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";
import ClientType from "../../../Models/ClientType";
import { authStore } from "../../../Redux/AuthStore";
import { customerStore } from "../../../Redux/CustomerStore";
import customerService from "../../../Services/CustomerService";
import { toast } from "react-toastify";
import errorHandler from "../../../Services/ErrorHandler";
import { useEffect, useState } from "react";
import Customer from "../../../Models/Customer";


let isCustomer: boolean = false;
let isCompany: boolean = false;
let isAdmin: boolean = false;



function CouponCards(props: { coupons: Coupon[]; }): JSX.Element {

  const { coupons } = props;

  const [flag, setFlag] = useState<boolean>(false);

  const navigate = useNavigate();

  let isCouponPurchased = false;
  let purchaseButton = "Buy Now"

  const isPurchased = (couponId: number) => {
    if (isCustomer === true) {
      if (customerStore.getState().customer?.coupons?.findIndex((coupon) => coupon.couponID === couponId) !== -1) {        
        purchaseButton = "OWNED"
        isCouponPurchased = true;
      }else{
        purchaseButton = "Buy Now"
        isCouponPurchased = false;
      }
    }else{
      purchaseButton = "Buy Now"
      isCouponPurchased = false;
    }
    return isCouponPurchased;
  }


  const purchaseCoupon = (coupon: Coupon) => {
    if (isCustomer) {
      customerService.purchaseCoupon(coupon)
        .then((msg) => toast.success(msg))
        .catch((err) => errorHandler.showError(err))
    }
  }

  useEffect(() => {
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

    customerStore.subscribe(() => {
      setFlag(!flag)
    })

    authStore.subscribe(() => {
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
      setFlag(!flag)
    })
  },[flag])



  return (
    <div className="MainDiv" >
      <div className="CouponCards">
        {coupons !== null && coupons !== undefined ? coupons.map((c) => (
          
          <Card key={c.couponID} sx={{
            width: { md: "22%", xs: "90%" }, minWidth: { xs: "250px", md: "300px" }, maxWidth: { md: "325px" }, maxHeight: { xs: "10%" }, backgroundColor: "#fff8e1"
            , margin: { xs: "3%", md: 0 }, marginTop: { md: "1.5%" }, display: "flex", flexDirection: "column", borderRadius: 4
          }}>
            <Box sx={{ height: "100%", maxHeight: { md: 250 }, minWidth: { md: 250 }, width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CardMedia
                component="img"
                sx={{ height: "100%", width: "100%", objectFit: "fill", cursor: "pointer" }}
                src={c.image as string}
                alt={c.title + " preview picture"}
                onClick={() => navigate("/coupon/" + c.couponID)}
              />
            </Box>
            <Box display="flex" flexDirection="column" flexWrap="wrap" sx={{ justifyContent: "space-between" }}>
              <CardContent >
                <Typography onClick={() => navigate("/coupon/" + c.couponID)} variant="h6" component="div"
                  sx={{
                    cursor: "pointer", textAlign: "center", fontWeight: 700, height: 100, overflow: "clip", width: "100%",
                    display: "flex", justifyContent: "center", alignItems: "center", justifyItems: "center",
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}>
                  {c.title}
                </Typography>
              </CardContent>
              {(isCustomer || isAdmin || isCompany) ? null : <Typography fontWeight="700" color="red" textAlign="center">Please sign in to purchase!</Typography>}
              <Box sx={{ display: "flex", alignItems: { xs: "center" }, justifyContent: "space-between", margin: 1, gap: 1, padding: 1 }}>
                <Button onClick={() => purchaseCoupon(c)} disabled={isCustomer ? isPurchased(c.couponID) ? true : false : true} variant="contained" sx={{
                  backgroundColor: "rgba(255, 179, 0 ,1)", width: "auto", height: { md: "45px", xs: "30" }, fontSize: { md: "1em", xs: "small" },
                  color: "black",
                  "&:focus": {
                    backgroundColor: "rgba(255, 145, 0, 1)",
                    color: "black"
                  }, "&:hover": {
                    backgroundColor: "rgba(255, 145, 0, 1)",
                  },
                  "&.Mui-disabled": {
                    color: isCustomer ? "green" : null,
                  }
                }} >
                  {purchaseButton}
                </Button>
                <Button variant="contained" disabled={isCustomer ? isCouponPurchased ? true : false : true} sx={{
                  backgroundColor: "rgba(255, 179, 0 ,1)", width: { xs: "auto", md: "auto" }, height: { md: "45px", xs: "30" }, fontSize: "1em",
                  color: "black",
                  "&:focus": {
                    backgroundColor: "rgba(255, 145, 0, 1)",
                    color: "black",
                  }, "&:hover": {
                    backgroundColor: "rgba(255, 145, 0, 1)",
                  },
                }}>
                  <AddShoppingCartIcon />
                </Button>
              </Box>
            </Box>
          </Card>)) : null}
      </div>
    </div>
  );

}


export default CouponCards;

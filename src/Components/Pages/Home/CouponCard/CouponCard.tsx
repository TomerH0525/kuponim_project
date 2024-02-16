import { useEffect, useState } from "react";
import "./CouponCard.css";
import publicSerivce from "../../../Services/PublicService";
import Coupon from "../../../Models/Coupon";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



function CouponCard(): JSX.Element {
    
    const [coupons, setCoupons] = useState<Coupon[]>(null);
    
 

    useEffect(() => {
      const fetchCoupons = async () => {
        const coupons = await publicSerivce.getAllCoupons();
        setCoupons(coupons);
      };
        fetchCoupons();
        
      }, []);


    return (
        <div className="MainDiv" >
          <div className="CouponCard">
			{coupons !== null && coupons !== undefined ? coupons.map((c) => (
      
              <Card key={c.couponID} sx={{width:{md:"20%",xs:"90%"}, minWidth:{xs:"250px",md:"300px"},maxWidth:{md:"325px"},maxHeight:{xs:"10%"},backgroundColor:"#fff8e1"
              ,margin:{xs:"3%",md:0},marginTop:{md:"1.5%"},display:"flex",flexDirection:"column",borderRadius:4}}>
              <Box sx={{height:"100%",maxHeight:{md:250},width:"100%",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CardMedia
                  component="img"
                  sx={{height: "100%", width: "100%", objectFit: "fill"}}
                  src={c.image as string}
                  alt={c.title+" preview picture"}
                />
                </Box>
                <Box display="flex" flexDirection="column" flexWrap="wrap" sx={{justifyContent:"space-between"}}>
                <CardContent >
                  <Typography variant="h5" component="div" sx={{fontWeight:700,height:100,overflow:"clip",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",justifyItems:"center"}}>
                    {c.title}
                  </Typography>
                </CardContent>
              <Box sx={{display:"flex" , alignItems:{xs:"center"}, justifyContent:"space-between",margin:1,gap:1,padding:1}}>
              <Button  variant="contained" sx={{backgroundColor: "rgba(255, 179, 0 ,1)",width:"auto",height:{md:"45px",xs:"30"},fontSize:{md:"1em",xs:"small"},
                color: "black",
                "&:focus": {
                  backgroundColor: "rgba(255, 145, 0, 1)",
                  color: "black"}, "&:hover": {
                    backgroundColor: "rgba(255, 145, 0, 1)",
                }}}>
                 Buy Now
                </Button>
                <Button variant="contained" sx={{backgroundColor: "rgba(255, 179, 0 ,1)",width:{xs:"auto",md:"auto"},height:{md:"45px",xs:"30"},fontSize:"1em",
                color: "black",
                "&:focus": {
                  backgroundColor: "rgba(255, 145, 0, 1)",
                  color: "black",
                },"&:hover": {
                    backgroundColor: "rgba(255, 145, 0, 1)",
                },}}>
                  <AddShoppingCartIcon/>
                </Button>
              </Box>
              </Box>
            </Card> )) : null}
            </div>
        </div>
    );
}

export default CouponCard;

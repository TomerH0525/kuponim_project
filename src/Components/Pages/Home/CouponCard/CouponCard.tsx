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
      
              <Card key={c.couponID} sx={{width:{md:"30%",xs:"90%"}, minWidth:{xs:"250px",md:"300px"},maxWidth:{md:"350px"},maxHeight:{xs:"10%"},backgroundColor:"#fff8e1"
              ,margin:{xs:"3%",md:0},marginTop:{md:"1.5%"},display:"flex",flexDirection:"column"}}>
              <Box sx={{width:"100%",height:"100%",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CardMedia
                  component="img"
                  width="100%"
                  sx={{maxHeight:{xs:"100%"}}}
                  src={c.image as string}
                  alt={c.title+" coupon preview picture"}
                />
                </Box>
                <Box display="flex" flexDirection="column" flexWrap="wrap" sx={{justifyContent:"space-between"}}>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{fontWeight:700,height:100,overflow:"clip",width:"100%"}}>
                    {c.title}
                  </Typography>
                </CardContent>
              <Box sx={{display:"flex" , alignItems:{xs:"center"}, justifyContent:"space-between",margin:1,gap:1,padding:1}}>
              <Button  variant="contained" sx={{backgroundColor: "#ff9100",width:"auto",height:{md:"45px",xs:"30"},fontSize:{md:"1em",xs:"small"},
                color: "black",
                "&:focus": {
                  backgroundColor: "#ff9100",
                  color: "black"}, "&:hover": {
                    backgroundColor: "#ffd180",
                }}}>
                 Buy Now
                </Button>
                <Button variant="contained" sx={{backgroundColor: "#ff9100",width:{xs:"auto",md:"auto"},height:{md:"45px",xs:"30"},fontSize:"1em",
                color: "black",
                "&:focus": {
                  backgroundColor: "#ff9100",
                  color: "black",
                },"&:hover": {
                    backgroundColor: "#ffd180",
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

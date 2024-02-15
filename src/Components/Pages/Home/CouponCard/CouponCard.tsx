import { useEffect, useState } from "react";
import "./CouponCard.css";
import publicSerivce from "../../../Services/PublicService";
import Coupon from "../../../Models/Coupon";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, createTheme, makeStyles} from "@mui/material";



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
              <Card key={c.couponID} sx={{width:{md:"30%",xs:"50%"}, minWidth:{xs:"250px"},maxWidth:{xs:"350px",md:"300px"}}}>
              <Box>
                <CardMedia
                  component="img"
                  height="160"
                  image={c.image as string}
                  alt={c.title+" coupon preview picture"}
                />
                </Box>
                <Box display="flex" flexDirection="column" flexWrap="wrap" sx={{justifyContent:"space-between"}}>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{fontWeight:700,height:100,overflow:"clip",width:"100%"}}>
                    {c.title}
                  </Typography>
                </CardContent>
              <Box sx={{display:"flex" , alignItems:{xs:"center"}, justifyContent:"space-between",padding:0.3}}>
              <Button size="small" variant="contained" sx={{backgroundColor: "#ff9100",
                color: "black",
                "&:focus": {
                  backgroundColor: "#ff9100",
                  color: "black"}, "&:hover": {
                    backgroundColor: "#ffd180",
                }}}>
                 Buy Now
                </Button>
                <Button size="small" color="primary" variant="contained" sx={{backgroundColor: "#ff9100",
                color: "black",
                "&:focus": {
                  backgroundColor: "#ff9100",
                  color: "black",
                },"&:hover": {
                    backgroundColor: "#ffd180",
                },}}>
                  Add to Cart
                </Button>
              </Box>
              </Box>
            </Card> )) : null}
            </div>
        </div>
    );
}

export default CouponCard;

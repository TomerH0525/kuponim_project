import { useEffect, useState } from "react";
import "./CouponCard.css";
import publicSerivce from "../../../Services/PublicService";
import Coupon from "../../../Models/Coupon";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

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
        <div className="CouponCard">
			{coupons !== null && coupons !== undefined ? coupons.map((c) => (
              <Card key={c.couponID} sx={{ width:"20%", minWidth:250,height:"350px",margin:5,backgroundColor:"#ffecb3"}}>
              
                <CardMedia
                  component="img"
                  height="140"
                  image={c.image as string}
                  alt={c.title+" coupon preview picture"}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {c.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{fontSize:"12px",height:"80px",overflow: "hidden",display: "-webkit-box"
                        ,"-webkit-line-clamp": 3,"-webkit-box-orient": "vertical",wordWrap: "break-word",
                        overflowWrap: "break-word"}}>
                    {c.description.length < 40 ? c.description+" Click to learn more..." : (c.description.substring(0, 126) + " Click to learn more...")}
                  </Typography>
                </CardContent>
              
              <CardActions sx={{display:"flex", justifyContent:"center"}}>
                <Button size="small" color="primary">
                  Add to Cart
                </Button>
                <Button size="small" color="primary">
                 Buy Now
                </Button>
              </CardActions>
            </Card> )) : null}
        </div>
    );
}

export default CouponCard;

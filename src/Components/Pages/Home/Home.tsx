import { useEffect, useState } from "react";
import Coupon from "../../Models/Coupon";
import publicSerivce from "../../Services/PublicService";
import "./Home.css";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

function Home(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>(null);
    
    useEffect(() => {
        const fetchCoupons = async () => {
          const coupons = await publicSerivce.getAllCoupons();
          setCoupons(coupons);
        };
      
        fetchCoupons();
        console.log(coupons);
        
      }, []);
    

    return (
        <div className="Home">
        {coupons !== null && coupons !== undefined ? coupons.map((c) => (
              <Card key={c.couponID} sx={{ maxWidth: 345, minWidth:250,margin:5}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt={c.title+" coupon preview picture"}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {c.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {c.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
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

export default Home;

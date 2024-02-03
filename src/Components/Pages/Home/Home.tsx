import { useEffect, useState } from "react";
import Coupon from "../../Models/Coupon";
import publicSerivce from "../../Services/PublicService";
import "./Home.css";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import CouponCard from "./CouponCard/CouponCard";

function Home(): JSX.Element {


    

    return (
        <div className="Home">
        <CouponCard/>
      </div>
      );
}

export default Home;

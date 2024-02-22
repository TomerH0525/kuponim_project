import axios from "axios";
import appConfig from "../Utils/AppConfig";
import Coupon from "../Models/Coupon";
import { couponsFillCoupons, couponsStore } from "../Redux/CouponsStore";

class PublicService{

    public async getAllCoupons(){
        const response = (await axios.get<Coupon[]>(appConfig.url+"/coupons/all"))
        couponsStore.dispatch(couponsFillCoupons(response.data))
        return response.data;
        
    }

    public async getCouponDetails(couponId:any){
        const response = (await axios.get<Coupon>(appConfig.url+"/coupons/"+couponId))
        return response.data;
    }

}
const publicSerivce = new PublicService;
export default publicSerivce;
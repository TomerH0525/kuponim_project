import axios from "axios";
import appConfig from "../Utils/AppConfig";
import Coupon from "../Models/Coupon";

class PublicService{

    public async getAllCoupons(){
        const response = (await axios.get<Coupon[]>(appConfig.url+"/coupons/all"))
        return response.data;
        
    }

}
const publicSerivce = new PublicService;
export default publicSerivce;
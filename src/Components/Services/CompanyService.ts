import axios from "axios";
import appConfig from "../Utils/AppConfig";
import Coupon from "../Models/Coupon";

class CompanyService{
    

    public async getCompanyDetails(){
        const response = (await axios.get(appConfig.url+"/company/coupon/all"));
        console.log(response);
        
        return response.data
    }

    public async addCoupon(coupon: Coupon){
        console.log(coupon);
        const respone = (await axios.post(appConfig.url+"/company/coupon/add",coupon));
        console.log(respone);
        return respone
        
    }

    // public async getCompanyCoupons(){

    // }
}

const companyService = new CompanyService;
export default companyService;
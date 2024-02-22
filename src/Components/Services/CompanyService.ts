import axios from "axios";
import appConfig from "../Utils/AppConfig";
import Coupon from "../Models/Coupon";
import { companyAddCoupon, companyDeleteCoupon, companyFill, companyStore, companyUpdateCoupon } from "../Redux/CompanyStore";
import Company from "../Models/Company";
import { couponsAddCoupon, couponsDeleteById, couponsStore, couponsUpdateCoupon } from "../Redux/CouponsStore";

class CompanyService{
    

    public async getCompanyDetails(): Promise<Company>{
        const response = (await axios.get(appConfig.url+"/company/details"));
        companyStore.dispatch(companyFill(response.data))
        console.log(response);
        
        return response.data
    }

    public async getCompanyCoupon(couponId:number): Promise<Coupon>{
        const response = (await axios.get(appConfig.url+"/company/coupon/"+couponId))
        return response.data;
    }

    public async addCoupon(coupon: Coupon):Promise<number>{
        const response = (await axios.post(appConfig.url+"/company/coupon/add",coupon));
        coupon.couponID = response.data
        companyStore.dispatch(companyAddCoupon(coupon))
        couponsStore.dispatch(couponsAddCoupon(coupon))    
        return response.data
    }

    public async updateCoupon(coupon: Coupon){
        const response = (await axios.put(appConfig.url+"/company/coupon/"+coupon.couponID+"/update",coupon))
        companyStore.dispatch(companyUpdateCoupon(coupon));
        couponsStore.dispatch(couponsUpdateCoupon(coupon))
        return response.data
    }

    public async deleteCoupon(couponID: number){
        const response = (await axios.delete(appConfig.url+"/company/coupon/"+couponID+"/delete"));
        companyStore.dispatch(companyDeleteCoupon(couponID));
        couponsStore.dispatch(couponsDeleteById(couponID));
        return response.data
    }

    // public async getCompanyCoupons(){

    // }
}

const companyService = new CompanyService;
export default companyService;
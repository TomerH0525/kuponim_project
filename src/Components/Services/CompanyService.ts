import axios from "axios";
import appConfig from "../Utils/AppConfig";

class CompanyService{
    

    public async getCompanyDetails(){
        const response = (await axios.get(appConfig.url+"/company/coupon/all"))
        console.log(response);
        
        return response.data
    }

    // public async getCompanyCoupons(){

    // }
}

const companyService = new CompanyService;
export default companyService;
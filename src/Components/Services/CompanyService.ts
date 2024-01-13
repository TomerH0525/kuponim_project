import axios from "axios";
import appConfig from "../Utils/AppConfig";

class CompanyService{
    

    public async getCompanyDetails(){
        const response = (await axios.get(appConfig.url+"/company/details"))
        return response.data
    }
}

const companyService = new CompanyService;
export default companyService;
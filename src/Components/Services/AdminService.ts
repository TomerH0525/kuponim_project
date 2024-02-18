import axios from "axios";
import appConfig from "../Utils/AppConfig";

class AdminService{

    public async getAllCompanies(){
        const response = (await axios.get(appConfig.url+"/companies"))
        console.log(response.data);
        
    }

}
const adminService = new AdminService;
export default adminService;
import axios from "axios";
import appConfig from "../Utils/AppConfig";
import Company from "../Models/Company";
import Customer from "../Models/Customer";
import { companiesAddCompany, companiesFill, companiesRemoveCompany, companiesStore, companiesUpdateCompany } from "../Redux/CompaniesStore";
import { customersAddCustomer, customersFill, customersRemoveCustomer, customersStore, customersUpdateCustomer } from "../Redux/CustomersStore";

class AdminService{

    public async getAllCompanies():Promise<Company[]>{
        const response = (await axios.get(appConfig.url+"/companies"))
        companiesStore.dispatch(companiesFill(response.data));
        return response.data
        
    }

    public async deleteCompanyById(companyId:number){
        const response = (await axios.delete(appConfig.url+"/company/"+companyId))
        companiesStore.dispatch(companiesRemoveCompany(companyId));
        return response.data
        
    }

    public async addCompany(company: Company){
        const response = (await axios.post(appConfig.url+"/company",company))
        companiesStore.dispatch(companiesAddCompany(response.data))
        
    }

    public async updateCompany(company: Company){
        const response = (await axios.put(appConfig.url+"/company",company));
        if (companiesStore.getState().companies !== null) {
            companiesStore.dispatch(companiesUpdateCompany(response.data));
        }
        return response.data
    }

    public async getCompanyById(companyId: number){
        const response = (await axios.get(appConfig.url+"/company/"+companyId))
        return response.data;
    }

    public async getAllCustomers(){
        const response = (await axios.get(appConfig.url+"/customers"))
        console.log(response.data);
        customersStore.dispatch(customersFill(response.data))
        return response.data
    }

    public async deleteCustomerById(customerId: number){
        const response = (await axios.delete(appConfig.url+"/customer/"+customerId));
        customersStore.dispatch(customersRemoveCustomer(customerId));
        return response.data
    }

    public async addCustomer(customer: Customer){
        const response = (await axios.post(appConfig.url+"/customer",customer))
        customersStore.dispatch(customersAddCustomer(response.data));
    }

    public async updateCustomer(customer: Customer){
        const response = (await axios.put(appConfig.url+"/customer",customer));
        if (customersStore.getState().customers !== null) {
            customersStore.dispatch(customersUpdateCustomer(response.data))
        }
        return response.data
    }

    public async getCustomerByID(customerID: number){
        const response = (await axios.get(appConfig.url+"/customer/"+customerID))        
        return response.data
    }

}
const adminService = new AdminService;
export default adminService;
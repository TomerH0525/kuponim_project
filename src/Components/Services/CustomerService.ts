import axios from "axios";
import appConfig from "../Utils/AppConfig";
import { customerFill, customerPurchaseCoupon, customerStore } from "../Redux/CustomerStore";
import Coupon from "../Models/Coupon";
import Customer from "../Models/Customer";
import { toast } from "react-toastify";

class CustomerService{

public async getCustomerDetails(): Promise<Customer>{
    const response = (await axios.get(appConfig.url+"/customer/details"))
    customerStore.dispatch(customerFill(response.data))
    return response.data
}

public async purchaseCoupon(coupon: Coupon){
    const customerCoupons = customerStore.getState().customer.coupons;
    if (customerCoupons.findIndex((customerCoupons) => customerCoupons.couponID === coupon.couponID) !== -1 ) {
        toast.error("Cannot purchase twice!")
    }else{
    const response = (await axios.put(appConfig.url+"/customer/purchase/"+coupon.couponID))
    customerStore.dispatch(customerPurchaseCoupon(coupon));
    return response.data
    }
}


}
const customerService = new CustomerService();
export default customerService
import Coupon from "./Coupon";

class Customer{
    customerID: number;
    firstName: string;
    lastName: string;
    email: string;
    coupons: Coupon[];
    password: string;

    constructor(id: number, firstName: string, lastName: string, email: string, coupons: Coupon[], password: string){
        this.customerID = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.coupons = coupons;
        this.password = password;
    }
}

export default Customer;
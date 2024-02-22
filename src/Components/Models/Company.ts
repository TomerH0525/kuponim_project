import Coupon from "./Coupon";

class Company{
    id: number;
    name: string;
    email: string;
    coupons: Coupon[];
    password: string;

    constructor(id: number, name: string, email: string, coupons: Coupon[], password: string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.coupons = coupons;
        this.password = password;
    }
}

export default Company;
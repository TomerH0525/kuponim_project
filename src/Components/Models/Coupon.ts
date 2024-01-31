import Category from "./Category";
import Company from "./Company";

class Coupon{
    couponID: number;
    company: Company;
    category: Category;
    title: string;
    description: string;
    amount: number;
    price: number;
    startDate: Date;
    endDate: Date;
    image: string;


}

export default Coupon;
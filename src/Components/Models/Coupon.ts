import Category from "./Category";
import Company from "./Company";

class Coupon{
    couponID: number;
    category: Category;
    title: string;
    description: string;
    amount: number;
    price: number;
    startDate: Date;
    endDate: Date;
    image: string | FileList | File | unknown;


}

export default Coupon;
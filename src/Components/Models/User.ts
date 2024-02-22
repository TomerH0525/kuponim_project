import ClientType from "./ClientType";
import Coupon from "./Coupon";

class User{
    public id: number;
    public customerID: number;
    public email: string;
    public password: string;
    public clientType: ClientType;
    public name: string;
    public firstName: string;
    public lastName: string;

    constructor(email: string, password: string, clientType: ClientType, name: string, firstName: string, lastName: string, id: number, customerID: number){
        this.customerID = customerID;
        this.id = id;
        this.email = email;
        this.password = password;
        this.clientType = clientType;
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export default User;
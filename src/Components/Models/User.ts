import ClientType from "./ClientType";

class User{
    public email: string;
    public password: string;
    public clientType: ClientType;
    public name: string;
    public firstName: string;
    public lastName: string;

    constructor(email: string, password: string, clientType: ClientType, name: string, firstName: string, lastName: string){
        this.email = email;
        this.password = password;
        this.clientType = clientType;
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export default User;
import ClientType from "./ClientType";

class User{
    public email: string;
    public password: string;
    public clientType: ClientType;
    public name: string;

    constructor(email: string, password: string, clientType: ClientType, name: string){
        this.email = email;
        this.password = password;
        this.clientType = clientType;
        this.name = name;
    }
}

export default User;
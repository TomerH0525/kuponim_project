import ClientType from "./ClientType";

class User{
    public email: string;
    public password: string;
    public clientType: ClientType;

    constructor(email: string, password: string, clientType: ClientType){
        this.email = email;
        this.password = password;
        this.clientType = clientType;
    }
}

export default User;
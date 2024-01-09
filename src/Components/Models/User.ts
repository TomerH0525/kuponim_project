import ClientType from "./ClientType";

class User{
    public email: string;
    public password: string;
    public clientType: ClientType;

    constructor(email: string, password: string, role: ClientType){
        this.email = email;
        this.password = password;
        this.clientType = role;
    }
}

export default User;
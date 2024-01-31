
class Company{
    id: number;
    name: string;
    email: string;

    constructor(id: number, name: string, email: string, password: string){
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

export default Company;
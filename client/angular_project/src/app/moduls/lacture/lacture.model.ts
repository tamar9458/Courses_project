export class Lacture{
    id ?:number;
    userName?:string;
    address?:string;
    email?:string;
    password?:string;

constructor(id:number,password:string,userName:string="",address:string="",email:string=""){
   this.id=id;
   this.password=password;
   this.address=address;
   this.email=email;
   this.userName=userName;
}

}
export class User{
    id!:number;
    userName!:string;
    address!:string;
    email!:string;
    password!:string;

    // constructor(){
       
    // }
    constructor(_name:string="_"){
       this.userName=_name;
    }
  
}

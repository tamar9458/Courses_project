import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { APIService } from '../apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cond:boolean = false;
  constructor(private _router:Router) {
    this.cond=sessionStorage.getItem("user")!=null&&sessionStorage.getItem("user")!="_"?true:false;
    console.log("cond guard",this.cond);
    
   // this.activ()
   }
  activ(){
    return this.cond;
  }
  changeActiv(){
    this.cond=!this.cond;
  }

}

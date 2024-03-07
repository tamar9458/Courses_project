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
    this.cond=sessionStorage.getItem("user")!=null?true:false;
   // this.activ()
   }
  activ(){
    return this.cond;
  }
  changeActiv(){
    this.cond=!this.cond;
  }

}

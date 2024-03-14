import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  cond: boolean = false;
  constructor(private _router: Router) {
    this.cond = sessionStorage.getItem("user") != null && sessionStorage.getItem("user") != "_" ? true : false;
  }
  activ() {
    return this.cond;
  }
  changeActiv() {
    this.cond = !this.cond;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from './moduls/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  constructor(private _http: HttpClient) {

   }

   //user
  //  getUserById(id:number):Observable<User>{
  //   return await this._http.get<User>(`/`)
  //  }
}

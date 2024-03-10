import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _router: Router){
    
  }
  title = 'angular_project';
  userJson:string=sessionStorage.getItem("user");
  user=this.userJson!="_"?JSON.parse(this.userJson).userName:"_";
  logOut(){
    sessionStorage.setItem("user","_")
    alert("you log out :(")
    this._router.navigate([`/login`])
  }
}

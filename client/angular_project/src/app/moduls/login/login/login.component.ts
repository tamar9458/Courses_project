import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/apiservice.service';
import { Course } from '../../course/course.model';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _api: APIService, private _router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
 
  }
  @Input()
  isLactureForm?: boolean = false;
  isLacture?: boolean = false;
  
  userForm = new FormGroup({
    "id": new FormControl(0, []),
    "name": new FormControl("", [Validators.required]),
    "password": new FormControl("", [Validators.required]),
    "courseName": new FormControl("", []),
  })
  
  private _user: User | undefined | null
  @Input()
  public set user(value: User) {
    this._user = value;
  }
  saveDetails() {
    var ss = this.userForm.value;
    console.log("ss", ss);
    this._api.getUser(ss.name ? ss.name : "_").subscribe(s => {   
      if (s && ss?.name == s.userName && ss?.password != s.password) {
        alert("error in the password")
      }
      else if (s.userName == "_") {
        console.log("not exist");
        this._router.navigate([`/signup/${ss.name}`])
      }
      else {
        console.log("you enter in succeesful");
        sessionStorage.setItem("user",JSON.stringify(s));
        this._router.navigate([`/course`])
      }
    })
  }
  
  isLact() {
    this.isLacture = true;
  }
  closeLact() {
    this.isLacture = false;
  }
}

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
  private _user: User | undefined | null
  public get student(): User | null | undefined {
    return this._user;
  }
  userForm = new FormGroup({
    "id": new FormControl(0, []),
    "name": new FormControl("_", [Validators.required]),
    "password": new FormControl("", [Validators.required]),
    //"courseName": new FormControl("", [Validators.required]),
  })

  @Input()
  public set user(value: User) {
    this._user = value;
  }
  saveDetails() {
    var ss = this.userForm.value;
    console.log("ss", ss);
    this._api.getUser(ss.name ? ss.name : "_").subscribe(s => {
      if (s && this._user?.userName == s.userName && this._user?.password != s.password) {
        console.log("error in the password")
      }
      else if (s.userName == "_") {
        console.log("not exist");

        this._router.navigate([`/register`,ss])
      }
      else {
        console.log("you enter in succeesful");
        sessionStorage.setItem("user", s.userName);
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

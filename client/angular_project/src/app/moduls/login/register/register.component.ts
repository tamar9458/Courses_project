import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/apiservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  constructor(private _api: APIService, private _router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const user = params['user'];
      this.userNavigate = user;
      this.user = new User(this.userNavigate)
    });

  }

  courseName: string = ""
  userNavigate: string = "_"
  userForm: FormGroup = new FormGroup({});
  private _user: User;
  @Input()
  public set user(value: User) {
    this._user = value;
    this.userForm = new FormGroup({
      "id": new FormControl(0, []),
      "name": new FormControl(this.userNavigate, [Validators.required]),
      "password": new FormControl("", [Validators.required]),
      "address": new FormControl("", [Validators.required]),
      "email": new FormControl("", [Validators.required]),
      "courseName": new FormControl("", []),
    })
  }
  saveDetails() {
    var ss = this.userForm.value;
    if (this.courseName == "") {
      this._api.postUser({ id: 0, userName: ss.name + "", address: ss.address + "", email: ss.email + "", password: ss.password + "" }).subscribe(s => {
        if (s) {
          sessionStorage.setItem("user", JSON.stringify(ss));
          alert("wellcome ! " + ss.name)
          this._router.navigate([`/course`])
        }
        else {
          alert("something was wrong...");
        }
      })
    }
    else {
      this._api.postLacture({ id: 0, userName: ss.name + "", address: ss.address + "", email: ss.email + "", password: ss.password + "" }).subscribe(s => {
        if (s) {
          sessionStorage.setItem("user", JSON.stringify(ss));
          alert("wellcome ! " + ss.name)
          this._router.navigate([`/course`])
        }
        else {
          alert("something was wrong...");
        }
      })
    }
  }

}

import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/apiservice.service';
import { Course } from '../../course/course.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _api: APIService, private _router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const user = params['user'];
      this.userNavigate = user;
      console.log("params", params);

    });

  }

  courseName: string = ""
  userNavigate: string = "_"
  userForm = new FormGroup({
    "id": new FormControl(0, []),
    "name": new FormControl(this.userNavigate, [Validators.required]),
    "password": new FormControl("", [Validators.required]),
    "address": new FormControl("", [Validators.required]),
    "email": new FormControl("", [Validators.required]),
    "courseName": new FormControl("", []),
  })

  private _user!: User | null;
  @Input()
  public set user(value: User) {
    this._user = value;
  }
  saveDetails() {
    var ss = this.userForm.value;
    console.log("ss", ss);
    if(this.courseName==""){
      this._api.postUser({id:0,userName:ss.name+"",address:ss.address+"",email:ss.email+"",password:ss.password+""}).subscribe(s => {
        if (s) {
          console.log("you sign end enter in succeesful");
          sessionStorage.setItem("user", JSON.stringify(ss));
          alert("wellcome ! "+ss.name)
          this._router.navigate([`/course`])
        }
        else {
          console.log("something was wrong...");

        }
      })
    }
    else{
      this._api.postLacture({id:0,userName:ss.name+"",address:ss.address+"",email:ss.email+"",password:ss.password+""}).subscribe(s => {
        if (s) {
          console.log("you sign end enter in succeesful");
          sessionStorage.setItem("user", JSON.stringify(ss));
          alert("wellcome ! "+ss.name)
          this._router.navigate([`/course`])
        }
        else {
          console.log("something was wrong...");

        }
      })
    }
  }

}

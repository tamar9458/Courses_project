import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/apiservice.service';
import { Course } from '../course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  constructor(private _api: APIService, private _router: Router, private route: ActivatedRoute) { }
   
  courseName: string = ""
  courseForm = new FormGroup({
    "id": new FormControl(0, []),
    "name": new FormControl("", []),
    "categoryId": new FormControl("", []),
    "amount": new FormControl("", []),
    "beginDate": new FormControl("", []),
    "syllabus": new FormControl("", []),
    "learningType": new FormControl("", []),
    "lecturerId": new FormControl("", []),
    "image": new FormControl("", []),
  })

  private _course!: Course | null;
  @Input()
  public set course(value: Course) {
    this._course = value;
  }
  saveDetails() {
    var ss = this.courseForm.value;
    console.log("ss", ss);
    this._api.postCourse({}).subscribe(s=>{
      if(s){
        console.log("add course");
      }
      else{
        console.log("failed to add course");
      }
    })
  }

}

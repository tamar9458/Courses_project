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
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const courseId = params['id'];
      if (courseId != 0) {
        this._api.getCourseById(courseId).subscribe(s => {
          this._course = s;
        })
      }
      else {
        this._course = new Course();
      }
  
    });
    
  }
  courseForm? : FormGroup | null;
  private _course ?: Course |null |undefined;
  public get course(): Course |null |undefined {
    return  this._course;
  }


  @Input()
  public set course(value: Course) {
    this._course = value;
    if (this._course  != undefined&&this._course!=null) {
      this.courseForm = new FormGroup({
        "id": new FormControl(this._course.id, []),
        "name": new FormControl("", [Validators.required, Validators.minLength(2)]),
        "status": new FormControl("", [Validators.required]),
        "departureDate": new FormControl("",),
        
      })
    }

}
}

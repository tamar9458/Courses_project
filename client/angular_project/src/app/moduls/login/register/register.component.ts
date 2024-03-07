import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/apiservice.service';
import { Course } from '../../course/course.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _api: APIService, private _router: Router, private route: ActivatedRoute) { }
  
  // ngOnInit(): void {
  //   this.route.params.subscribe(params => {
  //     const courseId = params['id'];
  //     if (courseId != 0) {
  //       this._api.getCourseById(courseId).subscribe(s => {
  //         this._course = s;
  //       })
  //     }
  //     else {
  //       this._course = new Course();
  //     }
  
  //   });
    
  // }

}

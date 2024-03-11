import { Component } from '@angular/core';
import { Course } from '../course.model';
import { APIService } from 'src/app/apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent {
  courses: Course[];
  search:string="";
  constructor(private _api: APIService,private _router:Router) {
    _api.getAllCourse().subscribe(
      data => {
        this.courses = data;
        console.log("courses",data);
        
      }
    )
  }
  ngOnInit(){

  }
addCourse(){  
  this._router.navigate([`/course/add`], { queryParams: { course: JSON.stringify(new Course) }
})
}
 
  serchCurseByName(){

  }
}


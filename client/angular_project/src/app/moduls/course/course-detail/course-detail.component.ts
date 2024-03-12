import { Component, Input } from '@angular/core';
import { Course } from '../course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/apiservice.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent {
  constructor(private _api: APIService, private _router: Router,private route: ActivatedRoute) { }
  // @Input()
  course: Course;
 courses:Course[];
  ngOnInit() {
    this.userJson = sessionStorage.getItem("user");
    this.user = this.userJson != "_" ? JSON.parse(this.userJson)?.userName : "_";
    this._api.getAllCourse().subscribe(
      data => {
        this.courses = data;
        console.log("courses",data);
         this.route.params.subscribe(params => {
      const id = params['id'];
      this.course=this.courses.find(c=>c.id==id)
      console.log("this course",this.course);
      
    });
      }
    )
   
    this._api.getLactureByName(this.user).subscribe(res => {
      console.log(res);

      if (res.userName != "_") {
        this.isUserLacture = true;
        this.LecturerId = res.id
      }
      else {
        this.isUserLacture = false;
        this.LecturerId = -1;
      }
      console.log("(this.isUserLacture", this.isUserLacture);

    })
    this._api.getAllCategory().subscribe(res => {
      this.categories = res;
      this.currentCat = this.categories.find(c => c.id == this.course?.categoryId)
    })
    if (this.course?.beginDate.getMonth() == new Date().getMonth()) {
      this.wow = true;
      
    }
    
  }
  wow: boolean = false;
  currentCat: Category
  categories: Category[]
  userJson: string;
  user
  isUserLacture: boolean
  LecturerId: number
  updateCourseDetail(cou: Course) {
    this._router.navigate([`/edit/`], { queryParams: { course: JSON.stringify(cou) } })
  }

}

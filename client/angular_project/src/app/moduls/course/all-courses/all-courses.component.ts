import { Component } from '@angular/core';
import { Course } from '../course.model';
import { APIService } from 'src/app/apiservice.service';
import { Router } from '@angular/router';
import { Category } from '../category.model';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent {
  courses: Course[];
  categories: Category[];
  search: string = ' ';
  constructor(private _api: APIService, private _router: Router) {
  }
  ngOnInit() {
    this._api.getAllCourse().subscribe(
      data => {
        this.courses = data;
      }
    )
    this._api.getAllCategory().subscribe(res => {
      this.categories = res;
    })
  }
  getIconRouting(course: Course) {
    return this.categories.find(c => c.id == course.categoryId)?.iconRouting
  }
  addCourse() {
    this._router.navigate([`/course/:add`], {
      queryParams: { course: JSON.stringify(new Course) }
    })
  }
  searchByCategory(event: any) {
    const val = event.target.value
    this._api.getCourseOfCaegory(val).subscribe(res => {
      this.courses = res
    })
  }
  searchTypeLearning(event: any) {
    const val = event.target.value
    this._api.getCourseOfType(val).subscribe(res => {
      this.courses = res
    })
  }
  serchCurseByName(val: string) {
    this._api.getCourseOfName(val).subscribe(res => {
      this.courses = res
    })
  }
  showMore(course: Course) {
    this._router.navigate([`/course/detail/${course.id}`])
  }
  editCourse(course: Course) {
    this._router.navigate([`/course/edit`], { queryParams: { course: JSON.stringify(course) } })
  }
  deleteCourse(course: Course) {
    let s = this.courses.find(ind => ind.id == course.id);
    if (s != null) {
      this._api.deleteCourse(s).subscribe(succed => {
        if (succed) {
          alert('the course '+course.name+' deleted succesfully')
          let index_to_del = this.courses.indexOf(s);
          this.courses.splice(index_to_del, 1);
        }
        else {
          alert('something was wrong...')
        }
      });
    }
  }
}


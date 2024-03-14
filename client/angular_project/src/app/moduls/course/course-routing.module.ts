import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { authGuard } from 'src/app/guard/auth.guard';
import { AllCoursesComponent } from './all-courses/all-courses.component';

const routes: Routes = [
  {path:"",component:AllCoursesComponent },
  {path:"detail/:id",component:CourseDetailComponent,canActivate:[authGuard]},
  {path:"edit/:id",component:EditCourseComponent },
  {path:"edit/:course",component:EditCourseComponent },
  {path:"add",component:EditCourseComponent },
  {path:"*",component:PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
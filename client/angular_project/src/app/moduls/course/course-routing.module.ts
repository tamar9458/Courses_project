import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { authGuard } from 'src/app/guard/auth.guard';



const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full" },
  {path:"course/:id",component:CourseDetailComponent,canActivate:[authGuard]},
  {path:"course/edit/:id",component:EditCourseComponent },
  {path:"*",component:PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './moduls/login/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllCoursesComponent } from './moduls/course/all-courses/all-courses.component';
import { RegisterComponent } from './moduls/login/register/register.component';
import { AddCourseComponent } from './moduls/course/add-course/add-course.component';
import { EditCourseComponent } from './moduls/course/edit-course/edit-course.component';

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full" },
  {path:"login",component:LoginComponent},
  {path:"signup/:user",component:RegisterComponent},
  {path:"course",loadChildren:()=>import("./moduls/course/course.module").then(m=>m.CourseModule)},
  {path:"course/:add",component:EditCourseComponent },
  {path:"**",component:PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

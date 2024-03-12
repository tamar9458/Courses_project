import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './moduls/login/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllCoursesComponent } from './moduls/course/all-courses/all-courses.component';
import { RegisterComponent } from './moduls/login/register/register.component';
import { AddCourseComponent } from './moduls/course/add-course/add-course.component';
import { EditCourseComponent } from './moduls/course/edit-course/edit-course.component';
import { authGuard } from './guard/auth.guard';
import { CourseDetailComponent } from './moduls/course/course-detail/course-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full" },
  {path:"login",component:LoginComponent},
  {path:"signup/:user",component:RegisterComponent},
  {path:"course",loadChildren:()=>import("./moduls/course/course.module").then(m=>m.CourseModule)},
  {path:"course/:add",component:EditCourseComponent,canActivate:[authGuard] },
  {path:"home",component:HomeComponent},
  {path:"**",component:PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
